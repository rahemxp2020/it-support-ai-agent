/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Printer,
  Copy,
  Check,
  Building,
  User,
  Laptop,
  CheckCircle2,
  FileText,
  Wrench,
  Shield,
  MessageSquare,
  Users,
  Plus,
  UserCheck,
  MessageCircle,
  MonitorUp,
  MapPin,
  Send,
  ExternalLink,
  Clock,
  Mail,
  Bot,
  Settings,
  Bell,
  ArrowRight
} from 'lucide-react';
import { SupportTicket, TicketStatus, TicketFollowUpMessage } from '../types/it-support';
import { SUGGESTED_TEAM_TECHNICIANS_AR, SUGGESTED_TEAM_TECHNICIANS_EN } from './CreateTicketForm';
import {
  openWhatsAppNotification,
  openEmailNotification,
  dispatchTelegramNotification
} from '../services/notificationChannels';
import { useLanguage } from '../context/LanguageContext';
import { translatePriority, translateStatus, translateCategory } from '../i18n/translations';

interface TicketSummaryModalProps {
  ticket: SupportTicket;
  isOpen: boolean;
  onClose: () => void;
  onUpdateTicket: (updated: SupportTicket) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
  onOpenNotificationSettings?: () => void;
}

export const TicketSummaryModal: React.FC<TicketSummaryModalProps> = ({
  ticket,
  isOpen,
  onClose,
  onUpdateTicket,
  onShowToast,
  onOpenNotificationSettings
}) => {
  const { language, t, isRTL } = useLanguage();

  if (!isOpen) return null;

  const [status, setStatus] = useState<TicketStatus>(ticket.status);

  // Initialize technicians array with fallback
  const defaultTechName = language === 'en' ? 'Eng. Abdelrahim Mohamed Ahmed Mohamed' : 'م. عبدالرحيم محمد احمد محمد';
  const initialTechs = ticket.technicians && ticket.technicians.length > 0
    ? ticket.technicians
    : ticket.technicianName && ticket.technicianName !== 'غير معين' && ticket.technicianName !== 'Unassigned'
      ? ticket.technicianName.split('،').map(s => s.trim()).filter(Boolean)
      : [defaultTechName];

  const [technicians, setTechnicians] = useState<string[]>(initialTechs);
  const [customTechInput, setCustomTechInput] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState(ticket.resolutionNotes || '');
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Follow-up communication and non-technical assistance state
  const [assistanceType, setAssistanceType] = useState<'self' | 'remote' | 'on_site'>(ticket.assistanceType || 'self');
  const [followUpMessages, setFollowUpMessages] = useState<TicketFollowUpMessage[]>(ticket.followUpHistory || []);
  const [newFollowUpText, setNewFollowUpText] = useState('');
  const [senderRole, setSenderRole] = useState<'user' | 'technician'>('user');
  const [anyDeskCode, setAnyDeskCode] = useState('');
  const [showAnyDeskInput, setShowAnyDeskInput] = useState(false);
  const [isSendingTelegram, setIsSendingTelegram] = useState(false);

  const suggestedTechs = language === 'en' ? SUGGESTED_TEAM_TECHNICIANS_EN : SUGGESTED_TEAM_TECHNICIANS_AR;

  const handleSendWhatsApp = () => {
    const success = openWhatsAppNotification(ticket);
    if (success) {
      onShowToast(
        language === 'en' ? 'WhatsApp Notification Ready' : 'تم تجهيز إشعار واتساب',
        language === 'en' ? 'Chat opened with ticket details for instant dispatch' : 'تم فتح المحادثة بتفاصيل البلاغ للإرسال الفوري',
        'success'
      );
    }
  };

  const handleSendEmail = () => {
    const success = openEmailNotification(ticket);
    if (success) {
      onShowToast(
        language === 'en' ? 'Email Report Prepared' : 'تم تجهيز تقرير البريد الإلكتروني',
        language === 'en' ? 'Email draft opened with formal incident data' : 'تم فتح رسالة البريد ببيانات البلاغ الرسمية',
        'info'
      );
    }
  };

  const handleSendTelegram = async () => {
    setIsSendingTelegram(true);
    const res = await dispatchTelegramNotification(ticket);
    setIsSendingTelegram(false);
    if (res.success) {
      onShowToast(
        language === 'en' ? 'Telegram Push Sent' : 'تم إرسال الإشعار لتيليجرام',
        res.message,
        'success'
      );
    } else {
      onShowToast(
        language === 'en' ? 'Telegram Alert' : 'تنبيه تيليجرام',
        res.message,
        'error'
      );
      if (onOpenNotificationSettings) {
        onOpenNotificationSettings();
      }
    }
  };

  // Sync state whenever ticket prop updates
  useEffect(() => {
    setStatus(ticket.status);
    const techs = ticket.technicians && ticket.technicians.length > 0
      ? ticket.technicians
      : ticket.technicianName && ticket.technicianName !== 'غير معين' && ticket.technicianName !== 'Unassigned'
        ? ticket.technicianName.split('،').map(s => s.trim()).filter(Boolean)
        : [defaultTechName];
    setTechnicians(techs);
    setResolutionNotes(ticket.resolutionNotes || '');
    setAssistanceType(ticket.assistanceType || 'self');
    setFollowUpMessages(ticket.followUpHistory || []);
  }, [ticket, defaultTechName]);

  const handleAddTechnician = (tech: string) => {
    const clean = tech.trim();
    if (!clean) return;
    if (!technicians.includes(clean)) {
      setTechnicians(prev => [...prev, clean]);
    }
    setCustomTechInput('');
  };

  const handleRemoveTechnician = (techToRemove: string) => {
    setTechnicians(prev => prev.filter(t => t !== techToRemove));
  };

  const handleToggleSuggested = (tech: string) => {
    if (technicians.includes(tech)) {
      handleRemoveTechnician(tech);
    } else {
      handleAddTechnician(tech);
    }
  };

  // Add follow-up update message
  const handleAddFollowUpMessage = (
    text: string,
    type: 'message' | 'remote_request' | 'visit_request' | 'status_update' = 'message'
  ) => {
    const clean = text.trim();
    if (!clean) return;

    const fallbackTech = technicians[0] || (language === 'en' ? 'IT Support Team' : 'فريق الدعم الفني');
    const authorName = senderRole === 'user' ? ticket.userName : fallbackTech;
    const newMsg: TicketFollowUpMessage = {
      id: `f-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      author: authorName,
      role: senderRole,
      message: clean,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      type
    };

    const nextList = [...followUpMessages, newMsg];
    setFollowUpMessages(nextList);
    setNewFollowUpText('');

    const updated: SupportTicket = {
      ...ticket,
      status,
      technicians: technicians.length > 0 ? technicians : [defaultTechName],
      technicianName: (technicians.length > 0 ? technicians : [defaultTechName]).join('، '),
      resolutionNotes,
      assistanceType,
      requiresSpecialistIntervention: assistanceType !== 'self',
      followUpHistory: nextList,
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    onUpdateTicket(updated);
    onShowToast(
      language === 'en' ? 'Timeline Message Logged' : 'تم تسجيل رسالة المتابعة',
      language === 'en' ? 'Message added to ticket timeline and synchronized centrally' : 'تم إدراج التحديث في سجل البلاغ والمزامنة مركزياً',
      'success'
    );
  };

  const handleSave = () => {
    const finalTechList = technicians.length > 0 ? technicians : [defaultTechName];
    const finalTechString = finalTechList.join('، ');

    const updated: SupportTicket = {
      ...ticket,
      status,
      technicians: finalTechList,
      technicianName: finalTechString,
      resolutionNotes,
      assistanceType,
      requiresSpecialistIntervention: assistanceType !== 'self',
      followUpHistory: followUpMessages,
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    onUpdateTicket(updated);
    onShowToast(
      language === 'en' ? 'Ticket Updates Saved' : 'تم حفظ تحديثات البلاغ',
      language === 'en' ? `Ticket ${ticket.ticketNumber} updated successfully` : `تم تحديث البلاغ ${ticket.ticketNumber} بنجاح`,
      'success'
    );
    onClose();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const finalTechString = technicians.length > 0 ? technicians.join(', ') : (language === 'en' ? 'IT Support Lead' : 'م. الدعم الفني');
    const isEn = language === 'en';

    const summaryText = isEn ? `
═════════════════════════════════════
  CERTIFIED IT SUPPORT INCIDENT REPORT
═════════════════════════════════════
Ticket Number: ${ticket.ticketNumber}
Created Date: ${ticket.createdAt}
Status: ${translateStatus(status, 'en')}
Priority: ${translatePriority(ticket.priority, 'en')}

[ Employee & Workstation ]
User: ${ticket.userName}
Department: ${ticket.department}
Device: ${ticket.deviceType}
OS: ${ticket.os}

[ Incident Details ]
Category: ${translateCategory(ticket.category, 'en')}
Description: ${ticket.description}

[ Technical Diagnostic Summary ]
${ticket.diagnosisSummary || 'Verified by autonomous expert diagnostic engine.'}

[ Action Plan & Remediation ]
${ticket.suggestedSolution || 'Execute approved remediation protocols and verify host stability.'}

${technicians.length > 1 ? 'Assigned Engineers' : 'Assigned Engineer'}: ${finalTechString}
Resolution Notes: ${resolutionNotes || 'None'}
═════════════════════════════════════
Autonomous IT Support AI Agent
Lead AI Engineer: Eng. Abdelrahim Mohamed Ahmed Mohamed
Location: Arab Republic of Egypt - Qena Governorate
Email: rahemxp2020@gmail.com | Phone/WhatsApp: +201009125279 | Telegram ID: 5516879336
`.trim() : `
═════════════════════════════════════
  بلاغ دعم فني معتمد - IT SUPPORT TICKET
═════════════════════════════════════
رقم التذكرة: ${ticket.ticketNumber}
تاريخ التسجيل: ${ticket.createdAt}
حالة البلاغ: ${status}
الأولوية: ${ticket.priority}

[ بيانات المستفيد ومحطة العمل ]
الموظف: ${ticket.userName}
القسم: ${ticket.department}
الجهاز: ${ticket.deviceType}
نظام التشغيل: ${ticket.os}

[ تفاصيل العطل ]
التصنيف: ${ticket.categoryLabel || ticket.category}
الوصف: ${ticket.description}

[ تقرير التشخيص الفني ]
${ticket.diagnosisSummary || 'تم الفحص الفني الميداني وفق الإجراءات المعتمدة'}

[ الحل الموصى به / المنفذ ]
${ticket.suggestedSolution || 'تطبيق الحلول المعتمدة واختبار استقرار النظام'}

${technicians.length > 1 ? 'الفنيون المسؤولون' : 'الفني المسؤول'}: ${finalTechString}
ملاحظات المتابعة: ${resolutionNotes || 'لا توجد ملاحظات إضافية'}
═════════════════════════════════════
إدارة تقنية المعلومات والاتصالات
المطور المعتمد: م. عبدالرحيم محمد احمد محمد
العنوان: جمهورية مصر العربية - محافظة قنا
البريد: rahemxp2020@gmail.com | هاتف وواتساب: +201009125279 | تيليجرام: 5516879336
`.trim();

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    onShowToast(
      isEn ? 'Ticket Summary Copied' : 'تم نسخ ملخص التذكرة',
      isEn ? 'Plaintext summary copied to clipboard, ready to paste into emails or chat.' : 'النص جاهز للإرسال في البريد أو برامج المحادثة',
      'success'
    );
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const isEn = language === 'en';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl my-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between no-print">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  {isEn ? 'Certified IT Support Ticket' : 'سند بلاغ دعم فني معتمد'}
                </h2>
                <span className="font-mono text-xs font-bold text-cyan-400" dir="ltr">
                  {ticket.ticketNumber}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tabular-nums">
                {isEn ? `Created: ${ticket.createdAt}` : `تاريخ الإنشاء: ${ticket.createdAt}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Printable Ticket Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-300">
          
          {/* Printable Header (Visible only when printing) */}
          <div className="hidden print-only mb-6 text-center border-b pb-4">
            <h1 className="text-2xl font-black text-black">
              {isEn ? 'IT Support & Operations Department' : 'إدارة تقنية المعلومات - IT Department'}
            </h1>
            <p className="text-sm text-gray-700">
              {isEn ? `Official Support Ticket Record - ${ticket.ticketNumber}` : `سند تذكرة دعم فني رسمي - رقم ${ticket.ticketNumber}`}
            </p>
          </div>

          {/* Quick Info Grid (Zero-Pill Discipline) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div>
              <p className="text-[11px] text-slate-400">{isEn ? 'Employee' : 'الموظف'}</p>
              <p className="font-bold text-white text-xs mt-0.5">{ticket.userName}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400">{isEn ? 'Department' : 'القسم'}</p>
              <p className="font-bold text-white text-xs mt-0.5">{ticket.department}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400">{isEn ? 'Workstation & OS' : 'المحطة والنظام'}</p>
              <p className="font-semibold text-white text-xs mt-0.5 truncate">{ticket.deviceType}</p>
              <p className="text-[10px] text-slate-400 truncate">{ticket.os}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400">{isEn ? 'Priority' : 'الأولوية'}</p>
              <p className="font-bold text-white text-xs mt-0.5">{translatePriority(ticket.priority, language)}</p>
            </div>
          </div>

          {/* Quick Notification Channels Strip (WhatsApp, Email, Telegram) */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 no-print space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <Bell className="w-3.5 h-3.5 text-amber-400" />
                <span>{isEn ? 'Dispatch Instant Notifications:' : 'إرسال إشعار فوري بالبلاغ (متابعة وتنبيه لحظي):'}</span>
              </div>
              {onOpenNotificationSettings && (
                <button
                  type="button"
                  onClick={onOpenNotificationSettings}
                  className="text-[10px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
                  title={isEn ? 'Configure notification channels' : 'تعديل أرقام وقنوات الإشعارات'}
                >
                  <Settings className="w-3 h-3" />
                  <span>{isEn ? 'Channels' : 'ضبط القنوات'}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* WhatsApp Button */}
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="py-1.5 px-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                title={isEn ? 'Send report via WhatsApp to +201009125279' : 'إرسال تقرير البلاغ الفوري عبر واتساب إلى +201009125279'}
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isEn ? 'WhatsApp (+201009125279)' : 'إرسال واتساب (+201009125279)'}</span>
              </button>

              {/* Email Button */}
              <button
                type="button"
                onClick={handleSendEmail}
                className="py-1.5 px-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                title={isEn ? 'Send formal report to rahemxp2020@gmail.com' : 'إرسال تقرير فني رسمي إلى rahemxp2020@gmail.com'}
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isEn ? 'Email Dispatch' : 'إرسال بالبريد (Email)'}</span>
              </button>

              {/* Telegram Button */}
              <button
                type="button"
                onClick={handleSendTelegram}
                disabled={isSendingTelegram}
                className="py-1.5 px-2.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 hover:border-sky-500/50 text-sky-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm disabled:opacity-40"
                title={isEn ? 'Push notification to Telegram bot / channel' : 'إرسال إشعار إلى بوت أو قناة تيليجرام'}
              >
                {isSendingTelegram ? (
                  <span className="w-3.5 h-3.5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <Bot className="w-3.5 h-3.5 text-sky-400" />
                )}
                <span>{isEn ? 'Telegram Bot (Push)' : 'إرسال لتيليجرام (Bot)'}</span>
              </button>
            </div>
          </div>

          {/* Support Mode & Specialist Flag Banner */}
          {(assistanceType !== 'self' || ticket.requiresSpecialistIntervention) && (
            <div className={`p-2.5 rounded-lg border flex flex-wrap items-center justify-between gap-2 text-xs ${
              assistanceType === 'remote'
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-200'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
            }`}>
              <div className="flex items-center gap-2">
                {assistanceType === 'remote' ? (
                  <MonitorUp className="w-4 h-4 text-cyan-400 shrink-0" />
                ) : (
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className="font-bold">
                  {assistanceType === 'remote'
                    ? (isEn ? 'Support Mode: Remote Control Assistance (AnyDesk / TeamViewer)' : 'هذا البلاغ مسجل بنمط: دعم فني عن بعد (AnyDesk / TeamViewer)')
                    : (isEn ? 'Support Mode: On-Site Field Visit to Workstation' : 'هذا البلاغ مسجل بنمط: زيارة فني ميداني وحضور لمكتب العميل')}
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-slate-300 font-medium">
                {isEn ? 'Non-Technical Staff Dispatch' : 'توجيه مباشر للعملاء غير التقنيين'}
              </span>
            </div>
          )}

          {/* Problem Details */}
          <div className="space-y-1.5">
            <p className="font-semibold text-slate-300">
              {isEn ? 'Problem Category: ' : 'تصنيف العطل: '}
              <span className="text-white font-bold">
                {translateCategory(ticket.category, language)}
              </span>
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed">
              {ticket.description}
            </div>
          </div>

          {/* Technical Diagnosis */}
          <div className="space-y-1.5">
            <p className="font-semibold text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isEn ? 'Diagnostic Findings:' : 'نتائج التشخيص الفني:'}</span>
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed">
              {ticket.diagnosisSummary || (isEn ? 'Inspection verified following standard operational procedures.' : 'تم الفحص الفني والتحقق من التوصيلات وسلامة الإعدادات.')}
            </div>
          </div>

          {/* Suggested Solution */}
          <div className="space-y-1.5">
            <p className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isEn ? 'Remediation & Action Plan:' : 'خطة المعالجة والإصلاح:'}</span>
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed">
              {ticket.suggestedSolution || (isEn ? 'Implement approved corrective actions and verify accessibility.' : 'تنفيذ الإجراءات العلاجية المعتمدة والتأكد من إمكانية الوصول.')}
            </div>
          </div>

          {/* Technician & Status Update Fields (Interactive Multi-Technician) */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/30 space-y-3.5 no-print">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-bold text-cyan-300 flex items-center gap-1.5 text-xs">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                {isEn ? 'Ticket Management & Assigned Technicians' : 'إدارة ومتابعة البلاغ بواسطة فنيي الدعم'}
              </h3>
              <span className="text-[10px] text-slate-400">
                {isEn ? 'Multiple technicians can be assigned' : 'يمكن تعيين أكثر من فني مسؤول'}
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 block font-medium">
                {isEn ? 'Ticket Status' : 'حالة البلاغ'}
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TicketStatus)}
                className="w-full sm:w-64 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="جديد">{isEn ? 'New' : 'جديد (New)'}</option>
                <option value="قيد المعالجة">{isEn ? 'In Progress' : 'قيد المعالجة (In Progress)'}</option>
                <option value="تم الحل">{isEn ? 'Resolved' : 'تم الحل (Resolved)'}</option>
                <option value="مغلق">{isEn ? 'Closed' : 'مغلق (Closed)'}</option>
              </select>
            </div>

            {/* Multi-Technicians Management Card */}
            <div className="space-y-2.5 p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>
                    {isEn ? `Assigned Engineers (${technicians.length}):` : `الفنيون المكلفون بالمعالجة (${technicians.length}):`}
                  </span>
                </label>
                <span className="text-[10px] text-cyan-400 font-mono">
                  {technicians.length > 1 ? (isEn ? 'Multi-Tech Team' : 'فريق عمل مشترك') : (isEn ? 'Solo Lead' : 'فني منفرد')}
                </span>
              </div>

              {/* Assigned Tech Chips */}
              <div className="flex flex-wrap items-center gap-1.5 min-h-7">
                {technicians.length === 0 ? (
                  <span className="text-[11px] text-slate-500 italic">
                    {isEn ? 'No technician assigned (select below)' : 'لم يتم تعيين أي فني (يرجى اختيار فني مسؤول أدناه)'}
                  </span>
                ) : (
                  technicians.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-500/40 text-cyan-200 text-[11px] font-medium"
                    >
                      <UserCheck className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTechnician(tech)}
                        className="w-3.5 h-3.5 rounded hover:bg-rose-500/30 hover:text-rose-300 flex items-center justify-center text-slate-400 transition-colors cursor-pointer mr-0.5"
                        title={isEn ? `Remove ${tech}` : `إزالة ${tech}`}
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  ))
                )}
              </div>

              {/* Add Custom Tech Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customTechInput}
                  onChange={(e) => setCustomTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTechnician(customTechInput);
                    }
                  }}
                  placeholder={isEn ? 'Add another technician (type & press Enter)...' : 'إضافة فني آخر (اكتب واضغط Enter)...'}
                  className="flex-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-white text-[11px] placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => handleAddTechnician(customTechInput)}
                  disabled={!customTechInput.trim()}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 border border-slate-700 text-cyan-300 text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-3 h-3" />
                  <span>{isEn ? 'Add' : 'إضافة'}</span>
                </button>
              </div>

              {/* Quick toggle chips */}
              <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-800/60">
                {suggestedTechs.map((tech) => {
                  const isSelected = technicians.includes(tech);
                  return (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => handleToggleSuggested(tech)}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all flex items-center gap-1 cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-200'
                          : 'bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-2.5 h-2.5 text-cyan-400" />
                      ) : (
                        <Plus className="w-2.5 h-2.5 text-slate-500" />
                      )}
                      <span>{tech}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                {isEn ? 'Resolution & Technical Closure Notes' : 'ملاحظات المتابعة الفنية والإغلاق'}
              </label>
              <textarea
                rows={2}
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                placeholder={isEn ? 'Enter technical remarks regarding the remediation...' : 'أدخل أي ملاحظات فنية إضافية حول سير المعالجة...'}
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Interactive Follow-up & Real-Time Communication Hub */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3.5 no-print">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-xs flex items-center gap-2">
                    <span>{isEn ? 'Direct Communication & Live Timeline' : 'قنوات المتابعة والتواصل المباشر مع العميل'}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                      {isEn ? `${followUpMessages.length} updates` : `${followUpMessages.length} تحديثات`}
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {isEn ? 'Real-time timeline, AnyDesk remote requests, and on-site dispatch' : 'متابعة فورية، طلبات الدعم عن بعد، والزيارات الميدانية للعملاء غير التقنيين'}
                  </p>
                </div>
              </div>

              {/* Assistance Mode Badge Selector */}
              <div className="flex items-center gap-1 text-[11px]">
                <span className="text-slate-400">{isEn ? 'Assistance Mode:' : 'نمط المساعدة:'}</span>
                <select
                  value={assistanceType}
                  onChange={(e) => {
                    const newType = e.target.value as 'self' | 'remote' | 'on_site';
                    setAssistanceType(newType);
                    const promptText = isEn
                      ? (newType === 'remote'
                          ? 'User requested remote support (AnyDesk / TeamViewer).'
                          : newType === 'on_site'
                          ? 'User requested on-site technician visit to their workstation.'
                          : 'Assistance mode changed to standard self-troubleshooting.')
                      : (newType === 'remote'
                          ? 'قام العميل بطلب دعم عن بعد (AnyDesk / TeamViewer) لعدم توفر الاختصاص التقني.'
                          : newType === 'on_site'
                          ? 'قام العميل بطلب زيارة ميدانية لأحد فنيي الدعم إلى مكتبه.'
                          : 'تم تحويل نمط المتابعة إلى إجراءات اعتيادية.');
                    handleAddFollowUpMessage(
                      promptText,
                      newType === 'remote' ? 'remote_request' : newType === 'on_site' ? 'visit_request' : 'status_update'
                    );
                  }}
                  className="px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-cyan-300 font-semibold focus:outline-none focus:border-cyan-500 cursor-pointer text-xs"
                >
                  <option value="self">{isEn ? 'Self / Standard' : 'حل ذاتي / اعتيادي'}</option>
                  <option value="remote">{isEn ? 'Remote Support (AnyDesk)' : 'دعم عن بعد (AnyDesk)'}</option>
                  <option value="on_site">{isEn ? 'On-Site Office Visit' : 'زيارة فني للمكتب'}</option>
                </select>
              </div>
            </div>

            {/* Quick Fast-Communication Channel Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* WhatsApp Direct Chat with Assigned Engineer */}
              <a
                href={`https://wa.me/201009125279?text=${encodeURIComponent(
                  isEn
                    ? `Hello Eng. ${technicians[0] || 'Abdelrahim Mohamed'}, regarding IT Support Ticket (${ticket.ticketNumber}) for ${ticket.userName} (${ticket.department}). Issue: ${translateCategory(ticket.category, 'en')} - ${ticket.description}. Please follow up.`
                    : `السلام عليكم م. ${technicians[0] || 'عبدالرحيم محمد'}، بخصوص بلاغ الدعم الفني رقم (${ticket.ticketNumber}) الخاص بالموظف: ${ticket.userName} (${ticket.department}). المشكلة: ${ticket.categoryLabel || ticket.category} - ${ticket.description}. يرجى المتابعة والدعم الفني.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold text-xs text-white">
                      {isEn ? 'Direct WhatsApp Chat' : 'واتساب مباشر مع الفني'}
                    </p>
                    <p className="text-[10px] text-emerald-400/90 font-mono" dir="ltr">+201009125279</p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
              </a>

              {/* Trigger Remote Assistance (AnyDesk) */}
              <button
                type="button"
                onClick={() => setShowAnyDeskInput(!showAnyDeskInput)}
                className={`p-2.5 rounded-lg border flex items-center justify-between transition-all cursor-pointer group ${
                  showAnyDeskInput
                    ? 'bg-cyan-500/20 border-cyan-400 text-white'
                    : 'bg-slate-900 hover:bg-slate-850 border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MonitorUp className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold text-xs text-white">
                      {isEn ? 'Remote Control' : 'طلب دعم عن بعد'}
                    </p>
                    <p className="text-[10px] text-slate-400">AnyDesk / TeamViewer</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                  {showAnyDeskInput ? (isEn ? 'Close' : 'إغلاق') : (isEn ? 'Share Code' : 'كود الربط')}
                </span>
              </button>

              {/* Request Field Office Visit */}
              <button
                type="button"
                onClick={() => {
                  setAssistanceType('on_site');
                  handleAddFollowUpMessage(
                    isEn
                      ? `On-site visit requested: User ${ticket.userName} (${ticket.department}) requests an IT engineer at their workstation.`
                      : `طلب زيارة فني للمكتب: المستخدم ${ticket.userName} بقسم ${ticket.department} يطلب حضور أحد مهندسي الدعم إلى مكتبه لمعالجة العطل ميدانياً.`,
                    'visit_request'
                  );
                }}
                className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-300 flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold text-xs text-white">
                      {isEn ? 'Request On-Site Visit' : 'طلب زيارة فني للمكتب'}
                    </p>
                    <p className="text-[10px] text-slate-400">{isEn ? 'Desk Visit' : 'حضور مهندس الدعم'}</p>
                  </div>
                </div>
                {isRTL ? (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-colors" />
                ) : (
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-colors" />
                )}
              </button>
            </div>

            {/* AnyDesk Code Input Drawer */}
            {showAnyDeskInput && (
              <div className="p-3 rounded-lg bg-slate-900 border border-cyan-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                    <MonitorUp className="w-3.5 h-3.5" />
                    {isEn ? 'Share Remote Session ID (AnyDesk / Quick Assist):' : 'مشاركة رقم جلسة الدعم عن بعد (AnyDesk / Quick Assist):'}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {isEn ? 'Open AnyDesk and copy the 9-digit address' : 'افتح AnyDesk وانسخ الرقم المكون من 9 أرقام'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={anyDeskCode}
                    onChange={(e) => setAnyDeskCode(e.target.value)}
                    placeholder="e.g. 123 456 789"
                    className="flex-1 px-3 py-1.5 rounded-md bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!anyDeskCode.trim()) return;
                      setAssistanceType('remote');
                      handleAddFollowUpMessage(
                        isEn
                          ? `User is ready for remote support: AnyDesk Session ID is (${anyDeskCode.trim()}). Please connect to assist.`
                          : `المستخدم جاهز للدعم عن بعد: كود جلسة AnyDesk هو (${anyDeskCode.trim()}). يرجى من الفني الاتصال والتحكم لحل المشكلة.`,
                        'remote_request'
                      );
                      setAnyDeskCode('');
                      setShowAnyDeskInput(false);
                    }}
                    disabled={!anyDeskCode.trim()}
                    className="px-3 py-1.5 rounded-md bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer disabled:opacity-40"
                  >
                    {isEn ? 'Send Code' : 'إرسال الكود للفني'}
                  </button>
                </div>
              </div>
            )}

            {/* Conversation Feed / History Timeline */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {isEn ? 'Follow-Up Message History:' : 'سجل المحادثات والمتابعات المسجلة:'}
                </span>
                <span className="text-[10px] text-slate-500">
                  {isEn ? 'Realtime sync with central database' : 'يتم حفظها تلقائياً ومشاركتها في الخادم المركزي'}
                </span>
              </div>

              <div className="max-h-48 overflow-y-auto space-y-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                {followUpMessages.length === 0 ? (
                  <div className="p-4 text-center text-slate-500 text-xs space-y-1">
                    <p>{isEn ? 'No messages logged yet.' : 'لا توجد رسائل متابعة مسجلة حتى الآن.'}</p>
                    <p className="text-[10px] text-slate-600">
                      {isEn ? 'Client or IT engineer can post updates below.' : 'يمكن للعميل أو الفني كتابة استفسار أو طلب مساعدة أدناه للمتابعة المشتركة.'}
                    </p>
                  </div>
                ) : (
                  followUpMessages.map((msg) => {
                    const isTech = msg.role === 'technician';
                    return (
                      <div
                        key={msg.id}
                        className={`p-2.5 rounded-lg border text-xs space-y-1 ${
                          isTech
                            ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                            : msg.type === 'remote_request'
                            ? 'bg-cyan-950/30 border-cyan-500/40 text-slate-200'
                            : msg.type === 'visit_request'
                            ? 'bg-amber-950/30 border-amber-500/40 text-slate-200'
                            : 'bg-slate-950 border-slate-850 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <div className="flex items-center gap-1.5 font-bold">
                            {isTech ? (
                              <span className="text-emerald-400 flex items-center gap-1">
                                <Shield className="w-3 h-3" />
                                {msg.author} ({isEn ? 'IT Support' : 'فريق الدعم الفني'})
                              </span>
                            ) : (
                              <span className="text-cyan-400 flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {msg.author} ({isEn ? 'Client / User' : 'العميل / الموظف'})
                              </span>
                            )}
                            {msg.type === 'remote_request' && (
                              <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[9px]">
                                {isEn ? 'Remote Support' : 'دعم عن بعد'}
                              </span>
                            )}
                            {msg.type === 'visit_request' && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono text-[9px]">
                                {isEn ? 'On-Site Request' : 'طلب زيارة مكتبية'}
                              </span>
                            )}
                          </div>
                          <span className="text-slate-500 font-mono tabular-nums">{msg.timestamp}</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-[11px] whitespace-pre-wrap">
                          {msg.message}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Quick Reply Chips */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 font-medium">
                {isEn ? 'One-click quick replies:' : 'ردود سريعة ومختصرة للعميل بنقرة واحدة:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(isEn ? [
                  { text: 'I need an engineer at my desk to check hardware', type: 'visit_request' as const },
                  { text: 'Ready for remote control session via AnyDesk', type: 'remote_request' as const },
                  { text: 'Rebooted computer but issue still persists', type: 'message' as const },
                  { text: 'Please call my extension to clarify', type: 'message' as const },
                  { text: 'Issue resolved and machine is running smoothly, thank you', type: 'status_update' as const }
                ] : [
                  { text: 'أحتاج فني للمكتب لعدم تمكني من الحل', type: 'visit_request' as const },
                  { text: 'جاهز لربط الدعم عن بعد عبر AnyDesk', type: 'remote_request' as const },
                  { text: 'أعدت تشغيل الجهاز وما زالت المشكلة قائمة', type: 'message' as const },
                  { text: 'يرجى الاتصال بي هاتفياً لتوضيح المشكلة', type: 'message' as const },
                  { text: 'تم حل المشكلة وتأكيد استقرار الجهاز، شكراً لكم', type: 'status_update' as const }
                ]).map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddFollowUpMessage(chip.text, chip.type)}
                    className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-[10px] transition-colors cursor-pointer"
                  >
                    + {chip.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Follow-up Message Input Form */}
            <div className="pt-2 border-t border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                  <Send className="w-3 h-3 text-cyan-400" />
                  <span>{isEn ? 'Post New Comment or Status Update:' : 'إرسال تعليق أو تحديث متابعة جديد:'}</span>
                </label>
                
                {/* Switch Sender Role */}
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="text-slate-500">{isEn ? 'Posting as:' : 'إرسال بصفتي:'}</span>
                  <button
                    type="button"
                    onClick={() => setSenderRole('user')}
                    className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                      senderRole === 'user'
                        ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-200 font-bold'
                        : 'bg-slate-900 border border-slate-800 text-slate-400'
                    }`}
                  >
                    {isEn ? `User (${ticket.userName})` : `العميل (${ticket.userName})`}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSenderRole('technician')}
                    className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                      senderRole === 'technician'
                        ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-200 font-bold'
                        : 'bg-slate-900 border border-slate-800 text-slate-400'
                    }`}
                  >
                    {isEn ? `Engineer (${technicians[0] || 'IT'})` : `مهندس الدعم (${technicians[0] || 'الفني'})`}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newFollowUpText}
                  onChange={(e) => setNewFollowUpText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddFollowUpMessage(newFollowUpText);
                    }
                  }}
                  placeholder={isEn ? 'Type your response or update and hit Enter...' : 'اكتب رسالة متابعة أو استفسار واضغط إرسال...'}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => handleAddFollowUpMessage(newFollowUpText)}
                  disabled={!newFollowUpText.trim()}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-3 h-3" />
                  <span>{isEn ? 'Send' : 'إرسال'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Printable Footer (Visible only when printing) */}
          <div className="hidden print-only pt-4 border-t text-center text-gray-500 text-[10px]">
            <p>
              {isEn
                ? 'Generated via Autonomous IT Support AI Agent Platform'
                : 'تم استخراج هذا السند عبر نظام مساعد الدعم الفني الذكي (IT Support Assistant)'}
            </p>
            <p>
              {isEn
                ? 'Lead AI Engineer: Eng. Abdelrahim Mohamed Ahmed Mohamed (Arab Republic of Egypt - Qena Governorate) © 2026'
                : 'تطوير وهندسة النظام: م. عبدالرحيم محمد احمد محمد (جمهورية مصر العربية - محافظة قنا) © 2026'}
            </p>
            <p>rahemxp2020@gmail.com · +201009125279 · Telegram: 5516879336</p>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2.5 no-print">
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySummary}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isEn ? 'Copy Summary' : 'نسخ الملخص'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isEn ? 'Print / PDF' : 'طباعة / PDF'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white text-xs font-medium cursor-pointer"
            >
              {isEn ? 'Cancel' : 'إلغاء'}
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              {isEn ? 'Save Updates' : 'حفظ التحديثات'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
