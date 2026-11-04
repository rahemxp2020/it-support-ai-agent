import { ProblemCategory, DiagnosisData } from '../types/it-support';

export interface ExpertKnowledgeRecord {
  analysis: string;
  rootCauses: string[];
  diagnosticSteps: { step: string; command?: string; expected: string }[];
  solutions: { title: string; action: string; badge?: string }[];
  recommendedPriority: string;
  preventiveTips: string[];
  quickCommands: string[];
}

export const LOCAL_EXPERT_KNOWLEDGE: Record<ProblemCategory, ExpertKnowledgeRecord> = {
  internet: {
    analysis: 'تعذر الاتصال بالشبكة الخارجية أو تعطل ترجمة أسماء النطاقات (DNS)، مع استقرار أو فقدان الاتصال ببوابة العبور الافتراضية.',
    rootCauses: [
      'فشل خادم DNS في حل عناوين الويب.',
      'عدم استلام عنوان IP صالح من خادم DHCP (ظهور عنوان 169.254.x.x - APIPA).',
      'فصل في كابل الإيثرنت أو تعطيل محول بطاقة الشبكة اللاسلكية.',
      'حجب اتصال من خلال خادم البروكسي (Proxy) أو جدار الحماية المؤسسي.'
    ],
    diagnosticSteps: [
      { step: 'التحقق من سلامة كابل الشبكة الفيزيائي أو قوة إشارة Wi-Fi.', expected: 'إشارة متصل (Connected).' },
      { step: 'فحص عنوان IP وبوابة العبور الافتراضية Default Gateway.', command: 'ipconfig /all', expected: 'الحصول على عنوان IP ضمن نطاق شبكة العمل.' },
      { step: 'اختبار الاتصال ببوابة الراوتر المحلي للشركة.', command: 'ping 192.168.1.1', expected: 'استجابة سريعة دون فقدان حزم (0% Loss).' },
      { step: 'اختبار الاتصال المباشر بخادم DNS الخارجي.', command: 'ping 8.8.8.8', expected: 'استجابة Reply from 8.8.8.8.' },
      { step: 'فحص دقة ترجمة النطاقات عبر أداة NSLookup.', command: 'nslookup google.com', expected: 'ظهور العنوان الرقمي للنطاق بنجاح.' }
    ],
    solutions: [
      { title: 'إعادة تعيين مكدس TCP/IP وتفريغ ذاكرة DNS', action: 'تشغيل موجه الأوامر كمسؤول وتنفيذ: ipconfig /flushdns ثم netsh int ip reset', badge: 'حل فوري' },
      { title: 'تجديد استئجار عنوان IP من الخادم', action: 'تنفيذ: ipconfig /release متبوعاً بـ ipconfig /renew', badge: 'شائع' },
      { title: 'إعادة تمكين محول الشبكة', action: 'تعطيل بطاقة الشبكة من لوحة التحكم ثم إعادة تمكينها بعد 5 ثوانٍ.', badge: 'عتاد' }
    ],
    recommendedPriority: 'مرتفع',
    preventiveTips: [
      'تحديث برامج تشغيل محول الشبكة (Network Adapter Driver) بانتظام.',
      'تجنب تعريض كابلات الإيثرنت للضغط أو الانثناء تحت المكاتب.',
      'تثبيت إعدادات الـ DNS عبر خوادم النطاق المركزية (DHCP Scope).'
    ],
    quickCommands: ['ipconfig /flushdns', 'ipconfig /renew', 'ping 8.8.8.8 -t', 'netsh winsock reset']
  },
  internal_network: {
    analysis: 'انقطاع الاتصال بالخوادم الداخلية أو قواعد بيانات الشركة أو خدمات الـ VPN مع احتمال بقاء الإنترنت الخارجي نشطاً.',
    rootCauses: [
      'اختلاف نطاق الـ Subnet أو تغيير منفذ الـ VLAN المخصص للمكتب.',
      'توقف خدمة عميل VPN أو انتهاء صلاحية شهادة الأمان.',
      'حجب المنافذ الداخلية (Port 445 SMB أو Port 1433 SQL) من جدار الحماية.',
      'فشل مصادقة Kerberos مع خادم النطاق Active Directory بسبب فارق التوقيت.'
    ],
    diagnosticSteps: [
      { step: 'التحقق من رقم منفذ الجدار المكتبي ومطابقته لشبكة القسم.', expected: 'تطابق نطاق الـ VLAN.' },
      { step: 'اختبار الاتصال بخادم النطاق المركزي (Domain Controller).', command: 'ping domain-controller.local', expected: 'رد مباشر دون تأخير.' },
      { step: 'فحص فتح المنافذ المستهدفة عبر PowerShell.', command: 'Test-NetConnection -ComputerName server01 -Port 445', expected: 'TcpTestSucceeded: True' },
      { step: 'مزامنة توقيت الجهاز مع خادم الوقت المركزي NTP.', command: 'w32tm /resync', expected: 'فارق توقيت أقل من دقيقتين.' }
    ],
    solutions: [
      { title: 'مزامنة ساعة النظام مع وحدة تحكم النطاق', action: 'تشغيل أمر w32tm /resync كمسؤول لتفادي رفض توثيق الدخول.', badge: 'حاسم' },
      { title: 'تتبع مسار الحزم وتحديد موضع التوقف', action: 'تنفيذ أمر tracert إلى عنوان الخادم لتحديد جهاز التوجيه المسبب للانقطاع.', badge: 'تشخيص' },
      { title: 'إعادة تشغيل عميل الشبكة الافتراضية VPN', action: 'إعادة تشغيل خدمة VPN والتأكد من صحة إعدادات التوجيه المكتبي.', badge: 'أمان' }
    ],
    recommendedPriority: 'حرج',
    preventiveTips: [
      'توثيق جداول الـ VLAN وتوزيع المنافذ بدقة في السجلات المركزية.',
      'مراقبة شهادات الأمان للـ VPN قبل 30 يوماً من انتهائها.'
    ],
    quickCommands: ['Test-NetConnection -Port 445', 'w32tm /resync', 'tracert 10.0.0.1', 'route print']
  },
  printer: {
    analysis: 'عدم استجابة الطابعة لمهام الطباعة أو تراكم الأوامر المعلقة في طابور خدمة Print Spooler أو تغير عنوان الـ IP.',
    rootCauses: [
      'توقف خدمة التخزين المؤقت للطباعة (Print Spooler Service).',
      'تعلق مستند تالف أو ضخم في طابور الطباعة يمنع بقية المهام.',
      'تغير عنوان IP الخاص بالطابعة الشبكية أو دخولها في وضع السكون العميق.',
      'برنامج تشغيل تالف أو غير متوافق بعد تحديثات الويندوز الأخيرة.'
    ],
    diagnosticSteps: [
      { step: 'التحقق من الشاشة الفيزيائية للطابعة وغياب انحشار الورق أو نفاد الحبر.', expected: 'الحالة جاهزة (Ready).' },
      { step: 'اختبار الاتصال بعنوان IP الخاص بالطابعة.', command: 'ping 192.168.1.200', expected: 'استجابة ناجحة وفتح لوحة الويب للطابعة.' },
      { step: 'فحص حالة خدمة Print Spooler في نظام التشغيل.', command: 'sc query spooler', expected: 'STATE: 4 RUNNING.' },
      { step: 'فحص قائمة الانتظار للمستندات المعلقة.', expected: 'طابور خالٍ من المستندات المعلقة برمز Error.' }
    ],
    solutions: [
      { title: 'إعادة تشغيل خدمة Print Spooler ومسح الطابور', action: 'تنفيذ: net stop spooler ثم مسح ملفات مجلد C:\\Windows\\System32\\spool\\PRINTERS ثم net start spooler', badge: 'الأكثر فاعلية' },
      { title: 'إعادة تثبيت الطابعة بمنفذ TCP/IP قياسي', action: 'حذف تعريف الطابعة وإضافتها باستخدام عنوان IP الثابت المباشر.', badge: 'تثبيت' },
      { title: 'تثبيت برنامج التشغيل الموحد (Universal Driver)', action: 'تنزيل حزمة برامج التشغيل PCL6 المعتمدة من موقع الشركة المصنعة.', badge: 'تعريف' }
    ],
    recommendedPriority: 'متوسط',
    preventiveTips: [
      'حجز عناوين IP ثابتة (DHCP Reservation) لجميع طابعات الأقسام.',
      'جدولة صيانة دورية لتنظيف بكرات سحب الورق واستبدال مستلزمات الطباعة.'
    ],
    quickCommands: ['net stop spooler', 'net start spooler', 'control printers', 'services.msc']
  },
  slow_pc: {
    analysis: 'بطء حاد في استجابة محطة العمل، ارتفاع استهلاك المعالج أو الذاكرة، أو بطء إقلاع النظام.',
    rootCauses: [
      'استهلاك مفرط للموارد (CPU بنسبة 100% أو امتلاء الذاكرة RAM بالكامل).',
      'امتلاء مساحة قرص النظام C: بأقل من 10% مساحة حرة.',
      'تراكم برامج بدء التشغيل (Startup Programs) والخدمات الخلفية غير الضرورية.',
      'تلف في ملفات النظام الأساسية أو وجود قطاعات معطوبة في القرص الصلب.'
    ],
    diagnosticSteps: [
      { step: 'فتح مدير المهام (Task Manager) ومراقبة العمليات الأكثر استهلاكاً.', expected: 'استهلاك المعالج في وضع الخمول أقل من 15%.' },
      { step: 'التحقق من المساحة الفارغة في القرص C:.', expected: 'توفر مساحة حرة لا تقل عن 20 جيجابايت.' },
      { step: 'فحص سلامة ملفات النظام الأساسية.', command: 'sfc /scannow', expected: 'إصلاح أي ملفات معطوبة بنجاح.' },
      { step: 'التحقق من صحة القرص الصلب وقيم الـ SMART.', command: 'wmic diskdrive get status', expected: 'الحالة: OK لجميع الأقراص.' }
    ],
    solutions: [
      { title: 'تعطيل برامج بدء التشغيل الزائدة', action: 'من Task Manager -> تبويب Startup، تعطيل التطبيقات غير الضرورية كأدوات التحديث.', badge: 'تسريع فوري' },
      { title: 'تنظيف الملفات المؤقتة وسجلات النظام', action: 'تشغيل cleanmgr وتنظيف مجلدات %temp% و prefetch لتوفير مساحة.', badge: 'تنظيف' },
      { title: 'إصلاح ملفات النظام الأساسية عبر DISM و SFC', action: 'تنفيذ: DISM /Online /Cleanup-Image /RestoreHealth ثم sfc /scannow', badge: 'استقرار' }
    ],
    recommendedPriority: 'متوسط',
    preventiveTips: [
      'منع الموظفين من تثبيت برامج غير مصرح بها من خارج متجر المؤسسة.',
      'ترقية محطات العمل القديمة إلى أقراص SSD وذاكرة لا تقل عن 16GB.'
    ],
    quickCommands: ['sfc /scannow', 'cleanmgr', 'dism /online /cleanup-image /restorehealth', 'taskmgr']
  },
  login: {
    analysis: 'تعذر تسجيل الدخول للمستخدم أو قفل الحساب في Active Directory أو فقدان علاقة الثقة بمحطة العمل.',
    rootCauses: [
      'قفل الحساب (Account Locked) نتيجة تكرار إدخال كلمة المرور بشكل خاطئ.',
      'انتهاء صلاحية كلمة المرور الدورية.',
      'اختلاف لغة لوحة المفاتيح أو تفعيل مفتاح Caps Lock.',
      'فقدان علاقة الثقة بين الجهاز ووحدة تحكم النطاق (Domain Trust Broken).'
    ],
    diagnosticSteps: [
      { step: 'التحقق من حالة الحساب في وحدة تحكم Active Directory.', expected: 'الحساب غير مقفل وغير معطل.' },
      { step: 'التحقق من اتصال الجهاز بالشبكة للوصول إلى سيرفر الـ DC.', expected: 'ظهور إشارة اتصال الشبكة في شاشة القفل.' },
      { step: 'فحص علاقة الثقة بين الجهاز والدومين.', command: 'nltest /sc_query:%userdomain%', expected: 'نجاح الاستعلام: Success.' }
    ],
    solutions: [
      { title: 'فك قفل الحساب وإعادة تعيين كلمة المرور مؤقتاً', action: 'من لوحة Active Directory، فتح خصائص الحساب وإلغاء خيار قفل الحساب وتعيين كلمة مرور مؤقتة.', badge: 'إداري' },
      { title: 'إعادة ضم محطة العمل للنطاق في حال فقدان الثقة', action: 'إخراج الجهاز إلى Workgroup ثم إعادة ربطه بالدومين وإعادة التشغيل.', badge: 'نظام' }
    ],
    recommendedPriority: 'مرتفع',
    preventiveTips: [
      'تفعيل التنبيه المسبق بانتهاء صلاحية كلمة المرور قبل 7 أيام.',
      'توفير بوابة الخدمة الذاتية لإعادة تعيين كلمة المرور (SSPR).'
    ],
    quickCommands: ['nltest /sc_query:%userdomain%', 'whoami /all', 'klist purge', 'gpupdate /force']
  },
  email: {
    analysis: 'تعذر إرسال أو استقبال الرسائل الإلكترونية عبر Outlook أو توقف المزامنة مع خوادم Exchange / Microsoft 365.',
    rootCauses: [
      'امتلاء السعة التخزينية لصندوق البريد (Mailbox Quota Exceeded).',
      'تلف ملف البيانات المحلي (ملف .OST أو .PST).',
      'وجود إضافة معطوبة (Add-in) تتسبب في تجميد تطبيق Outlook.',
      'انقطاع الاتصال بخادم البريد السحابي أو انتهاء صلاحية كلمة المرور.'
    ],
    diagnosticSteps: [
      { step: 'اختبار فتح البريد عبر متصفح الويب (Webmail / OWA).', expected: 'عمل البريد عبر المتصفح يثبت أن الخلل في التطبيق المحلي.' },
      { step: 'تشغيل برنامج Outlook في الوضع الآمن.', command: 'outlook.exe /safe', expected: 'عمل التطبيق بسلاسة يثبت أن الخلل في الإضافات.' },
      { step: 'التحقق من حجم ملف البيانات المحلي OST.', expected: 'حجم الملف أقل من 50 جيجابايت.' }
    ],
    solutions: [
      { title: 'إعادة بناء ملف البيانات OST', action: 'إغلاق Outlook وإعادة تسمية ملف .ost القديم، ثم تشغيل التطبيق لإنشاء ملف جديد والمزامنة.', badge: 'حل جذري' },
      { title: 'تعطيل الإضافات المشبوهة COM Add-ins', action: 'من File -> Options -> Add-ins وإلغاء تحديد الإضافات غير الضرورية.', badge: 'تحسين' }
    ],
    recommendedPriority: 'مرتفع',
    preventiveTips: [
      'تفعيل الأرشفة التلقائية (Online Archive) لتقليل حجم الصندوق الأساسي.',
      'استخدام روابط OneDrive بدلاً من إرفاق ملفات ضخمة داخل الرسائل.'
    ],
    quickCommands: ['outlook.exe /safe', 'outlook.exe /cleanrules', 'outlook.exe /profiles']
  },
  software: {
    analysis: 'توقف أحد البرامج التطبيقية عن العمل، إغلاق مفاجئ مع رسائل خطأ، أو تعطل ترخيص الاستخدام المؤسسي.',
    rootCauses: [
      'تلف في ملفات الـ DLL أو فقدان حزم Visual C++ أو .NET Framework.',
      'تعارض البرنامج مع مضاد الفيروسات أو نظام حماية نقطة النهاية (EDR).',
      'نقص صلاحيات المستخدم المكتبي لتشغيل التطبيق.',
      'تلف التثبيت بسبب تحديث غير مكتمل.'
    ],
    diagnosticSteps: [
      { step: 'مراجعة سجل الأحداث (Event Viewer) تحت Application Logs لمعرفة رمز الخطأ.', expected: 'رصد كود العطل والملف المتسبب.' },
      { step: 'تجربة تشغيل التطبيق بصلاحية المسؤول (Run as Administrator).', expected: 'تحديد ما إذا كانت المشكلة بسبب الصلاحيات.' }
    ],
    solutions: [
      { title: 'إصلاح التثبيت (Repair Install)', action: 'من إعدادات البرامج، اختيار البرنامج والنقر على "Repair" أو إعادة تثبيت أحدث إصدار.', badge: 'موصى به' },
      { title: 'تثبيت حزم Microsoft Visual C++ التراكمية', action: 'تثبيت الحزم التراكمية لتعويض أي ملفات DLL مفقودة في النظام.', badge: 'اعتماديات' }
    ],
    recommendedPriority: 'متوسط',
    preventiveTips: [
      'نشر وتحديث البرامج مركزياً عبر SCCM أو Microsoft Intune.',
      'إجراء اختبارات التوافق قبل نشر التحديثات على محطات العمل.'
    ],
    quickCommands: ['eventvwr.msc', 'appwiz.cpl', 'winget list', 'winget upgrade --all']
  },
  file_sharing: {
    analysis: 'تعذر الوصول إلى مجلد المشاركة الشبكية (SMB Share) أو ظهور رسالة رفض الوصول أو المطالبة المتكررة ببيانات الدخول.',
    rootCauses: [
      'عدم توفر أذونات الوصول على مستوى الـ NTFS أو مستوى الـ Share.',
      'تخزين بيانات اعتماد قديمة غير صالحة في مدير الاعتماد (Credential Manager).',
      'حجب منفذ المشاركة 445 من جدار الحماية أو تعطيل بروتوكول SMB.',
      'توقف خدمة LanmanWorkstation على محطة العمل.'
    ],
    diagnosticSteps: [
      { step: 'محاولة فتح المجلد باستخدام عنوان IP بدلاً من اسم السيرفر.', expected: 'معرفة هل المشكلة في ترجمة الـ DNS أم لا.' },
      { step: 'التحقق من بيانات الاعتماد المحفوظة في Windows Credential Manager.', command: 'cmdkey /list', expected: 'التأكد من عدم وجود بيانات قديمة متضاربة.' },
      { step: 'فحص حالة خدمة الشبكة LanmanWorkstation.', command: 'sc query LanmanWorkstation', expected: 'STATE: 4 RUNNING.' }
    ],
    solutions: [
      { title: 'مسح بيانات الدخول القديمة وإعادة الاتصال', action: 'مسح بيانات السيرفر عبر control keymgr ثم معاودة فتح المجلد وإدخال النطاق\\المستخدم.', badge: 'فعال' },
      { title: 'التحقق من عضوية المستخدم في مجموعة الأمان (Security Group)', action: 'التأكد من إضافة حساب الموظف ضمن مجموعة الصلاحيات المعتمدة للمجلد في AD.', badge: 'صلاحيات' }
    ],
    recommendedPriority: 'مرتفع',
    preventiveTips: [
      'إدارة صلاحيات المشاركة عبر مجموعات الأمان (RBAC) وليس بالأسماء الفردية.',
      'استخدام نظام DFS لتوحيد مسارات الوصول للمجلدات المشتركة.'
    ],
    quickCommands: ['control keymgr', 'net use', 'net use * /delete /y', 'sc query LanmanWorkstation']
  },
  other: {
    analysis: 'عطل تقني عام في الأجهزة الطرفية أو الشاشات المزدوجة أو الملحقات يتطلب فحصاً فيزيائياً وبرمجياً متكاملاً.',
    rootCauses: [
      'فصل في كابلات التوصيل أو كابلات الطاقة أو محولات الإشارة.',
      'تعارض في تحديثات النظام الحديثة أو تعريفات الأجهزة الطرفية.',
      'تلف في ملف تعريف المستخدم (User Profile Corruption).'
    ],
    diagnosticSteps: [
      { step: 'فحص التوصيلات الفيزيائية وتجربة منفذ USB أو منفذ شاشة بديل.', expected: 'التعرف على الجهاز وإصدار صوت التوصيل.' },
      { step: 'فحص إدارة الأجهزة بحثاً عن أي علامات تعجب صفراء.', command: 'devmgmt.msc', expected: 'عمل كافة البطاقات والملحقات دون أخطاء.' }
    ],
    solutions: [
      { title: 'إعادة التشغيل الفعلية لمحطة العمل', action: 'إعادة تشغيل الجهاز لتفريغ الذاكرة المؤقتة وإنهاء أي عمليات عالقة.', badge: 'أساسي' },
      { title: 'تحديث برنامج التشغيل عبر إدارة الأجهزة', action: 'النقر بزر الفأرة الأيمن على المكون واختيار Update Driver.', badge: 'تعريف' }
    ],
    recommendedPriority: 'متوسط',
    preventiveTips: [
      'إجراء فحص دوري للأجهزة والملحقات والتأكد من سلامة التوصيلات.',
      'الاحتفاظ بنسخ احتياطية دورية لبيانات العمل الهامة.'
    ],
    quickCommands: ['devmgmt.msc', 'shutdown /r /t 0', 'perfmon /report', 'dxdiag']
  }
};

export const LOCAL_EXPERT_KNOWLEDGE_EN: Record<ProblemCategory, ExpertKnowledgeRecord> = {
  internet: {
    analysis: 'External network connectivity failure or DNS resolution disruption, with stable or severed default gateway route.',
    rootCauses: [
      'DNS server failed to resolve external hostnames.',
      'Failed DHCP lease assignment (APIPA address 169.254.x.x detected).',
      'Physical ethernet cable disconnection or disabled Wi-Fi adapter.',
      'Enterprise proxy or firewall policy blocking outbound connections.'
    ],
    diagnosticSteps: [
      { step: 'Verify physical ethernet cable or Wi-Fi signal status.', expected: 'Signal shows Connected with valid link speed.' },
      { step: 'Inspect IP configuration and Default Gateway.', command: 'ipconfig /all', expected: 'Valid corporate subnet IP assignment.' },
      { step: 'Ping default local gateway router.', command: 'ping 192.168.1.1', expected: 'Low latency reply with 0% packet loss.' },
      { step: 'Direct ping test to public DNS server.', command: 'ping 8.8.8.8', expected: 'Consistent replies from 8.8.8.8.' },
      { step: 'Validate DNS resolution using NSLookup.', command: 'nslookup google.com', expected: 'Correct IP resolved within 50ms.' }
    ],
    solutions: [
      { title: 'Reset TCP/IP stack and Flush DNS Cache', action: 'Open CMD as Admin and run: ipconfig /flushdns && netsh int ip reset', badge: 'Instant Fix' },
      { title: 'Renew DHCP Lease', action: 'Execute: ipconfig /release && ipconfig /renew', badge: 'Standard' },
      { title: 'Power cycle network adapter', action: 'Disable network adapter in Control Panel and re-enable after 5 seconds.', badge: 'Hardware' }
    ],
    recommendedPriority: 'High',
    preventiveTips: [
      'Keep network interface controller drivers updated to vendor release.',
      'Ensure cables are routed safely away from foot traffic.'
    ],
    quickCommands: ['ipconfig /flushdns', 'ipconfig /renew', 'ping 8.8.8.8 -t', 'netsh winsock reset']
  },
  internal_network: {
    analysis: 'Internal server, ERP, SQL database, or corporate VPN connectivity lost while public internet might remain active.',
    rootCauses: [
      'Subnet mismatch or switchport VLAN reconfiguration.',
      'VPN client tunnel failure or expired certificate.',
      'Firewall blocking SMB port 445 or SQL port 1433.',
      'Kerberos clock skew causing Active Directory authentication rejection.'
    ],
    diagnosticSteps: [
      { step: 'Verify wall jack patching aligns with department VLAN.', expected: 'Correct subnet IP obtained.' },
      { step: 'Ping Domain Controller hostname.', command: 'ping domain-controller.local', expected: 'Immediate response with no drops.' },
      { step: 'Test port availability using PowerShell.', command: 'Test-NetConnection -ComputerName server01 -Port 445', expected: 'TcpTestSucceeded: True' },
      { step: 'Resynchronize system clock with domain NTP.', command: 'w32tm /resync', expected: 'Time skew under 2 minutes.' }
    ],
    solutions: [
      { title: 'Force Clock Resynchronization', action: 'Run w32tm /resync as administrator to restore Kerberos ticket validation.', badge: 'Critical' },
      { title: 'Trace Network Route', action: 'Run tracert to server IP to pinpoint the exact hop where traffic is dropped.', badge: 'Diagnostic' },
      { title: 'Restart Corporate VPN Client', action: 'Restart VPN daemon and verify route table push.', badge: 'Security' }
    ],
    recommendedPriority: 'Critical',
    preventiveTips: [
      'Maintain automated alert checks on VPN certificate expirations.',
      'Document switchport VLAN allocations in central CMDB.'
    ],
    quickCommands: ['Test-NetConnection -Port 445', 'w32tm /resync', 'tracert 10.0.0.1', 'route print']
  },
  printer: {
    analysis: 'Network printer not responding to print jobs, or spooler backlog preventing document processing.',
    rootCauses: [
      'Windows Print Spooler service hung or stopped.',
      'Corrupted spool file stuck in C:\\Windows\\System32\\spool\\PRINTERS.',
      'Printer IP address changed or printer entered deep sleep mode.',
      'Incompatible print driver following OS patch update.'
    ],
    diagnosticSteps: [
      { step: 'Inspect physical printer status screen.', expected: 'Status shows Ready with no paper jam or low toner warning.' },
      { step: 'Ping printer network IP address.', command: 'ping 192.168.1.200', expected: 'Active response and Web Admin Console accessible.' },
      { step: 'Check Windows Print Spooler service status.', command: 'sc query spooler', expected: 'STATE: 4 RUNNING.' }
    ],
    solutions: [
      { title: 'Flush Spooler Queue & Restart Service', action: 'Execute: net stop spooler && del /q /f %systemroot%\\system32\\spool\\printers\\* && net start spooler', badge: 'Most Effective' },
      { title: 'Reinstall using Standard TCP/IP Port', action: 'Remove WSD device and recreate with dedicated static IP port.', badge: 'Setup' },
      { title: 'Install Universal Print Driver (PCL6)', action: 'Deploy OEM Universal Print Driver package.', badge: 'Driver' }
    ],
    recommendedPriority: 'Medium',
    preventiveTips: [
      'Configure permanent DHCP IP reservations for all departmental printers.',
      'Schedule quarterly preventive maintenance for paper feed rollers.'
    ],
    quickCommands: ['net stop spooler', 'net start spooler', 'control printers', 'services.msc']
  },
  slow_pc: {
    analysis: 'Severe workstation unresponsiveness, high resource utilization (CPU/RAM pegged at 100%), or sluggish boot.',
    rootCauses: [
      'Resource exhaustion (CPU or memory runaway processes).',
      'System drive C: storage critically low (<10% free space).',
      'Bloatware startup entries and unoptimized background daemons.',
      'Corrupt OS system files or failing storage sectors.'
    ],
    diagnosticSteps: [
      { step: 'Open Task Manager and sort by CPU/RAM usage.', expected: 'Idle utilization stays under 15%.' },
      { step: 'Inspect free capacity on drive C:.', expected: 'At least 20 GB free space available.' },
      { step: 'Run System File Checker integrity scan.', command: 'sfc /scannow', expected: 'Windows Resource Protection found no integrity violations.' },
      { step: 'Inspect drive SMART telemetry.', command: 'wmic diskdrive get status', expected: 'Status: OK.' }
    ],
    solutions: [
      { title: 'Prune Startup Applications', action: 'In Task Manager -> Startup, disable unnecessary background auto-updaters.', badge: 'Fast Boost' },
      { title: 'Execute Disk Cleanup and Purge Temp Files', action: 'Run cleanmgr and clear %temp% folder to reclaim storage.', badge: 'Maintenance' },
      { title: 'Repair Component Store via DISM', action: 'Execute: DISM /Online /Cleanup-Image /RestoreHealth && sfc /scannow', badge: 'Stability' }
    ],
    recommendedPriority: 'Medium',
    preventiveTips: [
      'Enforce endpoint privilege management to block unauthorized background utilities.',
      'Provision workstations with NVMe SSDs and at least 16GB RAM.'
    ],
    quickCommands: ['sfc /scannow', 'cleanmgr', 'dism /online /cleanup-image /restorehealth', 'taskmgr']
  },
  login: {
    analysis: 'User unable to authenticate, Active Directory account lockout, or broken machine domain trust.',
    rootCauses: [
      'Account locked out due to multiple invalid password attempts.',
      'Periodic password expiry policy enforced.',
      'Caps Lock enabled or incorrect keyboard layout selected.',
      'Broken secure channel between workstation and domain controller.'
    ],
    diagnosticSteps: [
      { step: 'Query account lockout status in Active Directory.', expected: 'Account is unlocked and enabled.' },
      { step: 'Ensure network link is established at lock screen.', expected: 'Corporate domain connectivity indicator visible.' },
      { step: 'Verify domain secure channel.', command: 'nltest /sc_query:%userdomain%', expected: 'Status: Success.' }
    ],
    solutions: [
      { title: 'Unlock Account & Reset Temporary Password', action: 'In Active Directory Users and Computers, unlock account and flag for reset on next logon.', badge: 'Admin' },
      { title: 'Re-join Domain Secure Channel', action: 'Unjoin machine to Workgroup, reboot, and rejoin domain.', badge: 'System' }
    ],
    recommendedPriority: 'High',
    preventiveTips: [
      'Deploy 7-day advance password expiration email notifications.',
      'Offer Self-Service Password Reset (SSPR) portal.'
    ],
    quickCommands: ['nltest /sc_query:%userdomain%', 'whoami /all', 'klist purge', 'gpupdate /force']
  },
  email: {
    analysis: 'Outlook client unable to send or receive emails, or Exchange / Microsoft 365 cloud synchronization stalled.',
    rootCauses: [
      'Mailbox storage quota exceeded.',
      'Corrupt local cache data file (.OST or .PST).',
      'Faulty COM add-in causing Outlook to hang on startup.',
      'Expired credentials or modern authentication token mismatch.'
    ],
    diagnosticSteps: [
      { step: 'Test login via Outlook Web App (OWA).', expected: 'Webmail operational confirms local client issue.' },
      { step: 'Launch Outlook in Safe Mode.', command: 'outlook.exe /safe', expected: 'Smooth launch confirms third-party add-in fault.' },
      { step: 'Check local OST file size.', expected: 'File size under 50 GB threshold.' }
    ],
    solutions: [
      { title: 'Rebuild Local OST Cache File', action: 'Close Outlook, rename existing .ost file, and relaunch to initiate fresh cloud sync.', badge: 'Full Fix' },
      { title: 'Disable Problematic COM Add-ins', action: 'Navigate to File -> Options -> Add-ins and disable non-essential plugins.', badge: 'Speed' }
    ],
    recommendedPriority: 'High',
    preventiveTips: [
      'Enable automated Online Archiving to keep primary mailbox compact.',
      'Encourage sharing OneDrive links instead of large email attachments.'
    ],
    quickCommands: ['outlook.exe /safe', 'outlook.exe /cleanrules', 'outlook.exe /profiles']
  },
  software: {
    analysis: 'Enterprise application crashes on launch, displays runtime exceptions, or licensing service failed.',
    rootCauses: [
      'Corrupt DLL library, or missing Microsoft Visual C++ / .NET runtime.',
      'Endpoint Detection & Response (EDR) or Antivirus false positive block.',
      'Standard user permissions insufficient for application write paths.',
      'Incomplete patch update corruption.'
    ],
    diagnosticSteps: [
      { step: 'Inspect Windows Event Viewer under Application logs.', expected: 'Identify faulty module name and exception code.' },
      { step: 'Test execution with Run as Administrator.', expected: 'Determine if write permission is root cause.' }
    ],
    solutions: [
      { title: 'Repair Application Installation', action: 'In Installed Apps, select Repair or reinstall the latest approved enterprise MSI.', badge: 'Recommended' },
      { title: 'Deploy Visual C++ Redistributable All-in-One', action: 'Install Microsoft Visual C++ redistributable runtimes.', badge: 'Dependencies' }
    ],
    recommendedPriority: 'Medium',
    preventiveTips: [
      'Deploy packaged software via centralized MDM / Intune.',
      'Verify compatibility rings before broad organizational deployment.'
    ],
    quickCommands: ['eventvwr.msc', 'appwiz.cpl', 'winget list', 'winget upgrade --all']
  },
  file_sharing: {
    analysis: 'SMB network share folder inaccessible, showing access denied or recurring credential prompts.',
    rootCauses: [
      'NTFS or Share permissions missing for user security group.',
      'Stale invalid credentials cached in Windows Credential Manager.',
      'Firewall blocking TCP port 445 or SMB v2/v3 protocol disabled.',
      'LanmanWorkstation client service stopped.'
    ],
    diagnosticSteps: [
      { step: 'Attempt connection via direct server IP rather than NetBIOS name.', expected: 'Determines if DNS name resolution is at fault.' },
      { step: 'Inspect cached credentials in Credential Manager.', command: 'cmdkey /list', expected: 'No conflicting legacy domain accounts.' },
      { step: 'Verify LanmanWorkstation service status.', command: 'sc query LanmanWorkstation', expected: 'STATE: 4 RUNNING.' }
    ],
    solutions: [
      { title: 'Flush Cached Credentials & Reconnect', action: 'Clear server credentials via control keymgr, then map share with DOMAIN\\Username.', badge: 'Effective' },
      { title: 'Audit Active Directory Security Group Membership', action: 'Confirm user belongs to authorized security group with read/write ACLs.', badge: 'Permissions' }
    ],
    recommendedPriority: 'High',
    preventiveTips: [
      'Manage share permissions exclusively via Role-Based Access Control (RBAC).',
      'Use Distributed File System (DFS) namespaces for resilient uniform paths.'
    ],
    quickCommands: ['control keymgr', 'net use', 'net use * /delete /y', 'sc query LanmanWorkstation']
  },
  other: {
    analysis: 'General technical issue involving peripherals, external dual displays, or workstation hardware.',
    rootCauses: [
      'Physical cabling fault, loose connector, or faulty adapter/dock.',
      'Driver conflict following recent hardware or OS update.',
      'Corrupted local Windows user profile.'
    ],
    diagnosticSteps: [
      { step: 'Inspect physical connections and test alternate USB/DisplayPort.', expected: 'Device enumeration chime and recognized status.' },
      { step: 'Check Device Manager for yellow exclamation marks.', command: 'devmgmt.msc', expected: 'All devices show device working properly.' }
    ],
    solutions: [
      { title: 'Full Hardware Reboot', action: 'Perform cold reboot to clear volatile memory and power-cycle USB controllers.', badge: 'Basic' },
      { title: 'Update Device Driver via Device Manager', action: 'Right-click device -> Update Driver -> Search automatically for drivers.', badge: 'Driver' }
    ],
    recommendedPriority: 'Medium',
    preventiveTips: [
      'Conduct scheduled peripheral cable and docking station audits.',
      'Ensure regular workstation backup synchronization.'
    ],
    quickCommands: ['devmgmt.msc', 'shutdown /r /t 0', 'perfmon /report', 'dxdiag']
  }
};

export function performInstantDiagnosis(formData: {
  userName?: string;
  department?: string;
  deviceType?: string;
  os?: string;
  category: ProblemCategory;
  description: string;
  priority: string;
  language?: 'ar' | 'en';
}): DiagnosisData {
  const isEn = formData.language === 'en';
  const catKey = formData.category || 'other';
  const source = isEn ? LOCAL_EXPERT_KNOWLEDGE_EN : LOCAL_EXPERT_KNOWLEDGE;
  const item = source[catKey] || source['other'];

  const requester = formData.userName?.trim()
    ? formData.userName.trim()
    : isEn ? 'User' : 'المستفيد';
  const dept = formData.department ? formData.department : isEn ? 'General' : 'العام';

  const analysisHeader = isEn
    ? `${item.analysis} (Incident received from: ${requester} - Dept: ${dept})`
    : `${item.analysis} (حالة مستلمة من: ${requester} - قسم: ${dept})`;

  return {
    analysis: analysisHeader,
    rootCauses: item.rootCauses,
    diagnosticSteps: item.diagnosticSteps,
    solutions: item.solutions,
    recommendedPriority: formData.priority || item.recommendedPriority,
    preventiveTips: item.preventiveTips,
    quickCommands: item.quickCommands
  };
}
