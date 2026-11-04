import React, { useState } from 'react';
import {
  Smartphone,
  Download,
  Share2,
  PlusSquare,
  Check,
  Copy,
  ExternalLink,
  X,
  Sparkles,
  ShieldCheck,
  Zap,
  QrCode,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface MobileInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToast?: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const MobileInstallModal: React.FC<MobileInstallModalProps> = ({
  isOpen,
  onClose,
  onAddToast,
}) => {
  const { language, isRTL } = useLanguage();
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'android' | 'ios' | 'qr'>(isIOS ? 'ios' : 'android');
  const [copied, setCopied] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-mdv25vgdypr5uuoz7vk4ma-696985394020.europe-west2.run.app';
  // Standard shareable clean portal URL
  const appCleanUrl = currentUrl.split('?')[0];

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(appCleanUrl);
      setCopied(true);
      if (onAddToast) {
        onAddToast(
          language === 'en' ? 'Link Copied!' : 'تم نسخ رابط التطبيق',
          language === 'en' ? 'Open this link in Chrome or Safari on your phone.' : 'افتح هذا الرابط على متصفح Chrome أو Safari في هاتفك لتثبيته فوراً.',
          'success'
        );
      }
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
    }
  };

  const handleTriggerInstall = async () => {
    setIsInstalling(true);
    try {
      const success = await install();
      if (success && onAddToast) {
        onAddToast(
          language === 'en' ? 'App Installed!' : 'تم تثبيت التطبيق بنجاح!',
          language === 'en' ? 'IT Support AI Agent is now on your home screen.' : 'أصبح مساعد الدعم الفني الذكي مثبتاً على شاشتك الرئيسية.',
          'success'
        );
        onClose();
      }
    } finally {
      setIsInstalling(false);
    }
  };

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(appCleanUrl)}&color=38-189-248&bgcolor=11-17-32`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 flex flex-col"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-slate-900/95 to-cyan-950/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
              <Smartphone className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-base">
                  {language === 'en' ? 'Install App on Mobile' : 'تحميل وتثبيت التطبيق على الموبايل'}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  PWA Mobile App
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'en'
                  ? 'Run natively on Android & iPhone with offline resilience'
                  : 'يعمل كتطبيق مستقل بدون الحاجة لمتاجر التطبيقات على أندرويد وآيفون'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title={language === 'en' ? 'Close' : 'إغلاق'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-5 overflow-y-auto">
          
          {/* Status Banner */}
          {isInstalled ? (
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-3 text-emerald-300 text-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
              </div>
              <div>
                <p className="font-bold text-white text-xs sm:text-sm">
                  {language === 'en' ? 'Application is already installed!' : 'التطبيق مثبت بالفعل على جهازك!'}
                </p>
                <p className="text-[11px] text-emerald-300/80 mt-0.5">
                  {language === 'en'
                    ? 'You are running the standalone version from your home screen or desktop.'
                    : 'أنت تستخدم النسخة المثبتة على شاشتك الرئيسية مع كامل الميزات التشغيلية.'}
                </p>
              </div>
            </div>
          ) : isInstallable ? (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-slate-900 border-2 border-cyan-500/40 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="font-bold text-white text-xs sm:text-sm">
                    {language === 'en' ? 'Direct 1-Click Install Ready' : 'التثبيت الفوري بنقرة واحدة متاح الآن على هذا الجهاز'}
                  </span>
                </div>
                <span className="text-[10px] text-cyan-300 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">
                  Chrome / Edge / Android
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {language === 'en'
                  ? 'Your browser detected the application manifest. Click below to install it directly to your home screen or desktop.'
                  : 'متصفحك يدعم التثبيت المباشر. اضغط على الزر أدناه لتثبيت التطبيق كأيقونة على شاشتك الرئيسية فوراً.'}
              </p>
              <button
                type="button"
                onClick={handleTriggerInstall}
                disabled={isInstalling}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-slate-950 font-black text-xs sm:text-sm shadow-md hover:shadow-cyan-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Download className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                <span>
                  {isInstalling
                    ? (language === 'en' ? 'Installing...' : 'جارٍ التثبيت...')
                    : (language === 'en' ? 'Install IT Support Agent Now' : 'تثبيت التطبيق على الشاشة الرئيسية الآن')}
                </span>
              </button>
            </div>
          ) : null}

          {/* Quick Tabs: Android vs iPhone vs QR Code */}
          <div className="flex p-1 rounded-2xl bg-slate-950 border border-slate-800 gap-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('android')}
              className={`flex-1 py-2 px-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'android'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🤖</span>
              <span>{language === 'en' ? 'Android Phones' : 'هواتف أندرويد'}</span>
              {isAndroid && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ios')}
              className={`flex-1 py-2 px-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'ios'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🍏</span>
              <span>{language === 'en' ? 'iPhone & iPad' : 'آيفون وآيباد'}</span>
              {isIOS && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('qr')}
              className={`flex-1 py-2 px-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'qr'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Scan QR Code' : 'مسح الـ QR'}</span>
            </button>
          </div>

          {/* TAB 1: ANDROID GUIDE */}
          {activeTab === 'android' && (
            <div className="space-y-3.5 animate-fadeIn">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-cyan-400 block">
                  {language === 'en'
                    ? 'Compatible with Samsung, Xiaomi, Oppo, Vivo, Huawei, Pixel, etc.'
                    : 'متوافق مع سامسونج، شاومي، أوبو، فيفو، هواوي، جوجل بيكسل، وجميع أجهزة أندرويد:'}
                </span>
                <p className="text-[11px] text-slate-400">
                  {language === 'en'
                    ? 'Using Google Chrome or Samsung Internet browser:'
                    : 'من خلال متصفح Google Chrome أو Samsung Internet:'}
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-white">
                      {language === 'en' ? 'Open link in Chrome' : 'افتح رابط المنظومة في متصفح Google Chrome'}
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      {language === 'en'
                        ? 'Ensure you are browsing on your mobile device.'
                        : 'تأكد من فتح الرابط عبر المتصفح في هاتفك المحمول.'}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-white flex items-center gap-1.5">
                      <span>{language === 'en' ? 'Tap browser menu (⋮)' : 'اضغط على زر القائمة (⋮) أعلى أو أسفل المتصفح'}</span>
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      {language === 'en'
                        ? 'Tap the three vertical dots located at the top-right or bottom-right corner.'
                        : 'انقر على الثلاث نقاط الرأسية في الزاوية العلوية للمتصفح.'}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-emerald-300 flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Select "Install App" or "Add to Home screen"' : 'اختر "تثبيت التطبيق" أو "الإضافة إلى الشاشة الرئيسية"'}</span>
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      {language === 'en'
                        ? 'Confirm the prompt by tapping "Install".'
                        : 'ستظهر نافذة تأكيد مصغرة باسم وأيقونة التطبيق، اضغط "تثبيت" (Install).'}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-white">
                      {language === 'en' ? 'Launch from your Home Screen!' : 'مبروك! التطبيق الآن مثبت على شاشة هاتفك'}
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      {language === 'en'
                        ? 'The app opens full-screen without URL bar, just like any native app from Play Store.'
                        : 'ستجد أيقونة "مساعد IT" في قائمة تطبيقاتك وتعمل بملء الشاشة مع حفظ البيانات محلياً وبث التنبيهات.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IPHONE & IPAD GUIDE */}
          {activeTab === 'ios' && (
            <div className="space-y-3.5 animate-fadeIn">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-cyan-400 block">
                  {language === 'en'
                    ? 'Apple iOS Safari Installation (iPhone & iPad):'
                    : 'طريقة التثبيت على أجهزة آبل (آيفون وآيباد) عبر متصفح Safari:'}
                </span>
                <p className="text-[11px] text-slate-400">
                  {language === 'en'
                    ? 'Apple requires using Safari for Home Screen PWA installation.'
                    : 'تشترط آبل فتح الرابط في متصفح Safari لإمكانية إضافته للشاشة الرئيسية:'}
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-white">
                      {language === 'en' ? 'Open link in Safari' : 'افتح الرابط في متصفح Safari'}
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      {language === 'en'
                        ? 'If you are viewing in another browser, copy the URL and paste it into Safari.'
                        : 'إذا كنت تفتح الرابط في متصفح آخر، انسخ الرابط وافتحه داخل تطبيق Safari.'}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-emerald-300 flex items-center gap-1.5">
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Tap the "Share" button (Square with arrow ↑)' : 'اضغط على زر المشاركة (Share ⎋)'}</span>
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      {language === 'en'
                        ? 'Located at the bottom center of your iPhone screen.'
                        : 'الأيقونة الموجودة في الشريط السفلي لمتصفح Safari (مربع يخرج منه سهم للأعلى).'}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-cyan-300 flex items-center gap-1.5">
                      <PlusSquare className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Select "Add to Home Screen"' : 'مرر للأسفل واضغط على "إضافة إلى الصفحة الرئيسية" (+) '}</span>
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      {language === 'en'
                        ? 'Scroll down the share sheet and tap "Add to Home Screen".'
                        : 'ستجد خيار Add to Home Screen مع رمز علامة الزائد.'}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-white">
                      {language === 'en' ? 'Tap "Add" in top right corner' : 'اضغط على "إضافة" (Add) في الزاوية العلوية'}
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      {language === 'en'
                        ? 'The app icon is now on your iPhone screen with full splash screen launch!'
                        : 'سينتقل التطبيق مباشرة لشاشتك الرئيسية ويفتح كأي تطبيق أصلي مثبت من App Store.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: QR CODE */}
          {activeTab === 'qr' && (
            <div className="space-y-4 text-center animate-fadeIn py-1">
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                {language === 'en'
                  ? 'Open your smartphone camera and point it at this QR Code to open and install the application instantly:'
                  : 'افتح كاميرا هاتفك المحمول ووجهها نحو رمز الاستجابة السريعة (QR) لفتح الرابط وتثبيته فوراً:'}
              </p>

              <div className="inline-block p-4 rounded-3xl bg-slate-950 border-2 border-cyan-500/40 shadow-xl">
                <img
                  src={qrImageUrl}
                  alt="App Mobile Install QR Code"
                  className="w-48 h-48 mx-auto rounded-xl object-contain"
                  loading="lazy"
                />
                <span className="text-[11px] font-mono text-cyan-400 font-bold mt-2 block">
                  Scan with Mobile Camera
                </span>
              </div>
            </div>
          )}

          {/* Shareable Link Box */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                <span>{language === 'en' ? 'Direct Application Link:' : 'رابط التطبيق المباشر للموبايل:'}</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">HTTPS SSL</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={appCleanUrl}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 select-all focus:outline-none"
                dir="ltr"
              />
              <button
                type="button"
                onClick={handleCopyUrl}
                className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{language === 'en' ? 'Copied' : 'تم النسخ'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Copy' : 'نسخ'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Mobile App Capabilities Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-center">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <Zap className="w-4 h-4 text-amber-400 mx-auto" />
              <p className="text-[11px] font-bold text-white">
                {language === 'en' ? 'Instant Speed' : 'سرعة فائقة'}
              </p>
              <p className="text-[9px] text-slate-400">
                {language === 'en' ? 'Cache First Engine' : 'إقلاع لحظي'}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto" />
              <p className="text-[11px] font-bold text-white">
                {language === 'en' ? 'Cloud Sync' : 'مزامنة سحابية'}
              </p>
              <p className="text-[9px] text-slate-400">
                {language === 'en' ? 'Firestore Realtime' : 'تحديث لحظي'}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <Layers className="w-4 h-4 text-cyan-400 mx-auto" />
              <p className="text-[11px] font-bold text-white">
                {language === 'en' ? 'Standalone' : 'ملء الشاشة'}
              </p>
              <p className="text-[9px] text-slate-400">
                {language === 'en' ? 'No URL Bars' : 'كتطبيق نظامي'}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <Smartphone className="w-4 h-4 text-sky-400 mx-auto" />
              <p className="text-[11px] font-bold text-white">
                {language === 'en' ? 'Push Alerts' : 'تنبيهات فورية'}
              </p>
              <p className="text-[9px] text-slate-400">
                {language === 'en' ? 'WhatsApp & Sound' : 'صوت ورسائل'}
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              {language === 'en'
                ? 'Free install, no app store download required.'
                : 'تثبيت مجاني ومباشر دون استهلاك لمساحة التخزين أو الحاجة للمتجر.'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            {language === 'en' ? 'Done' : 'إغلاق'}
          </button>
        </div>

      </div>
    </div>
  );
};
