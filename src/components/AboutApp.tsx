import React from 'react';
import {
  Terminal,
  Zap,
  Flame,
  Layers,
  ShieldCheck,
  Workflow,
  UserCheck,
  Award,
  Shield,
  Code2,
  Calendar,
  CheckCircle2,
  Mail,
  Phone,
  MessageCircle,
  Laptop,
  Smartphone,
  HardDrive,
  DollarSign,
  Briefcase,
  Download,
  Compass,
  Video,
  MapPin,
  Send
} from 'lucide-react';
import { AboutIcon } from './AboutIcon';
import { useLanguage } from '../context/LanguageContext';

interface AboutAppProps {
  onOpenPresentation?: () => void;
  onOpenInstallModal?: () => void;
}

export const AboutApp: React.FC<AboutAppProps> = ({ onOpenPresentation, onOpenInstallModal }) => {
  const { language, t, isRTL } = useLanguage();
  const isEn = language === 'en';

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Executive Header with Custom About Icon & Badge */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800/90 flex flex-col sm:flex-row items-center gap-6 justify-between">
        <div className={`space-y-3 text-center ${isRTL ? 'sm:text-right' : 'sm:text-left'}`}>
          <div className={`flex items-center justify-center ${isRTL ? 'sm:justify-start' : 'sm:justify-start'} gap-2 text-xs font-semibold text-slate-400`}>
            <span>{isEn ? 'System Guide' : 'دليل النظام'}</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span className="text-cyan-400">
              {isEn ? 'System Info & Intellectual Property' : 'معلومات التطبيق وحقوق الملكية'}
            </span>
          </div>

          <div className={`flex items-center justify-center ${isRTL ? 'sm:justify-start' : 'sm:justify-start'} gap-3`}>
            <AboutIcon size="lg" showText />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.about.pageTitle}
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            {isEn
              ? 'An enterprise-grade autonomous AI system engineered for IT Service Desk operations to ingest, diagnose, and resolve technical issues with realtime omnichannel dispatch.'
              : 'منظومة رقمية متكاملة لمسؤولي وفنيي تقنية المعلومات والدعم الفني لاستقبال وتشخيص وحل مشاكل المستخدمين وإصدار تذاكر الدعم الفني المعتمدة.'}
          </p>
        </div>

        {/* Custom Tech Emblem Badge */}
        <div className="relative shrink-0 group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-xl shadow-cyan-950/60 bg-slate-900 flex items-center justify-center">
            <img
              src="/src/assets/images/about_icon_1791370364903.jpg"
              alt="About IT Support Icon"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <span className="absolute -bottom-2 -left-2 px-2 py-0.5 rounded-md bg-slate-900 border border-cyan-500/50 text-[10px] font-mono text-cyan-300 shadow">
            {isEn ? 'AI AGENT' : 'ABOUT / حول'}
          </span>
        </div>
      </div>

      {/* Official AI Agents Championship Presentation Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border-2 border-cyan-500/40 shadow-xl shadow-cyan-950/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className={`space-y-1.5 text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
          <div className={`flex items-center justify-center ${isRTL ? 'md:justify-start' : 'md:justify-start'} gap-2 flex-wrap`}>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-black text-[10px]">
              {t.championshipTitle}
            </span>
            <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Official AI Agents Championship Entry</span>
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-white">
            {isEn
              ? 'Official Championship Presentation Deck, Storyboard & Comprehensive Guide'
              : 'ملف المشاركة الرسمي بالمسابقة، العرض التقديمي (Pitch Deck)، والدليل الشامل'}
          </h2>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            {isEn
              ? 'Review the verified AI Agent defense deck, interactive slides, 90-second video script, client user manual, and download ready-to-print PDF/HTML packages.'
              : 'استعرض ملف المنافسة المعتمد لوكيل الذكاء الاصطناعي (IT Support AI Agent)، والشرائح التفاعلية، وسيناريو تصوير الفيديو، مع إمكانية تحميل وطباعة المستند كاملاً.'}
          </p>
        </div>

        <div className={`flex flex-wrap items-center gap-2.5 shrink-0 justify-center ${isRTL ? 'md:justify-end' : 'md:justify-end'}`}>
          <a
            href="https://create-ai-agents-competition.in.howspace.com/official-championship-portal"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            title="Open Official Championship Portal"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.about.openPortalBtn}</span>
          </a>

          <button
            type="button"
            onClick={onOpenPresentation}
            className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-400/20 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>{t.about.openDeckBtn}</span>
          </button>
        </div>
      </div>

      {/* Developer Copyright & Intellectual Ownership Card */}
      <section className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/50 border-2 border-cyan-500/30 shadow-lg shadow-cyan-950/20 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                {isEn
                  ? 'Intellectual Property & Creator Attribution'
                  : 'حقوق الملكية الفكرية وتطوير النظام (System Ownership)'}
              </h2>
              <p className="text-xs text-slate-400">
                {isEn ? 'Verified creator and lead software engineer' : 'توثيق المطور والمسؤول الهندسي المعتمد للتطبيق'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isEn ? 'Verified & Copyrighted' : 'ملكية موثقة ومعتمدة'}</span>
          </div>
        </div>

        {/* Developer Profile Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                <UserCheck className="w-4 h-4 text-cyan-400" />
                <span>{isEn ? 'Lead Software Engineer & Creator:' : 'مهندس ومطور النظام (System Developer):'}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-[10px] font-bold text-cyan-300">
                {isEn ? 'Egypt' : 'دولة مصر'}
              </span>
            </div>
            
            <div className="pt-1">
              <p className="text-lg sm:text-xl font-black text-white">
                {isEn ? 'Eng. Abdelrahim Mohamed Ahmed Mohamed' : 'م. عبدالرحيم محمد احمد محمد'}
              </p>
              <p className="font-mono text-xs sm:text-sm text-cyan-400 tracking-wide mt-0.5" dir="ltr">
                Eng. Abdelrahim Mohamed Ahmed Mohamed
              </p>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mt-1.5 pt-1 border-t border-slate-800/80">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                <span>{isEn ? 'Arab Republic of Egypt - Qena Governorate' : 'جمهورية مصر العربية - محافظة قنا'}</span>
              </div>
            </div>

            {/* Direct Contact Details */}
            <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href="mailto:rahemxp2020@gmail.com"
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-colors group cursor-pointer"
                  title="Send email"
                >
                  <div className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0 group-hover:border-cyan-500/50">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-slate-400">{isEn ? 'Email:' : 'البريد الإلكتروني:'}</span>
                    <span className="font-mono text-white text-[11px] truncate" dir="ltr">rahemxp2020@gmail.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300">
                  <div className="w-6 h-6 rounded-lg bg-sky-950/60 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                    <Send className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-slate-400">{isEn ? 'Telegram Chat ID:' : 'معرف تيليجرام:'}</span>
                    <span className="font-mono text-sky-300 font-bold text-[11px]" dir="ltr">5516879336</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-1">
                <a
                  href="https://wa.me/201009125279"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition-all cursor-pointer group"
                  title="WhatsApp Chat"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <div className={`flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-[10px] text-emerald-400 font-bold">
                      {isEn ? 'WhatsApp Chat:' : 'مراسلة واتساب:'}
                    </span>
                    <span className="font-mono font-bold text-white text-xs" dir="ltr">+201009125279</span>
                  </div>
                </a>

                <a
                  href="tel:+201009125279"
                  className="flex-1 flex items-center gap-2 p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 transition-all cursor-pointer group"
                  title="Direct Phone Call"
                >
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <div className={`flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-[10px] text-cyan-400 font-bold">
                      {isEn ? 'Direct Line:' : 'الهاتف المباشر:'}
                    </span>
                    <span className="font-mono font-bold text-white text-xs" dir="ltr">+201009125279</span>
                  </div>
                </a>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
              {isEn
                ? 'Lead architect and developer behind the Autonomous IT Support AI Agent. Based in Qena Governorate, Egypt.'
                : 'صاحب فكرة وتصميم وتطوير نظام "مساعد الدعم الفني الذكي"، المخصص لخدمة مهندسي وفنيي تقنية المعلومات. المقيم بمحافظة قنا، جمهورية مصر العربية.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5 text-xs">
            <div className="flex items-center gap-2 text-slate-400 font-semibold">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>{isEn ? 'Credentials & Copyright Metadata:' : 'بيانات الاعتماد وحقوق النشر:'}</span>
            </div>

            <div className="space-y-1.5 pt-1 text-slate-300">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">{isEn ? 'Lead Developer:' : 'المهندس المطور:'}</span>
                <span className="font-bold text-white text-right">
                  {isEn ? 'Eng. Abdelrahim Mohamed' : 'م. عبدالرحيم محمد احمد محمد'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">{isEn ? 'Location & Country:' : 'الدولة والمحافظة:'}</span>
                <span className="font-medium text-emerald-400 text-right">
                  {isEn ? 'Egypt - Qena Governorate' : 'مصر - محافظة قنا'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">{isEn ? 'Copyright Release Year:' : 'سنة الإصدار وحقوق الطبع:'}</span>
                <span className="font-mono font-bold text-white">© 2026 All Rights Reserved</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">{isEn ? 'System Build:' : 'إصدار المنظومة:'}</span>
                <span className="font-mono font-bold text-cyan-400">v2.4 Enterprise Edition</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">{isEn ? 'Verified Channels:' : 'القنوات المعتمدة:'}</span>
                <span className="font-mono text-emerald-400 font-bold" dir="ltr">WhatsApp · Telegram · Email</span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">{isEn ? 'License Status:' : 'حالة الترخيص:'}</span>
                <span className="font-bold text-emerald-400">
                  {isEn ? 'Official Registered License' : 'مرخص رسمي ومسجل للمطور'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal & Attribution Notice */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 text-xs text-slate-400 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {isEn ? (
              <>
                All software source code, system UI, diagnostic knowledge graphs, and omnichannel relays are exclusively authored and copyrighted by{' '}
                <strong className="text-slate-200">Eng. Abdelrahim Mohamed Ahmed Mohamed</strong> (Arab Republic of Egypt - Qena Governorate) · Email:{' '}
                <span className="font-mono text-cyan-300" dir="ltr">rahemxp2020@gmail.com</span> · Phone/WhatsApp:{' '}
                <span className="font-mono text-cyan-300" dir="ltr">+201009125279</span> · Telegram ID:{' '}
                <span className="font-mono text-cyan-300" dir="ltr">5516879336</span>.
              </>
            ) : (
              <>
                جميع حقوق البرمجة والتصميم وهندسة الواجهات وقواعد المعرفة التشخيصية محفوظة باسم{' '}
                <strong className="text-slate-200">م. عبدالرحيم محمد احمد محمد</strong> (جمهورية مصر العربية - محافظة قنا) · البريد:{' '}
                <span className="font-mono text-cyan-300" dir="ltr">rahemxp2020@gmail.com</span> · هاتف وواتساب المعتمد:{' '}
                <span className="font-mono text-cyan-300 font-bold" dir="ltr">+201009125279</span> · تيليجرام:{' '}
                <span className="font-mono text-cyan-300" dir="ltr">5516879336</span>.
              </>
            )}
          </p>
        </div>
      </section>

      {/* Purpose & Operational Methodology */}
      <section className="p-6 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Workflow className="w-4 h-4 text-cyan-400" />
          <span>{isEn ? 'Operational Methodology & Vision' : 'الهدف والمنهجية التشغيلية'}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
          {isEn
            ? 'The Autonomous IT Support Agent was engineered to standardize and automate incident management end-to-end. It systematically gathers workstation telemetry, deduces probable root causes, provides an interactive verification checklist, suggests immediate terminal commands (CMD/PowerShell), and enables seamless non-technical escalation via AnyDesk or on-site visit with omnichannel alerts.'
            : 'صُمم التطبيق لتوحيد وتوثيق إجراءات الدعم الفني من لحظة استلام البلاغ وحتى إغلاقه بنجاح. يقدم النظام تسلسلاً ممنهجاً يبدأ بحصر بيانات محطة العمل والنظام، ثم استنتاج الأسباب المحتملة، وتقديم قائمة خطوات فحص تفاعلية متسلسلة مدعومة بأوامر سطر الأوامر (CMD / PowerShell) القابلة للتنفيذ الفوري.'}
        </p>
      </section>

      {/* Feature Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
          <div className="w-7 h-7 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-2">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white">
            {isEn ? 'Autonomous Diagnostics' : 'تشخيص فوري ذكي'}
          </h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {isEn
              ? 'Deductive inference engine analyzing technical telemetry and isolating root causes with precision.'
              : 'محرك خبير مدعوم بالذكاء الاصطناعي لتحليل الأعطال الشائعة والمعقدة واستخلاص الأسباب الجذرية بدقة.'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
          <div className="w-7 h-7 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 mb-2">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white">
            {isEn ? 'Interactive Checklist' : 'خطوات فحص تفاعلية'}
          </h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {isEn
              ? 'Step-by-step verification procedures with expected telemetry outputs and copyable terminal commands.'
              : 'قوائم تدقيق (Checklists) متسلسلة تمكن فني الدعم من تتبع كل خطوة فحص تم تنفيذها والنتيجة المتوقعة.'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
          <div className="w-7 h-7 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white">
            {isEn ? 'Omnichannel Escalation' : 'توثيق وتنبيهات فورية'}
          </h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {isEn
              ? 'Instant dispatch across WhatsApp, Telegram Bot API, email, and desktop Web Audio notifications.'
              : 'توليد سندات تذاكر رسمية قابلة للمشاركة السريعة عبر الرسائل، أو الطباعة والحفظ كملفات PDF رسمية.'}
          </p>
        </div>
      </div>

      {/* SLA Priority Matrix */}
      <section className="p-6 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>{isEn ? 'Incident Priority & SLA Response Matrix' : 'مصفوفة أولويات الدعم الفني واتفاقيات مستوى الخدمة (SLA Matrix)'}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isEn ? 'Standardized severity tiers and SLA target resolution windows:' : 'معايير تصنيف خطورة الأعطال وزمن الاستجابة المستهدف:'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-rose-400">{isEn ? 'Critical (S1)' : 'حرج (Critical)'}</span>
              <span className="font-mono text-[10px] text-slate-400" dir="ltr">&lt; 15 min</span>
            </div>
            <p className="text-[11px] text-slate-300 pt-1 leading-relaxed">
              {isEn ? 'Core server outage, whole facility offline, security breach.' : 'توقف خادم رئيسي، انقطاع كلي للشبكة، تعطل قسم بالكامل.'}
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-400">{isEn ? 'High (S2)' : 'مرتفع (High)'}</span>
              <span className="font-mono text-[10px] text-slate-400" dir="ltr">&lt; 2 hours</span>
            </div>
            <p className="text-[11px] text-slate-300 pt-1 leading-relaxed">
              {isEn ? 'Mission-critical staff workstation failure, ERP database lock.' : 'تعطل جهاز موظف حاسم، بريد إداري، طابعة العقود المشتركة.'}
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-blue-400">{isEn ? 'Medium (S3)' : 'متوسط (Medium)'}</span>
              <span className="font-mono text-[10px] text-slate-400" dir="ltr">&lt; 8 hours</span>
            </div>
            <p className="text-[11px] text-slate-300 pt-1 leading-relaxed">
              {isEn ? 'General slowdown, non-blocking application errors.' : 'بطء أداء عام، أخطاء برامج ثانوية مع وجود حلول بديلة.'}
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">{isEn ? 'Low (S4)' : 'منخفض (Low)'}</span>
              <span className="font-mono text-[10px] text-slate-400" dir="ltr">&lt; 24 hours</span>
            </div>
            <p className="text-[11px] text-slate-300 pt-1 leading-relaxed">
              {isEn ? 'General inquiries, new hardware provisioning requests.' : 'استفسارات عامة، طلبات إعدادات إضافية، ترقيات غير عاجلة.'}
            </p>
          </div>
        </div>
      </section>

      {/* Essential Runbook Commands */}
      <section className="p-6 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <h2 className="text-base font-bold text-white">
            {isEn ? 'Rapid IT Runbook Terminal Suite' : 'حقيبة أوامر الفحص السريع (IT Runbook)'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs" dir="ltr">
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span className="font-mono text-cyan-300 font-bold">ipconfig /flushdns</span>
            <span className="text-[11px] text-slate-400 font-sans">
              {isEn ? 'Purge DNS resolver cache' : 'تفريغ ذاكرة DNS'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span className="font-mono text-cyan-300 font-bold">sfc /scannow</span>
            <span className="text-[11px] text-slate-400 font-sans">
              {isEn ? 'Repair corrupt Windows system files' : 'إصلاح ملفات ويندوز'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span className="font-mono text-cyan-300 font-bold">net stop spooler && net start spooler</span>
            <span className="text-[11px] text-slate-400 font-sans">
              {isEn ? 'Restart print spooler service' : 'إعادة تشغيل خدمة الطباعة'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span className="font-mono text-cyan-300 font-bold">gpupdate /force</span>
            <span className="text-[11px] text-slate-400 font-sans">
              {isEn ? 'Force Group Policy refresh' : 'تحديث سياسات المجموعة'}
            </span>
          </div>
        </div>
      </section>

      {/* Deployment, Portable USB & Commercial Monetization Guide */}
      <section className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 border border-cyan-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                {isEn
                  ? 'Deployment, Portable USB & Commercial Monetization Guide'
                  : 'دليل التثبيت، النسخ المحمولة، والترخيص التجاري (Commercial Guide)'}
              </h2>
              <p className="text-xs text-slate-400">
                {isEn
                  ? 'Installation methods, portable USB distribution, and SaaS monetization channels'
                  : 'طرق تثبيت التطبيق على الأجهزة، تشغيله من فلاشة USB، ونماذج تحقيق الأرباح'}
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-cyan-300 px-3 py-1 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center gap-1 font-bold self-start sm:self-auto">
            <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isEn ? 'Production & Commercial Ready' : 'جاهز للتسويق والبيع التجاري'}</span>
          </span>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          {/* Card 1: PC & Android Installation */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Laptop className="w-4 h-4 text-cyan-400" />
                <span>{isEn ? '1. Desktop & Mobile PWA Installation' : '1. التثبيت على الكمبيوتر والموبايل'}</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {isEn
                  ? 'Built using Progressive Web App (PWA) standards, enabling 1-click standalone installation without app stores:'
                  : 'التطبيق مبني بتقنية PWA، مما يتيح تثبيته بنقرة واحدة كبرنامج مستقل دون الحاجة لمتجر تطبيقات:'}
              </p>
              <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                <li>
                  <strong className="text-slate-200">{isEn ? 'Windows / Mac:' : 'على الكمبيوتر:'}</strong>{' '}
                  {isEn ? 'Click Install in browser address bar to add to Desktop and Start menu.' : 'اضغط على أيقونة التثبيت ليصبح برنامجاً على سطح المكتب وقائمة Start.'}
                </li>
                <li>
                  <strong className="text-slate-200">{isEn ? 'Android & iOS:' : 'على الموبايل:'}</strong>{' '}
                  {isEn ? 'Tap "Add to Home Screen" to run full-screen as a native app.' : 'اضغط "إضافة للشاشة الرئيسية" ليفتح كتطبيق أصلي بملء الشاشة.'}
                </li>
              </ul>

              {onOpenInstallModal && (
                <button
                  type="button"
                  onClick={onOpenInstallModal}
                  className="mt-2 w-full py-2 px-3 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isEn ? 'Open Mobile Install Guide & QR' : 'فتح دليل تثبيت الموبايل ورمز QR'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Card 2: Portable USB Distribution */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <HardDrive className="w-4 h-4 text-emerald-400" />
                <span>{isEn ? '2. Portable USB Flash Drive Deployment' : '2. تشغيل التطبيق من فلاشة USB'}</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {isEn
                  ? 'Can it be loaded on a flash drive and distributed? Absolutely, through two battle-tested approaches:'
                  : 'هل يمكن وضعه على فلاشة وتوزيعه؟ نعم بكل تأكيد! عبر طريقتين عمليتين:'}
              </p>
              <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                <li>
                  <strong className="text-slate-200">{isEn ? 'Portable Web Bundle:' : 'نسخة الويب المحمولة:'}</strong>{' '}
                  {isEn ? 'Bundle static build with autorun batch script that launches in any browser on USB plug.' : 'وضع النسخة المجمعة مع ملف تشغيل تلقائي يفتح بمجرد توصيل الفلاشة.'}
                </li>
                <li>
                  <strong className="text-slate-200">{isEn ? 'Native .EXE Package:' : 'برنامج تنفيذي .EXE:'}</strong>{' '}
                  {isEn ? 'Package via Electron or Tauri into IT_Support.exe for offline workstation operation.' : 'تغليف الكود ليصبح ملف .exe يثبت ذاتياً على أي ويندوز دون إنترنت.'}
                </li>
              </ul>

              <a
                href="/api/download-project"
                download="it-support-ai-agent.zip"
                className="mt-2 w-full py-2 px-3 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isEn ? 'Download Full ZIP Bundle for USB' : 'تحميل حزمة المشروع بالكامل للفلاشة (ZIP)'}</span>
              </a>
            </div>
          </div>

          {/* Card 3: Monetization & Pricing Models */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>{isEn ? '3. Commercialization & Revenue Models' : '3. كيف تبيع النظام وتربح منه؟'}</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {isEn ? 'Proven commercial models for IT solution monetization:' : 'أفضل 3 نماذج تسويقية مجربة لتحقيق عوائد مالية:'}
              </p>
              <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                <li>
                  <strong className="text-slate-200">{isEn ? 'B2B Enterprise SaaS:' : 'بيع ترخيص للشركات:'}</strong>{' '}
                  {isEn ? 'Annual seat licenses with continuous updates and dedicated SLA support.' : 'تسويق النظام للشركات والمستشفيات والمدارس باشتراك سنوي يتضمن الدعم.'}
                </li>
                <li>
                  <strong className="text-slate-200">{isEn ? 'Maintenance Contracts:' : 'عقود الصيانة:'}</strong>{' '}
                  {isEn ? 'Bundle the platform as an exclusive digital interface for monthly MSP contracts.' : 'تقديم التطبيق كمنصة رسمية حصرية لعملائك ضمن عقد الصيانة الشهري.'}
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
