import React, { useState } from 'react';
import {
  LayoutDashboard,
  Stethoscope,
  TicketPlus,
  Inbox,
  Terminal,
  User,
  Shield,
  Eye,
  Edit2,
  Check,
  X,
  Phone,
  MessageCircle,
  Mail,
  ChevronLeft,
  Bell,
  Award,
  Languages,
  MapPin,
  Smartphone
} from 'lucide-react';
import { AboutIcon } from './AboutIcon';
import { useLanguage } from '../context/LanguageContext';

interface SidebarProps {
  currentTab: 'dashboard' | 'diagnose' | 'new-ticket' | 'ticket-log' | 'about';
  onSelectTab: (tab: 'dashboard' | 'diagnose' | 'new-ticket' | 'ticket-log' | 'about') => void;
  openTicketsCount: number;
  totalTicketsCount: number;
  activeUserName: string;
  onUpdateActiveUserName: (newName: string) => void;
  viewMode: 'all' | 'my_tickets';
  onToggleViewMode: (mode: 'all' | 'my_tickets') => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onlineCount?: number;
  onlineUsers?: { sessionId: string; userName: string; deviceType: string }[];
  onOpenNotificationChannels?: () => void;
  onOpenBackupModal?: () => void;
  onOpenPresentation?: () => void;
  onOpenInstallModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  openTicketsCount,
  totalTicketsCount,
  activeUserName,
  onUpdateActiveUserName,
  viewMode,
  onToggleViewMode,
  isMobileOpen,
  onCloseMobile,
  onlineCount = 1,
  onlineUsers = [],
  onOpenNotificationChannels,
  onOpenBackupModal,
  onOpenPresentation,
  onOpenInstallModal
}) => {
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(activeUserName);

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdateActiveUserName(tempName.trim());
    }
    setIsEditingName(false);
  };

  const navItems = [
    {
      id: 'dashboard' as const,
      label: t.nav.dashboard,
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'diagnose' as const,
      label: t.nav.diagnose,
      icon: Stethoscope,
      badge: t.nav.smartScanBadge
    },
    {
      id: 'new-ticket' as const,
      label: t.nav.newTicket,
      icon: TicketPlus,
      badge: null
    },
    {
      id: 'ticket-log' as const,
      label: t.nav.ticketLog,
      icon: Inbox,
      badge: openTicketsCount > 0 ? `${openTicketsCount} ${t.nav.activeBadge}` : null,
      badgeAlert: openTicketsCount > 0
    },
    {
      id: 'about' as const,
      label: t.nav.about,
      icon: null,
      useAboutIcon: true,
      badge: null
    }
  ];

  const sidebarContent = (
    <div className={`h-full flex flex-col justify-between p-4 sm:p-5 bg-slate-950 text-slate-200 select-none ${isRTL ? 'border-l border-slate-800' : 'border-r border-slate-800'}`}>
      
      {/* Top Brand & Header */}
      <div className="space-y-4">
        
        {/* Brand Lockup & Language Switcher */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 gap-2">
          <div
            onClick={() => { onSelectTab('dashboard'); onCloseMobile(); }}
            className="flex items-center gap-2.5 cursor-pointer group flex-1 overflow-hidden"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 group-hover:text-cyan-300 transition-colors shadow-sm shrink-0">
              <Terminal className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <h1 className="font-extrabold text-xs sm:text-sm text-white tracking-tight leading-tight truncate group-hover:text-cyan-300 transition-colors">
                {t.sidebar.title}
              </h1>
              <p className="font-mono text-[10px] text-slate-400 truncate" dir="ltr">
                {t.sidebar.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleLanguage}
            className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-[11px] font-bold text-cyan-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer shrink-0"
            title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
          >
            <Languages className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
          </button>
        </div>

        {/* Smart Active User Profile Box */}
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-bold text-slate-300">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.sidebar.userProfileTitle}</span>
            </span>
            {!isEditingName && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => { setTempName(activeUserName); setIsEditingName(true); }}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                  title={activeUserName ? t.sidebar.edit : t.sidebar.registerName}
                >
                  <Edit2 className="w-3 h-3" />
                  <span>{activeUserName ? t.sidebar.edit : t.sidebar.registerName}</span>
                </button>
                {activeUserName && (
                  <button
                    type="button"
                    onClick={() => { onUpdateActiveUserName(''); }}
                    className="text-[11px] text-slate-500 hover:text-rose-400 cursor-pointer transition-colors"
                    title={t.sidebar.clear}
                  >
                    {t.sidebar.clear}
                  </button>
                )}
              </div>
            )}
          </div>

          {isEditingName ? (
            <div className="flex items-center gap-1.5 pt-1">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder={t.sidebar.namePlaceholder}
                className="flex-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                autoFocus
                onKeyDown={(e) => { if (e.key === 'Enter') handleSaveName(); }}
              />
              <button
                type="button"
                onClick={handleSaveName}
                className="p-1.5 rounded-lg bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors cursor-pointer"
                title={t.sidebar.save}
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </button>
              <button
                type="button"
                onClick={() => setIsEditingName(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={t.sidebar.cancel}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <span className={`font-extrabold text-xs sm:text-sm truncate ${activeUserName ? 'text-white' : 'text-slate-400'}`}>
                {activeUserName || t.sidebar.noNameSpecified}
              </span>
              <span className="text-[10px] text-slate-500 font-mono" dir="ltr">
                {activeUserName ? t.sidebar.savedLocally : t.sidebar.flexible}
              </span>
            </div>
          )}
        </div>

        {/* View Mode Switcher: All Tickets vs My Tickets */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <Eye className="w-3 h-3 text-cyan-400" />
            <span>{t.sidebar.viewScopeTitle}</span>
          </label>
          <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => onToggleViewMode('all')}
              className={`py-1.5 px-2 rounded-lg text-center font-bold transition-all cursor-pointer truncate ${
                viewMode === 'all'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={t.sidebar.allTickets}
            >
              {t.sidebar.allTickets} ({totalTicketsCount})
            </button>
            <button
              type="button"
              onClick={() => onToggleViewMode('my_tickets')}
              className={`py-1.5 px-2 rounded-lg text-center font-bold transition-all cursor-pointer truncate ${
                viewMode === 'my_tickets'
                  ? 'bg-slate-800 text-emerald-300 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={t.sidebar.myTickets}
            >
              {t.sidebar.myTickets}
            </button>
          </div>
        </div>

        {/* Main Navigation Menu */}
        <nav className="space-y-1 pt-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-slate-900 text-cyan-400 border border-slate-800 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.useAboutIcon ? (
                    <AboutIcon size="sm" />
                  ) : Icon ? (
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`} />
                  ) : null}
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    item.badgeAlert
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick External Channels & Tools */}
        <div className="pt-2 border-t border-slate-800/60 space-y-1.5">
          {onOpenNotificationChannels && (
            <button
              type="button"
              onClick={() => {
                onOpenNotificationChannels();
                onCloseMobile();
              }}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-bold text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all cursor-pointer group shadow-sm overflow-hidden"
              title={t.sidebar.notificationChannels}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Bell className="w-4 h-4 text-amber-400 group-hover:animate-pulse shrink-0" />
                <span className="truncate">{t.sidebar.notificationChannels}</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 shrink-0 whitespace-nowrap">
                Live Alerts
              </span>
            </button>
          )}

          {onOpenBackupModal && (
            <button
              type="button"
              onClick={() => {
                onOpenBackupModal();
                onCloseMobile();
              }}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all cursor-pointer overflow-hidden"
              title={t.sidebar.backupSecurity}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">{t.sidebar.backupSecurity}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono shrink-0">Cloud</span>
            </button>
          )}

          {onOpenPresentation && (
            <button
              type="button"
              onClick={() => {
                onOpenPresentation();
                onCloseMobile();
              }}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-bold text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all cursor-pointer group shadow-sm overflow-hidden"
              title={t.sidebar.competitionDeck}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Award className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
                <span className="truncate">{t.sidebar.competitionDeck}</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300 shrink-0 whitespace-nowrap">
                {t.sidebar.competitionBadge}
              </span>
            </button>
          )}

          {onOpenInstallModal && (
            <button
              type="button"
              onClick={() => {
                onOpenInstallModal();
                onCloseMobile();
              }}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-bold text-emerald-300 hover:text-emerald-100 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all cursor-pointer group shadow-sm overflow-hidden"
              title={language === 'en' ? 'Install App on Mobile' : 'تثبيت التطبيق على الموبايل'}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Smartphone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
                <span className="truncate">
                  {language === 'en' ? 'Install on Mobile' : 'تثبيت التطبيق على الموبايل'}
                </span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 shrink-0 whitespace-nowrap">
                PWA
              </span>
            </button>
          )}
        </div>

      </div>

      {/* Bottom Footer Info & Developer Ownership */}
      <div className="pt-4 border-t border-slate-800/80 space-y-2.5 text-xs">
        
        {/* Live Online Presence Indicator */}
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-xs space-y-1.5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-white text-[11px]">{t.sidebar.onlineNow}:</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-[10px]">
              {onlineCount} {language === 'en' ? 'Online' : 'متصل'}
            </span>
          </div>
          {onlineUsers && onlineUsers.length > 0 && (
            <div className="text-[10px] text-slate-400 truncate flex items-center gap-1 pt-0.5 border-t border-slate-800/60">
              <span className="text-slate-500 shrink-0">{language === 'en' ? 'Active:' : 'النشطون:'}</span>
              <span className="text-slate-300 font-medium truncate">
                {onlineUsers.map(u => {
                  if (language === 'en' && (!u.userName || u.userName === 'مستخدم المنظومة' || u.userName === 'مستخدم متصل')) {
                    return 'System User';
                  }
                  return u.userName;
                }).slice(0, 2).join(' / ')}
                {onlineUsers.length > 2 && ` +${onlineUsers.length - 2}`}
              </span>
            </div>
          )}
        </div>

        {/* Developer Attribution Card */}
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-slate-400 font-medium">{t.sidebar.developerLabel}</p>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-bold border border-cyan-500/20">
              {language === 'en' ? 'Egypt' : 'مصر'}
            </span>
          </div>
          <p className="font-extrabold text-white text-xs leading-snug">{t.sidebar.developerName}</p>
          <p className="font-mono text-[9px] text-cyan-400 truncate" dir="ltr">Eng. Abdelrahim Mohamed Ahmed</p>

          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium pt-1 border-t border-slate-800/80">
            <MapPin className="w-3 h-3 shrink-0 text-emerald-400" />
            <span className="truncate">{t.sidebar.developerLocation}</span>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/60 text-[10px]">
            <a
              href="https://wa.me/201009125279"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline flex items-center gap-1 font-mono font-bold"
              dir="ltr"
              title="WhatsApp Direct Contact"
            >
              <MessageCircle className="w-3 h-3" />
              <span>+201009125279</span>
            </a>
            <a
              href="mailto:rahemxp2020@gmail.com"
              className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 font-mono text-[9px]"
              title="Email Lead Engineer"
            >
              <Mail className="w-3 h-3" />
              <span>Email</span>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>v2.4 Enterprise</span>
          <span>{t.sidebar.rights}</span>
        </div>

      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 sticky top-0 h-screen no-print z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
          />
          <div className={`relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in ${isRTL ? 'slide-in-from-right' : 'slide-in-from-left'} duration-200`}>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
