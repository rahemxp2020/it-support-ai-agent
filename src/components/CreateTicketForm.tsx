import React, { useState, useEffect } from 'react';
import {
  TicketPlus,
  User,
  Building,
  Laptop,
  Monitor,
  Flag,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Users,
  Plus,
  X,
  UserCheck,
  MessageCircle,
  Mail,
  Bot,
  Bell
} from 'lucide-react';
import {
  DEPARTMENTS,
  DEPARTMENTS_EN,
  DEVICE_TYPES,
  DEVICE_TYPES_EN,
  OPERATING_SYSTEMS,
  OPERATING_SYSTEMS_EN,
  COMMON_PROBLEMS
} from '../data/commonProblems';
import { ProblemCategory, PriorityLevel, SupportTicket } from '../types/it-support';
import {
  getNotificationSettings,
  openWhatsAppNotification,
  openEmailNotification,
  dispatchTelegramNotification
} from '../services/notificationChannels';
import { useLanguage } from '../context/LanguageContext';
import { translatePriority, translateCategory } from '../i18n/translations';

export const SUGGESTED_TEAM_TECHNICIANS_AR = [
  'م. عبدالرحيم محمد احمد محمد',
  'م. عمر سالم',
  'م. إبراهيم سالم',
  'م. بولا ميخائيل',
  'م. مريم عبدالرحيم',
  'م. سامح صبري',
  'م. مصطفي سعيد',
  'م. عمر عباس',
  'م. عبدالله رجب',
  'م. منة عبدالرحيم',
  'م. دعم محطات التصميم والمونتاج',
  'م. صيانة الهاردوير',
  'م. مهندس الشبكات',
  'م. دعم البرمجيات'
];

export const SUGGESTED_TEAM_TECHNICIANS_EN = [
  'Eng. Abdelrahim Mohamed Ahmed Mohamed',
  'Eng. Omar Salem',
  'Eng. Ibrahim Salem',
  'Eng. Paula Mikhail',
  'Eng. Maryam Abdelrahim',
  'Eng. Sameh Sabry',
  'Eng. Mostafa Saeed',
  'Eng. Omar Abbas',
  'Eng. Abdullah Ragab',
  'Eng. Menna Abdelrahim',
  'Multimedia IT Support',
  'Hardware Maintenance Lead',
  'Network Infrastructure Lead',
  'Software Systems Lead'
];

export const SUGGESTED_TEAM_TECHNICIANS = SUGGESTED_TEAM_TECHNICIANS_AR;

interface CreateTicketFormProps {
  onSaveTicket: (ticket: SupportTicket) => void;
  onCancel: () => void;
  activeUserName?: string;
  onUpdateActiveUserName?: (name: string) => void;
}

export const CreateTicketForm: React.FC<CreateTicketFormProps> = ({
  onSaveTicket,
  onCancel,
  activeUserName = '',
  onUpdateActiveUserName
}) => {
  const { language, t, isRTL } = useLanguage();
  const [userName, setUserName] = useState(activeUserName || '');

  const departmentsList = language === 'en' ? DEPARTMENTS_EN : DEPARTMENTS;
  const devicesList = language === 'en' ? DEVICE_TYPES_EN : DEVICE_TYPES;
  const osList = language === 'en' ? OPERATING_SYSTEMS_EN : OPERATING_SYSTEMS;
  const suggestedTechs = language === 'en' ? SUGGESTED_TEAM_TECHNICIANS_EN : SUGGESTED_TEAM_TECHNICIANS_AR;

  const [department, setDepartment] = useState(departmentsList[0]);
  const [deviceType, setDeviceType] = useState(devicesList[0]);
  const [os, setOs] = useState(osList[0]);
  const [category, setCategory] = useState<ProblemCategory>('internet');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('متوسط');
  const [diagnosisSummary, setDiagnosisSummary] = useState('');
  const [suggestedSolution, setSuggestedSolution] = useState('');
  const [technicians, setTechnicians] = useState<string[]>([suggestedTechs[0]]);
  const [customTechInput, setCustomTechInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDepartment(departmentsList[0]);
    setDeviceType(devicesList[0]);
    setOs(osList[0]);
  }, [language]);

  // Notification Channels Auto-dispatch options
  const [notifSettings] = useState(() => getNotificationSettings());
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(() => notifSettings.whatsappEnabled && notifSettings.autoDispatchOnNewTicket);
  const [notifyEmail, setNotifyEmail] = useState(() => notifSettings.emailEnabled && notifSettings.autoDispatchOnNewTicket);
  const [notifyTelegram, setNotifyTelegram] = useState(() => notifSettings.telegramEnabled && notifSettings.autoDispatchOnNewTicket);

  const ArrowBack = isRTL ? ArrowRight : ArrowLeft;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fallbackDefault = language === 'en' ? 'User' : 'المستفيد';
    const finalName = userName.trim() || activeUserName.trim() || fallbackDefault;

    if (!description.trim()) {
      setError(language === 'en' ? 'Please enter problem description' : 'يرجى إدخال وصف المشكلة');
      return;
    }

    if (userName.trim() && onUpdateActiveUserName) {
      onUpdateActiveUserName(userName.trim());
    }

    const catObj = COMMON_PROBLEMS.find((p) => p.id === category);
    const newId = `t-${Date.now().toString().slice(-4)}`;
    const newTicketNumber = `IT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const defaultTech = language === 'en' ? 'IT Support Team' : 'م. الدعم الفني';
    const finalTechList = technicians.length > 0 ? technicians : [defaultTech];
    const finalTechString = finalTechList.join(' / ');

    const defaultDiag = language === 'en'
      ? 'Direct ticket dispatched to IT Operations'
      : 'بلاغ مباشر وارد لمركز العمليات';
    const defaultSol = language === 'en'
      ? 'On-site technical inspection, cables and software verification'
      : 'المعاينة الميدانية وفحص التوصيلات والبرامج';

    const categoryLabel = language === 'en'
      ? (catObj?.titleEn || 'Other Issue')
      : (catObj?.title || 'مشكلة أخرى');

    const newTicket: SupportTicket = {
      id: newId,
      ticketNumber: newTicketNumber,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      userName: finalName,
      department,
      deviceType,
      os,
      category,
      categoryLabel,
      description: description.trim(),
      priority,
      status: 'جديد',
      technicians: finalTechList,
      technicianName: finalTechString,
      diagnosisSummary: diagnosisSummary.trim() || defaultDiag,
      suggestedSolution: suggestedSolution.trim() || defaultSol
    };

    onSaveTicket(newTicket);

    if (notifyWhatsApp) {
      openWhatsAppNotification(newTicket, notifSettings.whatsappNumber);
    }
    if (notifyEmail) {
      openEmailNotification(newTicket, notifSettings.emailAddress);
    }
    if (notifyTelegram && notifSettings.telegramBotToken && notifSettings.telegramChatId) {
      dispatchTelegramNotification(newTicket).catch(() => {});
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span>{t.nav.ticketLog}</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span className="text-cyan-400">{t.createTicket.pageTitle}</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            {t.createTicket.pageTitle}
          </h1>
          <p className="text-xs text-slate-400">
            {t.createTicket.pageSubtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="self-start sm:self-auto flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors"
        >
          <ArrowBack className="w-3.5 h-3.5" />
          <span>{t.createTicket.backToLogBtn}</span>
        </button>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6 shadow-sm">
        
        {error && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Section 1: User Profile & Device */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-300 flex items-center gap-2 border-b border-slate-800/80 pb-2">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.createTicket.employeeInfoSection}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                {t.createTicket.employeeName}
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={t.createTicket.employeePlaceholder}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                {t.createTicket.department}
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
              >
                {departmentsList.map((dept) => (
                  <option key={dept} value={dept} className="bg-slate-950">{dept}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                {t.createTicket.deviceType}
              </label>
              <select
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
              >
                {devicesList.map((dev) => (
                  <option key={dev} value={dev} className="bg-slate-950">{dev}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                {t.createTicket.os}
              </label>
              <select
                value={os}
                onChange={(e) => setOs(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
              >
                {osList.map((system) => (
                  <option key={system} value={system} className="bg-slate-950">{system}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Problem Category & Priority */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-300 flex items-center gap-2 border-b border-slate-800/80 pb-2">
            <Flag className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.createTicket.problemSection}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                {t.createTicket.category}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProblemCategory)}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
              >
                {COMMON_PROBLEMS.map((prob) => (
                  <option key={prob.id} value={prob.id} className="bg-slate-950">
                    {language === 'en' && prob.titleEn ? prob.titleEn : prob.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                {t.createTicket.priority}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(
                  [
                    { level: 'منخفض' as const, labelEn: 'Low' },
                    { level: 'متوسط' as const, labelEn: 'Medium' },
                    { level: 'مرتفع' as const, labelEn: 'High' },
                    { level: 'حرج' as const, labelEn: 'Critical' }
                  ]
                ).map((item) => (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => setPriority(item.level)}
                    className={`py-2 px-1 text-xs font-bold rounded-lg border text-center transition-colors cursor-pointer ${
                      priority === item.level
                        ? 'bg-slate-900 border-cyan-400 text-cyan-300 shadow-sm'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {language === 'en' ? item.labelEn : item.level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              {t.createTicket.description} <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.createTicket.descriptionPlaceholder}
              className="w-full p-3 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors leading-relaxed"
            />
          </div>
        </div>

        {/* Section 3: Assigned Technicians */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-300 flex items-center justify-between border-b border-slate-800/80 pb-2">
            <span className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'en' ? 'Assigned IT Engineers:' : 'فريق الدعم الفني المكلف بالبلاغ:'}</span>
            </span>
            <span className="text-[11px] font-mono text-cyan-400">
              {technicians.length} {language === 'en' ? 'assigned' : 'مكلف'}
            </span>
          </h2>

          <div className="flex flex-wrap gap-1.5">
            {technicians.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-bold"
              >
                <UserCheck className="w-3 h-3 text-cyan-400" />
                <span>{tech}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTechnician(tech)}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                  title={language === 'en' ? 'Remove' : 'إزالة'}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={customTechInput}
              onChange={(e) => setCustomTechInput(e.target.value)}
              placeholder={language === 'en' ? 'Add engineer name...' : 'أضف اسم مهندس أو فني آخر...'}
              className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTechnician(customTechInput);
                }
              }}
            />
            <button
              type="button"
              onClick={() => handleAddTechnician(customTechInput)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Plus className="w-3 h-3" />
              <span>{language === 'en' ? 'Add' : 'إضافة'}</span>
            </button>
          </div>
        </div>

        {/* Section 4: Omnichannel Alert Toggles */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {language === 'en'
                ? 'Instant Omnichannel Notification Dispatch:'
                : 'إرسال تنبيه فوري بالبلاغ عبر القنوات المعتمدة:'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <label className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950/70 border border-slate-800 cursor-pointer hover:border-slate-700 select-none">
              <input
                type="checkbox"
                checked={notifyWhatsApp}
                onChange={(e) => setNotifyWhatsApp(e.target.checked)}
                className="rounded border-slate-700 text-emerald-500 focus:ring-0"
              />
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300 text-xs font-semibold">WhatsApp</span>
            </label>

            <label className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950/70 border border-slate-800 cursor-pointer hover:border-slate-700 select-none">
              <input
                type="checkbox"
                checked={notifyTelegram}
                onChange={(e) => setNotifyTelegram(e.target.checked)}
                className="rounded border-slate-700 text-sky-500 focus:ring-0"
              />
              <Bot className="w-4 h-4 text-sky-400" />
              <span className="text-slate-300 text-xs font-semibold">Telegram Bot</span>
            </label>

            <label className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950/70 border border-slate-800 cursor-pointer hover:border-slate-700 select-none">
              <input
                type="checkbox"
                checked={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.checked)}
                className="rounded border-slate-700 text-cyan-500 focus:ring-0"
              />
              <Mail className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-300 text-xs font-semibold">Email (Official)</span>
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-lg border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
          >
            {language === 'en' ? 'Cancel' : 'إلغاء'}
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 shadow-sm"
          >
            <TicketPlus className="w-4 h-4 text-slate-950" />
            <span>{t.createTicket.submitBtn}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
