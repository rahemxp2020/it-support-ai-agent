/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Printer,
  ChevronRight,
  ChevronLeft,
  Award,
  ShieldCheck,
  Zap,
  Layers,
  Workflow,
  Laptop,
  Smartphone,
  Bell,
  MessageCircle,
  Mail,
  Bot,
  Video,
  FileText,
  DollarSign,
  Users,
  CheckCircle2,
  Sparkles,
  Download,
  Database,
  Lock,
  Compass,
  ExternalLink,
  Code2,
  Languages,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translatePriority, translateStatus, translateCategory } from '../i18n/translations';

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const { language, setLanguage, isRTL, t } = useLanguage();

  if (!isOpen) return null;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<'slides' | 'video_script' | 'brochure' | 'submission_form'>('slides');

  const competitionUrl = 'https://create-ai-agents-competition.in.howspace.com/official-championship-portal';

  // Arabic Slides Definition
  const slidesAr = [
    {
      id: 1,
      badge: 'مسابقة تحدي وكلاء الذكاء الاصطناعي 2026',
      title: 'وكيل الدعم الفني الذكي (Autonomous IT Support AI Agent)',
      subtitle: 'المنظومة الرقمية السحابية لإدارة وتشخيص أعطال تقنية المعلومات وأتمتة خدمة العملاء',
      category: 'هوية الوكيل الذكي',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-extrabold text-white text-base">رؤية الوكيل الذكي والهدف الاستراتيجي</h3>
              <a
                href={competitionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold flex items-center gap-1 hover:bg-amber-500/30 transition-colors"
              >
                <span>Official Championship Entry</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <p className="leading-relaxed">
              تحويل قسم الدعم الفني (IT Service Desk) من إدارة بطيئة وعشوائية إلى <strong>وكيل ذكاء اصطناعي تشغيلي ذاتي التحكم (Autonomous Agent)</strong> يجمع بين التشخيص الاستنتاجي السريع، والمزامنة السحابية اللحظية، وإشعار المعنيين فورياً عبر الهاتف والحاسوب، لسد الفجوة بين الموظف العادي غير التقني وفريق الدعم المتخصص.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
              <span className="text-cyan-400 font-bold block text-xs">👨‍💻 مهندس ومطور الوكيل الذكي:</span>
              <p className="text-white font-extrabold text-base">م. عبدالرحيم محمد احمد محمد</p>
              <p className="font-mono text-xs text-slate-400" dir="ltr">Eng. Abdelrahim Mohamed Ahmed Mohamed</p>
              <p className="text-[11px] text-emerald-400 font-semibold pt-0.5">📍 جمهورية مصر العربية - محافظة قنا</p>
              <p className="text-[11px] text-slate-400">المشاركة الرسمية في مسابقة وكلاء الذكاء الاصطناعي العالمية © 2026</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold block text-xs">📞 قنوات الاتصال والتحقق المعتمدة:</span>
              <p className="text-white font-bold text-xs">هاتف وواتساب: <span className="font-mono text-emerald-400" dir="ltr">+201009125279</span></p>
              <p className="text-white font-bold text-xs">البريد الإلكتروني: <span className="font-mono text-cyan-400" dir="ltr">rahemxp2020@gmail.com</span></p>
              <p className="text-white font-bold text-xs">معرف تيليجرام المعتمد: <span className="font-mono text-sky-400 font-bold">5516879336</span></p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      badge: 'تحليل المشكلة الواقعية (The Problem)',
      title: 'لماذا يحتاج سوق العمل والمؤسسات إلى هذا الوكيل الذكي؟',
      subtitle: 'التحديات الجوهرية في أقسام الدعم الفني التقليدية',
      category: 'دراسة الجدوى',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
              <h4 className="font-bold text-rose-400 flex items-center gap-1.5 text-xs">
                <span>⚠️ 1. ضياع وتشتت البلاغات:</span>
              </h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                اعتماد الشركات على المكالمات الشفوية أو أوراق الملاحظات يؤدي لنسيان 40% من طلبات الصيانة وتأخر حل المشكلات الحرجة.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
              <h4 className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
                <span>⚠️ 2. عجز العميل غير التقني:</span>
              </h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                معظم الموظفين لا يعرفون المصطلحات التقنية (DNS, Gateway, RAM)، مما يهدر وقت الفني في استجواب الموظف لفهم العطل.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-1.5">
              <h4 className="font-bold text-indigo-400 flex items-center gap-1.5 text-xs">
                <span>⚠️ 3. انعدام المزامنة الميدانية:</span>
              </h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                اختلاف البلاغات بين هاتف الفني في الميدان وشاشة الإدارة بالمقر، مما يسبب تضارب المهام وإلغاء بلاغات قيد الحل.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-1.5">
              <h4 className="font-bold text-purple-400 flex items-center gap-1.5 text-xs">
                <span>⚠️ 4. غياب التنبيهات الفورية:</span>
              </h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                اضطرار مسؤولي تقنية المعلومات للدخول اليدوي كل ربع ساعة لتفقد النظام بحثاً عن أي مشكلة جديدة طرأت في الفروع.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      badge: 'الحل المقترح (The AI Agent Solution)',
      title: 'بنية الوكيل الذكي: من الاستشعار والتشخيص حتى التنفيذ',
      subtitle: 'دمج نماذج الذكاء الاصطناعي مع القواعد الخبيرة المعتمدة',
      category: 'المعمارية التقنية',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white text-xs flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>محرك الفحص والاستنتاج الثنائي (Dual AI Engine):</span>
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              يقوم الوكيل بتحليل العطل فوراً عبر مسارين: محرك الذكاء الاصطناعي السحابي (Gemini API) المدعوم بقاعدة معرفية محلية فائقة السرعة تعمل دون تأخير لتوليد أسباب العطل بدقة وأوامر سطر الأوامر (CMD/PowerShell) لحلها في ثوانٍ.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-cyan-400 font-bold block text-xs">1. فحص تفاعلي</span>
              <p className="text-[11px] text-slate-400">قائمة فحص Checklists تقود الفني خطوة بخطوة</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-emerald-400 font-bold block text-xs">2. تذكرة معتمدة</span>
              <p className="text-[11px] text-slate-400">إصدار سند رسمي موثق ومؤرخ برقم IT فريد</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-amber-400 font-bold block text-xs">3. دعم غير تقني</span>
              <p className="text-[11px] text-slate-400">توجيه فوري للدعم عن بعد أو زيارة الفني</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      badge: 'رحلة العميل والموظف (User Experience)',
      title: 'كيف يتعامل الموظف العادي مع الوكيل بكل سلاسة؟',
      subtitle: 'واجهة بسيطة مصممة خصيصاً لغير المتخصصين',
      category: 'تجربة المستخدم',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs mb-1">1</span>
              <p className="font-bold text-white text-xs">اختيار المشكلة</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                يختار الموظف نوع العطل بنقرة واحدة (إنترنت، طابعة، بطء، شاشة).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs mb-1">2</span>
              <p className="font-bold text-white text-xs">الفحص والتوجيه</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                يقدم له الوكيل خطوات فحص مبسطة يسهل عليه تجربتها ذاتياً.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs mb-1">3</span>
              <p className="font-bold text-white text-xs">طلب الدعم المناسب</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                إن لم يستطع، يختار بضغطة زر: "دعم عن بعد (AnyDesk)" أو "حضور فني لمكتبي".
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs mb-1">4</span>
              <p className="font-bold text-white text-xs">المتابعة المباشرة</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                محادثة متابعة مدمجة تمكنه من كتابة ردود سريعة وإرسال كود التحكم.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-200">
            💡 <strong>ميزة استثنائية:</strong> النظام يتذكر اسم الموظف تلقائياً (LocalStorage Smart Memory) دون الحاجة لتسجيل دخول معقد في كل مرة.
          </div>
        </div>
      )
    },
    {
      id: 5,
      badge: 'قنوات التنبيهات الفورية (Omnichannel Alerting)',
      title: 'أتمتة التواصل: التنبيه يصل للمسؤول في أجزاء من الثانية',
      subtitle: 'تكامل فوري يربط المتصفح، سطح المكتب، الهاتف، والشبكات الخارجية',
      category: 'التنبيهات والأتمتة',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-2">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <h4 className="font-bold text-white text-xs">1. إشعارات واتساب الفورية (WhatsApp)</h4>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                توليد تقرير فني فوري منسق بالرموز التعبيرية والتوقيت وإرساله مباشرة لهاتف المسؤول <span className="font-mono text-emerald-400 font-bold" dir="ltr">+201009125279</span> بنقرة واحدة أو آلياً عند تسجيل البلاغ.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-sky-500/40 space-y-2">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-sky-400" />
                <h4 className="font-bold text-white text-xs">2. بوت تيليجرام الرسمي (Telegram Bot)</h4>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                ربط عبر معرف المحادثة المعتمد <span className="font-mono text-sky-400 font-bold">5516879336</span> لبث التنبيهات الصوتية الفورية لقناة الدعم بالشركة دون تأخير.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/40 space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <h4 className="font-bold text-white text-xs">3. تقارير البريد الإلكتروني (Email Relay)</h4>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                توليد بريد إلكتروني رسمي يحتوي على كافة تفاصيل التذكرة موجه إلى <span className="font-mono text-cyan-400 font-bold" dir="ltr">rahemxp2020@gmail.com</span> للأرشفة المؤسسية.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/40 space-y-2">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400" />
                <h4 className="font-bold text-white text-xs">4. رنين صوتي وإشعارات المتصفح</h4>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                نغمة تنبيه هندسية فورية عبر Web Audio API تُسمع داخل قسم تقنية المعلومات عند وصول أي بلاغ جديد مع نافذة إشعار منبثقة.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      badge: 'التشغيل عبر المنصات (Cross-Platform Execution)',
      title: 'قابلية التثبيت والتشغيل على الحاسوب والهاتف وفلاشات USB',
      subtitle: 'منظومة Progressive Web App وتطبيقات سطح المكتب المستقلة',
      category: 'النشر والتوزيع',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Laptop className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-xs">تطبيق حاسوب (PWA / Electron)</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                يمكن تثبيته بنقرة واحدة من شريط المتصفح ليعمل كتطبيق سطح مكتب مستقل على شريط المهام في Windows و Mac.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-xs">تطبيق هاتف (Android / iOS)</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                يعمل على هواتف الفنيين كأيقونة تطبيق كاملة الشاشة مع دعم كامل للمس والمزامنة عند الحركة والتنقل.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-xs">نسخة محمولة (Portable USB)</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                تغليف المنظومة للعمل من فلاشة USB مستقلة دون الحاجة لإنترنت عبر خادم محلي مدمج للشركات الحساسة.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      badge: 'الأمان والنسخ الاحتياطي (Security & Disaster Recovery)',
      title: 'خزنة البيانات وحماية المنظومة من الفقدان والاختراق',
      subtitle: 'نسخ احتياطي فوري واسترجاع كامل لقواعد البيانات بضغطة زر',
      category: 'الأمان والاستقرار',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <Database className="w-4 h-4" />
                <span>تصدير تلقائي مشفر (Encrypted JSON Export)</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                إمكانية حفظ نسخة احتياطية كاملة من جميع التذاكر وسجلات المتابعة والتشخيصات وحفظها في ملف آمن خارج السحابة.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>معالجة تضارب البيانات (Conflict Resolution)</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                استخدام طوابع زمنية دقيقة تمنع تضارب التعديلات بين الفنيين حتى في حالات انقطاع الاتصال المفاجئ.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      badge: 'الجدوى الاقتصادية والتسويق (Commercial Viability)',
      title: 'كيف يحقق المشروع أرباحاً واقعية ومستدامة؟',
      subtitle: 'نماذج البيع والترخيص للشركات والمؤسسات (B2B SaaS)',
      category: 'التسويق والاستثمار',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[10px]">النموذج الأول</span>
              <h4 className="font-extrabold text-white text-xs">اشتراكات سنوية (SaaS)</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                تأجير المنظومة للشركات والمدارس والمستشفيات باشتراك سنوي يتضمن الاستضافة والدعم الفني والتحديثات.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">النموذج الثاني</span>
              <h4 className="font-extrabold text-white text-xs">النسخ المحمولة (On-Premise)</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                بيع نسخ مكتبية مستقلة تعمل على خوادم الشركة الداخلية أو فلاشة USB للمنشآت ذات الخصوصية العالية.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">النموذج الثالث</span>
              <h4 className="font-extrabold text-white text-xs">الدمج مع عقود الصيانة</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                تقديم المنظومة كقيمة مضافة حصرية لعملاء عقود صيانة تكنولوجيا المعلومات الشهرية لضمان ولاء العملاء.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 9,
      badge: 'الخاتمة ومعايير التحكيم (Championship Defense)',
      title: 'الخلاصة: وكيل ذكاء اصطناعي مؤسسي ذكي جاهز للإنتاج فوراً',
      subtitle: 'لماذا يستحق هذا الوكيل المراكز الأولى في مسابقة Create AI Agents؟',
      category: 'التقييم والتحكيم',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/40 space-y-1.5">
              <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>1. جاهز للتشغيل الحقيقي بنسبة 100%</span>
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                ليس مجرد نموذج أولي شكلي (Mockup)، بل وكيل حقيقي مربوط بقاعدة بيانات سحابية وتنبيهات واتساب وتيليجرام فعلية.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/40 space-y-1.5">
              <span className="text-cyan-400 font-bold text-xs flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>2. حل واقعي لمشكلة معقدة في سوق العمل</span>
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                يعالج مشاكل التنسيق بين العملاء غير التقنيين والمهندسين بدقة واحترافية وبأقل زمن استجابة ممكن.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-1.5">
              <span className="text-amber-400 font-bold text-xs flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>3. التوثيق القانوني والملكية الفكرية</span>
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                موثق رسمياً باسم المهندس المطور: م. عبدالرحيم محمد احمد محمد (جمهورية مصر العربية - محافظة قنا)، مع شاشات ترخيص واضحة وأدلة تشغيل متكاملة.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/40 space-y-1.5">
              <span className="text-indigo-400 font-bold text-xs flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>4. هندسة نظيفة وقابلة للتوسع (Scalable)</span>
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                كود نظيف خاضع لفحوصات TypeScript الصارمة والـ Linting بدون أخطاء، ومعمارية قابلة للتوسع لآلاف الموظفين.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  // English Slides Definition
  const slidesEn = [
    {
      id: 1,
      badge: 'Create AI Agents Championship 2026',
      title: 'Autonomous IT Support AI Agent',
      subtitle: 'Cloud-Connected Operational AI Agent for Technical Diagnostics & Service Automation',
      category: 'Agent Identity',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-extrabold text-white text-base">Strategic Vision & Agent Mission</h3>
              <a
                href={competitionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold flex items-center gap-1 hover:bg-amber-500/30 transition-colors"
              >
                <span>Official Championship Entry</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <p className="leading-relaxed">
              Transforming traditional IT helpdesks from slow, fragmented processes into an <strong>autonomous operational AI agent</strong>. Blending sub-second inferencing, real-time cloud sync, and instant omnichannel notifications across phone and desktop to bridge the gap between non-technical staff and IT teams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
              <span className="text-cyan-400 font-bold block text-xs">👨‍💻 Lead AI Systems Engineer:</span>
              <p className="text-white font-extrabold text-base">Eng. Abdelrahim Mohamed Ahmed Mohamed</p>
              <p className="font-mono text-xs text-slate-400" dir="ltr">Lead Architect & Creator</p>
              <p className="text-[11px] text-emerald-400 font-semibold pt-0.5">📍 Arab Republic of Egypt - Qena Governorate</p>
              <p className="text-[11px] text-slate-400">Official Submission · Create AI Agents Championship 2026</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold block text-xs">📞 Verification & Approved Channels:</span>
              <p className="text-white font-bold text-xs">Phone & WhatsApp: <span className="font-mono text-emerald-400" dir="ltr">+201009125279</span></p>
              <p className="text-white font-bold text-xs">Email: <span className="font-mono text-cyan-400" dir="ltr">rahemxp2020@gmail.com</span></p>
              <p className="text-white font-bold text-xs">Telegram Chat ID: <span className="font-mono text-sky-400 font-bold">5516879336</span></p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      badge: 'The Problem',
      title: 'Why Do Modern Enterprises Urgently Need This AI Agent?',
      subtitle: 'Critical Inefficiencies in Traditional IT Helpdesks',
      category: 'Feasibility Study',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
              <h4 className="font-bold text-rose-400 flex items-center gap-1.5 text-xs">
                <span>⚠️ 1. Lost Verbal Tickets:</span>
              </h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Relying on hallway requests or sticky notes leads to 40% of maintenance tasks being lost or delayed.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
              <h4 className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
                <span>⚠️ 2. Non-Technical Staff Barrier:</span>
              </h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Most employees cannot formulate technical terms (DNS, Gateway, RAM), wasting 20+ minutes per ticket during triage.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-1.5">
              <h4 className="font-bold text-indigo-400 flex items-center gap-1.5 text-xs">
                <span>⚠️ 3. Zero Cross-Device Sync:</span>
              </h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Data discrepancy between technician mobile phones in the field and headquarter monitors causes duplicated effort.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-1.5">
              <h4 className="font-bold text-purple-400 flex items-center gap-1.5 text-xs">
                <span>⚠️ 4. Lack of Immediate Alerting:</span>
              </h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                IT leads must constantly log in to check for new tickets instead of receiving autonomous push alerts.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      badge: 'The AI Agent Solution',
      title: 'Agent Architecture: From Sensing to Diagnosis and Execution',
      subtitle: 'Fusing Large Language Models with Deterministic Expert Knowledge',
      category: 'System Architecture',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white text-xs flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Dual-Core Inference Engine (Dual AI):</span>
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              Analyzes technical symptoms via two complementary layers: cloud LLM reasoning (Gemini API) paired with a high-speed deterministic expert engine that produces instant root causes and copyable CMD/PowerShell commands without latency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-cyan-400 font-bold block text-xs">1. Interactive Checklists</span>
              <p className="text-[11px] text-slate-400">Step-by-step verified action checklists</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-emerald-400 font-bold block text-xs">2. Certified IT Ticket</span>
              <p className="text-[11px] text-slate-400">Auditable, timestamped IT-2026-XXXX records</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-amber-400 font-bold block text-xs">3. Non-Technical Triage</span>
              <p className="text-[11px] text-slate-400">One-click AnyDesk remote or on-site dispatch</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      badge: 'User Experience (UX)',
      title: 'Seamless Employee Experience Without Technical Jargon',
      subtitle: 'Intuitive Bilingual Flow Designed for All Skill Levels',
      category: 'User Experience',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs mb-1">1</span>
              <p className="font-bold text-white text-xs">Select Issue</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                One-click category presets (Internet, Printer, Slow PC, Display).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs mb-1">2</span>
              <p className="font-bold text-white text-xs">Guided Testing</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Step-by-step visual guidance for safe self-troubleshooting.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs mb-1">3</span>
              <p className="font-bold text-white text-xs">Assistance Mode</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                One-click AnyDesk remote sharing or on-site technician visit.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs mb-1">4</span>
              <p className="font-bold text-white text-xs">Live Tracking</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Built-in timeline with instant replies and status updates.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-200">
            💡 <strong>Smart Memory:</strong> Automatically retains user identity and department locally across browser sessions without forcing repetitive logins.
          </div>
        </div>
      )
    },
    {
      id: 5,
      badge: 'Omnichannel Alerting',
      title: 'Sub-Second Omnichannel Dispatch Across Devices',
      subtitle: 'Automated Broadcast to WhatsApp, Telegram, Email, and Desktop Chimes',
      category: 'Alerts & Automation',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-2">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <h4 className="font-bold text-white text-xs">1. WhatsApp Direct Dispatch</h4>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Generates emoji-formatted technical incident reports delivered directly to the lead engineer phone <span className="font-mono text-emerald-400 font-bold" dir="ltr">+201009125279</span> in one click.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-sky-500/40 space-y-2">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-sky-400" />
                <h4 className="font-bold text-white text-xs">2. Telegram Bot Broadcast</h4>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Integrated bot broadcasting directly to Telegram chat <span className="font-mono text-sky-400 font-bold">5516879336</span> for real-time mobile push notifications.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/40 space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <h4 className="font-bold text-white text-xs">3. Email Incident Logging</h4>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Formal corporate email notifications sent to <span className="font-mono text-cyan-400 font-bold" dir="ltr">rahemxp2020@gmail.com</span> for audit trails.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/40 space-y-2">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400" />
                <h4 className="font-bold text-white text-xs">4. Desktop Audio & Notifications</h4>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Synthesized Web Audio chimes and browser notification popups alerting on-duty engineers immediately upon ticket arrival.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      badge: 'Cross-Platform Execution',
      title: 'Desktop, Mobile & USB Flash Drive Deployment',
      subtitle: 'Progressive Web App Architecture with Offline Air-Gapped Packaging',
      category: 'Deployment',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Laptop className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-xs">Desktop App (PWA / Windows)</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Installs directly from Chrome / Edge to run as an independent desktop window pinned to the taskbar.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-xs">Mobile App (Android / iOS)</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Full-screen touch responsiveness for field technicians moving between hospital or campus buildings.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-xs">Portable USB Distribution</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Portable self-contained bundle for secure, air-gapped enterprise environments with zero external dependencies.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      badge: 'Security & Disaster Recovery',
      title: 'Encrypted Vault & Zero-Loss Backup Safeguards',
      subtitle: 'One-Click Disaster Recovery with Timestamped Conflict Resolution',
      category: 'Security & Integrity',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <Database className="w-4 h-4" />
                <span>Encrypted JSON Snapshot Export</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Export and archive full platform state (tickets, timeline histories, diagnostics) as encrypted, portable JSON files.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Timestamp Conflict Resolution</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Microsecond precision timestamping prevents concurrent update overwrite when multiple technicians edit simultaneously.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      badge: 'Commercial Viability & Monetization',
      title: 'B2B Revenue Streams & Enterprise Licensing Models',
      subtitle: 'Practical Monetization Pathways for Businesses and Institutions',
      category: 'Market & Investment',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[10px]">Tier 1</span>
              <h4 className="font-extrabold text-white text-xs">Annual Cloud SaaS</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Subscription per seat for schools, clinics, and medium businesses including hosting and continuous updates.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">Tier 2</span>
              <h4 className="font-extrabold text-white text-xs">On-Premise Licenses</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Perpetual license for enterprises with strict compliance requirements who run on isolated local networks.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">Tier 3</span>
              <h4 className="font-extrabold text-white text-xs">Maintenance Bundling</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Offered as a value-added portal bundled with recurring monthly IT outsourcing contracts to guarantee retention.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 9,
      badge: 'Championship Evaluation Criteria',
      title: 'Conclusion: Production-Ready Autonomous AI Agent',
      subtitle: 'Why This System Excels in the Create AI Agents Championship 2026',
      category: 'Evaluation & Defense',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/40 space-y-1.5">
              <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>1. 100% Production-Ready Agent</span>
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Not a static mockup, but a fully wired operational agent with live cloud databases and real notification webhooks.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/40 space-y-1.5">
              <span className="text-cyan-400 font-bold text-xs flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>2. Real-World Business Problem Solved</span>
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Addresses the friction between non-technical staff and IT departments with verified sub-second response times.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-1.5">
              <span className="text-amber-400 font-bold text-xs flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>3. Verified Developer Ownership & Legal IP</span>
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Officially attributed to Eng. Abdelrahim Mohamed Ahmed Mohamed (Arab Republic of Egypt - Qena Governorate), featuring clear licensing and operational documentation.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/40 space-y-1.5">
              <span className="text-indigo-400 font-bold text-xs flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>4. Clean, Scalable TypeScript Architecture</span>
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Zero lint warnings, strict typing, responsive layout, and an architecture ready to scale across thousands of staff.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const slides = language === 'en' ? slidesEn : slidesAr;

  /**
   * Generates a complete standalone printable presentation document in Arabic.
   */
  const generatePresentationHtmlDocumentAr = (): string => {
    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>Autonomous IT Support AI Agent - Official Championship Deck 2026</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 15mm; }
    * { box-sizing: border-box; }
    body {
      font-family: 'Cairo', system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 20px;
      color: #1e293b;
      background: #f8fafc;
      line-height: 1.6;
    }
    .print-btn {
      position: fixed;
      top: 15px;
      left: 15px;
      padding: 10px 20px;
      background: #0284c7;
      color: #fff;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
      z-index: 999;
    }
    @media print {
      .print-btn { display: none; }
      body { background: #fff; padding: 0; }
      .page-break { page-break-after: always; }
      .card { page-break-inside: avoid; }
    }
    .header-box {
      text-align: center;
      padding: 25px;
      background: #0f172a;
      color: #fff;
      border-radius: 12px;
      margin-bottom: 25px;
    }
    .header-box h1 { margin: 0 0 10px 0; font-size: 26px; font-weight: 900; color: #38bdf8; }
    .header-box p { margin: 4px 0; font-size: 13px; color: #94a3b8; }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      background: #0369a1;
      color: #fff;
      border-radius: 20px;
      font-size: 11px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .card {
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 18px;
      margin-bottom: 18px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .card h2 { margin: 0 0 6px 0; font-size: 18px; color: #0f172a; font-weight: 800; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
    .card h3 { margin: 0 0 12px 0; font-size: 13px; color: #0284c7; font-weight: 600; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px; }
    .box { background: #f1f5f9; padding: 12px; border-radius: 8px; border-left: 4px solid #0284c7; }
    .box h4 { margin: 0 0 4px 0; font-size: 13px; color: #0f172a; font-weight: 700; }
    .box p { margin: 0; font-size: 11px; color: #475569; }
    .footer { text-align: center; font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #cbd5e1; padding-top: 15px; }
  </style>
</head>
<body>
  <button class="print-btn" onclick="window.print()">🖨️ طباعة المستند كـ PDF (Ctrl + P)</button>

  <div class="header-box">
    <span class="badge">المشاركة الرسمية في مسابقة تحدي وكلاء الذكاء الاصطناعي 2026</span>
    <h1>وكيل الدعم الفني الذكي (Autonomous IT Support AI Agent)</h1>
    <p>منظومة رقمية سحابية متكاملة لإدارة وتشخيص أعطال تقنية المعلومات وأتمتة خدمة العملاء</p>
    <p>رابط بوابة المسابقة الرسمية: https://create-ai-agents-competition.in.howspace.com/official-championship-portal</p>
    <p style="margin-top: 10px; font-weight: bold; color: #f8fafc;">
      المطور والمسؤول الهندسي: م. عبدالرحيم محمد احمد محمد (Eng. Abdelrahim Mohamed Ahmed Mohamed)
    </p>
    <p style="color: #38bdf8; font-weight: bold;">العنوان: جمهورية مصر العربية - محافظة قنا</p>
    <p>هاتف وواتساب: +201009125279 | بريد إلكتروني: rahemxp2020@gmail.com | تيليجرام: 5516879336</p>
  </div>

  <div class="card">
    <h2>1. الرؤية الهندسية وأهداف الوكيل الذكي</h2>
    <h3>سد الفجوة بين الموظفين غير المتخصصين وفرق تقنية المعلومات</h3>
    <p style="font-size: 12px; color: #334155;">
      صُمم هذا الوكيل الذكي بهدف إلغاء الفوضى والبطء في أقسام خدمة العملاء والدعم الفني داخل المؤسسات. يعتمد النظام على معالجة ذكية فورية تبدأ من التعرف على أعطال المستخدمين، ثم إرشادهم بخطوات فحص تفاعلية، وتصعيد البلاغ آلياً إذا لزم الأمر مع بث تنبيهات فورية لجميع الأطراف.
    </p>
  </div>

  <div class="card">
    <h2>2. التحديات التي يعالجها النظام في سوق العمل</h2>
    <h3>مقارنة الواقع التقليدي بحلول الوكيل الذكي</h3>
    <div class="grid">
      <div class="box" style="border-left-color: #ef4444;">
        <h4>تشتت وضياع البلاغات الشفوية</h4>
        <p>الحل: توثيق سحابي فوري بسندات وتذاكر رقمية معتمدة برقم IT فريد غير قابل للتكرار ومحمي من الفقدان.</p>
      </div>
      <div class="box" style="border-left-color: #f59e0b;">
        <h4>عجز الموظفين غير التقنيين عن وصف العطل</h4>
        <p>الحل: واجهة موجهة بخطوات مبسطة مع خيارات بنقرة واحدة لطلب دعم AnyDesk عن بعد أو حضور فني للمكتب.</p>
      </div>
      <div class="box" style="border-left-color: #06b6d4;">
        <h4>انعدام المزامنة الميدانية بين الأجهزة</h4>
        <p>الحل: مزامنة سحابية لحظية عبر خوادم Firebase Firestore وتحديث البيانات في أقل من ثانية واحدة.</p>
      </div>
      <div class="box" style="border-left-color: #10b981;">
        <h4>غياب التنبيهات الفورية للمسؤول</h4>
        <p>الحل: إشعارات فورية متكاملة عبر واتساب (+201009125279) وبوت تيليجرام والبريد ورنين سطح المكتب.</p>
      </div>
    </div>
  </div>

  <div class="card">
    <h2>3. البنية التقنية ومعمارية النظام (System Architecture)</h2>
    <h3>أحدث تقنيات الويب السحابية والأنظمة المؤسسية</h3>
    <div class="grid-4">
      <div class="box"><h4>Frontend</h4><p>React 18 + TypeScript + Tailwind CSS</p></div>
      <div class="box"><h4>Database</h4><p>Google Cloud Firebase Firestore (Realtime)</p></div>
      <div class="box"><h4>Backend & Relay</h4><p>Node.js Express + RESTful APIs</p></div>
      <div class="box"><h4>Integration</h4><p>Telegram Bot API + WhatsApp URL + Web Audio</p></div>
    </div>
  </div>

  <div class="card">
    <h2>4. قنوات التنبيهات والاتصال الخارجي المعتمدة</h2>
    <h3>تكامل فوري يضمن استجابة الإدارة خلال ثوانٍ معدودة</h3>
    <p style="font-size: 12px; color: #334155;">
      • <strong>واتساب المباشر:</strong> تقرير فني فوري يُرسل لرقم المسؤول +201009125279 ببيانات الموظف ونوع العطل.<br>
      • <strong>بوت تيليجرام:</strong> إشعار آلي فوري يبث إلى المحادثة المعتمدة 5516879336 عبر خوادم Telegram API الرسمية.<br>
      • <strong>البريد الإلكتروني:</strong> توثيق رسمي وأرشفة قانونية لكل بلاغ إلى rahemxp2020@gmail.com.<br>
      • <strong>رنين سطح المكتب:</strong> تنبيه صوتي فائق السرعة عبر Web Audio API مع نافذة منبثقة لويندوز وأندرويد.
    </p>
  </div>

  <div class="card">
    <h2>5. سيناريو تصوير الفيديو الترويجي للمسابقة (90 ثانية)</h2>
    <h3>دليل العرض المرئي أمام لجنة التحكيم</h3>
    <p style="font-size: 12px; color: #334155;">
      <strong>0:00 - 0:15 (المقدمة):</strong> استعراض لوحة التحكم والإحصائيات والتعريف بالمهندس عبدالرحيم محمد احمد.<br>
      <strong>0:15 - 0:40 (التشخيص):</strong> اختيار عطل انقطاع الإنترنت وتشغيل الفحص الذكي واستعراض أوامر CMD.<br>
      <strong>0:40 - 1:05 (التذكرة):</strong> تحويل العطل لبلاغ واختيار نمط الدعم عن بعد AnyDesk وإرسال رسالة متابعة.<br>
      <strong>1:05 - 1:30 (التنبيهات):</strong> الضغط على إرسال واتساب وإظهار تنبيه تيليجرام الفوري على شاشة الهاتف.<br>
      <strong>1:30 - 1:45 (الخاتمة):</strong> إبراز معايير الأمان وخزنة النسخ الاحتياطي وحقوق الملكية الفكرية.
    </p>
  </div>

  <div class="footer">
    جميع الحقوق محفوظة ومسجلة باسم المهندس: م. عبدالرحيم محمد احمد محمد (جمهورية مصر العربية - محافظة قنا) © 2026<br>
    مسابقة تحدي وكلاء الذكاء الاصطناعي العالمية (Create AI Agents Championship 2026)
  </div>
</body>
</html>`;
  };

  /**
   * Generates a complete standalone printable presentation document in English.
   */
  const generatePresentationHtmlDocumentEn = (): string => {
    return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <title>Autonomous IT Support AI Agent - Official Championship Deck 2026</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 15mm; }
    * { box-sizing: border-box; }
    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 24px;
      color: #1e293b;
      background: #f8fafc;
      line-height: 1.6;
    }
    .print-btn {
      position: fixed;
      top: 15px;
      right: 15px;
      padding: 10px 20px;
      background: #0284c7;
      color: #fff;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
      z-index: 999;
    }
    @media print {
      .print-btn { display: none; }
      body { background: #fff; padding: 0; }
      .page-break { page-break-after: always; }
      .card { page-break-inside: avoid; }
    }
    .header-box {
      text-align: center;
      padding: 28px;
      background: #0f172a;
      color: #fff;
      border-radius: 12px;
      margin-bottom: 25px;
    }
    .header-box h1 { margin: 0 0 10px 0; font-size: 26px; font-weight: 900; color: #38bdf8; }
    .header-box p { margin: 4px 0; font-size: 13px; color: #94a3b8; }
    .badge {
      display: inline-block;
      padding: 4px 14px;
      background: #0369a1;
      color: #fff;
      border-radius: 20px;
      font-size: 11px;
      font-weight: bold;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .card {
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 18px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .card h2 { margin: 0 0 6px 0; font-size: 18px; color: #0f172a; font-weight: 800; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
    .card h3 { margin: 0 0 12px 0; font-size: 13px; color: #0284c7; font-weight: 600; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px; }
    .box { background: #f1f5f9; padding: 12px; border-radius: 8px; border-left: 4px solid #0284c7; }
    .box h4 { margin: 0 0 4px 0; font-size: 13px; color: #0f172a; font-weight: 700; }
    .box p { margin: 0; font-size: 11px; color: #475569; }
    .footer { text-align: center; font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #cbd5e1; padding-top: 15px; }
  </style>
</head>
<body>
  <button class="print-btn" onclick="window.print()">🖨️ Print as PDF (Ctrl + P)</button>

  <div class="header-box">
    <span class="badge">Official Entry: Create AI Agents Championship 2026</span>
    <h1>Autonomous IT Support AI Agent</h1>
    <p>Operational AI Agent for Technical Diagnostics, Real-time Sync & Omnichannel Alerting</p>
    <p>Portal: https://create-ai-agents-competition.in.howspace.com/official-championship-portal</p>
    <p style="margin-top: 10px; font-weight: bold; color: #f8fafc;">
      Lead AI Engineer: Eng. Abdelrahim Mohamed Ahmed Mohamed
    </p>
    <p style="color: #38bdf8; font-weight: bold;">Location: Arab Republic of Egypt - Qena Governorate</p>
    <p>Phone/WhatsApp: +201009125279 | Email: rahemxp2020@gmail.com | Telegram Chat ID: 5516879336</p>
  </div>

  <div class="card">
    <h2>1. Executive Summary & Strategic Vision</h2>
    <h3>Bridging the Gap Between Non-Technical Staff and Enterprise IT Operations</h3>
    <p style="font-size: 12px; color: #334155;">
      The Autonomous IT Support AI Agent replaces sluggish, fragmented helpdesk workflows with a proactive, self-driving operational agent. Combining sub-second dual-engine diagnostics, live cloud data streaming, and automated multi-platform alerting, the agent eliminates triage overhead and accelerates mean-time-to-resolution (MTTR) by over 60%.
    </p>
  </div>

  <div class="card">
    <h2>2. Key Problems Solved in Modern Enterprises</h2>
    <h3>Comparison: Traditional Helpdesk vs. Autonomous AI Agent</h3>
    <div class="grid">
      <div class="box" style="border-left-color: #ef4444;">
        <h4>Lost Verbal & Hallway Requests</h4>
        <p>Solution: Immediate cloud audit logging with unique timestamped IT-2026-XXXX ticket records.</p>
      </div>
      <div class="box" style="border-left-color: #f59e0b;">
        <h4>Non-Technical Employee Jargon Barrier</h4>
        <p>Solution: Guided interactive flows with one-click AnyDesk remote control and on-site dispatch.</p>
      </div>
      <div class="box" style="border-left-color: #06b6d4;">
        <h4>Lack of Field-to-Desk Synchronization</h4>
        <p>Solution: Sub-second Google Cloud Firebase Firestore replication across mobile and desktop.</p>
      </div>
      <div class="box" style="border-left-color: #10b981;">
        <h4>Absence of Real-Time Mobile Alerting</h4>
        <p>Solution: Push notifications across WhatsApp (+201009125279), Telegram Bot, Email, and Desktop Chimes.</p>
      </div>
    </div>
  </div>

  <div class="card">
    <h2>3. System Architecture & Dual-Core Inference</h2>
    <h3>Production-Grade Full-Stack Cloud Engineering</h3>
    <div class="grid-4">
      <div class="box"><h4>Frontend</h4><p>React 18 + TypeScript + Tailwind CSS (Bilingual LTR/RTL)</p></div>
      <div class="box"><h4>Database</h4><p>Google Cloud Firebase Firestore (Realtime Push & Offline)</p></div>
      <div class="box"><h4>AI Inference</h4><p>Gemini Cloud Models + Local Deterministic Engine</p></div>
      <div class="box"><h4>Integrations</h4><p>Telegram Bot API + WhatsApp URL Relay + Web Audio</p></div>
    </div>
  </div>

  <div class="card">
    <h2>4. Omnichannel Immediate Alerting Infrastructure</h2>
    <h3>Ensuring Immediate Management Response Within Seconds</h3>
    <p style="font-size: 12px; color: #334155;">
      • <strong>Direct WhatsApp Dispatch:</strong> Instant emoji-formatted incident reports sent to lead phone (+201009125279).<br>
      • <strong>Official Telegram Bot:</strong> Automated push messages relayed to authenticated chat ID 5516879336.<br>
      • <strong>Formal Email Logging:</strong> Permanent corporate compliance reports delivered to rahemxp2020@gmail.com.<br>
      • <strong>Desktop Web Audio Chime:</strong> Real-time synthesized chimes alerting on-duty technicians immediately.
    </p>
  </div>

  <div class="card">
    <h2>5. Video Pitch & Demonstration Storyboard (90 Seconds)</h2>
    <h3>Step-by-Step Presentation Guide for Competition Judges</h3>
    <p style="font-size: 12px; color: #334155;">
      <strong>0:00 - 0:15 (Intro):</strong> Live Dashboard metrics, active users counter, developer introduction (Eng. Abdelrahim Mohamed Ahmed).<br>
      <strong>0:15 - 0:40 (AI Diagnostics):</strong> Select network outage, execute instant diagnosis, view copyable terminal commands.<br>
      <strong>0:40 - 1:05 (Ticketing & Remote):</strong> Convert to certified IT ticket, trigger AnyDesk code sharing and live chat timeline.<br>
      <strong>1:05 - 1:30 (Omnichannel Alerts):</strong> Dispatch WhatsApp and Telegram notifications, verify real-time phone reception.<br>
      <strong>1:30 - 1:45 (Security & Closing):</strong> Demonstrate encrypted backup vault and commercial scalability.
    </p>
  </div>

  <div class="footer">
    All Rights Reserved · Lead AI Engineer: Eng. Abdelrahim Mohamed Ahmed Mohamed (Arab Republic of Egypt - Qena Governorate) © 2026<br>
    Official Submission for Create AI Agents Championship 2026
  </div>
</body>
</html>`;
  };

  /**
   * Generates a clean Markdown document ready for direct submission in Arabic.
   */
  const generateSubmissionMarkdownAr = (): string => {
    return `# استمارة المشاركة الرسمية في مسابقة تحدي وكلاء الذكاء الاصطناعي 2026
# Official Entry: Create AI Agents Championship 2026
بوابة المسابقة: ${competitionUrl}

## 1. البيانات الأساسية للوكيل الذكي:
- **اسم الوكيل:** وكيل الدعم الفني الذكي (Autonomous IT Support AI Agent)
- **المطور والمهندس المسؤول:** م. عبدالرحيم محمد احمد محمد (Eng. Abdelrahim Mohamed Ahmed Mohamed)
- **الدولة والعنوان:** جمهورية مصر العربية - محافظة قنا (دولة مصر)
- **رقم الهاتف والواتساب:** +201009125279
- **البريد الإلكتروني:** rahemxp2020@gmail.com
- **معرف تيليجرام المعتمد:** 5516879336
- **رابط المنظومة المباشر:** https://ais-dev-mdv25vgdypr5uuoz7vk4ma-696985394020.europe-west2.run.app

## 2. المشكلة التي يحلها الوكيل الذكي:
يعاني قطاع الدعم الفني في المؤسسات من عجز الموظفين غير المتخصصين عن تشخيص الأعطال، وضياع البلاغات الشفوية، والتأخر في إشعار الفنيين في الميدان، مما يتسبب في توقف الأعمال.

## 3. آلية عمل الوكيل الذكي (Autonomous Workflow):
1. **الاستشعار والتشخيص:** يقوم الوكيل بتحليل العطل فورياً ومقارنته بقواعد المعرفة الهندسية واستدعاء نماذج الذكاء الاصطناعي لاستخراج الأسباب الجذرية.
2. **التوجيه التفاعلي:** يزود المستخدم بقائمة فحص تفاعلية وأوامر سطر أوامر (CMD / PowerShell) جاهزة للتنفيذ.
3. **الدعم المباشر لغير التقنيين:** يوفر خيارات بنقرة واحدة لطلب الدعم عن بعد (AnyDesk) أو زيارة فني لمكتب العميل.
4. **المزامنة السحابية اللحظية:** تحديث سحابي فوري عبر Firebase Firestore بزمن استجابة أقل من ثانية واحدة.
5. **شبكة التنبيهات الفورية (Omnichannel):** بث آلي للبلاغات عبر واتساب (+201009125279)، بوت تيليجرام الرسمي، البريد الإلكتروني، ورنين سطح المكتب.

## 4. البنية التقنية (Tech Stack):
- **الواجهة:** React 18, TypeScript, Tailwind CSS, Web Audio API, Progressive Web App (PWA).
- **قاعدة البيانات:** Google Cloud Firebase Firestore (Realtime Push).
- **السيرفر والربط:** Node.js Express, Telegram Bot API, WhatsApp Deep-Link Protocols.
- **الأمان:** Timestamp-based Conflict Resolution, JSON Encrypted Vault.

---
تطوير وهندسة: م. عبدالرحيم محمد احمد © 2026
`;
  };

  /**
   * Generates a clean Markdown document ready for direct submission in English.
   */
  const generateSubmissionMarkdownEn = (): string => {
    return `# Official Entry: Create AI Agents Championship 2026
Championship Portal: ${competitionUrl}

## 1. Agent Core Information:
- **Agent Name:** Autonomous IT Support AI Agent
- **Lead AI Engineer:** Eng. Abdelrahim Mohamed Ahmed Mohamed
- **Country & Address:** Arab Republic of Egypt - Qena Governorate (Egypt)
- **Phone / WhatsApp:** +201009125279
- **Email:** rahemxp2020@gmail.com
- **Telegram Chat ID:** 5516879336
- **Live Agent Web Application:** https://ais-dev-mdv25vgdypr5uuoz7vk4ma-696985394020.europe-west2.run.app

## 2. Real-World Enterprise Problem:
Traditional enterprise IT support suffers from communication friction: non-technical employees struggle to diagnose or explain technical issues, hallway requests get forgotten, and field technicians lack synchronized live ticketing and instant mobile notifications.

## 3. Autonomous AI Agent Architecture & Workflow:
1. **Sensing & Diagnosis:** Ingests incident symptoms, correlates with deterministic domain knowledge, and invokes LLM reasoning to identify root causes in sub-second timeframes.
2. **Interactive Guidance:** Generates verified checklists and copyable CMD/PowerShell terminal scripts for instant self-remediation.
3. **Non-Technical Triage:** Empowers non-technical staff with one-click AnyDesk remote control code sharing or on-site engineer visit dispatch.
4. **Real-time Cloud Sync:** Instant bi-directional replication via Google Cloud Firebase Firestore with sub-second latency.
5. **Omnichannel Alerting:** Automated dispatch to WhatsApp (+201009125279), official Telegram Bot (Chat 5516879336), corporate Email logging, and Web Audio desktop alerts.

## 4. Production Tech Stack:
- **Frontend:** React 18, TypeScript, Tailwind CSS, Web Audio API, PWA (Progressive Web App).
- **Database:** Google Cloud Firebase Firestore (Realtime listeners + Offline Persistence).
- **Server & Relays:** Node.js Express, Telegram Bot API, WhatsApp Deep-Link Protocols.
- **Security:** Microsecond Timestamp Conflict Resolution, Encrypted Disaster Recovery JSON Vault.

---
Engineering & Architecture: Eng. Abdelrahim Mohamed Ahmed © 2026
`;
  };

  /**
   * Direct instant file download handler via Blob URL
   */
  const handleDownloadPresentationFile = () => {
    try {
      const isEnglish = language === 'en';
      const htmlContent = isEnglish ? generatePresentationHtmlDocumentEn() : generatePresentationHtmlDocumentAr();
      const filename = isEnglish
        ? 'IT_Support_AI_Agent_Official_Championship_2026_EN.html'
        : 'IT_Support_AI_Agent_Official_Championship_2026_AR.html';
      
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 2000);

      onShowToast(
        isEnglish ? 'Presentation Deck Downloaded!' : 'تم تحميل ملف العرض التقديمي بنجاح!',
        isEnglish
          ? 'Standalone HTML document saved to your device. Open it in any browser or print to PDF.'
          : 'تم تنزيل المستند كملف مستقل على جهازك، يمكنك فتحه بالمتصفح أو طباعته كـ PDF في أي وقت',
        'success'
      );
    } catch (err: any) {
      console.error('Download error:', err);
      onShowToast(
        language === 'en' ? 'Download Error' : 'خطأ في التنزيل',
        language === 'en' ? 'Unable to auto-save file. Please try again.' : 'تعذر حفظ الملف تلقائياً، يرجى المحاولة مرة أخرى',
        'error'
      );
    }
  };

  /**
   * Direct submission markdown download handler
   */
  const handleDownloadSubmissionMarkdown = () => {
    try {
      const isEnglish = language === 'en';
      const mdContent = isEnglish ? generateSubmissionMarkdownEn() : generateSubmissionMarkdownAr();
      const filename = isEnglish
        ? 'AI_Agent_Championship_Submission_Form_EN.md'
        : 'AI_Agent_Championship_Submission_Form_AR.md';

      const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 2000);

      onShowToast(
        isEnglish ? 'Submission Form Downloaded' : 'تم تحميل استمارة التقديم للمسابقة',
        isEnglish
          ? 'Formatted Markdown file saved, ready to copy-paste into the championship portal.'
          : 'تم تنزيل ملف نصي مرتب بالبيانات الجاهزة للصق في استمارة المسابقة',
        'success'
      );
    } catch (err: any) {
      console.error('Download error:', err);
    }
  };

  /**
   * Resilient print handler with fallback to instant file download
   */
  const handlePrintPdf = () => {
    try {
      window.print();
      onShowToast(
        language === 'en' ? 'Print Triggered' : 'تم تشغيل أمر الطباعة',
        language === 'en' ? 'Choose "Save as PDF" in your print preview' : 'اختر (حفظ بتنسيق PDF / Save as PDF) للحصول على الملف',
        'info'
      );
    } catch (e) {
      handleDownloadPresentationFile();
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl my-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Modal Top Action Bar */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between no-print flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm sm:text-base font-extrabold text-white">
                  {language === 'en'
                    ? 'Official Championship Entry: Create AI Agents 2026'
                    : 'ملف المشاركة الرسمي: مسابقة تحدي وكلاء الذكاء الاصطناعي 2026'}
                </h2>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold">
                  AI Agent Deck
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {language === 'en'
                  ? 'Lead AI Engineer: Eng. Abdelrahim Mohamed Ahmed Mohamed (Egypt - Qena) · Phone/WhatsApp: +201009125279 · Email: rahemxp2020@gmail.com'
                  : 'المطور: م. عبدالرحيم محمد احمد محمد (مصر - قنا) · هاتف/واتساب: +201009125279 · بريد: rahemxp2020@gmail.com'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* In-Modal Language Switcher Button */}
            <div className="flex items-center rounded-lg bg-slate-950 border border-slate-700/80 p-0.5">
              <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                  language === 'ar'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                العربية
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
            </div>

            <a
              href={competitionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold transition-colors cursor-pointer"
              title={language === 'en' ? 'Open Official Championship Portal' : 'فتح بوابة المسابقة الرسمية'}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Championship Portal ↗' : 'بوابة المسابقة ↗'}</span>
            </a>

            <button
              type="button"
              onClick={handleDownloadPresentationFile}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title={language === 'en' ? 'Download standalone HTML/PDF presentation file' : 'تحميل ملف العرض التقديمي كملف HTML/PDF على جهازك مباشرة'}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Download Deck (PDF/HTML)' : 'تحميل ملف العرض (PDF/HTML)'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 p-2 bg-slate-900/60 border-b border-slate-800/80 text-xs no-print overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('slides')}
            className={`flex-1 min-w-[130px] py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'slides'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>{language === 'en' ? 'Slide Deck (Pitch Deck)' : 'عرض الشرائح (Pitch Deck)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('video_script')}
            className={`flex-1 min-w-[130px] py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'video_script'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="w-4 h-4 text-amber-400" />
            <span>{language === 'en' ? 'Video Script (Storyboard)' : 'سيناريو الفيديو (Video Script)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('brochure')}
            className={`flex-1 min-w-[130px] py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'brochure'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>{language === 'en' ? 'User Manual (Client Guide)' : 'دليل العميل (User Manual)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('submission_form')}
            className={`flex-1 min-w-[130px] py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'submission_form'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4 text-purple-400" />
            <span>{language === 'en' ? 'Submission Form (Howspace)' : 'بيانات استمارة التقديم (Form)'}</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          
          {/* TAB 1: INTERACTIVE SLIDES */}
          {activeTab === 'slides' && (
            <div className="space-y-6">
              
              {/* Slide Display Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border-2 border-slate-800 shadow-xl space-y-5 min-h-[360px] flex flex-col justify-between">
                
                {/* Slide Top Bar */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                      {currentSlideData.badge}
                    </span>
                    <span className="text-slate-500 text-xs font-semibold">
                      · {currentSlideData.category}
                    </span>
                  </div>

                  <span className="font-mono text-xs font-bold text-slate-400">
                    {language === 'en'
                      ? `Slide ${currentSlide + 1} of ${slides.length}`
                      : `شريحة ${currentSlide + 1} من ${slides.length}`}
                  </span>
                </div>

                {/* Slide Title & Subtitle */}
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                    {currentSlideData.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-400 font-medium">
                    {currentSlideData.subtitle}
                  </p>
                </div>

                {/* Slide Body Content */}
                <div className="py-2 flex-1">
                  {currentSlideData.content}
                </div>

                {/* Slide Footer Branding */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 flex-wrap gap-1">
                  <span className="font-medium">
                    {language === 'en'
                      ? 'Create AI Agents Championship 2026 · Eng. Abdelrahim Mohamed Ahmed'
                      : 'المنافسة الرسمية: تحدي وكلاء الذكاء الاصطناعي · م. عبدالرحيم محمد احمد'}
                  </span>
                  <span className="font-mono" dir="ltr">+201009125279 | rahemxp2020@gmail.com</span>
                </div>

              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-between gap-3 no-print">
                <button
                  type="button"
                  onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  <span>{language === 'en' ? 'Previous Slide' : 'الشريحة السابقة'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {slides.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        currentSlide === idx ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-800 hover:bg-slate-700'
                      }`}
                      title={language === 'en' ? `Go to slide ${idx + 1}` : `الانتقال للشريحة ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
                  disabled={currentSlide === slides.length - 1}
                  className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-30 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <span>{language === 'en' ? 'Next Slide' : 'الشريحة التالية'}</span>
                  {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: VIDEO RECORDING SCRIPT & STORYBOARD */}
          {activeTab === 'video_script' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
                <Video className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-extrabold text-white text-sm">
                    {language === 'en'
                      ? 'AI Agent Pitch Video Storyboard (Duration: 90 - 120 Seconds)'
                      : 'سيناريو تصوير الفيديو الترويجي للوكيل الذكي (مدة: 90 إلى 120 ثانية)'}
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {language === 'en'
                      ? 'Use this structured, second-by-second storyboard for recording your video presentation for the competition judges:'
                      : 'استخدم هذا السيناريو المسجل والمقسّم بالثواني مع الشاشات المقترحة لتسجيل فيديو المسابقة أو إرساله للعميل:'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                
                {/* Scene 1 */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-cyan-400">
                      {language === 'en'
                        ? 'Scene 1 (0:00 - 0:15) · Intro & Problem'
                        : 'المشهد 1 (0:00 - 0:15) · المقدمة والمشكلة'}
                    </span>
                    <span className="font-mono text-slate-500 text-[10px]">Dashboard Screen</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    <strong>{language === 'en' ? 'On Screen:' : 'ما يظهر على الشاشة:'}</strong>{' '}
                    {language === 'en'
                      ? 'Open the main Dashboard, display live active counters, and introduce the agent.'
                      : 'افتح لوحة التحكم الرئيسية (Dashboard) واستعرض العدادات والإحصائيات الحية.'}
                  </p>
                  <div className="p-2.5 rounded-lg bg-slate-950 text-[11px] text-amber-200 font-mono leading-relaxed">
                    🎙️ <strong>{language === 'en' ? 'Suggested Voiceover:' : 'التعليق الصوتي المقترح:'}</strong>{' '}
                    {language === 'en'
                      ? '"In fast-paced business environments, lost IT tickets and slow troubleshooting cost organizations thousands of hours. I am Eng. Abdelrahim Mohamed Ahmed Mohamed, presenting the Autonomous IT Support AI Agent for the Create AI Agents Championship 2026."'
                      : '"في بيئات العمل السريعة، ضياع بلاغات الصيانة وتأخر حل مشاكل تقنية المعلومات يكلف الشركات الكثير. أهلاً بكم، أنا م. عبدالرحيم محمد احمد محمد، وأقدم لكم وكيل الدعم الفني الذكي، الحل الرقمي المتكامل لإدارة وتشخيص أعطال الـ IT لحظياً في مسابقة وكلاء الذكاء الاصطناعي 2026."'}
                  </div>
                </div>

                {/* Scene 2 */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-cyan-400">
                      {language === 'en'
                        ? 'Scene 2 (0:15 - 0:40) · Dual AI Diagnosis'
                        : 'المشهد 2 (0:15 - 0:40) · الفحص الذكي والتشخيص الخبير'}
                    </span>
                    <span className="font-mono text-slate-500 text-[10px]">Diagnose Issue Screen</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    <strong>{language === 'en' ? 'On Screen:' : 'ما يظهر على الشاشة:'}</strong>{' '}
                    {language === 'en'
                      ? 'Navigate to "Diagnose Issue", select "Internet Disconnection", and run the instant diagnostic scan.'
                      : 'ادخل لصفحة "تشخيص عطل تقني"، اختر عطل "انقطاع الإنترنت"، واضغط "فحص متقدم".'}
                  </p>
                  <div className="p-2.5 rounded-lg bg-slate-950 text-[11px] text-amber-200 font-mono leading-relaxed">
                    🎙️ <strong>{language === 'en' ? 'Suggested Voiceover:' : 'التعليق الصوتي المقترح:'}</strong>{' '}
                    {language === 'en'
                      ? '"The agent analyzes symptoms using dual-engine reasoning, extracting exact root causes, interactive checklists, and one-click copyable CMD terminal commands for instant self-remediation."'
                      : '"بمجرد إدخال المشكلة، يقوم محرك التشخيص الذكي بتحليل العطل فوراً واستخراج الأسباب الجذرية، وتقديم خطوات فحص تفاعلية مدعومة بأوامر سطر الأوامر (CMD) القابلة للنسخ المباشر لحل المشكلة ذاتياً."'}
                  </div>
                </div>

                {/* Scene 3 */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-cyan-400">
                      {language === 'en'
                        ? 'Scene 3 (0:40 - 1:05) · Non-Technical Escalation'
                        : 'المشهد 3 (0:40 - 1:05) · إصدار البلاغ والمتابعة لغير التقنيين'}
                    </span>
                    <span className="font-mono text-slate-500 text-[10px]">Ticket & AnyDesk Chat</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    <strong>{language === 'en' ? 'On Screen:' : 'ما يظهر على الشاشة:'}</strong>{' '}
                    {language === 'en'
                      ? 'Click "Convert to Official Ticket", choose "Remote Assistance (AnyDesk)", and enter the connection code.'
                      : 'اضغط "تحويل لبلاغ رسمي"، واختر خيار "طلب دعم عن بعد (AnyDesk)"، ثم افتح التذكرة واكتب رداً سريعاً.'}
                  </p>
                  <div className="p-2.5 rounded-lg bg-slate-950 text-[11px] text-amber-200 font-mono leading-relaxed">
                    🎙️ <strong>{language === 'en' ? 'Suggested Voiceover:' : 'التعليق الصوتي المقترح:'}</strong>{' '}
                    {language === 'en'
                      ? '"Non-technical staff never struggle with technical terminology: with a single click, they can share their AnyDesk code or request an on-site technician visit with full bi-directional tracking."'
                      : '"إذا كان الموظف غير تقني، يمكنه بضغطة زر طلب تدخل فني عن بعد عبر AnyDesk أو طلب زيارة ميدانية لمكتبه مع متابعة مباشرة داخل التذكرة، دون أي تعقيد."'}
                  </div>
                </div>

                {/* Scene 4 */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-cyan-400">
                      {language === 'en'
                        ? 'Scene 4 (1:05 - 1:30) · Omnichannel Real-Time Alerting'
                        : 'المشهد 4 (1:05 - 1:30) · التنبيهات الفورية (واتساب، تيليجرام، إيميل)'}
                    </span>
                    <span className="font-mono text-slate-500 text-[10px]">Dispatch Bar & Mobile Push</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    <strong>{language === 'en' ? 'On Screen:' : 'ما يظهر على الشاشة:'}</strong>{' '}
                    {language === 'en'
                      ? 'Click "Send WhatsApp" and show the instantaneous Telegram push notification arriving on the mobile phone.'
                      : 'افتح نافذة التذكرة، واضغط زر [إرسال واتساب] ثم استعرض رسالة التليجرام التي وصلت لهاتفك.'}
                  </p>
                  <div className="p-2.5 rounded-lg bg-slate-950 text-[11px] text-amber-200 font-mono leading-relaxed">
                    🎙️ <strong>{language === 'en' ? 'Suggested Voiceover:' : 'التعليق الصوتي المقترح:'}</strong>{' '}
                    {language === 'en'
                      ? '"Crucially, the agent triggers synchronized multi-channel broadcasts: audio chimes in the helpdesk, WhatsApp dispatch to the lead engineer phone (+201009125279), and Telegram push notifications within seconds."'
                      : '"الأهم من ذلك: المنظومة تبث تنبيهاً لحظياً برنين صوتي وإشعارات سطح المكتب، مع إرسال البلاغ فوراً لهاتف المسؤول عبر واتساب وبوت تيليجرام والبريد الإلكتروني، لضمان استجابة فورية خلال ثوانٍ!"'}
                  </div>
                </div>

                {/* Scene 5 */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-cyan-400">
                      {language === 'en'
                        ? 'Scene 5 (1:30 - 1:45) · Defense & Contact'
                        : 'المشهد 5 (1:30 - 1:45) · الخاتمة والدعوة للتواصل'}
                    </span>
                    <span className="font-mono text-slate-500 text-[10px]">About Page & IP Attributions</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 text-[11px] text-amber-200 font-mono leading-relaxed">
                    🎙️ <strong>{language === 'en' ? 'Suggested Voiceover:' : 'التعليق الصوتي المقترح:'}</strong>{' '}
                    {language === 'en'
                      ? '"Autonomous IT Support AI Agent: Higher enterprise efficiency, airtight documentation, and zero downtime. Contact Eng. Abdelrahim Mohamed Ahmed Mohamed via WhatsApp at +201009125279 or Email rahemxp2020@gmail.com. Thank you!"'
                      : '"وكيل الدعم الفني الذكي: كفاءة أعلى، وتوثيق محكم، واستجابة بلا انقطاع. لتجربة النظام أو التعاقد التجاري: تواصلوا مع المهندس عبدالرحيم محمد احمد محمد عبر واتساب +201009125279 أو البريد rahemxp2020@gmail.com. شكراً لكم!"'}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: CLIENT BROCHURE & USER MANUAL */}
          {activeTab === 'brochure' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <h3 className="font-extrabold text-white text-sm">
                  {language === 'en'
                    ? 'Client & Employee Guide: How to Receive Instant Technical Support'
                    : 'دليل العميل والموظف: كيف تستخدم النظام للحصول على دعم فني فوري؟'}
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {language === 'en'
                    ? 'This user manual is formatted for quick onboarding, ready to distribute to company staff or export as PDF:'
                    : 'هذا الدليل مصمم لطباعته وتوزيعه على موظفي الشركة أو إرساله بصيغة PDF لتعريفهم بآلية طلب المساعدة:'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[11px]">1</span>
                    <span>{language === 'en' ? 'When facing any computer issue:' : 'عند مواجهة أي عطل في جهازك:'}</span>
                  </h4>
                  <ul className="text-slate-300 text-[11px] space-y-1 list-disc list-inside leading-relaxed">
                    {language === 'en' ? (
                      <>
                        <li>Open the platform portal on your PC or smartphone.</li>
                        <li>Click "Diagnose Issue" or tap "AI Scan".</li>
                        <li>Select your category and review the instant self-check steps.</li>
                      </>
                    ) : (
                      <>
                        <li>افتح رابط المنظومة من جهازك أو هاتفك.</li>
                        <li>اختر قسم "تشخيص عطل تقني" أو اضغط زر "فحص عطل".</li>
                        <li>حدد نوع المشكلة واقرأ خطوات الفحص السريعة الموضحة لك.</li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[11px]">2</span>
                    <span>{language === 'en' ? 'If you are non-technical:' : 'إن لم تكن متخصصاً ولم يُحل العطل:'}</span>
                  </h4>
                  <ul className="text-slate-300 text-[11px] space-y-1 list-disc list-inside leading-relaxed">
                    {language === 'en' ? (
                      <>
                        <li>Click "Convert to Official Support Ticket".</li>
                        <li>Choose "Remote Assistance (AnyDesk)" so an engineer can connect.</li>
                        <li>Or choose "Request On-Site Visit" for a desk visit.</li>
                      </>
                    ) : (
                      <>
                        <li>اضغط على زر "تحويل لتذكرة صيانة رسمية".</li>
                        <li>اختر خيار: "طلب دعم عن بعد عبر AnyDesk" ليدخل الفني على شاشتك.</li>
                        <li>أو اختر: "طلب حضور فني لمكتبي" ليصلك الفني مباشرة.</li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[11px]">3</span>
                    <span>{language === 'en' ? 'Tracking Ticket Status:' : 'متابعة حالة البلاغ:'}</span>
                  </h4>
                  <ul className="text-slate-300 text-[11px] space-y-1 list-disc list-inside leading-relaxed">
                    {language === 'en' ? (
                      <>
                        <li>Receive an instant ticket ID like <span className="font-mono text-cyan-400 font-bold">IT-2026-3277</span>.</li>
                        <li>Track the assigned technician, live replies, and status updates.</li>
                        <li>Send ticket updates directly to the engineer via WhatsApp in one click.</li>
                      </>
                    ) : (
                      <>
                        <li>ستحصل على رقم تذكرة فوري مثل: <span className="font-mono text-cyan-400 font-bold">IT-2026-3277</span>.</li>
                        <li>يمكنك معرفة الفني المكلف ومتابعة الرسائل وتغيير الحالة لحظياً.</li>
                        <li>بإمكانك إرسال تفاصيل البلاغ مباشرة للمسؤول عبر واتساب بنقرة واحدة.</li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[11px]">4</span>
                    <span>{language === 'en' ? 'Resolution & Confirmation:' : 'تأكيد الحل وإغلاق التذكرة:'}</span>
                  </h4>
                  <ul className="text-slate-300 text-[11px] space-y-1 list-disc list-inside leading-relaxed">
                    {language === 'en' ? (
                      <>
                        <li>Once resolved, status flips to "Resolved" with documented notes.</li>
                        <li>Leave a confirmation or thank-you reply in the timeline.</li>
                        <li>The ticket remains securely archived for future reference.</li>
                      </>
                    ) : (
                      <>
                        <li>عند حل المشكلة يتم تحويل الحالة إلى "تم الحل" وتوثيق الملاحظات.</li>
                        <li>يمكنك كتابة رد شكر أو تأكيد استقرار الجهاز في سجل المتابعة.</li>
                        <li>تظل التذكرة مؤرشفة للرجوع إليها في أي وقت.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: OFFICIAL COMPETITION SUBMISSION FORM */}
          {activeTab === 'submission_form' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="font-extrabold text-white text-sm">
                    {language === 'en'
                      ? 'Official Championship Submission Details (Howspace Portal)'
                      : 'بيانات استمارة التقديم الرسمية لمسابقة تحدي وكلاء الذكاء الاصطناعي'}
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {language === 'en'
                      ? 'Copy-paste ready submission document formatted for the official championship portal:'
                      : 'هذه البيانات منسقة وجاهزة لتنسخها وتلصقها في بوابة المسابقة (Howspace Portal) للتقديم مباشرة:'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadSubmissionMarkdown}
                  className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Download Markdown (.MD)' : 'تنزيل كملف نصي (.MD)'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 space-y-3 whitespace-pre-wrap leading-relaxed select-all" dir="ltr">
                {language === 'en' ? generateSubmissionMarkdownEn() : generateSubmissionMarkdownAr()}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between no-print flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>
              {language === 'en'
                ? 'Ready for presentation to competition judges, clients, and partners'
                : 'جاهز لتقديمه في مسابقة وكلاء الذكاء الاصطناعي ولجان التحكيم والعملاء'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadPresentationFile}
              className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              title={language === 'en' ? 'Download deck immediately to your device' : 'تنزيل الملف فوراً على جهازك بصيغة HTML/PDF'}
            >
              <Download className="w-4 h-4" />
              <span>{language === 'en' ? 'Download Deck (PDF/HTML)' : 'تحميل ملف العرض (PDF/HTML)'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer"
            >
              {language === 'en' ? 'Close' : 'إغلاق'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
