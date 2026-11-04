import React, { useState } from 'react';
import {
  Stethoscope,
  TicketPlus,
  Globe,
  Network,
  Printer,
  Gauge,
  LockKeyhole,
  Mail,
  AppWindow,
  FolderSync,
  Wrench,
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Search,
  ExternalLink,
  Terminal,
  Activity,
  ChevronLeft,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { COMMON_PROBLEMS } from '../data/commonProblems';
import { ProblemCategory, SupportTicket } from '../types/it-support';
import { useLanguage } from '../context/LanguageContext';
import { translatePriority, translateStatus, translateCategory } from '../i18n/translations';

interface DashboardProps {
  onStartDiagnose: (presetCategory?: ProblemCategory) => void;
  onCreateTicket: () => void;
  onViewTicket: (ticket: SupportTicket) => void;
  onOpenTicketLog: () => void;
  tickets: SupportTicket[];
  onRefreshTickets?: () => void;
  isSyncing?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onStartDiagnose,
  onCreateTicket,
  onViewTicket,
  onOpenTicketLog,
  tickets,
  onRefreshTickets,
  isSyncing = false
}) => {
  const { language, t, isRTL } = useLanguage();
  const [quickFilter, setQuickFilter] = useState('');

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'internet': return <Globe className="w-5 h-5 text-sky-400" />;
      case 'internal_network': return <Network className="w-5 h-5 text-indigo-400" />;
      case 'printer': return <Printer className="w-5 h-5 text-amber-400" />;
      case 'slow_pc': return <Gauge className="w-5 h-5 text-rose-400" />;
      case 'login': return <LockKeyhole className="w-5 h-5 text-emerald-400" />;
      case 'email': return <Mail className="w-5 h-5 text-cyan-400" />;
      case 'software': return <AppWindow className="w-5 h-5 text-purple-400" />;
      case 'file_sharing': return <FolderSync className="w-5 h-5 text-teal-400" />;
      default: return <Wrench className="w-5 h-5 text-slate-400" />;
    }
  };

  const activeTickets = tickets.filter(t => t.status === 'قيد المعالجة' || t.status === 'جديد');
  const resolvedTickets = tickets.filter(t => t.status === 'تم الحل');
  const criticalTickets = tickets.filter(t => t.priority === 'حرج' || t.priority === 'مرتفع');
  const resolutionPercentage = tickets.length ? Math.round((resolvedTickets.length / tickets.length) * 100) : 100;

  const filteredProblems = COMMON_PROBLEMS.filter(p => {
    const term = quickFilter.toLowerCase();
    const title = (language === 'en' && p.titleEn ? p.titleEn : p.title).toLowerCase();
    const desc = (language === 'en' && p.shortDescEn ? p.shortDescEn : p.shortDesc).toLowerCase();
    const symptoms = (language === 'en' && p.typicalSymptomsEn ? p.typicalSymptomsEn : p.typicalSymptoms).map(s => s.toLowerCase());
    return title.includes(term) || desc.includes(term) || symptoms.some(s => s.includes(term));
  });

  return (
    <div className="space-y-10 pb-16">
      
      {/* Executive Command Header */}
      <section className="rounded-2xl bg-slate-950 border border-slate-800/80 p-6 sm:p-8 relative overflow-hidden shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              <span>{t.dashboard.operationsCenter}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="font-mono text-slate-400" dir="ltr">{t.dashboard.version}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {t.dashboard.heroTitle}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              {t.dashboard.heroDesc}
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onStartDiagnose()}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all cursor-pointer shadow-sm active:scale-98"
              >
                <Stethoscope className="w-4 h-4 text-slate-950" />
                <span>{t.dashboard.startDiagnosisBtn}</span>
                <ArrowIcon className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={onCreateTicket}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 font-bold text-sm transition-all cursor-pointer active:scale-98"
              >
                <TicketPlus className="w-4 h-4 text-emerald-400" />
                <span>{t.dashboard.manualTicketBtn}</span>
              </button>

              <button
                onClick={onOpenTicketLog}
                className="text-xs sm:text-sm font-semibold text-slate-400 hover:text-cyan-400 transition-colors px-2 py-2 flex items-center gap-1 cursor-pointer"
              >
                <span>{language === 'en' ? `Full Log (${tickets.length})` : `استعراض السجل الكامل (${tickets.length})`}</span>
                <ChevronIcon className="w-4 h-4" />
              </button>

              {onRefreshTickets && (
                <button
                  onClick={onRefreshTickets}
                  disabled={isSyncing}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700/80 font-bold text-xs transition-all cursor-pointer"
                  title={language === 'en' ? 'Sync Tickets with Central Cloud Database' : 'مزامنة فورية للبلاغات من السيرفر المركزي'}
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? t.dashboard.syncing : t.dashboard.liveSync}</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Problem Filter Search Box */}
          <div className="w-full lg:w-72 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 shrink-0">
            <label className="text-xs font-bold text-slate-300 block">
              {language === 'en' ? 'Quick Issue Search:' : 'بحث سريع في أنواع المشاكل:'}
            </label>
            <div className="relative">
              <Search className={`w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                value={quickFilter}
                onChange={(e) => setQuickFilter(e.target.value)}
                placeholder={t.dashboard.searchPlaceholder}
                className={`w-full py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors ${
                  isRTL ? 'pr-8 pl-3' : 'pl-8 pr-3'
                }`}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              {language === 'en' ? 'Select an issue to launch instant diagnostics.' : 'اختر المشكلة لبدء الفحص الميداني الفوري.'}
            </p>
          </div>

        </div>

        {/* Tabular KPI Strip */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <p className="text-xs font-semibold text-slate-400">{t.dashboard.stats.totalTickets}</p>
            <p className="text-2xl font-bold text-white font-mono tabular-nums mt-1">{tickets.length}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {language === 'en' ? 'Tickets in cloud vault' : 'تذكرة مسجلة بالنظام'}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <p className="text-xs font-semibold text-amber-400">{t.dashboard.stats.activeTickets}</p>
            <p className="text-2xl font-bold text-amber-300 font-mono tabular-nums mt-1">{activeTickets.length}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {language === 'en' ? 'Requiring follow-up' : 'تتطلب المتابعة والإغلاق'}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <p className="text-xs font-semibold text-emerald-400">{t.dashboard.stats.successRate}</p>
            <p className="text-2xl font-bold text-emerald-300 font-mono tabular-nums mt-1">{resolutionPercentage}%</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {language === 'en' ? `${resolvedTickets.length} tickets resolved` : `تم حل ${resolvedTickets.length} بلاغ`}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <p className="text-xs font-semibold text-rose-400">{t.dashboard.stats.criticalIssues}</p>
            <p className="text-2xl font-bold text-rose-300 font-mono tabular-nums mt-1">{criticalTickets.length}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {language === 'en' ? 'Immediate SLA escalation' : 'زمن استجابة فوري SLA'}
            </p>
          </div>

        </div>
      </section>

      {/* Common Problems Command Grid */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {t.dashboard.commonProblemsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {t.dashboard.commonProblemsDesc}
            </p>
          </div>

          <button
            onClick={() => onStartDiagnose()}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>{language === 'en' ? 'Inspect Unlisted Issue' : 'فحص عطل غير مصنف'}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredProblems.map((problem) => {
            const problemTitle = language === 'en' && problem.titleEn ? problem.titleEn : problem.title;
            const problemDesc = language === 'en' && problem.shortDescEn ? problem.shortDescEn : problem.shortDesc;
            const symptoms = language === 'en' && problem.typicalSymptomsEn ? problem.typicalSymptomsEn : problem.typicalSymptoms;

            return (
              <div
                key={problem.id}
                onClick={() => onStartDiagnose(problem.id)}
                className="group p-5 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-all duration-150 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-slate-700 transition-colors">
                      {getCategoryIcon(problem.id)}
                    </div>
                    <span className="text-xs font-semibold text-slate-400 font-mono">
                      {language === 'en' ? 'AI Diagnostic' : 'دعم فني'}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-white group-hover:text-cyan-400 transition-colors">
                    {problemTitle}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {problemDesc}
                  </p>

                  {/* Symptoms sample */}
                  <div className="mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-400 space-y-1">
                    <p className="text-[11px] font-semibold text-slate-300">
                      {language === 'en' ? 'Key Symptoms:' : 'أبرز مؤشرات العطل:'}
                    </p>
                    {symptoms.slice(0, 2).map((symptom, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-400 truncate">
                        <span className="w-1 h-1 rounded-full bg-slate-600 shrink-0"></span>
                        <span className="truncate">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-between text-xs font-bold text-cyan-400 border-t border-slate-800/60">
                  <span>{t.dashboard.startExamBtn}</span>
                  <ArrowIcon className={`w-3.5 h-3.5 transform transition-transform ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Incidents Queue */}
      <section className="rounded-2xl bg-slate-950 border border-slate-800/80 p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <h2 className="text-base font-bold text-white">{t.dashboard.recentTicketsTitle}</h2>
              <p className="text-[11px] text-slate-400">
                {language === 'en' 
                  ? `Recent activity stream (${tickets.length} total tickets logged)` 
                  : `معاينة سريعة لأحدث 4 بلاغات (إجمالي السجل: ${tickets.length} بلاغ)`}
              </p>
            </div>
          </div>
          <button
            onClick={onOpenTicketLog}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800"
          >
            {t.dashboard.viewAllTicketsBtn} ({tickets.length})
          </button>
        </div>

        <div className="divide-y divide-slate-800/60">
          {tickets.slice(0, 4).map((ticket) => {
            let statusColor = 'text-slate-400';
            if (ticket.status === 'قيد المعالجة') statusColor = 'text-amber-400 font-bold';
            if (ticket.status === 'تم الحل') statusColor = 'text-emerald-400 font-bold';
            if (ticket.status === 'جديد') statusColor = 'text-cyan-400 font-bold';

            let priorityColor = 'text-slate-400';
            if (ticket.priority === 'حرج') priorityColor = 'text-rose-400 font-bold';
            if (ticket.priority === 'مرتفع') priorityColor = 'text-amber-400 font-semibold';

            const localizedStatus = translateStatus(ticket.status, language);
            const localizedPriority = translatePriority(ticket.priority, language);

            return (
              <div
                key={ticket.id}
                onClick={() => onViewTicket(ticket)}
                className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-900/50 px-2 rounded-lg transition-colors cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 mt-0.5">
                    {getCategoryIcon(ticket.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs flex-wrap">
                      <span className="font-mono font-bold text-slate-300" dir="ltr">{ticket.ticketNumber}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {ticket.userName}
                      </span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-slate-400">{ticket.department}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-slate-400 font-mono tabular-nums">{ticket.createdAt}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                      {ticket.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center text-xs">
                  <span className={priorityColor}>
                    {localizedPriority}
                  </span>
                  <span aria-hidden="true" className="text-slate-700">·</span>
                  <span className={statusColor}>
                    {localizedStatus}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {tickets.length > 4 && (
          <div className="pt-2 border-t border-slate-800/60 text-center">
            <button
              onClick={onOpenTicketLog}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <span>
                {language === 'en'
                  ? `Navigate to Full Ticket History (${tickets.length} tickets)`
                  : `الانتقال لسجل البلاغات الكامل لمشاهدة جميع التذاكر (${tickets.length} بلاغ)`}
              </span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>

      {/* IT Best Practice Footer Callout */}
      <section className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3 text-xs leading-relaxed text-slate-400">
        <Terminal className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-200">
            {language === 'en' ? 'Standard Operating Procedure:' : 'بروتوكول الصيانة المعتمد:'}
          </span>{' '}
          {language === 'en'
            ? 'When diagnosing network or application faults, document the error code and workstation Hostname prior to applying command fixes to maintain audit logs and SLA tracking.'
            : 'عند مباشرة أي عطل شبكي أو برمجي، احرص على توثيق رمز الخطأ ورقم محطة العمل (Hostname) قبل تنفيذ الأوامر العلاجية لضمان دقة سجل الدعم الفني وسهولة المتابعة.'}
        </div>
      </section>

    </div>
  );
};
