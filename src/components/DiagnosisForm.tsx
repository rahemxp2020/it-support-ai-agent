import React, { useState, useEffect } from 'react';
import {
  Stethoscope,
  Sparkles,
  Zap,
  RotateCcw,
  Check,
  AlertCircle,
  Laptop,
  Monitor,
  User,
  Building,
  Flag,
  ListFilter,
  CheckCircle2
} from 'lucide-react';
import {
  COMMON_PROBLEMS,
  DEPARTMENTS,
  DEPARTMENTS_EN,
  DEVICE_TYPES,
  DEVICE_TYPES_EN,
  OPERATING_SYSTEMS,
  OPERATING_SYSTEMS_EN
} from '../data/commonProblems';
import { ProblemCategory, PriorityLevel } from '../types/it-support';
import { useLanguage } from '../context/LanguageContext';
import { translatePriority, translateCategory } from '../i18n/translations';

export interface DiagnosisFormData {
  userName: string;
  department: string;
  deviceType: string;
  os: string;
  category: ProblemCategory;
  description: string;
  priority: PriorityLevel;
  language?: 'ar' | 'en';
}

interface DiagnosisFormProps {
  initialCategory?: ProblemCategory;
  onSubmit: (formData: DiagnosisFormData) => Promise<void>;
  isLoading: boolean;
  activeUserName: string;
  onUpdateActiveUserName: (name: string) => void;
}

export const DiagnosisForm: React.FC<DiagnosisFormProps> = ({
  initialCategory = 'internet',
  onSubmit,
  isLoading,
  activeUserName,
  onUpdateActiveUserName
}) => {
  const { language, t, isRTL } = useLanguage();
  const [category, setCategory] = useState<ProblemCategory>(initialCategory);
  const [userName, setUserName] = useState(activeUserName || '');

  const departmentsList = language === 'en' ? DEPARTMENTS_EN : DEPARTMENTS;
  const devicesList = language === 'en' ? DEVICE_TYPES_EN : DEVICE_TYPES;
  const osList = language === 'en' ? OPERATING_SYSTEMS_EN : OPERATING_SYSTEMS;

  const [department, setDepartment] = useState(departmentsList[0]);
  const [deviceType, setDeviceType] = useState(devicesList[0]);
  const [os, setOs] = useState(osList[0]);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('متوسط');
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (activeUserName && !userName) {
      setUserName(activeUserName);
    }
  }, [activeUserName]);

  // Adjust default department/device/os if language switches
  useEffect(() => {
    setDepartment(departmentsList[0]);
    setDeviceType(devicesList[0]);
    setOs(osList[0]);
  }, [language]);

  const handleLoadPreset = (catId: ProblemCategory) => {
    const selectedProblem = COMMON_PROBLEMS.find((p) => p.id === catId);
    if (selectedProblem) {
      setCategory(catId);
      if (!userName.trim() && activeUserName) {
        setUserName(activeUserName);
      }
      if (language === 'en' && selectedProblem.samplePresetEn) {
        setDepartment(selectedProblem.samplePresetEn.department);
        setDeviceType(selectedProblem.samplePresetEn.deviceType);
        setOs(selectedProblem.samplePresetEn.os);
        setDescription(selectedProblem.samplePresetEn.description);
        setPriority(selectedProblem.samplePresetEn.priority);
      } else {
        setDepartment(selectedProblem.samplePreset.department);
        setDeviceType(selectedProblem.samplePreset.deviceType);
        setOs(selectedProblem.samplePreset.os);
        setDescription(selectedProblem.samplePreset.description);
        setPriority(selectedProblem.samplePreset.priority);
      }
      setValidationError(null);
    }
  };

  const handleReset = () => {
    setDescription('');
    setCategory('internet');
    setPriority('متوسط');
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fallbackDefaultName = language === 'en' ? 'User' : 'المستفيد';
    const finalName = userName.trim() || activeUserName.trim() || fallbackDefaultName;

    if (!description.trim() || description.trim().length < 8) {
      setValidationError(
        language === 'en'
          ? 'Please enter a clear problem description (at least 8 characters)'
          : 'يرجى كتابة وصف دقيق للعطل (8 أحرف كحد أدنى)'
      );
      return;
    }

    if (userName.trim()) {
      onUpdateActiveUserName(userName.trim());
    }

    setValidationError(null);
    onSubmit({
      userName: finalName,
      department,
      deviceType,
      os,
      category,
      description: description.trim(),
      priority,
      language
    });
  };

  const handleQuickLaunch = () => {
    let currentDesc = description.trim();
    let currentDept = department;
    let currentDev = deviceType;
    let currentOs = os;
    let currentPrio = priority;

    if (currentDesc.length < 8) {
      const selectedProblem = COMMON_PROBLEMS.find((p) => p.id === category) || COMMON_PROBLEMS[0];
      if (language === 'en' && selectedProblem.samplePresetEn) {
        currentDept = selectedProblem.samplePresetEn.department;
        currentDev = selectedProblem.samplePresetEn.deviceType;
        currentOs = selectedProblem.samplePresetEn.os;
        currentDesc = selectedProblem.samplePresetEn.description;
        currentPrio = selectedProblem.samplePresetEn.priority;
      } else {
        currentDept = selectedProblem.samplePreset.department;
        currentDev = selectedProblem.samplePreset.deviceType;
        currentOs = selectedProblem.samplePreset.os;
        currentDesc = selectedProblem.samplePreset.description;
        currentPrio = selectedProblem.samplePreset.priority;
      }
      setDepartment(currentDept);
      setDeviceType(currentDev);
      setOs(currentOs);
      setDescription(currentDesc);
      setPriority(currentPrio);
    }

    const fallbackDefaultName = language === 'en' ? 'User' : 'المستفيد';
    const finalName = userName.trim() || activeUserName.trim() || fallbackDefaultName;
    if (userName.trim()) {
      onUpdateActiveUserName(userName.trim());
    }
    setValidationError(null);
    onSubmit({
      userName: finalName,
      department: currentDept,
      deviceType: currentDev,
      os: currentOs,
      category,
      description: currentDesc,
      priority: currentPrio,
      language
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Console Header */}
      <div className="space-y-1.5 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span>{language === 'en' ? 'IT Helpdesk Cycle' : 'دورة الدعم الفني'}</span>
          <span aria-hidden="true" className="text-slate-600">/</span>
          <span className="text-cyan-400">
            {language === 'en' ? 'Step 1: Intelligent Fault Diagnosis' : 'الخطوة 1: فحص وتوصيف العطل'}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {t.diagnosis.pageTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {t.diagnosis.pageSubtitle}
        </p>
      </div>

      {/* Top Instant Diagnostic Action Banner - Direct Launch Without Scrolling */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-slate-950 border-2 border-cyan-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-xl bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center shrink-0 shadow-inner">
            <Sparkles className="w-6 h-6 text-cyan-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-black text-white">
                {language === 'en' ? 'Instant AI Diagnostic Engine' : 'بدء الفحص والتشخيص الفوري المباشر'}
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 font-bold border border-cyan-400/30 shrink-0">
                {language === 'en' ? 'Top Action (No Scroll)' : 'من الأعلى مباشرة'}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
              {language === 'en'
                ? 'Launch full automated diagnosis in 1-click using current or standard parameters'
                : 'اضغط هنا للبدء الفوري بفحص الذكاء الاصطناعي دون الحاجة للنزول لأسفل النموذج'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleQuickLaunch}
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-slate-950 font-black text-xs sm:text-sm shadow-lg hover:shadow-cyan-500/30 transition-all cursor-pointer flex items-center justify-center gap-2.5 shrink-0 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              <span>{language === 'en' ? 'Running AI Engine...' : 'جارٍ الفحص الفوري...'}</span>
            </>
          ) : (
            <>
              <Stethoscope className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              <span>
                {language === 'en'
                  ? 'Start AI Diagnostic Now'
                  : 'بدء الفحص والتشخيص الفوري (نقرة واحدة)'}
              </span>
            </>
          )}
        </button>
      </div>

      {/* Quick Template Presets Bar */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 space-y-2">
        <div className="flex items-center justify-between text-xs flex-wrap gap-1">
          <span className="font-bold text-slate-300 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {language === 'en'
                ? 'Standard Issue Presets (Click to Auto-fill Test Data):'
                : 'قوالب أعطال قياسية جاهزة (اختيار سريع للتجربة):'}
            </span>
          </span>
          <span className="text-[11px] text-slate-500">
            {language === 'en' ? 'Click any card to fill details' : 'انقر على أي كارت للتعبئة الفورية'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {COMMON_PROBLEMS.map((prob) => {
            const probTitle = language === 'en' && prob.titleEn ? prob.titleEn : prob.title;
            const isSelected = category === prob.id;
            return (
              <button
                key={prob.id}
                type="button"
                onClick={() => handleLoadPreset(prob.id)}
                className={`px-3 py-1.5 rounded-lg border text-xs whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 text-cyan-300 font-bold'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <span>{probTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Diagnosis Form Card */}
      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-sm space-y-6">
        
        {validationError && (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/50 flex items-center gap-2.5 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Form Card Header with Immediate Start Button */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'en' ? 'Diagnostics Parameters' : 'بيانات فحص وتشخيص العطل'}
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            {isLoading ? (
              <>
                <div className="w-3 h-3 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                <span>{language === 'en' ? 'Scanning...' : 'جارٍ الفحص...'}</span>
              </>
            ) : (
              <>
                <Stethoscope className="w-3.5 h-3.5 text-slate-950" />
                <span>{t.diagnosis.runDiagnosisBtn}</span>
              </>
            )}
          </button>
        </div>

        {/* Section 1: User & Device Telemetry */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-300 flex items-center gap-2 border-b border-slate-800/80 pb-2">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.diagnosis.step2}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Requester User Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                {t.diagnosis.requesterName} <span className="text-slate-500 text-[10px]">({language === 'en' ? 'optional' : 'اختياري'})</span>
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={t.diagnosis.requesterPlaceholder}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Department */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                {t.diagnosis.department}
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

            {/* Device Type */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                {t.diagnosis.deviceType}
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

            {/* Operating System */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                {t.diagnosis.os}
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

        {/* Section 2: Problem Category Selection */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-300 flex items-center gap-2 border-b border-slate-800/80 pb-2">
            <ListFilter className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.diagnosis.step1}</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {COMMON_PROBLEMS.map((prob) => {
              const isSelected = category === prob.id;
              const probTitle = language === 'en' && prob.titleEn ? prob.titleEn : prob.title;
              const probDesc = language === 'en' && prob.shortDescEn ? prob.shortDescEn : prob.shortDesc;

              return (
                <button
                  key={prob.id}
                  type="button"
                  onClick={() => setCategory(prob.id)}
                  className={`p-3 rounded-lg border text-start transition-colors cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500 text-white'
                      : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold flex items-center justify-between">
                    <span>{probTitle}</span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400"></span>}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {probDesc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Priority & SLA Level */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-300 flex items-center gap-2 border-b border-slate-800/80 pb-2">
            <Flag className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {language === 'en'
                ? '3. Target Priority & SLA Window'
                : '3. مستوى الأولوية المستهدف (SLA Target)'}
            </span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(
              [
                {
                  level: 'منخفض' as const,
                  labelEn: 'Low',
                  sla: 'SLA < 24h',
                  descAr: 'لا يعطل سير العمل',
                  descEn: 'Minor impact'
                },
                {
                  level: 'متوسط' as const,
                  labelEn: 'Medium',
                  sla: 'SLA < 8h',
                  descAr: 'تأثير جزئي مع بدائل',
                  descEn: 'Partial disruption'
                },
                {
                  level: 'مرتفع' as const,
                  labelEn: 'High',
                  sla: 'SLA < 2h',
                  descAr: 'توقف وظيفة رئيسية',
                  descEn: 'Key service down'
                },
                {
                  level: 'حرج' as const,
                  labelEn: 'Critical',
                  sla: 'SLA < 15m',
                  descAr: 'توقف خادم أو قسم كامل',
                  descEn: 'Enterprise outage'
                }
              ] as const
            ).map((item) => {
              const isSelected = priority === item.level;
              return (
                <button
                  key={item.level}
                  type="button"
                  onClick={() => setPriority(item.level)}
                  className={`p-2.5 rounded-lg border text-start transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400 text-white'
                      : 'bg-slate-900/30 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">
                      {language === 'en' ? item.labelEn : item.level}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400" dir="ltr">{item.sla}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {language === 'en' ? item.descEn : item.descAr}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Problem Narrative Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="font-semibold text-slate-300">
              {t.diagnosis.description} <span className="text-rose-400">*</span>
            </label>
            <span className="text-[11px] text-slate-500">
              {language === 'en'
                ? 'Include exact error message or code'
                : 'يرجى ذكر نصوص الرسائل أو كود العطل (Error Code)'}
            </span>
          </div>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.diagnosis.descriptionPlaceholder}
            className="w-full p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 leading-relaxed transition-colors"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-lg border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.diagnosis.resetBtn}</span>
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 shadow-sm"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                <span>
                  {language === 'en'
                    ? 'Running AI Inference & Root Cause Engine...'
                    : 'جارٍ فحص العطل وتحليل الأسباب...'}
                </span>
              </>
            ) : (
              <>
                <Stethoscope className="w-4 h-4 text-slate-950" />
                <span>{t.diagnosis.runDiagnosisBtn}</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
