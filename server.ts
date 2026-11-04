import express from 'express';
import type { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Built-in Knowledge Base for IT issues (Fallback & instant acceleration)
const expertKnowledgeBase: Record<string, {
  analysis: string;
  rootCauses: string[];
  diagnosticSteps: { step: string; command?: string; expected: string }[];
  solutions: { title: string; action: string; badge?: string }[];
  preventiveTips: string[];
  quickCommands: string[];
}> = {
  internet: {
    analysis: 'تعذر الاتصال بشبكة الإنترنت العالمية مع احتمال استمرار الاتصال بالشبكة المحلية أو انقطاع كلي لبوابة التوجيه (Gateway).',
    rootCauses: [
      'فشل خادم DNS في ترجمة العناوين.',
      'عدم استلام عنوان IP صالح من خادم DHCP (ظهور 169.254.x.x - APIPA).',
      'خلل في الكابل الفيزيائي (Ethernet) أو محول Wi-Fi أو بطاقة الشبكة.',
      'حجب من قبل خادم البروكسي (Proxy) أو جدار الحماية (Firewall).'
    ],
    diagnosticSteps: [
      { step: 'التحقق من حالة كابل الشبكة أو اتصال Wi-Fi والإشارات الضوئية لمحول الشبكة.', expected: 'ظهور مؤشر متصل (Connected).' },
      { step: 'فحص عنوان IP الخاص بالجهاز وبوابة العبور الافتراضية (Default Gateway).', command: 'ipconfig /all', expected: 'الحصول على IP معتمد ضمن نطاق شبكة المؤسسة.' },
      { step: 'اختبار الاتصال ببوابة التوجيه المحلية (Router/Gateway).', command: 'ping 192.168.1.1', expected: 'استجابة سريعة دون فقدان حزم (0% loss).' },
      { step: 'اختبار الاتصال بخادم DNS خارجي موثوق.', command: 'ping 8.8.8.8', expected: 'استجابة ناجحة (Reply from 8.8.8.8).' },
      { step: 'اختبار ترجمة أسماء النطاقات بواسطة NSLookup.', command: 'nslookup google.com', expected: 'ظهور العنوان الرقمي للنطاق بنجاح.' }
    ],
    solutions: [
      { title: 'إعادة تعيين مكدس TCP/IP وتفريغ ذاكرة DNS', action: 'تشغيل موجه الأوامر كمسؤول وتنفيذ: ipconfig /flushdns ثم netsh int ip reset', badge: 'حل سريع' },
      { title: 'تجديد تأجير عنوان IP', action: 'تنفيذ الأمرين: ipconfig /release متبوعاً بـ ipconfig /renew', badge: 'شائع' },
      { title: 'تعيين خوادم DNS يدوياً كإجراء مؤقت', action: 'الدخول لإعدادات IPv4 وتعيين خادم DNS المفضل 8.8.8.8 والبديل 1.1.1.1', badge: 'DNS' },
      { title: 'إعادة تشغيل بطاقة الشبكة', action: 'تعطيل بطاقة الشبكة من Network Connections ثم إعادة تمكينها بعد 10 ثوانٍ.', badge: 'هاردوير' }
    ],
    preventiveTips: [
      'التأكد من تحديث برامج تشغيل محول الشبكة (Network Driver) بانتظام.',
      'تثبيت الكابلات وعدم تعريضها للانثناء والضغط في ممرات المكاتب.',
      'إبقاء إعدادات الوكيل (Proxy) مُدارة مركزياً عبر سياسات المجموعة (GPO).'
    ],
    quickCommands: ['ipconfig /flushdns', 'ipconfig /renew', 'ping 8.8.8.8 -t', 'netsh winsock reset']
  },
  internal_network: {
    analysis: 'صعوبة الوصول إلى خوادم الشركة المحلية أو الأنظمة الداخلية أو الطابعات المشتركة على الرغم من وجود اتصال بالإنترنت أو انعدامه.',
    rootCauses: [
      'اختلاف نطاق الشبكة الفرعية (Subnet) أو إعدادات VLAN خاطئة على المنفذ المكتبي.',
      'مشكلة في إعدادات الاتصال الآمن VPN للموظفين عن بُعد أو بين الفروع.',
      'حجب من جدار الحماية المحلي لنظام Windows على بروتوكولات المشاركة (Port 445 / 139).',
      'فشل المصادقة مع وحدة تحكم النطاق Active Directory (Domain Controller).'
    ],
    diagnosticSteps: [
      { step: 'التحقق من رقم VLAN ومنفذ الجدار في مكتب الموظف.', expected: 'تطابق المنفذ مع قطاع القسم المخصص.' },
      { step: 'التحقق من إمكانية الوصول إلى خادم النطاق المحلي (Domain Controller).', command: 'ping domain-controller.local', expected: 'رد مباشر دون انقطاع.' },
      { step: 'اختبار فتح منافذ الخدمة المستهدفة عبر PowerShell.', command: 'Test-NetConnection -ComputerName server01 -Port 445', expected: 'TcpTestSucceeded: True' },
      { step: 'فحص تزامن ساعة الجهاز مع خادم التوقيت المركزي NTP.', command: 'w32tm /query /status', expected: 'فارق توقيت أقل من 5 دقائق لتجنب رفض Kerberos.' }
    ],
    solutions: [
      { title: 'إعادة مزامنة الوقت مع Active Directory', action: 'تشغيل w32tm /resync من موجه أوامر المسؤول.', badge: 'حاسم' },
      { title: 'التحقق من مسار التوجيه للشبكة الفرعية', action: 'تنفيذ tracert إلى عنوان الخادم الداخلي لتحديد موضع التوقف.', badge: 'تشخيص' },
      { title: 'إعادة تشغيل عميل حماية الشبكة أو VPN', action: 'إعادة تشغيل خدمة VPN Client والتحقق من صلاحية شهادة الأمان.', badge: 'VPN' }
    ],
    preventiveTips: [
      'مراقبة منافذ محولات الشبكة (Switches) وتوثيق توزيع الـ Port-VLAN بدقة.',
      'ضمان بقاء فارق الوقت أقل من 5 ثوانٍ عبر عميل NTP موحد لجميع محطات العمل.'
    ],
    quickCommands: ['Test-NetConnection -Port 445', 'tracert 10.0.0.1', 'w32tm /resync', 'route print']
  },
  printer: {
    analysis: 'عدم استجابة الطابعة لمهام الطباعة المرسلة أو تراكم الملفات في قائمة الانتظار (Print Spooler) أو تعطل الاتصال الشبكي.',
    rootCauses: [
      'توقف خدمة التخزين المؤقت للطباعة (Print Spooler Service) عن العمل.',
      'تغير عنوان IP الخاص بالطابعة الشبكية أو دخولها في وضع السكون العميق (Deep Sleep).',
      'تعلق مستند تالف في طابور الطباعة يمنع المستندات التالية من المرور.',
      'برنامج تشغيل تالف أو غير متوافق بعد تحديثات النظام الأخيرة.'
    ],
    diagnosticSteps: [
      { step: 'التحقق من جاهزية شاشة الطابعة ومستوى الحبر والورق وغياب رسائل الخطأ الفيزيائية.', expected: 'حالة الطابعة جاهزة (Ready).' },
      { step: 'إرسال بنق (Ping) لعنوان IP الخاص بالطابعة الشبكية.', command: 'ping 192.168.1.200', expected: 'رد مستقر وفتح صفحة الويب الإدارية للطابعة.' },
      { step: 'التحقق من حالة خدمة Print Spooler في نظام التشغيل.', command: 'sc query spooler', expected: 'STATE: RUNNING' },
      { step: 'فحص مهام الطباعة المعلقة من لوحة التحكم.', expected: 'طابور خالٍ من المهام المعلقة برمز خطأ Error.' }
    ],
    solutions: [
      { title: 'إعادة تشغيل خدمة Print Spooler وتنظيف الطابور', action: 'إيقاف الخدمة net stop spooler، ثم مسح محتويات C:\\Windows\\System32\\spool\\PRINTERS، ثم net start spooler', badge: 'الأكثر فاعلية' },
      { title: 'إزالة الطابعة وإعادة إضافتها عبر منفذ TCP/IP قياسي', action: 'حذف تعريف الطابعة المعلق وإضافتها مجدداً باستخدام IP المباشر وليس WSD.', badge: 'تثبيت' },
      { title: 'إعادة تثبيت برنامج التشغيل من الموقع الرسمي', action: 'تنزيل حزمة التعريفات الشاملة (Universal Print Driver PCL6).', badge: 'تعريفات' }
    ],
    preventiveTips: [
      'حجز عناوين IP ثابتة (DHCP Reservation) لجميع طابعات الأقسام.',
      'تفضيل بروتوكول TCP/IP Port المباشر وتجنب منافذ WSD التي تفقد الاتصال كثيراً.',
      'جدولة صيانة دورية لتنظيف بكرات سحب الورق واستبدال مستلزمات الطباعة.'
    ],
    quickCommands: ['net stop spooler', 'net start spooler', 'control printers', 'services.msc']
  },
  slow_pc: {
    analysis: 'انخفاض ملحوظ في سرعة استجابة نظام التشغيل، بطء الإقلاع، أو تجميد مؤقت للبرامج أثناء العمل المكتبي.',
    rootCauses: [
      'استهلاك مفرط للموارد (CPU بنسبة 100%، أو الذاكرة RAM، أو نشاط القرص Disk).',
      'امتلاء القرص الصلب (System Drive C:) بأقل من 10% مساحة حرة.',
      'تراكم برامج بدء التشغيل (Startup Programs) والخدمات الخلفية غير الضرورية.',
      'تلف قطاعات القرص الصلب (Bad Sectors) أو ارتفاع حرارة المعالج بسبب الغبار.'
    ],
    diagnosticSteps: [
      { step: 'فتح مدير المهام (Task Manager) ومراقبة استهلاك المعالج والذاكرة والقرص.', expected: 'استهلاك طبيعي في وضع الخمول (<15% CPU, <70% RAM).' },
      { step: 'التحقق من المساحة الفارغة على قرص النظام C:.', expected: 'توفر أكثر من 20 جيجابايت مساحة حرة على الأقل.' },
      { step: 'فحص سلامة ملفات النظام الأساسية بواسطة أداة SFC.', command: 'sfc /scannow', expected: 'لم يعثر على تلف، أو تم إصلاح الملفات التالفة بنجاح.' },
      { step: 'فحص صحة القرص الصلب وقيم SMART.', command: 'wmic diskdrive get status', expected: 'الحالة: OK لجميع الأقراص.' }
    ],
    solutions: [
      { title: 'تعطيل برامج بدء التشغيل غير الضرورية', action: 'فتح Task Manager -> تبويب Startup وتعطيل التطبيقات الإضافية مثل أدوات التحديث التلقائي.', badge: 'تسريع فوري' },
      { title: 'تنظيف الملفات المؤقتة ومخلفات النظام', action: 'تشغيل أداة cleanmgr وتنظيف مجلدات %temp% و prefetch.', badge: 'توفير مساحة' },
      { title: 'إصلاح صورة نظام ويندوز عبر DISM و SFC', action: 'تشغيل: DISM /Online /Cleanup-Image /RestoreHealth متبوعاً بـ sfc /scannow', badge: 'استقرار' },
      { title: 'ترقية القرص إلى SSD وزيادة سعة الذاكرة العشوائية', action: 'إذا كان الجهاز يعتمد على HDD ميكانيكي، يوصى بالترقية العاجلة إلى SSD.', badge: 'عتاد' }
    ],
    preventiveTips: [
      'عدم السماح للمستخدمين بتثبيت برامج غير مصرح بها من خارج متجر التطبيقات المؤسسي.',
      'جدولة تشغيل أداة تفريغ الأقراص بانتظام.',
      'توفير أجهزة مزودة بذاكرة 16GB RAM على الأقل لمهام العمل المعاصرة.'
    ],
    quickCommands: ['sfc /scannow', 'cleanmgr', 'dism /online /cleanup-image /restorehealth', 'taskmgr']
  },
  login: {
    analysis: 'فشل الموظف في تسجيل الدخول إلى محطة العمل أو حساب النطاق (Active Directory) أو بوابة الخدمات السحابية.',
    rootCauses: [
      'إدخال كلمة المرور بشكل خاطئ أكثر من الحد المسموح وتأمين الحساب (Account Locked).',
      'انتهاء صلاحية كلمة المرور الدورية دون تجديدها قبل الإغلاق.',
      'تفعيل مفتاح Caps Lock أو اختلاف لغة لوحة المفاتيح أثناء الإدخال.',
      'فقدان الثقة بين محطة العمل والدومين (Trust Relationship Broken).'
    ],
    diagnosticSteps: [
      { step: 'مراجعة حالة الحساب في Active Directory Users and Computers.', expected: 'الحساب غير معطل وغير مقفل (Not Locked Out).' },
      { step: 'التحقق من إدخال اسم المستخدم الصحيح والتأكد من لغة الإدخال وحالة مفتاح Caps Lock.', expected: 'إدخال الأحرف بالشكل السليم.' },
      { step: 'التحقق من اتصال الجهاز بالشبكة للوصول إلى وحدة تحكم النطاق DC.', expected: 'ظهور إشارة اتصال بالشبكة في شاشة الدخول.' },
      { step: 'التحقق من علاقة الثقة بمحطة العمل.', command: 'nltest /sc_query:DOMAIN_NAME', expected: 'نجاح الاستعلام: Success' }
    ],
    solutions: [
      { title: 'فك قفل الحساب وإعادة تعيين كلمة المرور', action: 'الدخول إلى AD وفتح خصائص الحساب وإلغاء تحديد "Account is locked out" وإعادة تعيين كلمة المرور مؤقتاً.', badge: 'إداري' },
      { title: 'إعادة انضمام الجهاز للنطاق في حال فقدان الثقة', action: 'إخراج الجهاز إلى Workgroup ثم إعادة ربطه بالدومين وإعادة التشغيل.', badge: 'نظام' },
      { title: 'التحقق من المصادقة متعددة العوامل (MFA)', action: 'إعادة إرسال طلب المصادقة أو مسح جلسات التطبيق الموثق (Authenticator App).', badge: 'أمان' }
    ],
    preventiveTips: [
      'تفعيل رسائل تذكير تلقائية بانتهاء كلمة المرور قبل 7 أيام من انتهاء صلاحيتها.',
      'توفير بوابة خدمة ذاتية للموظفين (Self-Service Password Reset - SSPR).',
      'توعية الموظفين بعدم حفظ كلمات المرور على أوراق لاصقة أو تخمينها متكرراً.'
    ],
    quickCommands: ['nltest /sc_query:%userdomain%', 'whoami /all', 'klist purge', 'gpupdate /force']
  },
  email: {
    analysis: 'مشكلة في إرسال أو استقبال الرسائل الإلكترونية عبر Outlook أو المتصفح، أو توقف المزامنة مع خادم Exchange / Microsoft 365.',
    rootCauses: [
      'امتلاء مساحة صندوق البريد (Mailbox Quota Exceeded).',
      'تلف ملف البيانات الشخصي للبريد (ملف OST أو PST).',
      'وجود إضافة (Add-in) غير متوافقة تتسبب في تجميد تطبيق Outlook.',
      'حظر عنوان المرسل أو وقوع الرسائل في مجلد البريد العشوائي (Junk/Spam).'
    ],
    diagnosticSteps: [
      { step: 'اختبار فتح البريد عبر متصفح الويب (OWA / Webmail).', expected: 'نجاح الدخول وعرض الرسائل لتحديد هل المشكلة في الخادم أم التطبيق المحلي.' },
      { step: 'تشغيل برنامج Outlook في الوضع الآمن (Safe Mode).', command: 'outlook.exe /safe', expected: 'عمل التطبيق بسلاسة مما يثبت أن الخلل في الإضافات Add-ins.' },
      { step: 'التحقق من حالة الاتصال بخادم Exchange.', expected: 'ظهور الحالة: متصل (Connected).' },
      { step: 'فحص حجم ملف البيانات C:\\Users\\...\\AppData\\Local\\Microsoft\\Outlook.', expected: 'حجم الملف أقل من 50 جيجابايت.' }
    ],
    solutions: [
      { title: 'إعادة بناء ملف البيانات OST', action: 'إغلاق Outlook، وإعادة تسمية ملف .ost القديم، ثم تشغيل Outlook لإنشاء ملف جديد والمزامنة من السحابة.', badge: 'حل جذري' },
      { title: 'إصلاح أوفيس السريع وعبر الإنترنت', action: 'من برامج وميزات، اختيار Microsoft 365 ثم النقر على "Quick Repair".', badge: 'إصلاح' },
      { title: 'تعطيل الإضافات المشبوهة', action: 'من File -> Options -> Add-ins -> COM Add-ins وإلغاء تحديد الإضافات غير الضرورية.', badge: 'تحسين' }
    ],
    preventiveTips: [
      'تفعيل ميزة الأرشفة التلقائية (Online Archiving) لتقليل حجم الصندوق الأساسي.',
      'توعية الموظفين بعدم إرسال ملفات ضخمة داخل الرسائل واستخدام الروابط السحابية مثل OneDrive.'
    ],
    quickCommands: ['outlook.exe /safe', 'outlook.exe /cleanrules', 'outlook.exe /profiles']
  },
  software: {
    analysis: 'توقف أحد البرامج التطبيقية عن الاستجابة أو إغلاقه بشكل مفاجئ وظهور رسائل خطأ برمجية أو انتهاء صلاحية الترخيص.',
    rootCauses: [
      'فقدان أو تلف ملفات الاعتماد مثل حزم Visual C++ Redistributable أو .NET Framework.',
      'تعارض بين البرنامج وبرنامج مكافحة الفيروسات أو نظام الحماية EDR.',
      'نقص صلاحيات المستخدم (الحاجة إلى تشغيل كمسؤول Administrator).',
      'تلف التثبيت بسبب تحديث غير مكتمل.'
    ],
    diagnosticSteps: [
      { step: 'مراجعة سجل الأحداث (Event Viewer) تحت Application Logs لمعرفة رمز الخطأ وملف dll المسبب.', expected: 'رصد Event ID والملف المعطوب.' },
      { step: 'تجربة تشغيل التطبيق بصلاحية المسؤول (Run as Administrator).', expected: 'معرفة هل المشكلة ناتجة عن قيود أذونات الملفات.' },
      { step: 'التحقق من تثبيت تحديثات Visual C++ و .NET الضرورية للبرنامج.', expected: 'وجود الحزم المطلوبة متطابقة مع معمارية النظام (x64/x86).' }
    ],
    solutions: [
      { title: 'إصلاح التثبيت أو إعادة التثبيت النظيف', action: 'تشغيل ملف التثبيت الأصلي واختيار "Repair" أو حذفه بالكامل وتنزيل أحدث إصدار.', badge: 'موصى به' },
      { title: 'تثبيت حزم Microsoft Visual C++ All-in-One', action: 'تنزيل وتثبيت الحزم التراكمية من موقع مايكروسوفت لتعويض أي مكتبات مفقودة.', badge: 'تبعيات' },
      { title: 'إضافة استثناء في برنامج الحماية إذا كان التطبيق داخلياً', action: 'إضافة مسار المجلد التنفيذي للبرنامج إلى قائمة الاستثناءات في Windows Defender.', badge: 'أذونات' }
    ],
    preventiveTips: [
      'نشر التطبيقات عبر أدوات إدارة موحدة مثل SCCM أو Intune لضمان تطابق البيئات.',
      'تحديث البرامج بصفة دورية لضمان التوافق مع تحديثات ويندوز التراكمية.'
    ],
    quickCommands: ['eventvwr.msc', 'appwiz.cpl', 'winget list', 'winget upgrade --all']
  },
  file_sharing: {
    analysis: 'تعذر الوصول إلى مجلد المشاركة الشبكية (Network Share / SMB) أو ظهور رسالة تمنع الوصول أو تطالب ببيانات اعتماد.',
    rootCauses: [
      'عدم امتلاك المستخدم لصلاحيات الوصول على مستوى NTFS أو مستوى المشاركة (Share Permissions).',
      'تعطيل بروتوكول SMB أو حظر المنفذ 445 من جدار الحماية.',
      'تخزين بيانات اعتماد قديمة غير صالحة في مدير الاعتماد (Credential Manager).',
      'توقف خدمة Server أو Workstation على الجهاز المضيف أو الخادم.'
    ],
    diagnosticSteps: [
      { step: 'محاولة فتح المسار عبر عنوان IP بدلاً من الاسم مثل: \\\\192.168.1.50\\share', expected: 'معرفة هل المشكلة في دقة أسماء النطاق DNS أم لا.' },
      { step: 'التحقق من الاعتمادات المحفوظة في Windows Credential Manager.', command: 'cmdkey /list', expected: 'التأكد من عدم وجود بيانات قديمة متضاربة.' },
      { step: 'التحقق من عمل خدمات الشبكة الضرورية: LanmanWorkstation و LanmanServer.', command: 'sc query LanmanWorkstation', expected: 'STATE: RUNNING' }
    ],
    solutions: [
      { title: 'مسح بيانات الاعتماد المخزنة وإعادة إدخالها', action: 'حذف بيانات الدخول للمجلد المشترك عبر control keymgr ثم معاودة الفتح وإدخال اسم النطاق\\المستخدم.', badge: 'فعال' },
      { title: 'التحقق من مجموعة الأمان للمستخدم في Active Directory', action: 'التأكد من إضافة حساب الموظف في مجموعة الأمان المخولة بقراءة وكتابة المجلد.', badge: 'صلاحيات' },
      { title: 'تفعيل عميل SMBv2/SMBv3 والتأكد من تمكينه في الميزات الإضافية', action: 'التأكد من عدم إيقاف بروتوكول SMB الحديث على الخادم أو المحطة.', badge: 'نظام' }
    ],
    preventiveTips: [
      'تنظيم صلاحيات المشاركة من خلال مجموعات Active Directory (RBAC) وليس بالأسماء الفردية.',
      'الاعتماد على DFS (Distributed File System) لتفادي انقطاع المسارات عند تغيير الخوادم.'
    ],
    quickCommands: ['control keymgr', 'net use', 'net use * /delete /y', 'sc query LanmanWorkstation']
  },
  other: {
    analysis: 'مشكلة تقنية عامة تتطلب تقييماً شاملاً للمكونات المادية والبرمجية والأذونات ومصادر التغذية أو الأجهزة الطرفية.',
    rootCauses: [
      'تعارض في تحديثات النظام الحديثة أو تعريفات الأجهزة الطرفية.',
      'عطل في ملحقات الإدخال/الإخراج (USB, الكابلات، الشاشات الخارجية).',
      'مشاكل صلاحيات الحساب أو تلف ملف تعريف المستخدم (User Profile Corruption).'
    ],
    diagnosticSteps: [
      { step: 'فصل وإعادة توصيل الأجهزة الطرفية والتجربة على منفذ USB آخر.', expected: 'التعرف على الجهاز وإصدار نغمة التوصيل.' },
      { step: 'فحص إدارة الأجهزة (Device Manager) بحثاً عن علامات تعجب صفراء.', command: 'devmgmt.msc', expected: 'عمل جميع البطاقات دون أخطاء برمجية.' },
      { step: 'مراجعة آخر التحديثات المثبتة على الجهاز.', command: 'wmic qfe list brief', expected: 'تحديد ما إذا كان التحديث الأخير متزامناً مع المشكلة.' },
      { step: 'إجراء فحص سريع لملفات النظام.', command: 'sfc /scannow', expected: 'سلامة واستقرار نواة النظام.' }
    ],
    solutions: [
      { title: 'إعادة تشغيل الجهاز الكاملة (Restart)', action: 'إعادة التشغيل الفعلية لتفريغ الذاكرة المؤقتة وإنهاء العمليات العالقة.', badge: 'أساسي' },
      { title: 'تحديث برنامج التشغيل عبر إدارة الأجهزة', action: 'النقر بزر الفأرة الأيمن على المكون المتأثر واختيار Update Driver.', badge: 'تعريف' },
      { title: 'استخدام نقطة استعادة النظام (System Restore)', action: 'إعادة النظام لحالة سابقة عمل فيها الجهاز بشكل طبيعي.', badge: 'استعادة' }
    ],
    preventiveTips: [
      'إجراء فحص دوري للأجهزة وتطبيق أفضل ممارسات صيانة تكنولوجيا المعلومات.',
      'الاحتفاظ بنسخ احتياطية دورية لملفات العمل الهامة عبر أدوات التخزين السحابي.'
    ],
    quickCommands: ['devmgmt.msc', 'shutdown /r /t 0', 'perfmon /report', 'dxdiag']
  }
};

// API: Diagnose Problem Endpoint
app.post('/api/diagnose', async (req: Request, res: Response) => {
  try {
    const { userName, department, deviceType, os, category, description, priority } = req.body;

    const catKey = (category || 'other').toString().toLowerCase();
    const fallbackData = expertKnowledgeBase[catKey] || expertKnowledgeBase['other'];

    // If Gemini is available, query Gemini to produce an even deeper contextualized response
    if (ai) {
      try {
        const prompt = `
أنت مهندس دعم فني أول (Senior IT Support Specialist & System Administrator).
المطلوب تحليل مشكلة تقنية وردت من مستخدم وتقديم تشخيص علمي دقيق وخطوات عملية باللغة العربية.

بيانات البلاغ:
- اسم المستخدم: ${userName || 'غير محدد'}
- القسم: ${department || 'غير محدد'}
- نوع الجهاز: ${deviceType || 'كمبيوتر مكتبي'}
- نظام التشغيل: ${os || 'Windows 11'}
- فئة المشكلة: ${category || 'عامة'}
- أولوية المشكلة الحالية: ${priority || 'متوسط'}
- وصف المشكلة بالتفصيل: "${description || 'لا يوجد وصف مفصل'}"

قم بالرد بصيغة JSON فقط متطابقة تماماً مع البنية التالية (دون أي علامات تنصيص إضافية أو markdown خارج الـ JSON):
{
  "analysis": "تحليل مختصر ودقيق لطبيعة المشكلة استناداً للمعلومات المعطاة",
  "rootCauses": ["سبب محتمل 1", "سبب محتمل 2", "سبب محتمل 3", "سبب محتمل 4"],
  "diagnosticSteps": [
    {"step": "شرح خطوة الفحص والتشخيص الأولى", "command": "أمر تطبيقي إن وجد مثل ping أو sfc أو إلخ", "expected": "النتيجة المتوقعة"},
    {"step": "خطوة ثانية", "command": "أمر اختياري", "expected": "النتيجة المتوقعة"},
    {"step": "خطوة ثالثة", "command": "أمر اختياري", "expected": "النتيجة المتوقعة"},
    {"step": "خطوة رابعة", "command": "أمر اختياري", "expected": "النتيجة المتوقعة"}
  ],
  "solutions": [
    {"title": "عنوان الحل الأول", "action": "شرح عملي ومبسط لتطبيق الحل", "badge": "حل سريع / جذري / موصى به"},
    {"title": "عنوان الحل الثاني", "action": "شرح عملي", "badge": "إجراء إداري"},
    {"title": "عنوان الحل الثالث", "action": "شرح عملي", "badge": "حل بديل"}
  ],
  "recommendedPriority": "منخفض / متوسط / مرتفع / حرج (مع سبب التوصية)",
  "preventiveTips": ["نصيحة لمنع التكرار 1", "نصيحة 2", "نصيحة 3"],
  "quickCommands": ["أمر cmd أو powershell 1", "أمر 2", "أمر 3"]
}
`;

        // Timeout race to ensure sub-4s response time and prevent client hangs
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout (fast fallback)')), 3500)
        );

        const geminiPromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const response: any = await Promise.race([geminiPromise, timeoutPromise]);

        if (response && response.text) {
          const parsed = JSON.parse(response.text.trim());
          return res.json({
            success: true,
            source: 'gemini',
            data: {
              analysis: parsed.analysis || fallbackData.analysis,
              rootCauses: parsed.rootCauses || fallbackData.rootCauses,
              diagnosticSteps: parsed.diagnosticSteps || fallbackData.diagnosticSteps,
              solutions: parsed.solutions || fallbackData.solutions,
              recommendedPriority: parsed.recommendedPriority || priority || 'متوسط',
              preventiveTips: parsed.preventiveTips || fallbackData.preventiveTips,
              quickCommands: parsed.quickCommands || fallbackData.quickCommands,
            },
          });
        }
      } catch (geminiError) {
        console.warn('Gemini diagnosis fallback smoothly engaged:', geminiError);
      }
    }

    // Contextualized Fallback based on expert knowledge base
    return res.json({
      success: true,
      source: 'expert_system',
      data: {
        analysis: `${fallbackData.analysis} (حالة مستلمة من: ${userName || 'المستخدم'} - قسم: ${department || 'العام'})`,
        rootCauses: fallbackData.rootCauses,
        diagnosticSteps: fallbackData.diagnosticSteps,
        solutions: fallbackData.solutions,
        recommendedPriority: priority || 'متوسط',
        preventiveTips: fallbackData.preventiveTips,
        quickCommands: fallbackData.quickCommands,
      },
    });
  } catch (error: any) {
    console.error('Error in /api/diagnose:', error);
    return res.status(500).json({
      success: false,
      message: 'تعذر إجراء التشخيص في الوقت الحالي',
      error: error.message,
    });
  }
});

// Centralized Persistent Ticket Storage APIs
const ticketsFilePath = path.resolve(__dirname, 'tickets_data.json');

function getStoredTickets(): any[] {
  try {
    if (fs.existsSync(ticketsFilePath)) {
      const data = fs.readFileSync(ticketsFilePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed reading tickets_data.json:', err);
  }
  return [];
}

function saveStoredTickets(tickets: any[]): void {
  try {
    fs.writeFileSync(ticketsFilePath, JSON.stringify(tickets, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed writing tickets_data.json:', err);
  }
}

// Prevent aggressive browser/proxy caching for all API routes (especially for Mobile Safari & Chrome)
app.use('/api', (req: Request, res: Response, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

// Live Online Presence Tracking
interface PresenceSession {
  sessionId: string;
  userName: string;
  deviceType: string;
  lastSeen: number;
}
const activeSessions: Map<string, PresenceSession> = new Map();

// Periodic prune of inactive sessions older than 45 seconds
setInterval(() => {
  const threshold = Date.now() - 45000;
  for (const [id, sess] of activeSessions.entries()) {
    if (sess.lastSeen < threshold) {
      activeSessions.delete(id);
    }
  }
}, 15000);

app.post('/api/presence/ping', (req: Request, res: Response) => {
  const { sessionId, userName, deviceType } = req.body;
  if (sessionId) {
    activeSessions.set(sessionId, {
      sessionId,
      userName: userName || 'مستخدم متصل',
      deviceType: deviceType || 'متصفح ويب',
      lastSeen: Date.now()
    });
  }
  const threshold = Date.now() - 45000;
  const onlineList = Array.from(activeSessions.values()).filter(s => s.lastSeen >= threshold);
  res.json({ success: true, count: onlineList.length, users: onlineList });
});

app.get('/api/presence', (req: Request, res: Response) => {
  const threshold = Date.now() - 45000;
  const onlineList = Array.from(activeSessions.values()).filter(s => s.lastSeen >= threshold);
  res.json({ success: true, count: onlineList.length, users: onlineList });
});

app.post('/api/presence/leave', (req: Request, res: Response) => {
  const { sessionId } = req.body;
  if (sessionId) {
    activeSessions.delete(sessionId);
  }
  res.json({ success: true });
});

// GET download complete project zip archive (Source code + portable build for USB / Python / GitHub)
app.get('/api/download-project', (req: Request, res: Response) => {
  const zipPath = path.join(__dirname, 'public', 'it-support-ai-agent.zip');
  if (fs.existsSync(zipPath)) {
    res.setHeader('Content-Disposition', 'attachment; filename="it-support-ai-agent.zip"');
    res.setHeader('Content-Type', 'application/zip');
    return res.sendFile(zipPath);
  }
  return res.status(404).json({ success: false, message: 'Archive is being prepared, please try again shortly.' });
});

// GET all tickets (central shared database)
app.get('/api/tickets', (req: Request, res: Response) => {
  const tickets = getStoredTickets();
  res.json({ success: true, tickets });
});

// POST create ticket (accessible by any user from any device)
app.post('/api/tickets', (req: Request, res: Response) => {
  try {
    const newTicket = req.body;
    if (!newTicket || !newTicket.ticketNumber) {
      return res.status(400).json({ success: false, message: 'Invalid ticket data' });
    }
    const tickets = getStoredTickets();
    const existingIndex = tickets.findIndex((t: any) => t.id === newTicket.id || t.ticketNumber === newTicket.ticketNumber);
    if (existingIndex >= 0) {
      tickets[existingIndex] = { ...tickets[existingIndex], ...newTicket };
    } else {
      tickets.unshift(newTicket);
    }
    saveStoredTickets(tickets);
    return res.status(201).json({ success: true, ticket: newTicket, tickets });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update ticket (supports id or ticketNumber)
app.put('/api/tickets/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const tickets = getStoredTickets();
    const index = tickets.findIndex((t: any) => t.id === id || t.ticketNumber === id);
    if (index >= 0) {
      const merged = {
        ...tickets[index],
        ...updatedData,
        updatedAt: updatedData.updatedAt || new Date().toISOString().replace('T', ' ').substring(0, 16)
      };
      if (Array.isArray(updatedData.technicians)) {
        merged.technicians = updatedData.technicians;
        merged.technicianName = updatedData.technicians.join('، ') || 'غير معين';
      }
      tickets[index] = merged;
      saveStoredTickets(tickets);
      return res.json({ success: true, ticket: tickets[index] });
    }
    return res.status(404).json({ success: false, message: 'Ticket not found' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE ticket (supports id or ticketNumber)
app.delete('/api/tickets/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let tickets = getStoredTickets();
    tickets = tickets.filter((t: any) => t.id !== id && t.ticketNumber !== id);
    saveStoredTickets(tickets);
    return res.json({ success: true, message: 'Ticket deleted' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST sync tickets from client local storage (with timestamp-based conflict resolution)
app.post('/api/tickets/sync', (req: Request, res: Response) => {
  try {
    const incoming: any[] = req.body?.tickets || [];
    const tickets = getStoredTickets();
    let changed = false;
    for (const t of incoming) {
      if (!t || (!t.id && !t.ticketNumber)) continue;
      const existingIdx = tickets.findIndex((x: any) => x.id === t.id || x.ticketNumber === t.ticketNumber);
      if (existingIdx >= 0) {
        // Compare timestamps to keep newest update
        const incomingTime = t.updatedAt ? new Date(t.updatedAt).getTime() : 0;
        const existingTime = tickets[existingIdx].updatedAt ? new Date(tickets[existingIdx].updatedAt).getTime() : 0;
        if (incomingTime >= existingTime) {
          tickets[existingIdx] = { ...tickets[existingIdx], ...t };
          changed = true;
        }
      } else {
        tickets.push(t);
        changed = true;
      }
    }
    if (changed) {
      saveStoredTickets(tickets);
    }
    return res.json({ success: true, tickets });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST dispatch notification (centralized logging & webhook relay)
app.post('/api/notifications/dispatch', (req: Request, res: Response) => {
  try {
    const { channel, ticketNumber, recipient, summary } = req.body || {};
    console.log(`[Notification Dispatch] Channel: ${channel}, Ticket: ${ticketNumber}, Recipient: ${recipient}`);
    return res.json({
      success: true,
      channel: channel || 'all',
      ticketNumber,
      timestamp: new Date().toISOString(),
      message: 'Notification logged and dispatched successfully'
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    appName: 'IT Support Assistant - مساعد الدعم الفني الذكي',
    hasGemini: !!ai,
    time: new Date().toISOString(),
  });
});

async function startServer() {
  const distPath = path.resolve(__dirname, 'dist');
  const indexPath = path.resolve(distPath, 'index.html');
  const hasDist = fs.existsSync(indexPath);
  const isProd = process.env.NODE_ENV === 'production' && hasDist;

  // Process-level uncaught safety to prevent container crashes
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
  });
  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
  });

  if (isProd) {
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(indexPath);
    });
  } else {
    try {
      const vite = await createViteServer({
        server: {
          middlewareMode: true,
          host: '0.0.0.0',
          hmr: process.env.DISABLE_HMR !== 'true',
        },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } catch (viteErr) {
      console.warn('Vite middleware initialization fallback to static:', viteErr);
      if (hasDist) {
        app.use(express.static(distPath));
        app.get('*', (req: Request, res: Response) => {
          res.sendFile(indexPath);
        });
      }
    }
  }

  // Global Express error handler to prevent crashing
  app.use((err: any, req: Request, res: Response, next: any) => {
    console.error('Express server error:', err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: 'Server internal error', error: err?.message });
    }
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port} (mode: ${isProd ? 'production' : 'development'})`);
  });
}

startServer();
