# وكيل الدعم الفني الذكي | Autonomous IT Support AI Agent 🤖🛠️

> **المشاركة الرسمية المعتمدة في مسابقة تحدي وكلاء الذكاء الاصطناعي العالمية 2026**  
> **Official Championship Entry:** [Create AI Agents Championship 2026 Portal](https://create-ai-agents-competition.in.howspace.com/official-championship-portal)

---

## 👨‍💻 بيانات المهندس والمطور المالك للنظام (Lead Engineer & Creator)

* **الاسم الرسمي:** م. عبدالرحيم محمد احمد محمد (Eng. Abdelrahim Mohamed Ahmed Mohamed)
* **الدولة والعنوان:** جمهورية مصر العربية - محافظة قنا (Arab Republic of Egypt - Qena Governorate)
* **البورتفوليو على GitHub:** [github.com/rahemxp2020](https://github.com/rahemxp2020)
* **رقم الهاتف والواتساب (الصيغة الدولية):** `+201009125279`
* **البريد الإلكتروني المعتمد:** `rahemxp2020@gmail.com`
* **معرف تيليجرام المعتمد:** `5516879336` (Bot: `9000089073:AAGpzJ_qK0hAbE0rHcOSRpVYPKrdr24JnSc`)
* **رابط المعاينة المباشر:** [https://ais-pre-mdv25vgdypr5uuoz7vk4ma-696985394020.europe-west2.run.app](https://ais-pre-mdv25vgdypr5uuoz7vk4ma-696985394020.europe-west2.run.app)

---

## 🌟 نبذة عن المشروع (Project Overview)

منظومة متكاملة ووكيل ذكاء اصطناعي تشغيلي (Autonomous Agent) مصمم لأتمتة أقسام الدعم الفني وتكنولوجيا المعلومات (IT Helpdesk) في المؤسسات والشركات:
1. **التشخيص الذكي الفوري (AI Root Cause Engine):** فحص الأعطال الشائعة والمعقدة (شبكات، طابعات، برامج، أداء، أذونات) واستخلاص الأسباب الجذرية وخطوات المعالجة وأوامر CMD / PowerShell.
2. **سد الفجوة للموظف غير التقني:** خيارات بنقرة واحدة لطلب الدعم عن بُعد (AnyDesk) أو زيارة فني ميداني للمكتب.
3. **شبكة التنبيهات الشاملة (Omnichannel Alerts):** بث فوري للبلاغات عبر واتساب (`+201009125279`) وبوت تيليجرام والبريد ورنين سطح المكتب Web Audio.
4. **مزامنة سحابية لحظية (Realtime Cloud):** ربط فوري عبر Google Cloud Firebase Firestore وقاعدة بيانات مركزية تشاركية.
5. **تطبيق هاتف مستقل (PWA):** قابل للتثبيت المباشر على شاشات هواتف أندرويد وآيفون وأجهزة سطح المكتب بدون متاجر.

---

## 📦 1. كيفية رفع المشروع إلى البورتفوليو الخاص بك على GitHub (`github.com/rahemxp2020`)

1. أنشئ مستودعاً جديداً (Repository) على حسابك في GitHub باسم: `it-support-ai-agent`
2. افتح موجه الأوامر (Terminal / Git Bash) داخل مجلد المشروع ونفذ الأوامر التالية:

```bash
# 1. تهيئة مستودع Git محلي
git init

# 2. إضافة جميع الملفات
git add .

# 3. حفظ الالتزام الأول
git commit -m "feat: Autonomous IT Support AI Agent by Eng. Abdelrahim Mohamed Ahmed Mohamed"

# 4. تعيين الفرع الرئيسي
git branch -M main

# 5. ربط المستودع بحسابك على GitHub
git remote add origin https://github.com/rahemxp2020/it-support-ai-agent.git

# 6. رفع الأكواد بالكامل
git push -u origin main
```

---

## 🐍 2. كيفية تشغيل المشروع والتعامل معه عبر لغة بايثون (Python)

المشروع مبني كواجهة ويب تفاعلية حديثة (React + TypeScript)، ويمكن تشغيله والتعامل معه عبر بايثون بعدة طرق:

### الطريقة الأولى: التشغيل الفوري لخادم ويب محلي باستخدام بايثون
تم تضمين ملف `run_with_python.py` داخل المشروع. يكفيك تشغيله عبر الأمر:

```bash
python run_with_python.py
```
* سيقوم السكربت بفتح خادم محلي على المنفذ `http://localhost:8080` وتشغيل متصفحك تلقائياً لعرض التطبيق بكامل وظائفه.

### الطريقة الثانية: تشغيل خادم مدمج سريع بسطر واحد:
```bash
# داخل مجلد المشروع:
python -m http.server 8080 --directory dist
```

### الطريقة الثالثة: ربط التطبيق مع خلفية برمجية بالبايثون (FastAPI / Flask)
إذا أردت جعل الباك إند بالكامل مكتوباً بلغة بايثون واستدعاء نماذج الذكاء الاصطناعي (مثل LangChain أو Gemini Python SDK)، يمكنك إنشاء خادم FastAPI بسيط واستقبال طلبات التشخيص والبلاغات:

```python
# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="IT Support Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class DiagnoseRequest(BaseModel):
    category: str
    description: str

@app.post("/api/diagnose")
def diagnose(req: DiagnoseRequest):
    # كود معالجة الذكاء الاصطناعي في بايثون
    return {
        "analysis": "تم فحص العطل عبر محرك بايثون",
        "solutions": [{"title": "الحل المقترح", "action": "إجراء الخطوات المطلوبة"}]
    }
```

---

## 💾 3. كيفية تشغيل التطبيق بالكامل من فلاشة USB بدون إنترنت

1. انقل مجلد المشروع بالكامل إلى فلاشة الـ USB.
2. لتشغيل التطبيق على أي جهاز كمبيوتر (Windows):
   * انقر نقراً مزدوجاً على ملف: **`run-on-usb.bat`**
   * أو ملف: **`run-with-python.bat`**
3. سيقوم الملف تلقائياً بالتحقق من وجود Node.js أو Python وتشغيل التطبيق في المتصفح فوراً، أو فتح النسخة المجمعة مسبقاً (`dist/index.html`) حتى في حال عدم وجود أي برامج مثبتة على الجهاز المضيف!

---

## 🛠️ 4. التشغيل التقليدي عبر Node.js (Development & Production)

```bash
# تثبيت الحزم والمكتبات
npm install

# تشغيل بيئة التطوير (Server + Vite + HMR)
npm run dev

# بناء النسخة الإنتاجية
npm run build

# تشغيل النسخة الإنتاجية
npm start
```

---

## 🏛️ البنية المعمارية للتقنيات المستخدمة (Tech Stack)

* **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion (Framer).
* **Backend:** Node.js Express Server, RESTful APIs.
* **Database & Auth:** Google Cloud Firebase Firestore (Realtime Sync & Presence Tracking).
* **AI Engine:** Google Gemini SDK (`@google/genai`) with deterministic Expert Fallback Engine.
* **PWA & Offline:** Service Worker (`sw.js`), Web App Manifest, Cache-First static assets, Maskable Icons.
* **Integrations:** Telegram Bot API, WhatsApp Deep-Link URIs, Web Audio API chime alerts.

---

## 📄 حقوق الملكية والترخيص (License)
جميع الحقوق محفوظة للمطور والمهندس: **م. عبدالرحيم محمد احمد محمد (جمهورية مصر العربية - محافظة قنا)** © 2026.
مرخص للاستخدام المؤسسي والمشاريع المعروضة ضمن مسابقة **Create AI Agents Championship 2026**.
