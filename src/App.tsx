/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { DiagnosisForm, DiagnosisFormData } from './components/DiagnosisForm';
import { DiagnosisResultView } from './components/DiagnosisResultView';
import { TicketSummaryModal } from './components/TicketSummaryModal';
import { BackupModal } from './components/BackupModal';
import { NotificationChannelsModal } from './components/NotificationChannelsModal';
import { PresentationModal } from './components/PresentationModal';
import { MobileInstallModal } from './components/MobileInstallModal';
import { CreateTicketForm } from './components/CreateTicketForm';
import { TicketLog } from './components/TicketLog';
import { AboutApp } from './components/AboutApp';
import { ToastContainer } from './components/Toast';
import { INITIAL_TICKETS } from './data/mockTickets';
import { COMMON_PROBLEMS } from './data/commonProblems';
import { performInstantDiagnosis } from './utils/diagnosticEngine';
import {
  SupportTicket,
  DiagnosisData,
  ProblemCategory,
  ToastMessage,
  TicketStatus,
  TicketFollowUpMessage
} from './types/it-support';
import { Menu, Plus, Stethoscope, Search, User, RefreshCw, CloudCheck, Bell, BellRing, Settings, Languages, Smartphone } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';
import {
  subscribeToFirestoreTickets,
  saveTicketToFirestore,
  updateTicketInFirestore,
  deleteTicketFromFirestore,
  seedInitialTickets
} from './services/ticketService';
import { testConnection } from './firebase';
import { startPresenceTracking, OnlineUser } from './services/presenceService';
import {
  showSystemNotification,
  requestBrowserNotificationPermission,
  playNotificationSound
} from './utils/notificationSound';

export default function App() {
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'diagnose' | 'new-ticket' | 'ticket-log' | 'about'>('dashboard');
  const [onlineCount, setOnlineCount] = useState<number>(1);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [showPresenceDetails, setShowPresenceDetails] = useState<boolean>(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState<boolean>(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState<boolean>(false);
  const [isPresentationModalOpen, setIsPresentationModalOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [hasNotificationPermission, setHasNotificationPermission] = useState<boolean>(() => {
    return typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted';
  });

  const handleRestoreTickets = async (restored: SupportTicket[]) => {
    setTickets(restored);
    try {
      localStorage.setItem('it_support_tickets_v1', JSON.stringify(restored));
    } catch {}

    for (const t of restored) {
      saveTicketToFirestore(t).catch(() => {});
    }

    try {
      await fetch('/api/tickets/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tickets: restored }),
      });
    } catch (e) {
      console.error('Failed to sync restored tickets to server:', e);
    }
  };
  
  // Smart Active User Name with localStorage persistence (Purges any old hardcoded names like الشمري)
  const [activeUserName, setActiveUserName] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('it_smart_active_user');
      if (stored && stored !== 'الشمري' && stored !== 'تركي الشمري' && stored !== 'المستخدم') {
        return stored;
      }
      // If it was the unwanted old placeholder or default, clean it up!
      if (stored === 'الشمري' || stored === 'تركي الشمري' || stored === 'المستخدم') {
        localStorage.removeItem('it_smart_active_user');
      }
      return '';
    } catch {
      return '';
    }
  });

  const handleUpdateActiveUserName = (newName: string) => {
    const trimmed = newName.trim();
    setActiveUserName(trimmed);
    try {
      if (trimmed) {
        localStorage.setItem('it_smart_active_user', trimmed);
        addToast('تم حفظ اسمك بنجاح', `سيتم تذكره واقتراحه تلقائياً في الفحص والبلاغات: ${trimmed}`, 'success');
      } else {
        localStorage.removeItem('it_smart_active_user');
        addToast('تم مسح الاسم المحفوظ', 'يمكنك الآن إدخال أي اسم أو ترك الحقل فارغاً', 'info');
      }
    } catch (e) {
      console.error('Failed to update user name in localStorage', e);
    }
  };

  // View Scope: All Company Tickets vs My Personal Tickets (Solves Point 3)
  const [viewScope, setViewScope] = useState<'all' | 'my_tickets'>('all');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');

  // Seen Ticket Tracking for Instant Sound & System Notification Alerts
  const seenTicketIdsRef = useRef<Set<string>>(new Set());
  const hasInitialLoadedRef = useRef<boolean>(false);

  const notifyOnNewTickets = (incomingList: SupportTicket[]) => {
    if (!incomingList || incomingList.length === 0) return;
    if (hasInitialLoadedRef.current) {
      const newlyArrived = incomingList.filter(
        (t) => !seenTicketIdsRef.current.has(t.ticketNumber || t.id)
      );
      if (newlyArrived.length > 0) {
        const latest = newlyArrived[0];
        showSystemNotification(
          `🔔 بلاغ صيانة جديد (${latest.ticketNumber})`,
          `الموظف: ${latest.userName} | قسم: ${latest.department}\nالعطل: ${latest.categoryLabel || latest.description.slice(0, 50)}`,
          () => {
            setSelectedTicketForModal(latest);
            setCurrentTab('ticket-log');
          }
        );
        addToast(
          `🔔 بلاغ صيانة جديد: ${latest.ticketNumber}`,
          `الموظف: ${latest.userName} (${latest.department}) - ${latest.categoryLabel || 'عطل تقني'}`,
          'info'
        );
      }
    } else {
      hasInitialLoadedRef.current = true;
    }
    seenTicketIdsRef.current = new Set(incomingList.map((t) => t.ticketNumber || t.id));
  };

  const handleToggleNotifications = async () => {
    if (hasNotificationPermission) {
      playNotificationSound();
      addToast(
        'إشعارات البلاغات مفعلة بنجاح',
        'يرسل النظام تنبيهاً صوتياً ورسالة منبثقة على سطح المكتب والهاتف عند تسجيل أي بلاغ جديد',
        'success'
      );
      return;
    }
    const granted = await requestBrowserNotificationPermission();
    setHasNotificationPermission(granted);
    if (granted) {
      playNotificationSound();
      showSystemNotification(
        '🔔 تم تفعيل إشعارات الدعم الفني',
        'ستصلك تنبيهات فورية بالصوت ورسائل منبثقة عند تسجيل أي بلاغ صيانة جديد!'
      );
      addToast('تم تفعيل إشعارات النظام بنجاح', 'ستصلك التنبيهات حتى وإن كان المتصفح مصغراً', 'success');
    } else {
      playNotificationSound();
      addToast('تنبيه الإشعارات', 'تم تفعيل التنبيه الصوتي الداخلي، ويمكنك السماح بإشعارات المتصفح لتلقي إشعارات سطح المكتب', 'info');
    }
  };

  // Persistent Tickets with Central Server sync and LocalStorage instant cache
  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    try {
      const saved = localStorage.getItem('it_support_tickets_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with any baseline tickets that might be missing from an older cache (e.g. IT-2026-4962 & IT-2026-9511)
          const existingIds = new Set(parsed.map((t: any) => t.ticketNumber || t.id));
          const missingBaselines = INITIAL_TICKETS.filter(bt => !existingIds.has(bt.ticketNumber || bt.id));
          const merged = [...missingBaselines, ...parsed];
          seenTicketIdsRef.current = new Set(merged.map((t: any) => t.ticketNumber || t.id));
          return merged;
        }
      }
    } catch (e) {
      console.error('Error loading tickets from localStorage', e);
    }
    seenTicketIdsRef.current = new Set(INITIAL_TICKETS.map((t) => t.ticketNumber || t.id));
    return INITIAL_TICKETS;
  });

  // Central Server API Fetcher with cache-busting for Mobile Browsers
  const fetchTicketsFromCentralServer = async (showToastOnManual = false) => {
    setIsSyncing(true);
    try {
      const res = await fetch(`/api/tickets?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.tickets)) {
          const serverList: SupportTicket[] = json.tickets;

          // Timestamp-based Conflict Resolution:
          // Check if localStorage has newer user edits (e.g. status changes or technician updates)
          // that occurred after the server's build timestamp or during ephemeral container restarts
          let mergedList = [...serverList];
          let hadNewerLocalUpdates = false;

          try {
            const saved = localStorage.getItem('it_support_tickets_v1');
            if (saved) {
              const localList: SupportTicket[] = JSON.parse(saved);
              if (Array.isArray(localList)) {
                mergedList = serverList.map((st) => {
                  const lt = localList.find((l) => l.id === st.id || l.ticketNumber === st.ticketNumber);
                  if (lt && lt.updatedAt && st.updatedAt) {
                    const localTime = new Date(lt.updatedAt).getTime();
                    const serverTime = new Date(st.updatedAt).getTime();
                    if (!isNaN(localTime) && !isNaN(serverTime) && localTime > serverTime) {
                      hadNewerLocalUpdates = true;
                      return lt;
                    }
                  }
                  return st;
                });

                // Also keep any local tickets created offline not yet present on server
                for (const lt of localList) {
                  if (!mergedList.some((m) => m.id === lt.id || m.ticketNumber === lt.ticketNumber)) {
                    mergedList.unshift(lt);
                    hadNewerLocalUpdates = true;
                  }
                }
              }
            }
          } catch (e) {
            console.error('Error during local ticket conflict merge:', e);
          }

          setTickets(mergedList);
          notifyOnNewTickets(mergedList);
          try {
            localStorage.setItem('it_support_tickets_v1', JSON.stringify(mergedList));
          } catch {}

          setLastSyncTime(new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
          if (showToastOnManual) {
            addToast('تمت المزامنة بنجاح', `تم تحديث التذاكر من السيرفر المركزي (${mergedList.length} بلاغ)`, 'success');
          }

          // If local storage had newer updates (e.g. after a server cold start/restart), re-sync them back to server immediately
          if (hadNewerLocalUpdates) {
            try {
              await fetch('/api/tickets/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tickets: mergedList }),
              });
            } catch {}
          }

          return mergedList;
        }
      }
    } catch (e) {
      console.warn('Central server sync unreachable:', e);
      if (showToastOnManual) {
        addToast('تنبيه الاتصال', 'تعذر الاتصال بالسيرفر المركزي، تم الاعتماد على النسخة المحفوظة محلياً', 'info');
      }
    } finally {
      setIsSyncing(false);
    }
    return null;
  };

  // On Mount & Wake-up: Live Firestore subscription + fallback server sync
  useEffect(() => {
    testConnection().catch(() => {});

    // Live Real-Time Firestore Sync: All devices and users instantly see changes
    const unsubscribeFirestore = subscribeToFirestoreTickets(
      (cloudTickets) => {
        if (cloudTickets && cloudTickets.length > 0) {
          setTickets(cloudTickets);
          notifyOnNewTickets(cloudTickets);
          try {
            localStorage.setItem('it_support_tickets_v1', JSON.stringify(cloudTickets));
          } catch {}
          setLastSyncTime(new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }
      },
      (error) => {
        console.warn('Real-time listener notice, fallback sync engaged:', error);
      }
    );

    const initSync = async () => {
      const serverTickets = await fetchTicketsFromCentralServer();
      try {
        const saved = localStorage.getItem('it_support_tickets_v1');
        if (saved) {
          const localList: SupportTicket[] = JSON.parse(saved);
          if (Array.isArray(localList) && localList.length > 0) {
            // Find any offline newly created tickets not yet on the server
            const missing = localList.filter(
              (lt) => !serverTickets?.some((st: SupportTicket) => st.id === lt.id || st.ticketNumber === lt.ticketNumber)
            );
            if (missing.length > 0) {
              await fetch('/api/tickets/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tickets: missing }),
              });
              await fetchTicketsFromCentralServer();
            }
          }
        }
      } catch (err) {
        console.error('Initial tickets sync error:', err);
      }
    };

    initSync();

    // Auto polling every 8 seconds as secondary fallback
    const interval = setInterval(() => {
      fetchTicketsFromCentralServer();
    }, 8000);

    // Mobile background-to-foreground wakeup sync (vital when phone screen is unlocked)
    const handleResume = () => {
      if (document.visibilityState === 'visible') {
        fetchTicketsFromCentralServer();
      }
    };

    // Live Online Presence Tracking
    const stopPresence = startPresenceTracking(activeUserName, (count, users) => {
      setOnlineCount(count);
      setOnlineUsers(users);
    });

    return () => {
      stopPresence();
      unsubscribeFirestore();
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleResume);
      window.removeEventListener('focus', handleResume);
    };
  }, [activeUserName]);

  useEffect(() => {
    try {
      localStorage.setItem('it_support_tickets_v1', JSON.stringify(tickets));
    } catch (e) {
      console.error('Error saving tickets to localStorage', e);
    }
  }, [tickets]);

  // Diagnosis State
  const [selectedCategoryForDiagnose, setSelectedCategoryForDiagnose] = useState<ProblemCategory>('internet');
  const [diagnosisResult, setDiagnosisResult] = useState<{
    formData: DiagnosisFormData;
    diagnosis: DiagnosisData;
    source: 'gemini' | 'expert_system';
  } | null>(null);
  const [isLoadingDiagnosis, setIsLoadingDiagnosis] = useState(false);

  // Modal State
  const [selectedTicketForModal, setSelectedTicketForModal] = useState<SupportTicket | null>(null);

  // Toasts State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message?: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Actions
  const handleStartDiagnose = (category?: ProblemCategory) => {
    if (category) {
      setSelectedCategoryForDiagnose(category);
    }
    setDiagnosisResult(null);
    setCurrentTab('diagnose');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Rock-solid diagnosis execution
  const handleRunDiagnosis = async (formData: DiagnosisFormData) => {
    setIsLoadingDiagnosis(true);
    const enrichedFormData = { ...formData, language };
    let resolvedDiagnosis: DiagnosisData | null = null;
    let resolvedSource: 'gemini' | 'expert_system' = 'expert_system';

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enrichedFormData)
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          resolvedDiagnosis = result.data;
          resolvedSource = result.source || 'gemini';
        }
      }
    } catch (e) {
      // Standalone mode / offline: handled by instant local engine seamlessly
    }

    if (!resolvedDiagnosis) {
      resolvedDiagnosis = performInstantDiagnosis(enrichedFormData);
      resolvedSource = 'expert_system';
    }

    setDiagnosisResult({
      formData: enrichedFormData,
      diagnosis: resolvedDiagnosis,
      source: resolvedSource
    });

    const isEn = language === 'en';
    addToast(
      isEn ? 'AI Diagnostic Analysis Completed' : 'تم إتمام التشخيص الفني بنجاح',
      resolvedSource === 'gemini'
        ? (isEn ? 'Verified and analyzed using advanced AI models' : 'تم الفحص الدقيق والتحليل بواسطة الذكاء الاصطناعي')
        : (isEn ? 'Actionable diagnostic steps and solutions generated' : 'تم استخلاص مسار الفحص والحلول التنفيذية المعتمدة'),
      'success'
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLoadingDiagnosis(false);
  };

  const handleCreateTicketFromDiagnosis = async (
    formData: DiagnosisFormData,
    diag: DiagnosisData,
    preferredAssistance?: 'self' | 'remote' | 'on_site'
  ) => {
    const catObj = COMMON_PROBLEMS.find((p) => p.id === formData.category);
    const newId = `t-${Date.now().toString().slice(-4)}`;
    const newTicketNumber = `IT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const requester = formData.userName || activeUserName || 'المستفيد';

    const initialFollowUp: TicketFollowUpMessage[] = [];
    if (preferredAssistance === 'remote') {
      initialFollowUp.push({
        id: `f-${Date.now()}`,
        author: requester,
        role: 'user',
        message: 'طلب دعم فني عن بعد (AnyDesk / TeamViewer): المستخدم يطلب تدخل فني مباشر على الشاشة لعدم توفر الاختصاص التقني للحل الذاتي.',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        type: 'remote_request'
      });
    } else if (preferredAssistance === 'on_site') {
      initialFollowUp.push({
        id: `f-${Date.now()}`,
        author: requester,
        role: 'user',
        message: 'طلب زيارة فني لمكتبي: المستخدم يطلب حضور أحد مهندسي الدعم الميداني للفحص والمساعدة المباشرة.',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        type: 'visit_request'
      });
    }

    const newTicket: SupportTicket = {
      id: newId,
      ticketNumber: newTicketNumber,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      userName: requester,
      department: formData.department,
      deviceType: formData.deviceType,
      os: formData.os,
      category: formData.category,
      categoryLabel: catObj ? catObj.title : 'مشكلة أخرى',
      description: formData.description,
      priority: formData.priority,
      status: 'جديد',
      technicianName: 'م. عبدالرحيم محمد',
      technicians: ['م. عبدالرحيم محمد'],
      diagnosisSummary: diag.analysis,
      suggestedSolution: diag.solutions && diag.solutions.length > 0 ? `${diag.solutions[0].title}: ${diag.solutions[0].action}` : 'متابعة الصيانة',
      resolutionNotes: '',
      assistanceType: preferredAssistance || 'self',
      requiresSpecialistIntervention: preferredAssistance === 'remote' || preferredAssistance === 'on_site',
      followUpHistory: initialFollowUp
    };

    setTickets((prev) => [newTicket, ...prev]);
    setSelectedTicketForModal(newTicket);
    setCurrentTab('ticket-log');
    addToast(
      preferredAssistance === 'remote'
        ? 'تم رفع طلب دعم فني عن بعد'
        : preferredAssistance === 'on_site'
        ? 'تم رفع طلب زيارة فني للمكتب'
        : 'تم إنشاء بلاغ الدعم الفني بنجاح',
      `تم إصدار التذكرة رقم ${newTicketNumber} وإسنادها للمتابعة المباشرة`,
      'success'
    );

    // Save to Firestore real-time cloud database (instant cross-device sync)
    saveTicketToFirestore(newTicket).catch((err) => console.warn('Firestore write notice:', err));

    // Save to central shared server as secondary backup
    try {
      await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTicket),
      });
    } catch (e) {
      console.error('Failed to post ticket to central server:', e);
    }
  };

  const handleSaveDirectTicket = async (newTicket: SupportTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
    setSelectedTicketForModal(newTicket);
    setCurrentTab('ticket-log');
    addToast(
      'تم فتح تذكرة دعم فني جديدة',
      `التذكرة ${newTicket.ticketNumber} مسجلة في السجل المركزي وجاهزة للمتابعة`,
      'success'
    );

    // Save to Firestore real-time cloud database (instant cross-device sync)
    saveTicketToFirestore(newTicket).catch((err) => console.warn('Firestore write notice:', err));

    // Save to central shared server as secondary backup
    try {
      await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTicket),
      });
    } catch (e) {
      console.error('Failed to post ticket to central server:', e);
    }
  };

  const handleUpdateTicket = async (updatedTicket: SupportTicket) => {
    const updatedTime = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const updatedWithTime: SupportTicket = {
      ...updatedTicket,
      updatedAt: updatedTime
    };

    setTickets((prev) => {
      const nextList = prev.map((t) => (t.id === updatedWithTime.id || t.ticketNumber === updatedWithTime.ticketNumber ? updatedWithTime : t));
      try {
        localStorage.setItem('it_support_tickets_v1', JSON.stringify(nextList));
      } catch {}
      return nextList;
    });

    if (selectedTicketForModal && (selectedTicketForModal.id === updatedWithTime.id || selectedTicketForModal.ticketNumber === updatedWithTime.ticketNumber)) {
      setSelectedTicketForModal(updatedWithTime);
    }

    // Update in Firestore real-time cloud database
    updateTicketInFirestore(updatedWithTime.ticketNumber || updatedWithTime.id, updatedWithTime).catch((err) =>
      console.warn('Firestore update notice:', err)
    );

    try {
      await fetch(`/api/tickets/${encodeURIComponent(updatedWithTime.id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedWithTime),
      });
    } catch (e) {
      console.error('Failed to update ticket on central server:', e);
    }
  };

  const handleDeleteTicket = async (ticketId: string) => {
    const ticket = tickets.find((t) => t.id === ticketId);
    if (ticket && window.confirm(`هل أنت متأكد من حذف البلاغ رقم ${ticket.ticketNumber}؟`)) {
      setTickets((prev) => {
        const nextList = prev.filter((t) => t.id !== ticketId && t.ticketNumber !== ticketId);
        try {
          localStorage.setItem('it_support_tickets_v1', JSON.stringify(nextList));
        } catch {}
        return nextList;
      });
      addToast('تم حذف البلاغ بنجاح', `تم مسح البلاغ ${ticket.ticketNumber} من السجل المركزي`, 'info');

      // Delete from Firestore real-time cloud database
      deleteTicketFromFirestore(ticket.ticketNumber || ticket.id).catch((err) =>
        console.warn('Firestore delete notice:', err)
      );

      try {
        await fetch(`/api/tickets/${encodeURIComponent(ticketId)}`, {
          method: 'DELETE',
        });
      } catch (e) {
        console.error('Failed to delete ticket on central server:', e);
      }
    }
  };

  const handleQuickStatusChange = async (ticketId: string, newStatus: TicketStatus) => {
    const updatedTime = new Date().toISOString().replace('T', ' ').substring(0, 16);
    let updatedTicketObj: SupportTicket | undefined;

    setTickets((prev) => {
      const updatedList = prev.map((t) => {
        if (t.id === ticketId || t.ticketNumber === ticketId) {
          updatedTicketObj = { ...t, status: newStatus, updatedAt: updatedTime };
          return updatedTicketObj;
        }
        return t;
      });
      try {
        localStorage.setItem('it_support_tickets_v1', JSON.stringify(updatedList));
      } catch {}
      return updatedList;
    });

    addToast('تم تحديث حالة البلاغ', `الحالة الجديدة: ${newStatus}`, 'success');

    // Update in Firestore real-time cloud database
    updateTicketInFirestore(ticketId, { status: newStatus, updatedAt: updatedTime }).catch((err) =>
      console.warn('Firestore quick status notice:', err)
    );

    try {
      await fetch(`/api/tickets/${encodeURIComponent(ticketId)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, updatedAt: updatedTime }),
      });
    } catch (e) {
      console.error('Failed to update status on central server:', e);
    }
  };

  const openTicketsCount = tickets.filter(t => t.status === 'قيد المعالجة' || t.status === 'جديد').length;

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Structured Persistent Sidebar (Solves Point 1: Framed Layout) */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        openTicketsCount={openTicketsCount}
        totalTicketsCount={tickets.length}
        activeUserName={activeUserName}
        onUpdateActiveUserName={handleUpdateActiveUserName}
        viewMode={viewScope}
        onToggleViewMode={setViewScope}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onlineCount={onlineCount}
        onlineUsers={onlineUsers}
        onOpenNotificationChannels={() => setIsNotificationModalOpen(true)}
        onOpenBackupModal={() => setIsBackupModalOpen(true)}
        onOpenPresentation={() => setIsPresentationModalOpen(true)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {/* Main Workspace Frame (Solves Point 1: Clear Boundary & Header) */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        
        {/* Workspace Top Header Bar */}
        <header className="sticky top-0 z-20 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3 flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
              title="فتح القائمة الجانبية"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="hidden sm:inline">{t.appTitle}</span>
              <span aria-hidden="true" className="hidden sm:inline text-slate-600">/</span>
              <span className="text-cyan-400 font-bold">
                {currentTab === 'dashboard' && t.nav.dashboard}
                {currentTab === 'diagnose' && t.nav.diagnose}
                {currentTab === 'new-ticket' && t.nav.newTicket}
                {currentTab === 'ticket-log' && t.nav.ticketLog}
                {currentTab === 'about' && t.nav.about}
              </span>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Install on Mobile App Action Button */}
            <button
              type="button"
              onClick={() => setIsInstallModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-xs font-bold text-emerald-300 hover:text-white transition-all cursor-pointer shadow-sm"
              title={language === 'en' ? 'Install App on Mobile (Android & iPhone)' : 'تحميل وتثبيت التطبيق على الموبايل'}
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline font-bold">
                {language === 'en' ? 'Install App' : 'تثبيت الموبايل'}
              </span>
              <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-emerald-400/20 text-emerald-300 font-bold">
                PWA
              </span>
            </button>

            {/* Prominent Bilingual Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-xs font-bold text-cyan-300 hover:text-white transition-all cursor-pointer shadow-sm"
              title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Languages className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-sans font-bold">{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Live Online Presence Indicator with Interactive Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPresenceDetails((prev) => !prev)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all cursor-pointer shadow-sm"
                title={language === 'en' ? 'Online users - Click to view active sessions' : 'المتواجدون أونلاين الآن بالتطبيق - اضغط لمعاينة المتصلين'}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-mono">{onlineCount}</span>
                <span className="hidden sm:inline">{language === 'en' ? 'Online' : 'أونلاين'}</span>
              </button>

              {/* Popover with users */}
              {showPresenceDetails && (
                <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-64 p-3 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl z-50 text-xs space-y-2 animate-in fade-in duration-150`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>{language === 'en' ? `Active Users (${onlineCount})` : `المتواجدون حالياً (${onlineCount})`}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPresenceDetails(false)}
                      className="text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                    {onlineUsers.length > 0 ? (
                      onlineUsers.map((u, i) => (
                        <div
                          key={u.sessionId || i}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-800 text-[11px]"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                            <span className="font-bold text-slate-200 truncate">{u.userName}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono shrink-0 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                            {u.deviceType}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-slate-400 text-[11px] p-2 text-center">
                        {language === 'en' ? 'You are connected to the system now' : 'أنت متصل بالمنظومة الآن'}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Instant Notification Bell Toggle */}
            <button
              type="button"
              onClick={handleToggleNotifications}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                hasNotificationPermission
                  ? 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-300 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-700/80 text-slate-300 hover:text-white'
              }`}
              title={
                hasNotificationPermission
                  ? (language === 'en' ? 'Instant Audio & System notifications active' : 'إشعارات البلاغات الفورية مفعلة بالصوت والنظام')
                  : (language === 'en' ? 'Enable instant desktop audio notifications' : 'تفعيل إشعارات سطح المكتب والتنبيه الصوتي الفوري')
              }
            >
              {hasNotificationPermission ? (
                <BellRing className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              ) : (
                <Bell className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span className="hidden sm:inline">
                {hasNotificationPermission 
                  ? (language === 'en' ? 'Alerts ON' : 'التنبيهات مفعلة')
                  : (language === 'en' ? 'Enable Alerts' : 'تفعيل التنبيهات')}
              </span>
            </button>

            {/* Notification Channels Hub */}
            <button
              type="button"
              onClick={() => setIsNotificationModalOpen(true)}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
              title={t.sidebar.notificationChannels}
            >
              <Settings className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => fetchTicketsFromCentralServer(true)}
              disabled={isSyncing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
              title={lastSyncTime ? `Cloud Sync (Updated: ${lastSyncTime})` : 'Realtime Cloud Sync'}
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">{isSyncing ? t.dashboard.syncing : t.dashboard.liveSync}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </button>

            <button
              onClick={() => setCurrentTab('new-ticket')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.nav.newTicket}</span>
            </button>

            <button
              onClick={() => handleStartDiagnose()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.nav.startScan}</span>
            </button>
          </div>
        </header>

        {/* Workspace Canvas Container (Clean Framed Boundaries) */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          
          {/* Tab 1: Dashboard */}
          {currentTab === 'dashboard' && (
            <Dashboard
              onStartDiagnose={handleStartDiagnose}
              onCreateTicket={() => setCurrentTab('new-ticket')}
              onViewTicket={(ticket) => setSelectedTicketForModal(ticket)}
              onOpenTicketLog={() => setCurrentTab('ticket-log')}
              tickets={tickets}
              onRefreshTickets={() => fetchTicketsFromCentralServer(true)}
              isSyncing={isSyncing}
            />
          )}

          {/* Tab 2: Diagnose Problem */}
          {currentTab === 'diagnose' && (
            <div>
              {!diagnosisResult ? (
                <DiagnosisForm
                  initialCategory={selectedCategoryForDiagnose}
                  onSubmit={handleRunDiagnosis}
                  isLoading={isLoadingDiagnosis}
                  activeUserName={activeUserName}
                  onUpdateActiveUserName={handleUpdateActiveUserName}
                />
              ) : (
                <DiagnosisResultView
                  formData={diagnosisResult.formData}
                  diagnosis={diagnosisResult.diagnosis}
                  source={diagnosisResult.source}
                  onCreateTicketFromDiagnosis={handleCreateTicketFromDiagnosis}
                  onBackToEdit={() => setDiagnosisResult(null)}
                  onShowToast={addToast}
                />
              )}
            </div>
          )}

          {/* Tab 3: Direct Ticket Creation */}
          {currentTab === 'new-ticket' && (
            <CreateTicketForm
              onSaveTicket={handleSaveDirectTicket}
              onCancel={() => setCurrentTab('dashboard')}
              activeUserName={activeUserName}
              onUpdateActiveUserName={handleUpdateActiveUserName}
            />
          )}

          {/* Tab 4: Tickets Log */}
          {currentTab === 'ticket-log' && (
            <TicketLog
              tickets={tickets}
              onViewTicket={(ticket) => setSelectedTicketForModal(ticket)}
              onCreateNewTicket={() => setCurrentTab('new-ticket')}
              onDeleteTicket={handleDeleteTicket}
              onQuickStatusChange={handleQuickStatusChange}
              activeUserName={activeUserName}
              viewScope={viewScope}
              onToggleViewScope={setViewScope}
              onRefreshTickets={() => fetchTicketsFromCentralServer(true)}
              isSyncing={isSyncing}
              onOpenBackupModal={() => setIsBackupModalOpen(true)}
            />
          )}

          {/* Tab 5: About App */}
          {currentTab === 'about' && (
            <AboutApp
              onOpenPresentation={() => setIsPresentationModalOpen(true)}
              onOpenInstallModal={() => setIsInstallModalOpen(true)}
            />
          )}

        </main>

        {/* Ticket Details & Print Modal */}
        {selectedTicketForModal && (
          <TicketSummaryModal
            key={selectedTicketForModal.id}
            ticket={selectedTicketForModal}
            isOpen={!!selectedTicketForModal}
            onClose={() => setSelectedTicketForModal(null)}
            onUpdateTicket={handleUpdateTicket}
            onShowToast={addToast}
            onOpenNotificationSettings={() => setIsNotificationModalOpen(true)}
          />
        )}

        {/* External Notification Channels Hub (WhatsApp, Email, Telegram) */}
        <NotificationChannelsModal
          isOpen={isNotificationModalOpen}
          onClose={() => setIsNotificationModalOpen(false)}
          onShowToast={addToast}
        />

        {/* Executive Presentation & Pitch Deck Modal (PDF & Video Script) */}
        <PresentationModal
          isOpen={isPresentationModalOpen}
          onClose={() => setIsPresentationModalOpen(false)}
          onShowToast={addToast}
        />

        {/* Backup & Security Vault Modal */}
        <BackupModal
          isOpen={isBackupModalOpen}
          onClose={() => setIsBackupModalOpen(false)}
          tickets={tickets}
          onRestoreTickets={handleRestoreTickets}
          onShowToast={addToast}
        />

        {/* Mobile PWA Installation Guide & Quick Prompt Modal */}
        <MobileInstallModal
          isOpen={isInstallModalOpen}
          onClose={() => setIsInstallModalOpen(false)}
          onAddToast={addToast}
        />

        {/* Footer with Developer Copyright & Contact */}
        <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-5 text-xs text-slate-400 no-print">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-center sm:text-right flex-wrap">
              <span className="font-bold text-slate-200">جميع الحقوق محفوظة © 2026</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">
                تطوير وهندسة النظام: <strong className="text-cyan-400 font-bold">عبدالرحيم محمد احمد</strong>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="font-mono text-[11px] text-slate-400" dir="ltr">Abdelrahim Mohamed Ahmed</span>
            </div>
            
            <div className="flex items-center gap-3 text-xs flex-wrap justify-center">
              <a
                href="mailto:rahemxp2020@gmail.com"
                className="text-slate-400 hover:text-cyan-300 transition-colors font-mono"
                dir="ltr"
              >
                ✉️ rahemxp2020@gmail.com
              </a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a
                href="https://wa.me/201009125279"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors font-mono font-bold"
                dir="ltr"
              >
                واتساب / هاتف: +201009125279
              </a>
            </div>
          </div>
        </footer>

      </div>

    </div>
  );
}
