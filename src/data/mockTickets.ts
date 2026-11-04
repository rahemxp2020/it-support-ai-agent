import { SupportTicket } from '../types/it-support';

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 't-4962',
    ticketNumber: 'IT-2026-4962',
    createdAt: '2026-11-03 07:36',
    updatedAt: '2026-11-03 07:36',
    userName: 'اية مراد',
    department: 'الموارد البشرية (HR)',
    deviceType: 'جهاز شبكة (Router / Switch)',
    os: 'Windows 11 Enterprise / Pro',
    category: 'software',
    categoryLabel: 'البرامج والتطبيقات',
    description: 'موارد بشريه',
    priority: 'متوسط',
    status: 'جديد',
    technicianName: 'م. عبدالرحيم محمد احمد محمد',
    technicians: [
      'م. عبدالرحيم محمد احمد محمد'
    ],
    diagnosisSummary: 'بلاغ مباشر وارد لمركز العمليات بخصوص البرامج والتطبيقات لإدارة الموارد البشرية.',
    suggestedSolution: 'المعاينة الميدانية وفحص التوصيلات والبرامج',
    resolutionNotes: '',
    assistanceType: 'self',
    requiresSpecialistIntervention: false,
    followUpHistory: []
  },
  {
    id: 't-9511',
    ticketNumber: 'IT-2026-9511',
    createdAt: '2026-11-02 17:56',
    updatedAt: '2026-11-02 17:56',
    userName: 'مصطفي عبدالحكم',
    department: 'المالية والمحاسبة',
    deviceType: 'كمبيوتر مكتبي (Desktop)',
    os: 'Windows 11 Enterprise / Pro',
    category: 'printer',
    categoryLabel: 'الطابعة لا تعمل',
    description: 'وصف المشكلة بالتفصيل',
    priority: 'حرج',
    status: 'جديد',
    technicianName: 'م. عبدالرحيم محمد احمد محمد / فريق دعم',
    technicians: [
      'م. عبدالرحيم محمد احمد محمد',
      'فريق دعم'
    ],
    diagnosisSummary: 'عطل حرج في تشغيل الطابعة بقسم المالية والمحاسبة يؤثر على إصدار الفواتير والشيكات.',
    suggestedSolution: 'المعاينة الميدانية وفحص التوصيلات والبرامج',
    resolutionNotes: '',
    assistanceType: 'on_site',
    requiresSpecialistIntervention: true,
    followUpHistory: []
  },
  {
    id: 't-3277',
    ticketNumber: 'IT-2026-3277',
    createdAt: '2026-10-27 14:15',
    updatedAt: '2026-11-01 11:40',
    userName: 'بولا ميخائيل',
    department: 'تقنية المعلومات (IT)',
    deviceType: 'حاسوب محمول (Laptop)',
    os: 'Windows 11 Enterprise / Pro',
    category: 'internet',
    categoryLabel: 'مشاكل الإنترنت والشبكة',
    description: 'بلاغ فحص ومتابعة اتصال الإنترنت والشبكة تم رفعه بواسطة الزميل بولا (رقم البلاغ IT-2026-3277).',
    priority: 'متوسط',
    status: 'تم الحل',
    technicianName: 'م. عبدالرحيم محمد',
    technicians: [
      'م. عبدالرحيم محمد'
    ],
    diagnosisSummary: 'تم تسجيل البلاغ بنجاح في المنظومة وجارٍ متابعة الفحص من قبل فريق الدعم الفني.',
    suggestedSolution: 'إجراء فحص الاتصال بالبوابة الافتراضية ومراجعة إعدادات DNS ومحول الشبكة.',
    resolutionNotes: '',
    assistanceType: 'self',
    requiresSpecialistIntervention: false,
    followUpHistory: [
      {
        id: 'f-1793104983277',
        author: 'بولا ميخائيل',
        role: 'user',
        message: 'تم تسجيل البلاغ ومطلوب المتابعة.',
        timestamp: '2026-10-27 14:15',
        type: 'message'
      }
    ]
  },
  {
    id: 't-1006',
    ticketNumber: 'IT-2026-1044',
    createdAt: '2026-10-13 14:20',
    updatedAt: '2026-10-26 12:00',
    userName: 'آية محمد',
    department: 'المبيعات والتسويق',
    deviceType: 'حاسوب محمول (Laptop)',
    os: 'Windows 11 Enterprise / Pro',
    category: 'internet',
    categoryLabel: 'مشاكل الإنترنت والشبكة',
    description: 'فحص إنترنت: انقطاع تصفح الإنترنت وفشل الاتصال مع ظهور تعذر الوصول إلى الخادم ومشاكل في ترجمة خادم DNS.',
    priority: 'مرتفع',
    status: 'تم الحل',
    technicianName: 'م. عبدالرحيم محمد',
    technicians: [
      'م. عبدالرحيم محمد'
    ],
    diagnosisSummary: 'انقطاع الاتصال ببوابة التوجيه وخادم DNS مع الحاجة لتفريغ ذاكرة DNS وإعادة تعيين مكدس TCP/IP.',
    suggestedSolution: 'تفريغ ذاكرة DNS (ipconfig /flushdns) وتجديد عنوان IP وفحص بطاقة الشبكة.',
    resolutionNotes: 'تم فحص الشبكة وتجديد عنوان IP وعمل اتصال تجريبي ناجح واختبار استقرار التصفح.'
  },
  {
    id: 't-1005',
    ticketNumber: 'IT-2026-1043',
    createdAt: '2026-09-30 11:15',
    updatedAt: '2026-10-27 12:46',
    userName: 'ريم الخالدي',
    department: 'الجرافيك والتصميم (Graphic & Design)',
    deviceType: 'محطة عمل متقدمة (Workstation)',
    os: 'macOS Sequoia / Sonoma',
    category: 'software',
    categoryLabel: 'مشكلة البرامج',
    description: 'توقف برامج التصميم والمونتاج (Adobe Creative Cloud) عن الريندر وتصدير الفيديوهات بسبب امتلاء أقراص العمل المؤقتة Scratch Disks وتعارض تعريفات تسريع المعالج الرسومي GPU.',
    priority: 'مرتفع',
    status: 'تم الحل',
    technicianName: 'م. مصطفي سعيد',
    technicians: [
      'م. مصطفي سعيد'
    ],
    diagnosisSummary: 'تم فحص وحدة التخزين المؤقتة NVMe المخصصة للـ Scratch Disk وتحديث تعريفات كرت الشاشة Studio Driver.',
    suggestedSolution: 'تفريغ مساحة الذاكرة المؤقتة لبرامج التصميم وتفعيل تسريع المعالجة الرسومية Hardware Acceleration.',
    resolutionNotes: 'تم تشغيل برنامج التصميم بنجاح واكتمال عمليات الريندر والتصدير وتفريغ أقراص العمل المؤقتة.',
    assistanceType: 'self',
    requiresSpecialistIntervention: false,
    followUpHistory: []
  },
  {
    id: 't-1001',
    ticketNumber: 'IT-2026-1042',
    createdAt: '2026-09-30 08:30',
    updatedAt: '2026-10-27 12:45',
    userName: 'عبدالله السعدي',
    department: 'المالية والمحاسبة',
    deviceType: 'كمبيوتر مكتبي (Desktop)',
    os: 'Windows 11 Enterprise / Pro',
    category: 'internal_network',
    categoryLabel: 'مشكلة الشبكة الداخلية',
    description: 'انقطاع الاتصال بقاعدة بيانات نظام الفوترة والضرائب عند إجراء الإقفال المالي الشهري.',
    priority: 'حرج',
    status: 'تم الحل',
    technicianName: 'م. عمر سالم',
    technicians: [
      'م. عمر سالم'
    ],
    diagnosisSummary: 'تبين وجود تجمد في خدمة SQL Server Browser على الخادم الرئيسي وجارٍ إعادة تشغيل الخدمة والتأكد من فتح المنفذ 1433.',
    suggestedSolution: 'إعادة تشغيل خدمة SQL Browser ومزامنة إعدادات جدار الحماية للشبكة الفرعية.',
    resolutionNotes: 'تمت إعادة تشغيل خدمة SQL Browser بنجاح وفتح المنافذ المطلوبة واكتمال الإقفال المالي السنوي.',
    assistanceType: 'self',
    requiresSpecialistIntervention: false,
    followUpHistory: []
  },
  {
    id: 't-1002',
    ticketNumber: 'IT-2026-1041',
    createdAt: '2026-09-29 14:10',
    updatedAt: '2026-10-26 12:00',
    userName: 'نورة المنصور',
    department: 'الموارد البشرية (HR)',
    deviceType: 'طابعة أو ماسح ضوئي',
    os: 'Windows 11 Enterprise / Pro',
    category: 'printer',
    categoryLabel: 'الطابعة لا تعمل',
    description: 'طابعة العقود بالدور الثاني لا تستجيب وتظهر شاشة سوداء مع وميض زر التنبيه.',
    priority: 'مرتفع',
    status: 'تم الحل',
    technicianName: 'م. بولا ميخائيل',
    technicians: [
      'م. بولا ميخائيل'
    ],
    diagnosisSummary: 'تراكم مستند بحجم 140MB أدى لانهيار Print Spooler مع وجود انحشار ورق خفيف في الدرج 2.',
    suggestedSolution: 'تم تنظيف مسار الورق وإعادة تشغيل خدمة Print Spooler وحذف الملف التالف بنجاح.',
    resolutionNotes: 'تمت تجربة طباعة 5 صفحات بنجاح والمستخدم أكد سلامة الجهاز.'
  },
  {
    id: 't-1003',
    ticketNumber: 'IT-2026-1040',
    createdAt: '2026-09-29 11:20',
    updatedAt: '2026-10-28 06:41',
    userName: 'ياسر العلي',
    department: 'المبيعات والتسويق',
    deviceType: 'حاسوب محمول (Laptop)',
    os: 'Windows 10 Pro / Enterprise',
    category: 'login',
    categoryLabel: 'مشكلة تسجيل الدخول',
    description: 'المستخدم مقفل بعد العودة من الإجازة بسبب إدخال كلمة مرور قديمة.',
    priority: 'متوسط',
    status: 'تم الحل',
    technicianName: 'م. مريم عبدالرحيم',
    technicians: [
      'م. مريم عبدالرحيم'
    ],
    diagnosisSummary: 'تأمين الحساب في Active Directory بعد 5 محاولات خاطئة.',
    suggestedSolution: 'فك قفل الحساب وإصدار كلمة مرور مؤقتة تطلب التغيير عند أول تسجيل دخول.',
    resolutionNotes: 'الموظف سجل دخوله بنجاح وقام بإنشاء كلمة المرور الجديدة تحت إشراف م. مريم عبدالرحيم.'
  },
  {
    id: 't-1004',
    ticketNumber: 'IT-2026-1039',
    createdAt: '2026-09-28 16:00',
    updatedAt: '2026-10-28 06:41',
    userName: 'سليمان البدر',
    department: 'خدمة العملاء والدعم',
    deviceType: 'كمبيوتر مكتبي (Desktop)',
    os: 'Windows 11 Enterprise / Pro',
    category: 'slow_pc',
    categoryLabel: 'الكمبيوتر بطيء',
    description: 'امتلاء قرص C بمقدار 99% وتجمد برامج خدمة العملاء.',
    priority: 'متوسط',
    status: 'تم الحل',
    technicianName: 'م. عبدالرحيم محمد',
    technicians: [
      'م. عبدالرحيم محمد'
    ],
    diagnosisSummary: 'تراكم ملفات التحديث المؤقتة وسجلات الـ dump في مجلد Windows.',
    suggestedSolution: 'تشغيل cleanmgr وتنظيف ملفات التحديثات المؤقتة وإلغاء البرامج غير المصرح بها.',
    resolutionNotes: 'جاري فحص الملفات وحذف المخلفات المؤقتة لزيادة مساحة القرص C.'
  },
  {
    id: 't-2716',
    ticketNumber: 'IT-2026-9547',
    createdAt: '2026-10-26 11:35',
    userName: 'حسام حسن الشريف',
    department: 'المبيعات والتسويق',
    deviceType: 'كمبيوتر مكتبي (Desktop)',
    os: 'Windows 11 Enterprise / Pro',
    category: 'other',
    categoryLabel: 'مشكلة أخرى',
    description: 'يوجد مشكلة في بدء عملية البحث في وندوز 11 بجهاز الكمبيوتر الخاص بي \nعند الضغط على أيقونة Search أسفل شريط الأدوات ، لا يفتح ولا يستجيب',
    priority: 'متوسط',
    status: 'تم الحل',
    technicianName: 'م. عبدالرحيم محمد',
    technicians: [
      'م. عبدالرحيم محمد'
    ],
    diagnosisSummary: 'مشكلة تقنية عامة تتطلب تقييماً شاملاً للمكونات المادية والبرمجية والأذونات ومصادر التغذية أو الأجهزة الطرفية. (حالة مستلمة من: حسام حسن الشريف - قسم: المبيعات والتسويق)',
    suggestedSolution: 'إعادة تشغيل الجهاز الكاملة (Restart): إعادة التشغيل الفعلية لتفريغ الذاكرة المؤقتة وإنهاء العمليات العالقة.',
    resolutionNotes: '',
    assistanceType: 'on_site',
    requiresSpecialistIntervention: true,
    followUpHistory: [
      {
        id: 'f-1793014532716',
        author: 'حسام حسن الشريف',
        role: 'user',
        message: 'طلب زيارة فني لمكتبي: المستخدم يطلب حضور أحد مهندسي الدعم الميداني للفحص والمساعدة المباشرة.',
        timestamp: '2026-10-26 11:35',
        type: 'visit_request'
      },
      {
        id: 'f-1793014570155-192',
        author: 'حسام حسن الشريف',
        role: 'user',
        message: 'فضلا وليس أمرا سرعة الحضور لحل المشكلة',
        timestamp: '2026-10-26 11:36',
        type: 'message'
      }
    ],
    updatedAt: '2026-10-26 11:36'
  },
  {
    id: 't-5422',
    ticketNumber: 'IT-2026-7020',
    createdAt: '2026-10-26 11:25',
    userName: 'حسام حسن الشريف',
    department: 'الجرافيك والتصميم (Graphic & Design)',
    deviceType: 'كمبيوتر مكتبي (Desktop)',
    os: 'Windows 11 Enterprise / Pro',
    category: 'software',
    categoryLabel: 'مشكلة البرامج',
    description: 'عندما اقوم بفتح برنامج الـ photoshop يفتح فترة قصيرة أقل من دقيقة ويختفي فجأة بالإغلاق \nأرجو معرفة المشكلة وكيفية حلها',
    priority: 'مرتفع',
    status: 'تم الحل',
    technicianName: 'م. عبدالرحيم محمد',
    technicians: [
      'م. عبدالرحيم محمد'
    ],
    diagnosisSummary: 'توقف أحد البرامج التطبيقية عن الاستجابة أو إغلاقه بشكل مفاجئ وظهور رسائل خطأ برمجية أو انتهاء صلاحية الترخيص. (حالة مستلمة من: حسام حسن الشريف - قسم: الجرافيك والتصميم (Graphic & Design))',
    suggestedSolution: 'إصلاح التثبيت أو إعادة التثبيت النظيف: تشغيل ملف التثبيت الأصلي واختيار "Repair" أو حذفه بالكامل وتنزيل أحدث إصدار.',
    resolutionNotes: '',
    assistanceType: 'remote',
    requiresSpecialistIntervention: true,
    followUpHistory: [
      {
        id: 'f-1793013925422',
        author: 'حسام حسن الشريف',
        role: 'user',
        message: 'طلب دعم فني عن بعد (AnyDesk / TeamViewer): المستخدم يطلب تدخل فني مباشر على الشاشة لعدم توفر الاختصاص التقني للحل الذاتي.',
        timestamp: '2026-10-26 11:25',
        type: 'remote_request'
      },
      {
        id: 'f-1793013947398-640',
        author: 'حسام حسن الشريف',
        role: 'user',
        message: 'أرجوا حل المشكلة سريعا',
        timestamp: '2026-10-26 11:25',
        type: 'message'
      }
    ],
    updatedAt: '2026-10-27 12:46'
  },
  {
    id: 't-5487',
    ticketNumber: 'IT-2026-5021',
    createdAt: '2026-10-27 12:42',
    userName: 'عمرو احمد موسي',
    department: 'تقنية المعلومات (IT)',
    deviceType: 'كمبيوتر مكتبي (Desktop)',
    os: 'Windows 11 Enterprise / Pro',
    category: 'slow_pc',
    categoryLabel: 'الكمبيوتر بطيء',
    description: 'الجهاز بطيء جداً ويتجمد عند فتح عدة برامج معاً، ويستغرق تشغيل الكمبيوتر وقتاً طويلاً مع ارتفاع صوت مروحة التبريد باستمرار.',
    priority: 'مرتفع',
    status: 'تم الحل',
    technicianName: 'م. عبدالرحيم محمد',
    technicians: [
      'م. عبدالرحيم محمد'
    ],
    diagnosisSummary: 'انخفاض ملحوظ في سرعة استجابة نظام التشغيل، بطء الإقلاع، أو تجميد مؤقت للبرامج أثناء العمل المكتبي. (حالة مستلمة من: عمرو احمد موسي - قسم: تقنية المعلومات (IT))',
    suggestedSolution: 'تعطيل برامج بدء التشغيل غير الضرورية: فتح Task Manager -> تبويب Startup وتعطيل التطبيقات الإضافية مثل أدوات التحديث التلقائي.',
    resolutionNotes: '',
    assistanceType: 'self',
    requiresSpecialistIntervention: false,
    followUpHistory: [
      {
        id: 'f-1793104980398-118',
        author: 'عمرو احمد موسي',
        role: 'user',
        message: 'حل المشكلة',
        timestamp: '2026-10-27 12:43',
        type: 'message'
      }
    ],
    updatedAt: '2026-10-27 15:07'
  }
];
