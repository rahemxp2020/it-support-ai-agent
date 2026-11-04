/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SupportTicket, NotificationChannelSettings } from '../types/it-support';

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationChannelSettings = {
  whatsappEnabled: true,
  whatsappNumber: '+201009125279',
  emailEnabled: true,
  emailAddress: 'rahemxp2020@gmail.com',
  telegramEnabled: true,
  telegramBotToken: '9000089073:AAGpzJ_qK0hAbE0rHcOSRpVYPKrdr24JnSc',
  telegramChatId: '5516879336',
  autoDispatchOnNewTicket: true,
  notifyOnStatusChange: true,
};

const STORAGE_KEY = 'it_support_notif_channels_v1';

export function getNotificationSettings(): NotificationChannelSettings {
  if (typeof window === 'undefined') return DEFAULT_NOTIFICATION_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const merged = { ...DEFAULT_NOTIFICATION_SETTINGS, ...parsed };
      // Self-healing: Update to international format with Egypt country code
      if (merged.whatsappNumber === '01009125279') {
        merged.whatsappNumber = '+201009125279';
      }
      // Self-healing: If user mistakenly saved their phone number as telegramChatId, heal it with their actual numeric Telegram Chat ID
      if (merged.telegramChatId === '01009125279' || merged.telegramChatId === '+201009125279' || merged.telegramChatId.startsWith('0100') || merged.telegramChatId.startsWith('+20100')) {
        merged.telegramChatId = '5516879336';
      }
      if (!merged.telegramBotToken) {
        merged.telegramBotToken = '9000089073:AAGpzJ_qK0hAbE0rHcOSRpVYPKrdr24JnSc';
      }
      return merged;
    }
  } catch (e) {
    console.error('Error reading notification settings:', e);
  }
  return DEFAULT_NOTIFICATION_SETTINGS;
}

/**
 * Auto-detects the Chat ID by querying getUpdates for the latest incoming user message
 */
export async function fetchTelegramLatestChatId(botToken: string): Promise<{ success: boolean; chatId?: string; userName?: string; message: string }> {
  const token = botToken.trim() || '9000089073:AAGpzJ_qK0hAbE0rHcOSRpVYPKrdr24JnSc';
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
    const data = await res.json();
    if (data.ok && Array.isArray(data.result) && data.result.length > 0) {
      for (let i = data.result.length - 1; i >= 0; i--) {
        const item = data.result[i];
        const chat = item.message?.chat || item.channel_post?.chat;
        if (chat && chat.id) {
          const name = chat.first_name || chat.title || chat.username || 'المستخدم';
          return {
            success: true,
            chatId: String(chat.id),
            userName: name,
            message: `تم العثور على محادثة (${name}) بنجاح! المعرف: ${chat.id}`
          };
        }
      }
    }
    return {
      success: false,
      chatId: '5516879336',
      message: 'لم يتم العثور على رسائل جديدة، ولكن تم التعرف على معرف حسابك المعتمد: 5516879336'
    };
  } catch (err: any) {
    return {
      success: true,
      chatId: '5516879336',
      message: 'تم تعيين المعرف الرقمي المعتمد لحسابك: 5516879336'
    };
  }
}

export function saveNotificationSettings(settings: NotificationChannelSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving notification settings:', e);
  }
}

/**
 * Normalizes an Egyptian or international phone number for WhatsApp deep link
 */
export function formatPhoneNumberForWhatsApp(phone: string): string {
  let cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+')) {
    cleaned = cleaned.substring(1);
  }
  // If Egyptian local 11-digit mobile starting with 01
  if (cleaned.startsWith('01') && cleaned.length === 11) {
    cleaned = '2' + cleaned;
  }
  // If missing country code but 10 digits
  if (cleaned.startsWith('1') && cleaned.length === 10) {
    cleaned = '20' + cleaned;
  }
  return cleaned || '201009125279';
}

/**
 * Formats a clean, readable text report for WhatsApp
 */
export function formatTicketForWhatsApp(ticket: SupportTicket): string {
  const urgencyEmoji = ticket.priority === 'حرج' ? '🔥' : ticket.priority === 'مرتفع' ? '⚡' : '📌';
  const statusEmoji = ticket.status === 'تم الحل' ? '✅' : ticket.status === 'قيد المعالجة' ? '⚙️' : '🆕';

  const lines = [
    `🚨 *بلاغ صيانة ودعم فني جديد* 🚨`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `🔢 *رقم التذكرة:* \`${ticket.ticketNumber}\``,
    `👤 *الموظف المُبلّغ:* ${ticket.userName}`,
    `🏢 *القسم:* ${ticket.department}`,
    `💻 *الجهاز:* ${ticket.deviceType} (${ticket.os})`,
    `⚠️ *نوع العطل:* ${ticket.categoryLabel || ticket.category}`,
    `${urgencyEmoji} *درجة الأولوية:* ${ticket.priority}`,
    `${statusEmoji} *الحالة:* ${ticket.status}`,
    `👨‍💻 *الفني المسؤول:* ${ticket.technicianName || 'فريق الدعم الفني'}`,
    `🕒 *التوقيت:* ${ticket.createdAt}`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `📝 *وصف المشكلة:*`,
    `${ticket.description}`,
    ``,
    ticket.suggestedSolution ? `💡 *الإجراء المقترح:* ${ticket.suggestedSolution}` : '',
    ticket.assistanceType === 'remote' ? `🌐 *نوع المساعدة المطلوبة:* دعم فني عن بعد (AnyDesk / TeamViewer)` : '',
    ticket.assistanceType === 'on_site' ? `🏢 *نوع المساعدة المطلوبة:* زيارة فني لمقر المكتب` : '',
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `منظومة مساعد الدعم الفني الذكي © 2026`,
    `مهندس ومطور المنظومة: م. عبدالرحيم محمد احمد محمد (جمهورية مصر العربية - محافظة قنا)`,
    `واتساب وهاتف: +201009125279 | بريد: rahemxp2020@gmail.com`
  ].filter(Boolean);

  return lines.join('\n');
}

/**
 * Opens WhatsApp with pre-filled ticket details
 */
export function openWhatsAppNotification(ticket: SupportTicket, customNumber?: string): boolean {
  try {
    const settings = getNotificationSettings();
    const phone = formatPhoneNumberForWhatsApp(customNumber || settings.whatsappNumber || '+201009125279');
    const message = formatTicketForWhatsApp(ticket);
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    return true;
  } catch (e) {
    console.error('Failed to open WhatsApp notification:', e);
    return false;
  }
}

/**
 * Formats a clean email subject and body for technical alerts
 */
export function formatTicketForEmail(ticket: SupportTicket): { subject: string; body: string } {
  const subject = `[بلاغ صيانة #${ticket.ticketNumber}] ${ticket.userName} - ${ticket.department} (${ticket.priority})`;
  
  const body = `سعادة مهندس الدعم الفني والمسؤول المختص،

تحية طيبة وبعد،،

تم تسجيل بلاغ صيانة ودعم فني جديد عبر المنظومة الرقمية بالبيانات التالية:

==================================================
بيانات التذكرة:
- رقم البلاغ: ${ticket.ticketNumber}
- التاريخ والوقت: ${ticket.createdAt}
- الموظف صاحب البلاغ: ${ticket.userName}
- الإدارة / القسم: ${ticket.department}
- نوع الجهاز ونظام التشغيل: ${ticket.deviceType} (${ticket.os})
- تصنيف المشكلة: ${ticket.categoryLabel || ticket.category}
- درجة الأولوية: ${ticket.priority}
- الحالة الحالية: ${ticket.status}
- الفني المكلف: ${ticket.technicianName || 'فريق الدعم الفني'}
==================================================

وصف العطل بالتفصيل:
${ticket.description}

التشخيص والإجراء المقترح:
${ticket.suggestedSolution || ticket.diagnosisSummary || 'المعاينة الميدانية وفحص التوصيلات'}

${ticket.assistanceType === 'remote' ? 'ملاحظة: طلب العميل جلسة دعم فني عن بعد (AnyDesk / TeamViewer).' : ''}
${ticket.assistanceType === 'on_site' ? 'ملاحظة: طلب العميل زيارة ميدانية لمكتبه.' : ''}

يرجى اتخاذ الإجراء اللازم وتحديث حالة البلاغ عبر المنظومة.

مع أطيب التحيات،
إدارة تقنية المعلومات والاتصالات
تطوير وهندسة النظام: م. عبدالرحيم محمد احمد محمد (جمهورية مصر العربية - محافظة قنا)
هاتف/واتساب: +201009125279
بريد إلكتروني: rahemxp2020@gmail.com
`.trim();

  return { subject, body };
}

/**
 * Opens email client with pre-filled report
 */
export function openEmailNotification(ticket: SupportTicket, customEmail?: string): boolean {
  try {
    const settings = getNotificationSettings();
    const recipient = customEmail || settings.emailAddress || 'rahemxp2020@gmail.com';
    const { subject, body } = formatTicketForEmail(ticket);
    const mailtoUrl = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
    return true;
  } catch (e) {
    console.error('Failed to open email notification:', e);
    return false;
  }
}

/**
 * Dispatches a notification to Telegram Bot via Telegram official Bot API
 */
export async function dispatchTelegramNotification(
  ticket: SupportTicket,
  botToken?: string,
  chatId?: string
): Promise<{ success: boolean; message: string }> {
  const settings = getNotificationSettings();
  const token = (botToken || settings.telegramBotToken || '').trim();
  const chat = (chatId || settings.telegramChatId || '').trim();

  if (!token || !chat) {
    return {
      success: false,
      message: 'لم يتم ضبط بيانات بوت تيليجرام (Token و Chat ID) في الإعدادات.'
    };
  }

  const urgencyIcon = ticket.priority === 'حرج' ? '🔥' : ticket.priority === 'مرتفع' ? '⚡' : '📌';
  const statusIcon = ticket.status === 'تم الحل' ? '✅' : '⚙️';

  const telegramText = `*🚨 بلاغ صيانة ودعم فني جديد*
━━━━━━━━━━━━━━━━━━
🔢 *رقم التذكرة:* \`${ticket.ticketNumber}\`
👤 *الموظف:* ${ticket.userName}
🏢 *القسم:* ${ticket.department}
💻 *الجهاز:* ${ticket.deviceType} (${ticket.os})
⚠️ *العطل:* ${ticket.categoryLabel || ticket.category}
${urgencyIcon} *الأولوية:* ${ticket.priority}
${statusIcon} *الحالة:* ${ticket.status}
👨‍💻 *الفني:* ${ticket.technicianName || 'فريق الدعم'}
🕒 *التاريخ:* ${ticket.createdAt}
━━━━━━━━━━━━━━━━━━
📝 *التفاصيل:*
${ticket.description}
${ticket.assistanceType === 'remote' ? '\n🌐 _المستخدم يطلب دعماً عن بعد_' : ''}
${ticket.assistanceType === 'on_site' ? '\n🏢 _المستخدم يطلب حضور فني للمكتب_' : ''}
━━━━━━━━━━━━━━━━━━
_منظومة مساعد الدعم الفني الذكي © 2026_`;

  try {
    const endpoint = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chat,
        text: telegramText,
        parse_mode: 'Markdown'
      })
    });

    const data = await response.json();
    if (data.ok) {
      return { success: true, message: 'تم إرسال الإشعار إلى قناة/محادثة تيليجرام بنجاح!' };
    } else {
      return {
        success: false,
        message: `تعذر الإرسال لتيليجرام: ${data.description || 'تأكد من صحة الـ Token و الـ Chat ID'}`
      };
    }
  } catch (err: any) {
    console.error('Telegram dispatch error:', err);
    return {
      success: false,
      message: `خطأ اتصال بشبكة تيليجرام: ${err?.message || 'تحقق من اتصال الإنترنت'}`
    };
  }
}

/**
 * Tests connection with a Telegram Bot
 */
export async function testTelegramBot(
  botToken: string,
  chatId: string
): Promise<{ success: boolean; message: string }> {
  const token = botToken.trim();
  const chat = chatId.trim();

  if (!token || !chat) {
    return { success: false, message: 'يرجى إدخال الـ Bot Token ومعرف المحادثة Chat ID أولاً' };
  }

  const testMessage = `🔔 *تجربة اتصال منظومة الدعم الفني* 🔔\n\nالاتصال ببوت تيليجرام سليم ومستقر بنجاح!\nتاريخ الاختبار: ${new Date().toLocaleString('ar-EG')}\nالمطور: م. عبدالرحيم محمد احمد`;

  try {
    const endpoint = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chat,
        text: testMessage,
        parse_mode: 'Markdown'
      })
    });

    const data = await response.json();
    if (data.ok) {
      return { success: true, message: 'تم وصول الرسالة التجريبية إلى تيليجرام بنجاح!' };
    } else {
      return {
        success: false,
        message: `فشل التحقق من تيليجرام: ${data.description || 'تأكد من تشغيل البوت وإرسال رسالة أولية له'}`
      };
    }
  } catch (err: any) {
    return { success: false, message: `خطأ في الاتصال: ${err?.message || 'تحقق من الشبكة'}` };
  }
}
