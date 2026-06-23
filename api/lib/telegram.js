const SITE = process.env.PUBLIC_SITE_URL || 'https://grupstroy.vercel.app';

function sanitize(v, max = 400) {
  return String(v ?? '')
    .trim()
    .slice(0, max);
}

function getLeadChatIds() {
  const parts = [
    process.env.TELEGRAM_CHAT_ID,
    process.env.TELEGRAM_EXTRA_CHAT_IDS,
    process.env.TELEGRAM_ADMIN_IDS,
  ]
    .filter(Boolean)
    .join(',');
  return [...new Set(parts.split(',').map((s) => s.trim()).filter(Boolean))];
}

function getAdminIds() {
  return getLeadChatIds();
}

function isAdmin(userId) {
  return getAdminIds().includes(String(userId));
}

async function notifyLeadInbox(text) {
  const ids = getLeadChatIds();
  if (!ids.length) throw new Error('TELEGRAM_CHAT_ID missing');
  for (const chatId of ids) {
    await tgApi('sendMessage', {
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    });
  }
}

async function tryNotifyClient(contact, text) {
  const raw = sanitize(contact, 80);
  const at = raw.match(/@([a-zA-Z0-9_]{5,32})/);
  if (!at) return;
  try {
    await tgApi('sendMessage', {
      chat_id: `@${at[1]}`,
      text,
      disable_web_page_preview: true,
    });
  } catch {
    /* клиент должен хотя бы раз нажать /start в боте */
  }
}

function formatLead(p) {
  return [
    '🪚 GRUPSTROY — новая заявка',
    '📬 Входящие @GrupstroyWoodBot',
    '',
    `📦 Изделие: ${sanitize(p.item, 200) || '—'}`,
    `📐 Габариты: ${sanitize(p.length)} × ${sanitize(p.width)} × ${sanitize(p.height)} мм`,
    `📱 Контакт: ${sanitize(p.contact, 80)}`,
    `📍 Город: ${sanitize(p.city, 60) || '—'}`,
    p.note ? `💬 ${sanitize(p.note, 500)}` : '',
    '',
    `🕐 ${new Date(p.date || Date.now()).toLocaleString('ru-RU')}`,
  ]
    .filter(Boolean)
    .join('\n')
    .slice(0, 4000);
}

function formatBotMessage(from, text) {
  const name = [from.first_name, from.last_name].filter(Boolean).join(' ');
  const user = from.username ? `@${from.username}` : 'без username';
  return [
    '🪚 GRUPSTROY — новая заявка',
    '📬 Входящие @GrupstroyWoodBot',
    '',
    '💬 Сообщение от клиента в боте',
    '',
    `👤 ${sanitize(name, 80)} (${user})`,
    `🆔 ${from.id}`,
    '',
    sanitize(text, 3500),
    '',
    `🕐 ${new Date().toLocaleString('ru-RU')}`,
  ].join('\n');
}

async function tgApi(method, body) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error('TELEGRAM_BOT_TOKEN missing');
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok || !data.ok) {
    throw new Error(data.description || `Telegram ${method} failed`);
  }
  return data;
}

function mainKeyboard() {
  return {
    keyboard: [
      [{ text: '📝 Заявка на расчёт' }, { text: '📋 Каталог' }],
      [{ text: '🔧 Услуги КД и 3D' }, { text: '❓ Как это работает' }],
    ],
    resize_keyboard: true,
    is_persistent: true,
  };
}

function inlineLinks() {
  return {
    inline_keyboard: [
      [
        { text: 'Открыть каталог', url: `${SITE}/` },
        { text: 'Форма заявки', url: `${SITE}/zayavka` },
      ],
      [{ text: 'Услуги проектирования', url: `${SITE}/uslugi` }],
    ],
  };
}

const WELCOME = `Здравствуйте! Это GRUPSTROY — столярная мануфактура.

Здесь можно:
• оставить заявку на расчёт
• описать задачу текстом — передадим мастеру
• открыть каталог на сайте

Ответим в течение 1 рабочего дня.`;

const HOW = `Как заказать:

1️⃣ Опишите изделие или пришлите фото
2️⃣ Укажите габариты (Д×Ш×В) и город
3️⃣ Мы подготовим чертёж и расчёт

Удобнее с формой — кнопка «Заявка на расчёт» или ${SITE}/zayavka`;

const ADMIN_WELCOME = `👋 Режим администратора

Сюда в @GrupstroyWoodBot будут приходить:
• заявки с сайта grupstroy.vercel.app
• сообщения клиентов в боте

Проверка: отправьте тест с сайта или попросите клиента написать боту.`;

module.exports = {
  SITE,
  sanitize,
  formatLead,
  formatBotMessage,
  tgApi,
  getLeadChatIds,
  getAdminIds,
  isAdmin,
  notifyLeadInbox,
  tryNotifyClient,
  mainKeyboard,
  inlineLinks,
  WELCOME,
  HOW,
  ADMIN_WELCOME,
};
