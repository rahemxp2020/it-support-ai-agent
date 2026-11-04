/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Bell,
  MessageCircle,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Shield,
  HelpCircle,
  Smartphone,
  Save,
  RotateCcw,
  Check,
  Bot
} from 'lucide-react';
import { NotificationChannelSettings } from '../types/it-support';
import {
  getNotificationSettings,
  saveNotificationSettings,
  testTelegramBot,
  formatPhoneNumberForWhatsApp,
  fetchTelegramLatestChatId
} from '../services/notificationChannels';

interface NotificationChannelsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const NotificationChannelsModal: React.FC<NotificationChannelsModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  if (!isOpen) return null;

  const [settings, setSettings] = useState<NotificationChannelSettings>(getNotificationSettings());
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'email' | 'telegram'>('whatsapp');
  const [isTestingTelegram, setIsTestingTelegram] = useState(false);
  const [telegramTestResult, setTelegramTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isSavedRecently, setIsSavedRecently] = useState(false);

  useEffect(() => {
    setSettings(getNotificationSettings());
  }, [isOpen]);

  const handleSave = () => {
    saveNotificationSettings(settings);
    setIsSavedRecently(true);
    onShowToast('تم حفظ إعدادات قنوات الإشعارات بنجاح', 'سيتم استخدام هذه القنوات في إرسال التنبيهات الفورية', 'success');
    setTimeout(() => setIsSavedRecently(false), 2000);
  };

  const handleTestWhatsApp = () => {
    const phone = formatPhoneNumberForWhatsApp(settings.whatsappNumber || '+201009125279');
    const testMsg = `🔔 *رسالة اختبار لمنظومة الدعم الفني الذكي*\n\nهذا إشعار تجريبي للتأكد من ربط واتساب بنجاح لاستقبال بلاغات الصيانة اللحظية.\nالتاريخ: ${new Date().toLocaleString('ar-EG')}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(testMsg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onShowToast('تم فتح محادثة واتساب التجريبية', 'تحقق من تطبيق واتساب على جهازك أو المتصفح', 'info');
  };

  const handleTestEmail = () => {
    const recipient = settings.emailAddress || 'rahemxp2020@gmail.com';
    const subject = 'اختبار إشعارات البريد الإلكتروني - منظومة الدعم الفني';
    const body = `السلام عليكم ورحمة الله،\n\nهذا بريد تجريبي لتأكيد تفعيل استقبال إشعارات بلاغات الصيانة.\nتاريخ الاختبار: ${new Date().toLocaleString('ar-EG')}\n\nتحياتنا،\nمساعد الدعم الفني الذكي`;
    const mailto = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailto, '_blank');
    onShowToast('تم فتح مسودة البريد التجريبي', 'تأكد من إرسالها إلى البريد المحدد', 'info');
  };

  const handleTestTelegram = async () => {
    if (!settings.telegramBotToken.trim() || !settings.telegramChatId.trim()) {
      onShowToast('بيانات غير مكتملة', 'يرجى إدخال Bot Token و Chat ID أولاً لإجراء الاختبار', 'error');
      return;
    }

    setIsTestingTelegram(true);
    setTelegramTestResult(null);

    const res = await testTelegramBot(settings.telegramBotToken, settings.telegramChatId);
    setIsTestingTelegram(false);
    setTelegramTestResult(res);

    if (res.success) {
      onShowToast('نجح اختبار تيليجرام', res.message, 'success');
    } else {
      onShowToast('فشل اختبار تيليجرام', res.message, 'error');
    }
  };

  const handleAutoDetectChatId = async () => {
    setIsTestingTelegram(true);
    const token = settings.telegramBotToken || '9000089073:AAGpzJ_qK0hAbE0rHcOSRpVYPKrdr24JnSc';
    const res = await fetchTelegramLatestChatId(token);
    setIsTestingTelegram(false);
    if (res.chatId) {
      setSettings(prev => ({ ...prev, telegramChatId: res.chatId! }));
      onShowToast('تم العثور على المعرف', res.message, 'success');
    } else {
      onShowToast('تنبيه البحث', res.message, 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl my-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                قنوات التنبيهات الفورية (الإشعارات الخارجية)
              </h2>
              <p className="text-xs text-slate-400">
                إرسال بلاغات الدعم الفني لحظياً عبر واتساب، البريد، وتيليجرام
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Channels Tabs */}
        <div className="flex items-center gap-1 p-2 bg-slate-900/60 border-b border-slate-800/80 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('whatsapp')}
            className={`flex-1 py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'whatsapp'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>رسائل واتساب (WhatsApp)</span>
            {settings.whatsappEnabled && (
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('email')}
            className={`flex-1 py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'email'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>البريد الإلكتروني (Email)</span>
            {settings.emailEnabled && (
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('telegram')}
            className={`flex-1 py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'telegram'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot className="w-4 h-4 text-sky-400" />
            <span>بوت تيليجرام (Telegram)</span>
            {settings.telegramEnabled && (
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
            )}
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
          
          {/* TAB 1: WHATSAPP */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <h3 className="font-bold text-white text-sm">تفعيل إشعارات واتساب الفورية</h3>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    إرسال ملخص تقرير البلاغ مباشرة بصيغة منسقة إلى هاتف المسؤول الفني عند تسجيل أي بلاغ صيانة جديد.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={settings.whatsappEnabled}
                    onChange={(e) => setSettings({ ...settings, whatsappEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-slate-200 text-xs">
                  رقم هاتف المستلم لتنبيهات واتساب:
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Smartphone className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
                    <input
                      type="text"
                      dir="ltr"
                      value={settings.whatsappNumber}
                      onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                      placeholder="+201009125279"
                      className="w-full pr-9 pl-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleTestWhatsApp}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    title="فتح محادثة واتساب تجريبية"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>إرسال تجريبي</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  الرقم الافتراضي المعتمد بالصيغة الدولية لمصر (+20): <span className="font-mono text-emerald-400 font-bold" dir="ltr">+201009125279</span> (م. عبدالرحيم محمد احمد محمد).
                </p>
              </div>

              {/* Sample Preview */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 block">
                  معاينة شكل رسالة واتساب التي ستصلك:
                </span>
                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-900/50 text-[11px] font-mono text-emerald-200/90 whitespace-pre-wrap leading-relaxed">
{`🚨 *بلاغ صيانة ودعم فني جديد* 🚨
━━━━━━━━━━━━━━━━━━━━━━
🔢 *رقم التذكرة:* IT-2026-3277
👤 *الموظف المُبلّغ:* بولا
🏢 *القسم:* تقنية المعلومات
⚠️ *نوع العطل:* عطل تقني
⚡ *درجة الأولوية:* عاجل
🕒 *التوقيت:* ${new Date().toLocaleDateString('ar-EG')}
━━━━━━━━━━━━━━━━━━━━━━
📝 *الوصف:* يوجد بلاغ بانتظار تدخل الفني المختص...`}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: EMAIL */}
          {activeTab === 'email' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                    <h3 className="font-bold text-white text-sm">تفعيل إشعارات البريد الإلكتروني (Email Alerts)</h3>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    إرسال تقرير فني رسمي ومفصل لكل تذكرة صيانة على بريدك الإلكتروني لأرشفة البلاغات ومتابعتها رسمياً.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={settings.emailEnabled}
                    onChange={(e) => setSettings({ ...settings, emailEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-slate-200 text-xs">
                  عنوان البريد الإلكتروني المعتمد لتلقي التقارير:
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
                    <input
                      type="email"
                      dir="ltr"
                      value={settings.emailAddress}
                      onChange={(e) => setSettings({ ...settings, emailAddress: e.target.value })}
                      placeholder="rahemxp2020@gmail.com"
                      className="w-full pr-9 pl-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleTestEmail}
                    className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    title="فتح مسودة بريد تجريبية"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>بريد تجريبي</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  البريد المعتمد للمسؤول: <span className="font-mono text-cyan-400 font-bold" dir="ltr">rahemxp2020@gmail.com</span>
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>ميزات تقرير البريد الإلكتروني:</span>
                </div>
                <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside pr-1">
                  <li>يتضمن جميع بيانات التذكرة: اسم الموظف، القسم، مواصفات الجهاز ونظام التشغيل.</li>
                  <li>تشخيص العطل المقترح وخطوات الحل المنفذة مع الملاحظات.</li>
                  <li>سند رسمي موثق ومؤرخ يمكن طباعته بصيغة PDF مباشرة.</li>
                </ul>
              </div>

            </div>
          )}

          {/* TAB 3: TELEGRAM BOT */}
          {activeTab === 'telegram' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-500/30 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                    <h3 className="font-bold text-white text-sm">تفعيل بوت وقناة تيليجرام (Telegram Bot)</h3>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    إرسال إشعار فوري داخل قناة دعم فني جماعية أو محادثة خاصة لجميع مهندسي الـ IT في اللحظة ذاتها.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={settings.telegramEnabled}
                    onChange={(e) => setSettings({ ...settings, telegramEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                </label>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-200 text-xs">
                    رمز البوت (Telegram Bot Token):
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={settings.telegramBotToken}
                    onChange={(e) => setSettings({ ...settings, telegramBotToken: e.target.value })}
                    placeholder="مثال: 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block font-bold text-slate-200 text-xs">
                      معرف المحادثة أو القناة (Telegram Chat ID):
                    </label>
                    <button
                      type="button"
                      onClick={handleAutoDetectChatId}
                      className="text-[11px] text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      title="جلب معرف حسابك التلقائي من تيليجرام"
                    >
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>جلب معرف حسابي تلقائياً (5516879336)</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    dir="ltr"
                    value={settings.telegramChatId}
                    onChange={(e) => setSettings({ ...settings, telegramChatId: e.target.value })}
                    placeholder="مثال: 5516879336 أو @my_channel"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-sky-500"
                  />
                  
                  {/* Warning if user enters phone number instead of numeric Telegram Chat ID */}
                  {(settings.telegramChatId.startsWith('010') || settings.telegramChatId.startsWith('01') || (settings.telegramChatId.length === 11 && !isNaN(Number(settings.telegramChatId)))) && (
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>⚠️ لقد أدخلت رقم هاتف! تيليجرام لا يقبل أرقام الهواتف كـ Chat ID، بل يقبل المعرف الرقمي للحساب.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSettings({ ...settings, telegramChatId: '5516879336' })}
                        className="px-2.5 py-1 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shrink-0 cursor-pointer transition-colors"
                      >
                        تعيين 5516879336
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                    <span>
                      معرف حسابك المعتمد في تيليجرام: <strong className="font-mono text-sky-400 font-bold">5516879336</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSettings({ ...settings, telegramChatId: '5516879336' })}
                      className="text-cyan-400 hover:underline cursor-pointer font-bold"
                    >
                      استخدام هذا المعرف
                    </button>
                  </div>
                </div>

                {/* Test Connection Button */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleTestTelegram}
                    disabled={isTestingTelegram || !settings.telegramBotToken || !settings.telegramChatId}
                    className="px-4 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 disabled:opacity-40 border border-sky-500/40 text-sky-300 font-bold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    {isTestingTelegram ? (
                      <span className="w-3.5 h-3.5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>{isTestingTelegram ? 'جاري الفحص...' : 'اختبار اتصال البوت الآن'}</span>
                  </button>

                  {telegramTestResult && (
                    <span className={`text-xs font-semibold flex items-center gap-1 ${
                      telegramTestResult.success ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {telegramTestResult.success ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                      <span>{telegramTestResult.message}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Telegram 3-Step Setup Quick Guide */}
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-xs">
                  <HelpCircle className="w-4 h-4 text-sky-400" />
                  <span>كيف تنشئ بوت تيليجرام مجاناً في دقيقة واحدة؟</span>
                </div>
                <ol className="text-[11px] text-slate-300 space-y-1.5 list-decimal list-inside pr-1">
                  <li>افتح تطبيق تيليجرام وابحث عن الحساب الرسمي <span className="font-mono text-sky-300 font-bold" dir="ltr">@BotFather</span> واضغط Start.</li>
                  <li>أرسل له الأمر <span className="font-mono text-amber-300">/newbot</span> واختر اسماً للبوت، وسيعطيك الـ <span className="text-sky-300 font-bold">Token</span> فوراً.</li>
                  <li>انسخ الـ Token وضعه في الحقل أعلاه، ثم ابدأ محادثة مع البوت واكتب الـ Chat ID واضغط "اختبار الاتصال".</li>
                </ol>
              </div>

            </div>
          )}

          {/* Global Automation Preferences Card */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <h4 className="text-xs font-extrabold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>إجراءات الأتمتة التلقائية (Automation Rules):</span>
            </h4>

            <div className="space-y-2">
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer hover:bg-slate-900">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-200">إشعار فوري عند تسجيل أي بلاغ صيانة جديد</span>
                  <p className="text-[10px] text-slate-400">إطلاق التنبيهات للقنوات المفعلة فور ضغط زر الحفظ</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoDispatchOnNewTicket}
                  onChange={(e) => setSettings({ ...settings, autoDispatchOnNewTicket: e.target.checked })}
                  className="w-4 h-4 rounded text-cyan-400 focus:ring-cyan-500 bg-slate-950 border-slate-700"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer hover:bg-slate-900">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-200">إشعار عند اكتمال حل المشكلة (تم الحل)</span>
                  <p className="text-[10px] text-slate-400">إرسال تقرير إغلاق العطل للموظف والمسؤول الفني</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifyOnStatusChange}
                  onChange={(e) => setSettings({ ...settings, notifyOnStatusChange: e.target.checked })}
                  className="w-4 h-4 rounded text-cyan-400 focus:ring-cyan-500 bg-slate-950 border-slate-700"
                />
              </label>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3 no-print">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer"
          >
            إغلاق
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            {isSavedRecently ? <Check className="w-4 h-4 text-slate-950" /> : <Save className="w-4 h-4" />}
            <span>{isSavedRecently ? 'تم الحفظ بنجاح!' : 'حفظ إعدادات القنوات'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
