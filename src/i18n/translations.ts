/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProblemCategory, PriorityLevel, TicketStatus } from '../types/it-support';

export type SupportedLanguage = 'ar' | 'en';

export const translations = {
  ar: {
    // Brand & General
    appTitle: 'مساعد الدعم الفني الذكي',
    appSubtitle: 'وكيل الذكاء الاصطناعي التشغيلي لأتمتة الدعم الفني',
    championshipTitle: 'مسابقة تحدي وكلاء الذكاء الاصطناعي 2026',
    championshipBadge: 'Official AI Agents Championship Entry',
    officialPortalBtn: 'بوابة المسابقة الرسمية ↗',

    // Language Toggle
    currentLanguage: 'العربية',
    switchLanguage: 'Switch to English',
    langCode: 'ar',

    // Navigation
    nav: {
      dashboard: 'الرئيسية',
      diagnose: 'تشخيص عطل',
      ticketLog: 'سجل البلاغات',
      about: 'حول النظام والمسابقة',
      newTicket: 'بلاغ جديد',
      startScan: 'بدء الفحص',
      smartScanBadge: 'فحص ذكي',
      activeBadge: 'نشط'
    },

    // Sidebar
    sidebar: {
      title: 'مساعد الدعم الفني الذكي',
      subtitle: 'IT Support Assistant',
      userProfileTitle: 'اسمك في النظام:',
      edit: 'تعديل',
      registerName: 'تسجيل اسم',
      clear: 'مسح',
      namePlaceholder: 'أدخل اسمك (اختياري)...',
      save: 'حفظ',
      cancel: 'إلغاء',
      savedLocally: 'محفوظ محلياً',
      flexible: 'مرن',
      noNameSpecified: 'بدون اسم محدد (اختياري)',
      viewScopeTitle: 'نطاق عرض التذاكر:',
      allTickets: 'كافة البلاغات',
      myTickets: 'بلاغاتي فقط',
      notificationChannels: 'قنوات التنبيهات الفورية',
      notificationChannelsSub: 'WhatsApp / Email / Telegram',
      backupSecurity: 'النسخ الاحتياطي والأمان',
      competitionDeck: 'ملف المسابقة (AI Deck / PDF)',
      competitionBadge: 'AI Agent',
      onlineNow: 'المتصلون بالمنظومة الآن',
      viewActiveUsers: 'عرض المتواجدين',
      developerLabel: 'المطور والمالك:',
      developerName: 'م. عبدالرحيم محمد احمد محمد',
      developerLocation: 'جمهورية مصر العربية - محافظة قنا',
      rights: 'جميع الحقوق محفوظة ومسجلة © 2026'
    },

    // Dashboard
    dashboard: {
      operationsCenter: 'مركز عمليات وإدارة الدعم الفني',
      version: 'IT Operations v2.0',
      heroTitle: 'مساعد الدعم الفني الذكي',
      heroDesc: 'منصة تشخيص الأعطال التقنية وإصدار تذاكر الدعم الفني المعتمدة. استقبل المشكلة، وشخّص أسبابها الجذرية خطوة بخطوة، وشارك الحلول التنفيذية فوراً.',
      startDiagnosisBtn: 'بدء تشخيص عطل جديد',
      manualTicketBtn: 'فتح تذكرة يدوية',
      liveSync: 'مزامنة سحابية حية',
      syncing: 'جاري التحديث...',
      stats: {
        totalTickets: 'إجمالي البلاغات',
        activeTickets: 'بلاغات قيد المتابعة',
        resolvedTickets: 'بلاغات تم حلها',
        criticalIssues: 'حالات حرجة وعاجلة',
        successRate: 'معدل الإنجاز والإغلاق'
      },
      commonProblemsTitle: 'التشخيص السريع لأشهر الأعطال الشائعة',
      commonProblemsDesc: 'اختر تصنيف المشكلة لبدء الفحص التفاعلي واستخراج الحلول فوراً:',
      searchPlaceholder: 'ابحث في الأعطال أو الأعراض الشائعة...',
      allCategories: 'كافة التصنيفات',
      startExamBtn: 'بدء الفحص والتشخيص',
      recentTicketsTitle: 'أحدث بلاغات الدعم الفني في النظام',
      viewAllTicketsBtn: 'عرض كافة البلاغات في السجل',
      noTicketsYet: 'لا توجد بلاغات مسجلة حتى الآن.',
      noTicketsDesc: 'ابدأ بتشخيص مشكلة أو إنشاء بلاغ صيانة جديد.',
      timeJustNow: 'الآن',
      priorityLabel: 'الأولوية:',
      statusLabel: 'الحالة:',
      departmentLabel: 'القسم:'
    },

    // Diagnosis View
    diagnosis: {
      pageTitle: 'تشخيص الأعطال التقنية الذكي',
      pageSubtitle: 'محرك استنتاجي مدعوم بقواعد المعرفة الهندسية ونماذج الذكاء الاصطناعي لتشخيص مشاكل الـ IT وحلها ذاتياً',
      step1: '1. حدد تصنيف المشكلة',
      step2: '2. تفاصيل الحالة ومعلومات الموظف',
      requesterName: 'اسم الموظف أو المستخدم',
      requesterPlaceholder: 'اسم صاحب المشكلة...',
      department: 'القسم أو الإدارة',
      selectDepartment: 'اختر القسم...',
      deviceType: 'نوع الجهاز المتضرر',
      selectDevice: 'اختر الجهاز...',
      os: 'نظام التشغيل',
      selectOs: 'اختر النظام...',
      description: 'وصف العطل أو رسالة الخطأ',
      descriptionPlaceholder: 'اشرح ما يحدث بالضبط، ورسائل الخطأ التي تظهر...',
      priority: 'مستوى الأهمية والاستعجال',
      runDiagnosisBtn: 'تشغيل محرك الفحص الذكي',
      resetBtn: 'إعادة ضبط الحقول',
      results: {
        title: 'تقرير الفحص والتشخيص الفني',
        subtitle: 'تحليل أسباب العطل والحلول التنفيذية المقترحة',
        rootCausesTitle: 'الأسباب الجذرية المحتملة للعطل (Root Causes):',
        diagnosticStepsTitle: 'خطوات الفحص والتحقق التفاعلية (Checklist):',
        expectedResult: 'النتيجة المتوقعة:',
        solutionsTitle: 'الحلول التنفيذية المباشرة (Actionable Solutions):',
        preventiveTipsTitle: 'إرشادات وقائية لتفادي تكرار العطل:',
        quickCommandsTitle: 'أوامر موجه الأوامر (CMD / PowerShell) القابلة للنسخ:',
        copyBtn: 'نسخ الأمر',
        copied: 'تم النسخ!',
        convertToTicketTitle: 'تحويل التقرير لبلاغ صيانة رسمي',
        convertToTicketDesc: 'إذا لم يُحل العطل عبر الخطوات السابقة، يمكنك رفع تذكرة رسمية لفريق الـ IT بنقرة واحدة:',
        requestRemoteAnyDesk: 'طلب تدخل فني عن بعد (AnyDesk / TeamViewer)',
        requestOnsiteVisit: 'طلب حضور مهندس الدعم الفني للمكتب',
        createOfficialTicketBtn: 'إصدار تذكرة صيانة رسمية الآن'
      }
    },

    // Create Ticket Form
    createTicket: {
      pageTitle: 'إصدار بلاغ صيانة جديد',
      pageSubtitle: 'إنشاء تذكرة دعم فني رسمية موثقة في قاعدة البيانات السحابية مع إشعار الفنيين لحظياً',
      employeeInfoSection: 'معلومات مقدم الطلب',
      employeeName: 'اسم الموظف',
      employeePlaceholder: 'أدخل اسم الموظف صاحب البلاغ...',
      department: 'القسم / الإدارة',
      deviceType: 'الجهاز المتضرر',
      os: 'نظام التشغيل',
      problemSection: 'تفاصيل المشكلة والعطل',
      category: 'تصنيف المشكلة',
      priority: 'مستوى الأولوية',
      description: 'وصف المشكلة بالتفصيل',
      descriptionPlaceholder: 'اكتب وصفاً دقيقاً للمشكلة أو رمز الخطأ...',
      assistanceTypeSection: 'نوع الدعم المطلوب',
      selfAssistance: 'دعم ذاتي (إرشادات فقط)',
      remoteAssistance: 'طلب دعم عن بعد عبر AnyDesk',
      onsiteAssistance: 'طلب حضور فني للمكتب',
      submitBtn: 'حفظ وإصدار البلاغ السحابي',
      resetBtn: 'تفريغ الحقول',
      backToLogBtn: 'العودة لسجل البلاغات'
    },

    // Ticket Log
    ticketLog: {
      pageTitle: 'سجل ومتابعة بلاغات الدعم الفني',
      pageSubtitle: 'إدارة شاملة لجميع التذاكر ومتابعة الردود وتحديث الحالات والتواصل مع المهندسين',
      searchPlaceholder: 'ابحث برقم البلاغ، اسم الموظف، القسم، أو وصف العطل...',
      filterStatus: 'تصفية حسب الحالة:',
      filterPriority: 'تصفية حسب الأولوية:',
      allStatuses: 'جميع الحالات',
      allPriorities: 'جميع الأولويات',
      filterScope: 'عرض التذاكر:',
      allCompanyTickets: 'كافة بلاغات المؤسسة',
      myTicketsOnly: 'بلاغاتي الخاصة',
      ticketsFound: 'بلاغ مطابق',
      ticketCard: {
        ticketNumber: 'رقم البلاغ:',
        createdAt: 'تاريخ الإنشاء:',
        department: 'القسم:',
        device: 'الجهاز:',
        assignedTech: 'الفني المكلف:',
        unassigned: 'بانتظار التكليف',
        remoteBadge: 'دعم عن بعد (AnyDesk)',
        onsiteBadge: 'حضور للمكتب',
        detailsBtn: 'فتح التفاصيل والمحادثة',
        sendWhatsAppBtn: 'إرسال واتساب',
        deleteTicketBtn: 'حذف البلاغ',
        deleteConfirm: 'هل أنت متأكد من حذف هذا البلاغ نهائياً؟'
      },
      detailsModal: {
        title: 'تفاصيل ومتابعة البلاغ',
        currentStatus: 'الحالة الحالية:',
        changeStatus: 'تغيير حالة البلاغ:',
        ticketDetails: 'بيانات المشكلة:',
        diagnosticSummary: 'ملخص التشخيص الآلي:',
        suggestedSolution: 'الحل الموصى به:',
        resolutionNotes: 'ملاحظات الإغلاق:',
        followUpTimeline: 'سجل المتابعة والمحادثة المباشرة:',
        noMessagesYet: 'لا توجد رسائل متابعة بعد.',
        replyPlaceholder: 'اكتب رداً أو استفساراً جديداً بخصوص هذا البلاغ...',
        sendReplyBtn: 'إرسال الرد',
        closeBtn: 'إغلاق النافذة'
      }
    },

    // About Section
    about: {
      pageTitle: 'حول المنظومة والمنافسة الرسمية',
      pageSubtitle: 'Autonomous IT Support AI Agent · المنظومة الرقمية السحابية لإدارة وتشخيص أعطال تقنية المعلومات',
      heroBadge: 'المشاركة الرسمية: مسابقة تحدي وكلاء الذكاء الاصطناعي 2026',
      heroDesc: 'منظومة وكيل ذكاء اصطناعي ذاتية التشغيل صممت لسد الفجوة بين الموظف العادي وفريق الدعم الفني، وربط البلاغات سحابياً وإشعار المسؤولين لحظياً.',
      openDeckBtn: 'فتح ملف المسابقة والعرض التقديمي (AI Deck)',
      openPortalBtn: 'زيارة بوابة المسابقة الرسمية ↗',
      devCardTitle: 'المطور والمهندس المسؤول',
      devName: 'م. عبدالرحيم محمد احمد محمد',
      devNameEn: 'Eng. Abdelrahim Mohamed Ahmed Mohamed',
      devLocation: 'جمهورية مصر العربية - محافظة قنا',
      devCountry: 'دولة مصر',
      devPhone: 'هاتف / واتساب: +201009125279',
      devEmail: 'البريد الإلكتروني: rahemxp2020@gmail.com',
      devTelegram: 'معرف تيليجرام المعتمد: 5516879336',
      architectureTitle: 'المعمارية التقنية للوكيل الذكي (System Architecture)',
      featuresTitle: 'أهم مزايا المنظومة في بيئة العمل الحقيقية',
      rightsNotice: 'جميع الحقوق محفوظة ومسجلة باسم المهندس عبدالرحيم محمد احمد محمد © 2026'
    },

    // Competition Presentation Modal
    deck: {
      modalTitle: 'ملف المشاركة الرسمي: مسابقة تحدي وكلاء الذكاء الاصطناعي 2026',
      agentBadge: 'AI Agent Deck',
      downloadBtn: 'تحميل ملف العرض (PDF/HTML)',
      closeBtn: 'إغلاق',
      tabs: {
        slides: 'عرض الشرائح (Pitch Deck)',
        videoScript: 'سيناريو الفيديو (Video Script)',
        brochure: 'دليل العميل (User Manual)',
        submissionForm: 'استمارة التقديم (Form)'
      },
      slideCounter: 'شريحة {current} من {total}',
      prevSlide: 'الشريحة السابقة',
      nextSlide: 'الشريحة التالية',
      downloadPrompt: 'تنزيل المستند كملف مستقل على جهازك',
      downloadFormBtn: 'تنزيل كملف نصي (.MD)'
    },

    // Statuses & Priorities
    status: {
      new: 'جديد',
      inProgress: 'قيد المعالجة',
      resolved: 'تم الحل',
      closed: 'مغلق'
    },
    priority: {
      low: 'منخفض',
      medium: 'متوسط',
      high: 'مرتفع',
      critical: 'حرج'
    },

    // Categories
    categories: {
      internet: 'مشكلة الإنترنت',
      internal_network: 'مشكلة الشبكة الداخلية',
      printer: 'الطابعة لا تعمل',
      slow_pc: 'بطء أداء الجهاز',
      login: 'تسجيل الدخول وكلمة المرور',
      email: 'البريد الإلكتروني وأوتلوك',
      software: 'البرامج والتطبيقات',
      file_sharing: 'مشاركة الملفات والمجلدات',
      other: 'مشكلة تقنية أخرى'
    }
  },

  en: {
    // Brand & General
    appTitle: 'Autonomous IT Support AI Agent',
    appSubtitle: 'Operational AI Agent for IT Helpdesk Automation & Diagnostics',
    championshipTitle: 'Create AI Agents Championship 2026',
    championshipBadge: 'Official AI Agents Championship Entry',
    officialPortalBtn: 'Official Championship Portal ↗',

    // Language Toggle
    currentLanguage: 'English',
    switchLanguage: 'التحويل إلى العربية',
    langCode: 'en',

    // Navigation
    nav: {
      dashboard: 'Dashboard',
      diagnose: 'Diagnose Issue',
      ticketLog: 'Ticket Log',
      about: 'About & Competition',
      newTicket: 'New Ticket',
      startScan: 'Start Scan',
      smartScanBadge: 'AI Scan',
      activeBadge: 'Active'
    },

    // Sidebar
    sidebar: {
      title: 'IT Support AI Agent',
      subtitle: 'Autonomous Helpdesk',
      userProfileTitle: 'Active User Profile:',
      edit: 'Edit',
      registerName: 'Set Name',
      clear: 'Clear',
      namePlaceholder: 'Enter your name (optional)...',
      save: 'Save',
      cancel: 'Cancel',
      savedLocally: 'Saved locally',
      flexible: 'Flexible',
      noNameSpecified: 'No name set (optional)',
      viewScopeTitle: 'Ticket Visibility:',
      allTickets: 'All Tickets',
      myTickets: 'My Tickets Only',
      notificationChannels: 'Instant Notifications',
      notificationChannelsSub: 'WhatsApp / Email / Telegram',
      backupSecurity: 'Backup Vault & Security',
      competitionDeck: 'Championship AI Deck',
      competitionBadge: 'AI Agent',
      onlineNow: 'Active Online Users',
      viewActiveUsers: 'View Active Users',
      developerLabel: 'Lead Engineer & Owner:',
      developerName: 'Eng. Abdelrahim Mohamed Ahmed Mohamed',
      developerLocation: 'Arab Republic of Egypt - Qena Governorate',
      rights: 'All rights reserved © 2026'
    },

    // Dashboard
    dashboard: {
      operationsCenter: 'IT Operations & Incident Command Center',
      version: 'IT Operations v2.0',
      heroTitle: 'Autonomous IT Support AI Agent',
      heroDesc: 'An enterprise-grade diagnostic engine and ticketing platform. Detect root causes step-by-step, generate instant CMD troubleshooting commands, and automate dispatch across cloud and mobile.',
      startDiagnosisBtn: 'Run AI Problem Diagnostic',
      manualTicketBtn: 'Open Manual Ticket',
      liveSync: 'Realtime Cloud Sync',
      syncing: 'Syncing...',
      stats: {
        totalTickets: 'Total Incidents',
        activeTickets: 'In Progress / Open',
        resolvedTickets: 'Resolved Tickets',
        criticalIssues: 'Critical Incidents',
        successRate: 'Resolution Rate'
      },
      commonProblemsTitle: 'Quick Diagnostics for Common IT Issues',
      commonProblemsDesc: 'Select an issue category to run an interactive troubleshooting scan with actionable solutions:',
      searchPlaceholder: 'Search common issues, symptoms, or error codes...',
      allCategories: 'All Categories',
      startExamBtn: 'Diagnose & Inspect',
      recentTicketsTitle: 'Recent Support Tickets',
      viewAllTicketsBtn: 'View Full Ticket History',
      noTicketsYet: 'No tickets registered yet.',
      noTicketsDesc: 'Start by diagnosing a problem or creating a new support ticket.',
      timeJustNow: 'Just now',
      priorityLabel: 'Priority:',
      statusLabel: 'Status:',
      departmentLabel: 'Department:'
    },

    // Diagnosis View
    diagnosis: {
      pageTitle: 'Intelligent IT Issue Diagnostic Engine',
      pageSubtitle: 'Autonomous inference engine grounded in IT knowledge bases to identify root causes and resolve technical faults automatically',
      step1: '1. Select Problem Category',
      step2: '2. Incident Details & Requester Info',
      requesterName: 'Employee / User Name',
      requesterPlaceholder: 'Name of the person experiencing the issue...',
      department: 'Department / Unit',
      selectDepartment: 'Select department...',
      deviceType: 'Affected Device Type',
      selectDevice: 'Select device...',
      os: 'Operating System',
      selectOs: 'Select OS...',
      description: 'Problem Description & Error Details',
      descriptionPlaceholder: 'Describe what happened, any error messages, or symptoms...',
      priority: 'Urgency & Priority Level',
      runDiagnosisBtn: 'Run AI Diagnostic Engine',
      resetBtn: 'Reset Form Fields',
      results: {
        title: 'Diagnostic Report & Root Cause Analysis',
        subtitle: 'Comprehensive fault analysis, verified checklist, and actionable solutions',
        rootCausesTitle: 'Probable Root Causes:',
        diagnosticStepsTitle: 'Interactive Diagnostic Checklist:',
        expectedResult: 'Expected Result:',
        solutionsTitle: 'Actionable Solutions & Fixes:',
        preventiveTipsTitle: 'Preventive Measures & Best Practices:',
        quickCommandsTitle: 'Copyable Terminal Commands (CMD / PowerShell):',
        copyBtn: 'Copy Command',
        copied: 'Copied!',
        convertToTicketTitle: 'Convert Diagnosis to Official Support Ticket',
        convertToTicketDesc: 'If the issue cannot be resolved through self-service steps, dispatch an official ticket to the IT team:',
        requestRemoteAnyDesk: 'Request Remote Access (AnyDesk / TeamViewer)',
        requestOnsiteVisit: 'Request On-Site Desk Visit by IT Engineer',
        createOfficialTicketBtn: 'Submit Official Support Ticket Now'
      }
    },

    // Create Ticket Form
    createTicket: {
      pageTitle: 'Submit New Support Ticket',
      pageSubtitle: 'Create a tracked support ticket in the realtime cloud database with instant mobile dispatch to technicians',
      employeeInfoSection: 'Requester Information',
      employeeName: 'Employee Name',
      employeePlaceholder: 'Enter requester name...',
      department: 'Department',
      deviceType: 'Device Type',
      os: 'Operating System',
      problemSection: 'Incident Details',
      category: 'Issue Category',
      priority: 'Priority Level',
      description: 'Detailed Description',
      descriptionPlaceholder: 'Provide exact details, error messages, or observed behavior...',
      assistanceTypeSection: 'Required Assistance Method',
      selfAssistance: 'Self-Assisted (Guidance only)',
      remoteAssistance: 'Remote Support via AnyDesk',
      onsiteAssistance: 'On-Site Technician Desk Visit',
      submitBtn: 'Submit & Save to Cloud',
      resetBtn: 'Clear Form',
      backToLogBtn: 'Back to Ticket Log'
    },

    // Ticket Log
    ticketLog: {
      pageTitle: 'IT Incident Management & Ticket Log',
      pageSubtitle: 'Track, manage, update, and resolve support tickets in realtime with omnichannel escalation',
      searchPlaceholder: 'Search by ticket #, employee, department, or issue description...',
      filterStatus: 'Filter by Status:',
      filterPriority: 'Filter by Priority:',
      allStatuses: 'All Statuses',
      allPriorities: 'All Priorities',
      filterScope: 'Visibility Scope:',
      allCompanyTickets: 'All Company Tickets',
      myTicketsOnly: 'My Tickets Only',
      ticketsFound: 'matching tickets',
      ticketCard: {
        ticketNumber: 'Ticket #:',
        createdAt: 'Created:',
        department: 'Dept:',
        device: 'Device:',
        assignedTech: 'Assigned Engineer:',
        unassigned: 'Unassigned (Pending)',
        remoteBadge: 'Remote (AnyDesk)',
        onsiteBadge: 'On-Site Visit',
        detailsBtn: 'View Details & Chat',
        sendWhatsAppBtn: 'Send WhatsApp',
        deleteTicketBtn: 'Delete Ticket',
        deleteConfirm: 'Are you sure you want to permanently delete this ticket?'
      },
      detailsModal: {
        title: 'Ticket Details & Live Timeline',
        currentStatus: 'Current Status:',
        changeStatus: 'Update Ticket Status:',
        ticketDetails: 'Incident Details:',
        diagnosticSummary: 'AI Diagnostic Summary:',
        suggestedSolution: 'Recommended Fix:',
        resolutionNotes: 'Resolution Notes:',
        followUpTimeline: 'Activity Timeline & Live Chat:',
        noMessagesYet: 'No follow-up messages yet.',
        replyPlaceholder: 'Type a message, status update, or diagnostic note...',
        sendReplyBtn: 'Send Reply',
        closeBtn: 'Close'
      }
    },

    // About Section
    about: {
      pageTitle: 'About System & Championship Entry',
      pageSubtitle: 'Autonomous IT Support AI Agent · Cloud-native IT diagnostics, omnichannel escalation, and service automation',
      heroBadge: 'Official Entry: Create AI Agents Championship 2026',
      heroDesc: 'An autonomous AI agent engineered to bridge the gap between non-technical staff and IT specialists, providing instant diagnostics and instant omnichannel alerts.',
      openDeckBtn: 'Open Championship Presentation Deck (AI Deck)',
      openPortalBtn: 'Visit Official Championship Portal ↗',
      devCardTitle: 'Lead Software Engineer & Creator',
      devName: 'Eng. Abdelrahim Mohamed Ahmed Mohamed',
      devNameEn: 'Eng. Abdelrahim Mohamed Ahmed Mohamed',
      devLocation: 'Arab Republic of Egypt - Qena Governorate',
      devCountry: 'Egypt',
      devPhone: 'Phone / WhatsApp: +201009125279',
      devEmail: 'Email: rahemxp2020@gmail.com',
      devTelegram: 'Telegram Verified Chat ID: 5516879336',
      architectureTitle: 'Autonomous Agent Architecture',
      featuresTitle: 'Key Enterprise Capabilities & Differentiators',
      rightsNotice: 'All intellectual property rights reserved to Eng. Abdelrahim Mohamed Ahmed Mohamed © 2026'
    },

    // Competition Presentation Modal
    deck: {
      modalTitle: 'Official Championship Submission: Create AI Agents 2026',
      agentBadge: 'AI Agent Deck',
      downloadBtn: 'Download Deck (PDF/HTML)',
      closeBtn: 'Close',
      tabs: {
        slides: 'Slide Deck (Pitch Deck)',
        videoScript: 'Video Script (Storyboard)',
        brochure: 'User Manual (Client Guide)',
        submissionForm: 'Submission Form (Howspace)'
      },
      slideCounter: 'Slide {current} of {total}',
      prevSlide: 'Previous Slide',
      nextSlide: 'Next Slide',
      downloadPrompt: 'Download standalone file directly to your device',
      downloadFormBtn: 'Download Text File (.MD)'
    },

    // Statuses & Priorities
    status: {
      new: 'New',
      inProgress: 'In Progress',
      resolved: 'Resolved',
      closed: 'Closed'
    },
    priority: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      critical: 'Critical'
    },

    // Categories
    categories: {
      internet: 'Internet & Connectivity',
      internal_network: 'Internal Network & VPN',
      printer: 'Printer & Scanner',
      slow_pc: 'PC Performance & Slowdown',
      login: 'Authentication & Passwords',
      email: 'Email & Outlook Client',
      software: 'Enterprise Applications',
      file_sharing: 'File Sharing & Storage',
      other: 'Other Technical Fault'
    }
  }
};

/**
 * Helper to translate ticket priority
 */
export function translatePriority(priority: PriorityLevel | string, lang: SupportedLanguage): string {
  if (lang === 'ar') return priority;
  switch (priority) {
    case 'حرج': return 'Critical';
    case 'مرتفع': return 'High';
    case 'متوسط': return 'Medium';
    case 'منخفض': return 'Low';
    default: return priority;
  }
}

/**
 * Helper to translate ticket status
 */
export function translateStatus(status: TicketStatus | string, lang: SupportedLanguage): string {
  if (lang === 'ar') return status;
  switch (status) {
    case 'جديد': return 'New';
    case 'قيد المعالجة': return 'In Progress';
    case 'تم الحل': return 'Resolved';
    case 'مغلق': return 'Closed';
    default: return status;
  }
}

/**
 * Helper to translate category label
 */
export function translateCategory(cat: ProblemCategory | string, lang: SupportedLanguage): string {
  const dict = translations[lang].categories;
  return (dict as any)[cat] || cat;
}
