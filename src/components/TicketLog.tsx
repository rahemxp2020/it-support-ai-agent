import React, { useState } from 'react';
import {
  Inbox,
  Search,
  Plus,
  ExternalLink,
  Trash2,
  Table as TableIcon,
  LayoutGrid,
  Filter,
  Users,
  UserCheck,
  RefreshCw,
  Globe2,
  CheckCircle2,
  MonitorUp,
  MapPin,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import { SupportTicket, TicketStatus, PriorityLevel } from '../types/it-support';
import { DEPARTMENTS, DEPARTMENTS_EN } from '../data/commonProblems';
import { useLanguage } from '../context/LanguageContext';
import { translatePriority, translateStatus, translateCategory } from '../i18n/translations';

interface TicketLogProps {
  tickets: SupportTicket[];
  onViewTicket: (ticket: SupportTicket) => void;
  onCreateNewTicket: () => void;
  onDeleteTicket: (ticketId: string) => void;
  onQuickStatusChange: (ticketId: string, newStatus: TicketStatus) => void;
  activeUserName?: string;
  viewScope?: 'all' | 'my_tickets';
  onToggleViewScope?: (scope: 'all' | 'my_tickets') => void;
  onRefreshTickets?: () => void;
  isSyncing?: boolean;
  onOpenBackupModal?: () => void;
}

export const TicketLog: React.FC<TicketLogProps> = ({
  tickets,
  onViewTicket,
  onCreateNewTicket,
  onDeleteTicket,
  onQuickStatusChange,
  activeUserName = '',
  viewScope = 'all',
  onToggleViewScope,
  onRefreshTickets,
  isSyncing = false,
  onOpenBackupModal
}) => {
  const { language, t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'cards';
    }
    return 'table';
  });

  const departmentsList = language === 'en' ? DEPARTMENTS_EN : DEPARTMENTS;

  const isSearching = Boolean(searchTerm.trim());
  const isFilteringActive = isSearching || statusFilter !== 'all' || priorityFilter !== 'all' || departmentFilter !== 'all' || viewScope === 'my_tickets';

  const filteredTickets = tickets.filter((tkt) => {
    if (viewScope === 'my_tickets' && activeUserName.trim() && !isSearching) {
      if (!tkt.userName.toLowerCase().includes(activeUserName.trim().toLowerCase())) {
        return false;
      }
    }

    const matchesSearch =
      !isSearching ||
      tkt.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tkt.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tkt.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tkt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tkt.categoryLabel || tkt.category).toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || tkt.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || tkt.priority === priorityFilter;
    const matchesDepartment = departmentFilter === 'all' || tkt.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesDepartment;
  });

  return (
    <div className="space-y-5 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span>{language === 'en' ? 'System Records' : 'سجلات النظام'}</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span className="text-cyan-400">{t.ticketLog.pageTitle}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            {t.ticketLog.pageTitle}
          </h1>
          <p className="text-xs text-slate-400">
            {t.ticketLog.pageSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onRefreshTickets && (
            <button
              onClick={onRefreshTickets}
              disabled={isSyncing}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition-all cursor-pointer"
              title={language === 'en' ? 'Sync Realtime with Cloud Database' : 'تحديث ومزامنة فورية مع السيرفر المركزي'}
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isSyncing ? t.dashboard.syncing : (language === 'en' ? 'Live Sync' : 'تحديث فوري')}</span>
            </button>
          )}

          {onOpenBackupModal && (
            <button
              onClick={onOpenBackupModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-xs font-bold text-cyan-300 transition-all cursor-pointer"
              title={t.sidebar.backupSecurity}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'en' ? 'Backup & Vault' : 'نسخ احتياطي وأمان'}</span>
            </button>
          )}

          <button
            onClick={onCreateNewTicket}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>{t.nav.newTicket}</span>
          </button>
        </div>
      </div>

      {/* Live Firebase Firestore Cloud Database Card */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-xs space-y-2 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 font-bold text-white text-xs sm:text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>🔥 {language === 'en' ? 'Live Cloud Database (Firebase Firestore)' : 'قاعدة البيانات السحابية الحية (Firebase Firestore)'}</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-300 px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/40 flex items-center gap-1 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'en' ? 'Real-Time Sync Active (< 1 sec)' : 'مفعلة وتتزامن لحظياً (Real-Time Live Sync)'}</span>
          </span>
        </div>
        <p className="text-slate-200 leading-relaxed text-[11px] sm:text-xs">
          {language === 'en'
            ? 'Omnichannel realtime synchronization is active. When any employee or technician submits or updates a ticket from any phone or computer, changes reflect instantly across all screens with sub-second latency.'
            : 'مزامنة فورية شاملة: تم تفعيل الربط السحابي المباشر. الآن، عند قيام أي موظف أو فني بتقديم أو تعديل أي بلاغ، يظهر التحديث فوراً في أقل من ثانية على شاشات كافة المعنيين.'}
        </p>
      </div>

      {/* View Scope Indicator & Mode Switcher */}
      {onToggleViewScope && (
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${viewScope === 'my_tickets' ? 'bg-emerald-400' : 'bg-cyan-400'}`}></span>
              <span className="font-bold text-white">
                {viewScope === 'my_tickets' ? t.ticketLog.myTicketsOnly : t.ticketLog.allCompanyTickets}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {viewScope === 'my_tickets'
                ? (language === 'en' ? `Filtered by user profile: "${activeUserName || 'User'}"` : `يتم تصفية التذاكر بحسب الاسم: "${activeUserName || 'المستخدم'}"`)
                : (language === 'en' ? 'Displaying enterprise-wide ticket backlog' : 'يتم عرض سجل البلاغات العام للشركة لاختبار جميع الحالات')}
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-900 border border-slate-800 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => onToggleViewScope('all')}
              className={`px-3 py-1.5 rounded-md font-bold text-xs transition-all cursor-pointer ${
                viewScope === 'all'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.sidebar.allTickets} ({tickets.length})
            </button>
            <button
              type="button"
              onClick={() => onToggleViewScope('my_tickets')}
              className={`px-3 py-1.5 rounded-md font-bold text-xs transition-all cursor-pointer ${
                viewScope === 'my_tickets'
                  ? 'bg-slate-800 text-emerald-300 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.sidebar.myTickets}
            </button>
          </div>
        </div>
      )}

      {/* Search and Filters Strip */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1 w-full max-w-md">
          <Search className={`w-3.5 h-3.5 text-slate-500 absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'}`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.ticketLog.searchPlaceholder}
            className={`w-full py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 transition-colors ${
              isRTL ? 'pr-8 pl-3' : 'pl-8 pr-3'
            }`}
          />
        </div>

        {/* Filters and View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold focus:outline-none focus:border-cyan-500 cursor-pointer max-w-[140px] truncate"
            title={language === 'en' ? 'Filter by department' : 'تصفية بحسب القسم'}
          >
            <option value="all">{language === 'en' ? 'All Departments' : 'كل الأقسام'}</option>
            {departmentsList.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="all">{t.ticketLog.allStatuses} ({tickets.length})</option>
            <option value="جديد">{language === 'en' ? 'New' : 'جديد'}</option>
            <option value="قيد المعالجة">{language === 'en' ? 'In Progress' : 'قيد المعالجة'}</option>
            <option value="تم الحل">{language === 'en' ? 'Resolved' : 'تم الحل'}</option>
            <option value="مغلق">{language === 'en' ? 'Closed' : 'مغلق'}</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="all">{t.ticketLog.allPriorities}</option>
            <option value="حرج">{language === 'en' ? 'Critical' : 'حرج'}</option>
            <option value="مرتفع">{language === 'en' ? 'High' : 'مرتفع'}</option>
            <option value="متوسط">{language === 'en' ? 'Medium' : 'متوسط'}</option>
            <option value="منخفض">{language === 'en' ? 'Low' : 'منخفض'}</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-900 border border-slate-800">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:text-white'
              }`}
              title={language === 'en' ? 'Table view' : 'عرض جدول البيانات'}
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'cards' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:text-white'
              }`}
              title={language === 'en' ? 'Cards view' : 'عرض البطاقات'}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Active Filter Helper Bar */}
      {isFilteringActive && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-300 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {language === 'en' ? (
                <>Showing <strong className="text-white">{filteredTickets.length}</strong> of <strong className="text-white">{tickets.length}</strong> tickets</>
              ) : (
                <>يتم عرض <strong className="text-white">{filteredTickets.length}</strong> من أصل <strong className="text-white">{tickets.length}</strong> بلاغ</>
              )}
            </span>
            {isSearching && (
              <span className="text-cyan-300 text-[11px] bg-cyan-950/80 border border-cyan-800/80 px-2 py-0.5 rounded">
                &quot;{searchTerm}&quot;
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setPriorityFilter('all');
              setDepartmentFilter('all');
              if (onToggleViewScope) onToggleViewScope('all');
            }}
            className="text-cyan-400 hover:text-cyan-300 font-semibold text-xs cursor-pointer underline"
          >
            {language === 'en' ? 'Reset Filters' : 'إعادة تعيين الفلاتر وعرض كافة البلاغات'}
          </button>
        </div>
      )}

      {/* Content View */}
      {filteredTickets.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
          <Inbox className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="font-bold text-sm text-white">
            {language === 'en' ? 'No tickets match search criteria' : 'لا توجد بلاغات تطابق معايير البحث'}
          </p>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {language === 'en'
              ? 'Try adjusting search terms or clear filters to view more tickets.'
              : 'جرب تعديل كلمات البحث أو تصفية الحالة لعرض بلاغات أخرى.'}
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setPriorityFilter('all');
              setDepartmentFilter('all');
              if (onToggleViewScope) onToggleViewScope('all');
            }}
            className="text-xs font-semibold text-cyan-400 hover:underline pt-1 inline-block cursor-pointer"
          >
            {language === 'en' ? 'Reset filters and view all' : 'إعادة تعيين الفلاتر وعرض كافة البلاغات'}
          </button>
        </div>
      ) : viewMode === 'table' ? (
        
        /* High-Density Data Grid (Table Mode) */
        <div className="space-y-2">
          <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto">
            <table className={`w-full text-xs ${isRTL ? 'text-right' : 'text-left'}`}>
            <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">{language === 'en' ? 'Ticket #' : 'رقم البلاغ'}</th>
                <th className="py-3 px-4">{language === 'en' ? 'Requester' : 'المستفيد'}</th>
                <th className="py-3 px-4">{language === 'en' ? 'Department' : 'القسم'}</th>
                <th className="py-3 px-4">{language === 'en' ? 'Assigned Team' : 'الفني / الفريق المكلف'}</th>
                <th className="py-3 px-4">{language === 'en' ? 'Category' : 'تصنيف العطل'}</th>
                <th className="py-3 px-4">{language === 'en' ? 'Priority' : 'الأولوية'}</th>
                <th className="py-3 px-4">{language === 'en' ? 'Status' : 'الحالة'}</th>
                <th className="py-3 px-4">{language === 'en' ? 'Date' : 'التاريخ'}</th>
                <th className="py-3 px-4 text-center">{language === 'en' ? 'Actions' : 'الإجراءات'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTickets.map((ticket) => {
                let priorityColor = 'text-slate-400';
                if (ticket.priority === 'حرج') priorityColor = 'text-rose-400 font-bold';
                if (ticket.priority === 'مرتفع') priorityColor = 'text-amber-400 font-semibold';
                if (ticket.priority === 'متوسط') priorityColor = 'text-blue-400';

                const techList = ticket.technicians && ticket.technicians.length > 0
                  ? ticket.technicians
                  : ticket.technicianName && ticket.technicianName !== 'غير معين'
                    ? ticket.technicianName.split('،').map(s => s.trim())
                    : [];

                const localizedStatus = translateStatus(ticket.status, language);
                const localizedPriority = translatePriority(ticket.priority, language);
                const localizedCat = translateCategory(ticket.category, language);

                return (
                  <tr
                    key={ticket.id}
                    className="hover:bg-slate-900/50 transition-colors group cursor-pointer"
                    onClick={() => onViewTicket(ticket)}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-slate-300 whitespace-nowrap" dir="ltr">
                      {ticket.ticketNumber}
                    </td>
                    <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                      {ticket.userName}
                    </td>
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                      {ticket.department}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {techList.length > 1 ? (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold"
                          title={techList.join(' / ')}
                        >
                          <Users className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span>{techList.length} {language === 'en' ? 'engineers' : 'فنيين'}</span>
                        </span>
                      ) : techList.length === 1 ? (
                        <span className="inline-flex items-center gap-1 text-slate-300 text-[11px]">
                          <UserCheck className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span>{techList[0]}</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px] italic">
                          {language === 'en' ? 'Unassigned' : 'غير معين'}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-300 max-w-xs">
                      <div className="flex flex-col gap-0.5">
                        <span className="truncate">{localizedCat}</span>
                        {ticket.assistanceType === 'remote' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] text-cyan-400 font-medium">
                            <MonitorUp className="w-2.5 h-2.5" />
                            {language === 'en' ? 'Remote (AnyDesk)' : 'دعم عن بعد'}
                          </span>
                        ) : ticket.assistanceType === 'on_site' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-medium">
                            <MapPin className="w-2.5 h-2.5" />
                            {language === 'en' ? 'On-site Desk Visit' : 'زيارة فني للمكتب'}
                          </span>
                        ) : ticket.followUpHistory && ticket.followUpHistory.length > 0 ? (
                          <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
                            <MessageCircle className="w-2.5 h-2.5 text-cyan-400" />
                            {ticket.followUpHistory.length} {language === 'en' ? 'replies' : 'متابعات'}
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className={`py-3 px-4 whitespace-nowrap ${priorityColor}`}>
                      {localizedPriority}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={ticket.status}
                        onChange={(e) => onQuickStatusChange(ticket.id, e.target.value as TicketStatus)}
                        className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
                      >
                        <option value="جديد">{language === 'en' ? 'New' : 'جديد'}</option>
                        <option value="قيد المعالجة">{language === 'en' ? 'In Progress' : 'قيد المعالجة'}</option>
                        <option value="تم الحل">{language === 'en' ? 'Resolved' : 'تم الحل'}</option>
                        <option value="مغلق">{language === 'en' ? 'Closed' : 'مغلق'}</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-slate-400 whitespace-nowrap">
                      {ticket.createdAt}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onViewTicket(ticket)}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                          title={t.ticketLog.ticketCard.detailsBtn}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteTicket(ticket.id)}
                          className="p-1.5 rounded hover:bg-rose-950/60 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                          title={t.ticketLog.ticketCard.deleteTicketBtn}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      ) : (
        
        /* Card Grid Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredTickets.map((ticket) => {
            const techList = ticket.technicians && ticket.technicians.length > 0
              ? ticket.technicians
              : ticket.technicianName && ticket.technicianName !== 'غير معين'
                ? ticket.technicianName.split('،').map(s => s.trim())
                : [];

            const localizedStatus = translateStatus(ticket.status, language);
            const localizedPriority = translatePriority(ticket.priority, language);

            return (
              <div
                key={ticket.id}
                onClick={() => onViewTicket(ticket)}
                className="p-4 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold text-slate-300" dir="ltr">{ticket.ticketNumber}</span>
                    <span className="text-slate-400 font-mono tabular-nums">{ticket.createdAt}</span>
                  </div>
                  <h3 className="font-bold text-sm text-white">
                    {ticket.userName}
                    <span className="font-normal text-xs text-slate-400 mx-2">({ticket.department})</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {ticket.description}
                  </p>

                  {/* Team / Technicians Strip in Card */}
                  <div className="mt-2.5 pt-2 border-t border-slate-900 flex items-center gap-1.5 flex-wrap">
                    {techList.length > 0 ? (
                      techList.map((tname) => (
                        <span
                          key={tname}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-medium"
                        >
                          <UserCheck className="w-2.5 h-2.5" />
                          <span>{tname}</span>
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-500 text-[10px] italic">
                        {language === 'en' ? 'Unassigned' : 'لم يعين فني بعد'}
                      </span>
                    )}

                    {ticket.assistanceType === 'remote' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-medium">
                        <MonitorUp className="w-2.5 h-2.5" />
                        {language === 'en' ? 'Remote (AnyDesk)' : 'دعم عن بعد'}
                      </span>
                    ) : ticket.assistanceType === 'on_site' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-medium">
                        <MapPin className="w-2.5 h-2.5" />
                        {language === 'en' ? 'On-site Visit' : 'زيارة مكتبية'}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                  <span className="text-slate-400">
                    {t.ticketLog.filterPriority}{' '}
                    <span className="font-bold text-white">{localizedPriority}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {ticket.followUpHistory && ticket.followUpHistory.length > 0 && (
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <MessageCircle className="w-3 h-3 text-cyan-400" />
                        {ticket.followUpHistory.length}
                      </span>
                    )}
                    <span className="font-semibold text-cyan-400">
                      {localizedStatus}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
