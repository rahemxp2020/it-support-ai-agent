import React from 'react';
import {
  LayoutDashboard,
  Stethoscope,
  TicketPlus,
  Inbox,
  Terminal,
  Plus,
  Languages,
  Globe
} from 'lucide-react';
import { AboutIcon } from './AboutIcon';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentTab: 'dashboard' | 'diagnose' | 'new-ticket' | 'ticket-log' | 'about';
  onSelectTab: (tab: 'dashboard' | 'diagnose' | 'new-ticket' | 'ticket-log' | 'about') => void;
  ticketsCount: number;
  openTicketsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  ticketsCount,
  openTicketsCount
}) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 no-print transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Zone 1: Brand Title */}
          <div
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 group-hover:text-cyan-300 transition-colors shadow-sm shrink-0">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-extrabold text-base sm:text-lg text-slate-100 group-hover:text-white transition-colors tracking-tight">
                  {t.appTitle}
                </span>
                <span className="hidden sm:inline font-mono text-[11px] text-cyan-400/80 px-1.5 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/30">
                  AI Agent
                </span>
              </div>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                currentTab === 'dashboard'
                  ? 'text-cyan-400 bg-slate-900 border border-slate-800'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{t.nav.dashboard}</span>
            </button>

            <button
              onClick={() => onSelectTab('diagnose')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                currentTab === 'diagnose'
                  ? 'text-cyan-400 bg-slate-900 border border-slate-800'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>{t.nav.diagnose}</span>
            </button>

            <button
              onClick={() => onSelectTab('ticket-log')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                currentTab === 'ticket-log'
                  ? 'text-cyan-400 bg-slate-900 border border-slate-800'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>{t.nav.ticketLog}</span>
              {openTicketsCount > 0 && (
                <span className="font-mono tabular-nums text-[11px] font-bold text-amber-400 px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/20">
                  {openTicketsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectTab('about')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                currentTab === 'about'
                  ? 'text-cyan-400 bg-slate-900 border border-slate-800'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
              title="About & AI Agents Championship"
            >
              <AboutIcon size="sm" />
              <span>{t.nav.about}</span>
            </button>
          </nav>

          {/* Zone 3: Actions & Language Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Bilingual Language Switcher Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/30 transition-all cursor-pointer shadow-sm"
              title={language === 'ar' ? 'Switch to English' : 'التحويل إلى اللغة العربية'}
            >
              <Languages className="w-4 h-4 text-cyan-400" />
              <span className="font-sans font-bold">
                {language === 'ar' ? 'English' : 'العربية'}
              </span>
            </button>

            <button
              onClick={() => onSelectTab('new-ticket')}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all hover:border-slate-600 cursor-pointer shadow-sm"
              title={t.nav.newTicket}
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">{t.nav.newTicket}</span>
            </button>

            <button
              onClick={() => onSelectTab('diagnose')}
              className="hidden lg:flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              <Stethoscope className="w-4 h-4" />
              <span>{t.nav.startScan}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
