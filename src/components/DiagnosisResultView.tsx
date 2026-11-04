import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ListChecks,
  Terminal,
  ShieldCheck,
  TicketPlus,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  Flame,
  Printer,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  MonitorUp,
  MapPin,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { DiagnosisData, SupportTicket, PriorityLevel, ProblemCategory } from '../types/it-support';
import { DiagnosisFormData } from './DiagnosisForm';
import { useLanguage } from '../context/LanguageContext';
import { translatePriority, translateCategory } from '../i18n/translations';

interface DiagnosisResultViewProps {
  formData: DiagnosisFormData;
  diagnosis: DiagnosisData;
  source: 'gemini' | 'expert_system';
  onCreateTicketFromDiagnosis: (
    formData: DiagnosisFormData,
    diagnosis: DiagnosisData,
    preferredAssistance?: 'self' | 'remote' | 'on_site'
  ) => void;
  onBackToEdit: () => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const DiagnosisResultView: React.FC<DiagnosisResultViewProps> = ({
  formData,
  diagnosis,
  source,
  onCreateTicketFromDiagnosis,
  onBackToEdit,
  onShowToast
}) => {
  const { language, t, isRTL } = useLanguage();
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [copiedReport, setCopiedReport] = useState(false);

  const totalSteps = diagnosis.diagnosticSteps.length;
  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = totalSteps ? Math.round((completedCount / totalSteps) * 100) : 0;

  const ArrowBackIcon = isRTL ? ArrowRight : ArrowLeft;
  const ArrowNextIcon = isRTL ? ArrowLeft : ArrowRight;

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    onShowToast(
      language === 'en' ? `Copied: ${label}` : `تم نسخ ${label}`,
      text,
      'success'
    );
    setTimeout(() => {
      setCopiedCommand(null);
    }, 2000);
  };

  const handleCopyFullReport = () => {
    const isEn = language === 'en';
    const reportText = isEn ? `
=== IT SUPPORT DIAGNOSTIC & ROOT CAUSE REPORT ===
Requester: ${formData.userName} · Department: ${formData.department}
Device: ${formData.deviceType} · OS: ${formData.os}
Category: ${translateCategory(formData.category, 'en')} · Priority: ${translatePriority(formData.priority, 'en')}

[ Problem Analysis ]
${diagnosis.analysis}

[ Probable Root Causes ]
${diagnosis.rootCauses.map((r, i) => `${i + 1}. ${r}`).join('\n')}

[ Diagnostic Checklist ]
${diagnosis.diagnosticSteps.map((s, i) => `${i + 1}. ${s.step} (Expected: ${s.expected})${s.command ? ` [Command: ${s.command}]` : ''}`).join('\n')}

[ Recommended Actionable Solutions ]
${diagnosis.solutions.map((sol, i) => `${i + 1}. ${sol.title}: ${sol.action}`).join('\n')}

[ Preventive Best Practices ]
${diagnosis.preventiveTips.map((tip, i) => `- ${tip}`).join('\n')}
=================================================
`.trim() : `
=== تقرير فحص وتشخيص الدعم الفني ===
المستخدم: ${formData.userName} · القسم: ${formData.department}
الجهاز: ${formData.deviceType} · نظام التشغيل: ${formData.os}
نوع العطل: ${formData.category} · الأولوية: ${formData.priority}

[ التحليل الفني للمشكلة ]
${diagnosis.analysis}

[ الأسباب المحتملة ]
${diagnosis.rootCauses.map((r, i) => `${i + 1}. ${r}`).join('\n')}

[ خطوات الفحص والتشخيص ]
${diagnosis.diagnosticSteps.map((s, i) => `${i + 1}. ${s.step} (النتيجة المتوقعة: ${s.expected})${s.command ? ` [الأمر: ${s.command}]` : ''}`).join('\n')}

[ الحلول الموصى بها ]
${diagnosis.solutions.map((sol, i) => `${i + 1}. ${sol.title}: ${sol.action}`).join('\n')}

[ إرشادات منع التكرار ]
${diagnosis.preventiveTips.map((tip, i) => `- ${tip}`).join('\n')}
====================================
`.trim();

    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    onShowToast(
      isEn ? 'Full Diagnostic Report Copied' : 'تم نسخ التقرير الكامل بنجاح',
      isEn ? 'Text is formatted and ready to paste into email or chats' : 'النص جاهز للمشاركة عبر البريد أو أنظمة المحادثة',
      'success'
    );
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const localizedPriority = translatePriority(formData.priority, language);
  const localizedCategory = translateCategory(formData.category, language);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span>{language === 'en' ? 'IT Helpdesk Cycle' : 'دورة الدعم الفني'}</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span className="text-cyan-400">
              {language === 'en' ? 'Step 2: AI Diagnostic Findings' : 'الخطوة 2: نتائج الفحص والتشخيص'}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            {t.diagnosis.results.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBackToEdit}
            className="px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ArrowBackIcon className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Modify Inputs' : 'تعديل البيانات'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyFullReport}
            className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-xs font-bold text-cyan-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{copiedReport ? (language === 'en' ? 'Copied!' : 'تم النسخ!') : (language === 'en' ? 'Copy Full Report' : 'نسخ التقرير كاملاً')}</span>
          </button>
        </div>
      </div>

      {/* Incident Summary Metadata Card */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-mono tracking-wider">
            {language === 'en' ? 'Requester' : 'صاحب المشكلة'}
          </span>
          <span className="font-bold text-white truncate block mt-0.5">{formData.userName}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-mono tracking-wider">
            {language === 'en' ? 'Department' : 'القسم'}
          </span>
          <span className="font-semibold text-slate-200 truncate block mt-0.5">{formData.department}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-mono tracking-wider">
            {language === 'en' ? 'Category' : 'التصنيف'}
          </span>
          <span className="font-semibold text-cyan-300 truncate block mt-0.5">{localizedCategory}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-mono tracking-wider">
            {language === 'en' ? 'Priority' : 'الأولوية'}
          </span>
          <span className="font-bold text-amber-400 block mt-0.5">{localizedPriority}</span>
        </div>
      </div>

      {/* Analysis Headline */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 space-y-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
          <h2 className="font-bold text-sm text-white">
            {language === 'en' ? 'Autonomous AI Diagnostic Analysis' : 'تحليل الوكيل الذكي ومحرك الفحص'}
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
            {source === 'gemini' ? 'Gemini AI Verified' : 'Rule-Engine Verified'}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
          {diagnosis.analysis}
        </p>
      </div>

      {/* Probable Root Causes */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-rose-400">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <h3 className="font-bold text-sm text-white">
            {t.diagnosis.results.rootCausesTitle}
          </h3>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
          {diagnosis.rootCauses.map((cause, idx) => (
            <li key={idx} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0"></span>
              <span className="leading-relaxed">{cause}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Diagnostic Steps & Verification Checklist */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-cyan-400 shrink-0" />
            <h3 className="font-bold text-sm text-white">
              {t.diagnosis.results.diagnosticStepsTitle}
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
            {completedCount} / {totalSteps} {language === 'en' ? 'Steps Verified' : 'خطوات تم فحصها'} ({progressPercent}%)
          </span>
        </div>

        <div className="space-y-2.5">
          {diagnosis.diagnosticSteps.map((step, idx) => {
            const isDone = !!completedSteps[idx];
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border transition-all ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-300'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    onClick={() => toggleStep(idx)}
                    className="flex items-start gap-3 flex-1 cursor-pointer select-none"
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center mt-0.5 transition-colors shrink-0 ${
                      isDone ? 'bg-emerald-500 text-slate-950' : 'border border-slate-700 bg-slate-950 hover:border-slate-600'
                    }`}>
                      {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div className="space-y-1">
                      <p className={`text-xs font-semibold leading-relaxed ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                        {step.step}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        <strong className="text-slate-300">{t.diagnosis.results.expectedResult}</strong> {step.expected}
                      </p>
                    </div>
                  </div>

                  {step.command && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(step.command!, language === 'en' ? 'Command' : 'الأمر')}
                      className="px-2.5 py-1 rounded bg-slate-950 border border-slate-700 hover:border-cyan-500 font-mono text-[11px] text-cyan-300 flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                      title={language === 'en' ? 'Click to copy command to clipboard' : 'انقر لنسخ الأمر لموجه الأوامر'}
                      dir="ltr"
                    >
                      {copiedCommand === step.command ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">{t.diagnosis.results.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-400" />
                          <span>{step.command}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Solutions */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-emerald-400">
          <Lightbulb className="w-4 h-4 shrink-0" />
          <h3 className="font-bold text-sm text-white">
            {t.diagnosis.results.solutionsTitle}
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {diagnosis.solutions.map((sol, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5 flex flex-col justify-between">
              <div>
                {sol.badge && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-block mb-1">
                    {sol.badge}
                  </span>
                )}
                <h4 className="font-bold text-xs text-white leading-tight">
                  {sol.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {sol.action}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Copyable Quick Terminal Commands */}
      {diagnosis.quickCommands && diagnosis.quickCommands.length > 0 && (
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Terminal className="w-4 h-4 shrink-0" />
            <h3 className="font-bold text-sm text-white">
              {t.diagnosis.results.quickCommandsTitle}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2" dir="ltr">
            {diagnosis.quickCommands.map((cmd, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => copyToClipboard(cmd, language === 'en' ? 'Command' : 'الأمر')}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-700/80 hover:border-cyan-500 font-mono text-xs text-cyan-300 flex items-center gap-2 transition-colors cursor-pointer"
                title={language === 'en' ? 'Copy command' : 'نسخ الأمر'}
              >
                {copiedCommand === cmd ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span>{cmd}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Non-Technical Direct Assistance Options */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 border border-amber-500/30 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-sm text-white">
                {language === 'en'
                  ? 'Facing difficulty or need hands-on engineer assistance?'
                  : 'تواجه صعوبة أو ينقصك الاختصاص التقني لتطبيق هذه الخطوات؟'}
              </h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {language === 'en' ? 'Non-Technical Staff Service' : 'خدمة عملاء وموظفين ميسرة'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'en'
                ? 'No need to worry! You do not have to execute complex settings or terminal commands. Skip self-service with one click to request immediate remote access (AnyDesk) or an on-site desk visit.'
                : 'لا داعي للقلق، لست مضطراً للتعامل مع الإعدادات المعقدة أو موجه الأوامر! يمكنك تخطي الحل الذاتي بضغطة زر، وسيقوم فني الدعم المكتبي بالدخول عن بعد على جهازك أو زيارتك في مكتبك.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          {/* Option 1: Remote Support Request */}
          <button
            type="button"
            onClick={() => onCreateTicketFromDiagnosis(formData, diagnosis, 'remote')}
            className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-cyan-500/40 hover:border-cyan-400 text-start space-y-1.5 transition-all group cursor-pointer shadow-sm"
          >
            <div className="flex items-center justify-between text-cyan-400">
              <span className="font-bold text-xs flex items-center gap-1.5">
                <MonitorUp className="w-4 h-4 text-cyan-400" />
                <span>{t.diagnosis.results.requestRemoteAnyDesk}</span>
              </span>
              <ArrowNextIcon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              {language === 'en'
                ? 'Engineer connects to your desktop via AnyDesk to resolve the issue while you watch.'
                : 'يدخل الفني على شاشتك بضغطة زر ويحل المشكلة بيده أثناء مشاهدتك.'}
            </p>
          </button>

          {/* Option 2: On-site Visit Request */}
          <button
            type="button"
            onClick={() => onCreateTicketFromDiagnosis(formData, diagnosis, 'on_site')}
            className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-emerald-500/40 hover:border-emerald-400 text-start space-y-1.5 transition-all group cursor-pointer shadow-sm"
          >
            <div className="flex items-center justify-between text-emerald-400">
              <span className="font-bold text-xs flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{t.diagnosis.results.requestOnsiteVisit}</span>
              </span>
              <ArrowNextIcon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              {language === 'en'
                ? 'Field support technician visits your desk to inspect cables, hardware, and physical ports.'
                : 'حضور أحد مهندسي الدعم الميداني لمكتبك لفحص الجهاز والتوصيلات.'}
            </p>
          </button>

          {/* Option 3: WhatsApp Direct Channel */}
          <a
            href={`https://wa.me/201009125279?text=${encodeURIComponent(
              language === 'en'
                ? `Hello IT Support, this is ${formData.userName || 'Employee'} from ${formData.department}. I need assistance regarding (${translateCategory(formData.category, 'en')}): ${formData.description}. Please assist.`
                : `مرحباً فريق الدعم الفني، أنا ${formData.userName || 'موظف'} من قسم ${formData.department}، أحتاج مساعدة ومتابعة فنية بخصوص عطل (${formData.category}): ${formData.description}. يرجى توجيه فني للمساعدة.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/30 hover:border-emerald-400 text-start space-y-1.5 transition-all group cursor-pointer shadow-sm"
          >
            <div className="flex items-center justify-between text-emerald-300">
              <span className="font-bold text-xs flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{language === 'en' ? 'Direct WhatsApp Dispatch' : 'محادثة واتساب مباشرة'}</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-[11px] text-emerald-300/80 leading-tight">
              {language === 'en'
                ? 'Direct hotline to Eng. Abdelrahim Mohamed Ahmed (+201009125279).'
                : 'تواصل فوري مع م. عبدالرحيم محمد (هندسة الدعم: +201009125279).'}
            </p>
          </a>
        </div>
      </div>

      {/* Bottom Conversion Action Bar */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-white">
            {t.diagnosis.results.convertToTicketTitle}
          </h3>
          <p className="text-xs text-slate-400">
            {t.diagnosis.results.convertToTicketDesc}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold pt-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>
              {language === 'en'
                ? 'Diagnosis verified and documented, ready for immediate dispatch'
                : 'التشخيص الفني مكتمل بنجاح وموثق وجاهز للاعتماد الفوري'}
            </span>
          </div>
        </div>

        <button
          onClick={() => onCreateTicketFromDiagnosis(formData, diagnosis)}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
        >
          <TicketPlus className="w-4 h-4 text-slate-950" />
          <span>{t.diagnosis.results.createOfficialTicketBtn}</span>
        </button>
      </div>

    </div>
  );
};
