import { ProblemCategoryInfo } from '../types/it-support';

export const COMMON_PROBLEMS: ProblemCategoryInfo[] = [
  {
    id: 'internet',
    title: 'مشكلة الإنترنت',
    titleEn: 'Internet Connectivity',
    shortDesc: 'انقطاع الاتصال بالإنترنت، عدم فتح المواقع، أو بطء التصفح الحاد.',
    shortDescEn: 'Total internet loss, browser DNS errors, or severe packet drop.',
    iconName: 'Globe',
    badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    typicalSymptoms: [
      'ظهور علامة تعجب صفراء أو كرة أرضية فارغة على أيقونة الشبكة',
      'رسالة DNS_PROBE_FINISHED_NO_INTERNET في المتصفح',
      'توقف تطبيقات الويب السحابية عن العمل'
    ],
    typicalSymptomsEn: [
      'Yellow warning triangle or globe icon on system tray',
      'Browser error: DNS_PROBE_FINISHED_NO_INTERNET',
      'Cloud web apps failing to load'
    ],
    samplePreset: {
      department: 'المبيعات والتسويق',
      deviceType: 'حاسوب محمول (Laptop)',
      os: 'Windows 11 Enterprise / Pro',
      description: 'المتصفح لا يفتح أي مواقع إلكترونية، وتظهر رسالة No Internet Access على رمز الواي فاي مع أن الزملاء في نفس الغرفة متصلون بشكل طبيعي.',
      priority: 'مرتفع'
    },
    samplePresetEn: {
      department: 'Sales & Marketing',
      deviceType: 'Laptop',
      os: 'Windows 11 Enterprise',
      description: 'Browser cannot load any external websites. Wi-Fi status shows "No Internet Access" while colleagues in the same room connect normally.',
      priority: 'مرتفع'
    }
  },
  {
    id: 'internal_network',
    title: 'مشكلة الشبكة الداخلية',
    titleEn: 'Internal Network & VPN',
    shortDesc: 'تعذر الوصول لخوادم الشركة، برامج المحاسبة، أو شبكة الـ VPN.',
    shortDescEn: 'Cannot access internal file servers, ERP database, or remote VPN tunnel.',
    iconName: 'Network',
    badgeColor: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10',
    typicalSymptoms: [
      'فشل الاتصال ببرامج ERP أو قواعد البيانات المحلية',
      'تعذر الاتصال بـ VPN المكتب عن بعد',
      'فقدان الحزم عند عمل Ping لبوابة الخوادم'
    ],
    typicalSymptomsEn: [
      'Connection to on-premise ERP or database server failed',
      'Corporate VPN client disconnects repeatedly',
      'High packet loss pinging server subnet'
    ],
    samplePreset: {
      department: 'المالية والمحاسبة',
      deviceType: 'كمبيوتر مكتبي (Desktop)',
      os: 'Windows 10 Pro / Enterprise',
      description: 'لا أستطيع فتح برنامج المحاسبة والمالية الداخلي، ويظهر خطأ: Connection to ERP Database Server Failed (Port 1433 unreachable).',
      priority: 'حرج'
    },
    samplePresetEn: {
      department: 'Finance & Accounting',
      deviceType: 'Desktop Workstation',
      os: 'Windows 10 Enterprise',
      description: 'Unable to open corporate financial ERP system. Error: Connection to ERP Database Server Failed (Port 1433 unreachable).',
      priority: 'حرج'
    }
  },
  {
    id: 'printer',
    title: 'الطابعة لا تعمل',
    titleEn: 'Printer & Scanner',
    shortDesc: 'توقف الطباعة، رسائل خطأ، أو عدم ظهور الطابعة الشبكية في النظام.',
    shortDescEn: 'Print queue hung, printer shows offline, or paper feed error.',
    iconName: 'Printer',
    badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
    typicalSymptoms: [
      'تراكم المهام في طابور الطباعة (Print Queue Pending)',
      'ظهور حالة الطابعة كـ "غير متصلة" (Offline)',
      'توقف خدمة Print Spooler في ويندوز'
    ],
    typicalSymptomsEn: [
      'Print jobs accumulating with Error status',
      'Printer status stuck on Offline in Windows Settings',
      'Print Spooler service stopped unexpectedly'
    ],
    samplePreset: {
      department: 'الموارد البشرية (HR)',
      deviceType: 'طابعة أو ماسح ضوئي',
      os: 'Windows 11 Enterprise / Pro',
      description: 'طابعة القسم HP LaserJet تظهر بحالة Offline في لوحة التحكم، وكل المستندات التي أرسلها تبقى معلقة في طابور الطباعة دون أن تطبع.',
      priority: 'متوسط'
    },
    samplePresetEn: {
      department: 'Human Resources',
      deviceType: 'Network Multi-function Printer',
      os: 'Windows 11 Enterprise',
      description: 'Departmental HP LaserJet shows Offline in Devices & Printers. All queued documents remain pending without printing.',
      priority: 'متوسط'
    }
  },
  {
    id: 'slow_pc',
    title: 'بطء أداء الجهاز',
    titleEn: 'Workstation Slowdown',
    shortDesc: 'تهنيج النظام، استهلاك 100% للمعالج أو الرام، وبطء فتح البرامج.',
    shortDescEn: 'Severe freezing, CPU or RAM pegged at 100%, and sluggish application response.',
    iconName: 'Gauge',
    badgeColor: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
    typicalSymptoms: [
      'تجميد مؤشر الفأرة وظهور دائرة التحميل الزرقاء باستمرار',
      'صوت مروحة التبريد مرتفع جداً والحرارة عالية',
      'استغراق تشغيل الويندوز أكثر من 5 دقائق'
    ],
    typicalSymptomsEn: [
      'Cursor freezing and spinning busy indicator',
      'Loud cooling fan noise due to continuous 100% CPU spikes',
      'Boot sequence takes more than 5 minutes'
    ],
    samplePreset: {
      department: 'خدمة العملاء',
      deviceType: 'كمبيوتر مكتبي (Desktop)',
      os: 'Windows 10 Pro / Enterprise',
      description: 'الجهاز يتجمد فجأة عند فتح أكثر من 3 تبويبات في المتصفح، ومدير المهام يظهر استخدام الذاكرة بنسبة 98% واستخدام القرص 100%.',
      priority: 'متوسط'
    },
    samplePresetEn: {
      department: 'Customer Support',
      deviceType: 'Desktop Workstation',
      os: 'Windows 10 Pro',
      description: 'Workstation freezes when opening multiple browser tabs. Task Manager shows Memory at 98% and Disk usage stuck at 100%.',
      priority: 'متوسط'
    }
  },
  {
    id: 'login',
    title: 'تسجيل الدخول وكلمة المرور',
    titleEn: 'Login & Account Lockout',
    shortDesc: 'قفل الحساب في الدومين، نسيان كلمة المرور، أو تعذر تسجيل الدخول.',
    shortDescEn: 'Account locked in Active Directory, expired password, or domain trust error.',
    iconName: 'LockKeyhole',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    typicalSymptoms: [
      'رسالة The referenced account is currently locked out',
      'رسالة The trust relationship between this workstation and domain failed',
      'انتهاء صلاحية كلمة المرور وعدم قبول التغيير'
    ],
    typicalSymptomsEn: [
      'Error: "The referenced account is currently locked out"',
      'Error: "The trust relationship between this workstation and primary domain failed"',
      'Password expired but self-reset fails'
    ],
    samplePreset: {
      department: 'الإدارة العامة والمتابعة',
      deviceType: 'حاسوب محمول (Laptop)',
      os: 'Windows 11 Enterprise / Pro',
      description: 'لا أستطيع الدخول للويندوز بعد العودة من الإجازة، وتظهر رسالة أن الحساب مقفل ومطلوب التواصل مع مسؤول النظام.',
      priority: 'مرتفع'
    },
    samplePresetEn: {
      department: 'Executive Administration',
      deviceType: 'Executive Laptop',
      os: 'Windows 11 Enterprise',
      description: 'Cannot log in to Windows. Screen displays: "The referenced account is currently locked out and cannot be logged on to."',
      priority: 'مرتفع'
    }
  },
  {
    id: 'email',
    title: 'البريد الإلكتروني وأوتلوك',
    titleEn: 'Email & Outlook Client',
    shortDesc: 'توقف إرسال واستقبال الرسائل، امتلاء الصندوق، أو تعطل Outlook.',
    shortDescEn: 'Outlook not syncing, mailbox quota exceeded, or crash on launch.',
    iconName: 'Mail',
    badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
    typicalSymptoms: [
      'ظهور حالة Disconnected أو Trying to connect في أسفل Outlook',
      'رسالة خطأ 0x8004010F: Outlook data file cannot be accessed',
      'ارتداد الرسائل بسبب تجاوز الحجم المسموح'
    ],
    typicalSymptomsEn: [
      'Outlook status bar shows "Disconnected" or "Need Password"',
      'Error 0x8004010F: Outlook data file cannot be accessed',
      'Mail delivery failure: Mailbox quota exceeded'
    ],
    samplePreset: {
      department: 'المشتريات والعقود',
      deviceType: 'حاسوب محمول (Laptop)',
      os: 'Windows 11 Enterprise / Pro',
      description: 'برنامج Outlook يتوقف عند شاشة Loading Profile ولا يفتح إلا إذا أعدت تشغيل الجهاز، وبعض رسائل اليوم لم تصل حتى الآن.',
      priority: 'مرتفع'
    },
    samplePresetEn: {
      department: 'Procurement & Contracts',
      deviceType: 'Corporate Laptop',
      os: 'Windows 11 Enterprise',
      description: 'Outlook client hangs indefinitely on "Loading Profile". Incoming emails from external vendors are not delivering.',
      priority: 'مرتفع'
    }
  },
  {
    id: 'software',
    title: 'البرامج والتطبيقات',
    titleEn: 'Enterprise Software & Apps',
    shortDesc: 'تعطل البرامج المحاسبية، مشاكل التراخيص، أو رسائل خطأ DLL.',
    shortDescEn: 'App crash on launch, missing runtime DLLs, or license validation failure.',
    iconName: 'AppWindow',
    badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
    typicalSymptoms: [
      'رسالة الخطأ الشهيرة The application was unable to start correctly (0xc000007b)',
      'رسالة VCRUNTIME140.dll is missing',
      'مطالبة بإعادة التفعيل أو انتهاء الترخيص المؤسسي'
    ],
    typicalSymptomsEn: [
      'Runtime exception: "The application was unable to start correctly (0xc000007b)"',
      'System error: "VCRUNTIME140.dll was not found"',
      'License manager alert: Enterprise volume license expired'
    ],
    samplePreset: {
      department: 'تقنية المعلومات والتشغيل',
      deviceType: 'كمبيوتر مكتبي (Desktop)',
      os: 'Windows 11 Enterprise / Pro',
      description: 'تطبيق إدارة المشروعات يغلق فور فتحه وتظهر رسالة خطأ بالذاكرة دون حفظ التغييرات.',
      priority: 'متوسط'
    },
    samplePresetEn: {
      department: 'Operations',
      deviceType: 'Workstation',
      os: 'Windows 11 Pro',
      description: 'Project management client crashes immediately upon launch with an unhandled runtime memory exception.',
      priority: 'متوسط'
    }
  },
  {
    id: 'file_sharing',
    title: 'مشاركة الملفات والمجلدات',
    titleEn: 'Shared Storage & SMB',
    shortDesc: 'فشل فتح المجلدات المشتركة على السيرفر أو رسائل Access Denied.',
    shortDescEn: 'Cannot access shared network drives (Z:), access denied, or permission errors.',
    iconName: 'FolderSync',
    badgeColor: 'border-teal-500/30 text-teal-400 bg-teal-500/10',
    typicalSymptoms: [
      'ظهور علامة X حمراء على القرص الشبكي المشترك (Shared Drive Z:)',
      'رسالة You do not have permission to access \\\\Server\\Share',
      'المطالبة المتكررة بإدخال اسم المستخدم وكلمة المرور'
    ],
    typicalSymptomsEn: [
      'Red X on mapped network drive (Z:)',
      'Error: "You do not have permission to access \\\\Server\\Share"',
      'Recurring Windows Security prompt for credentials'
    ],
    samplePreset: {
      department: 'الشؤون القانونية',
      deviceType: 'كمبيوتر مكتبي (Desktop)',
      os: 'Windows 10 Pro / Enterprise',
      description: 'القرص المشترك Z: الخاص بالعقود يرفض الفتح وتظهر رسالة Access is Denied بالرغم من أنني أفتحه يومياً.',
      priority: 'مرتفع'
    },
    samplePresetEn: {
      department: 'Legal Department',
      deviceType: 'Desktop Workstation',
      os: 'Windows 10 Enterprise',
      description: 'Mapped share drive Z: displays "Access is Denied" when attempting to open legal contract archives.',
      priority: 'مرتفع'
    }
  },
  {
    id: 'other',
    title: 'مشكلة تقنية أخرى',
    titleEn: 'Other Hardware / Peripheral',
    shortDesc: 'عطل في الشاشة، التوصيلات، الصوت، أو عطل عتادي غير مصنف.',
    shortDescEn: 'Dual display issues, audio peripherals, docking station, or unclassified faults.',
    iconName: 'Wrench',
    badgeColor: 'border-slate-500/30 text-slate-400 bg-slate-500/10',
    typicalSymptoms: [
      'الشاشة الإضافية لا تعمل أو تظهر شاشة سوداء No Signal',
      'تعطل الماوس أو لوحة المفاتيح اللاسلكية',
      'عدم خروج الصوت في اجتماعات Microsoft Teams'
    ],
    typicalSymptomsEn: [
      'Secondary display shows "No Signal" via HDMI/DisplayPort',
      'Wireless mouse and keyboard disconnecting randomly',
      'Headset microphone not captured in Microsoft Teams meetings'
    ],
    samplePreset: {
      department: 'العلاقات العامة والإعلام',
      deviceType: 'شاشات وملحقات (Accessories)',
      os: 'Windows 11 Enterprise / Pro',
      description: 'الشاشة الثانية المتصلة بمحول الـ Type-C لا تستجيب وتظهر شاشة سوداء مع صوت تكرار فصل وتوصيل الملحقات في الويندوز.',
      priority: 'متوسط'
    },
    samplePresetEn: {
      department: 'Public Relations',
      deviceType: 'Peripherals / Docking Station',
      os: 'Windows 11 Enterprise',
      description: 'Secondary monitor connected to USB-C docking station shows black screen, accompanied by continuous Windows device disconnect chimes.',
      priority: 'متوسط'
    }
  }
];

export const DEPARTMENTS = [
  'المبيعات والتسويق',
  'المالية والمحاسبة',
  'الموارد البشرية (HR)',
  'خدمة العملاء',
  'الإدارة العامة والمتابعة',
  'المشتريات والعقود',
  'تقنية المعلومات والتشغيل',
  'الشؤون القانونية',
  'العلاقات العامة والإعلام',
  'إدارة أخرى'
];

export const DEPARTMENTS_EN = [
  'Sales & Marketing',
  'Finance & Accounting',
  'Human Resources (HR)',
  'Customer Support',
  'Executive Administration',
  'Procurement & Contracts',
  'IT & Operations',
  'Legal Affairs',
  'Public Relations',
  'Other Department'
];

export const DEVICE_TYPES = [
  'حاسوب محمول (Laptop)',
  'كمبيوتر مكتبي (Desktop)',
  'طابعة أو ماسح ضوئي',
  'خادم محلي (Server)',
  'جهاز شبكة (Router / Switch)',
  'شاشات وملحقات (Accessories)'
];

export const DEVICE_TYPES_EN = [
  'Laptop',
  'Desktop Workstation',
  'Printer / Scanner',
  'Local Server',
  'Network Device (Router / Switch)',
  'Monitors & Peripherals'
];

export const OPERATING_SYSTEMS = [
  'Windows 11 Enterprise / Pro',
  'Windows 10 Pro / Enterprise',
  'Windows Server 2022 / 2019',
  'macOS Sequoia / Sonoma',
  'Ubuntu / Linux Enterprise'
];

export const OPERATING_SYSTEMS_EN = [
  'Windows 11 Enterprise / Pro',
  'Windows 10 Pro / Enterprise',
  'Windows Server 2022 / 2019',
  'macOS Sequoia / Sonoma',
  'Ubuntu / Linux Enterprise'
];
