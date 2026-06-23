const {
  formatBotMessage,
  tgApi,
  mainKeyboard,
  inlineLinks,
  WELCOME,
  HOW,
  ADMIN_WELCOME,
  getLeadChatIds,
  isAdmin,
  notifyLeadInbox,
  SITE,
} = require('./lib/telegram');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (secret && req.headers['x-telegram-bot-api-secret-token'] !== secret) {
    return res.status(401).end();
  }

  if (!getLeadChatIds().length) return res.status(500).end();

  let update;
  try {
    update = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).end();
  }

  const message = update?.message;
  if (!message?.chat?.id) return res.status(200).json({ ok: true });

  const chatId = message.chat.id;
  const text = (message.text || '').trim();
  const from = message.from || {};

  try {
    if (text === '/start' || text === '/menu') {
      const welcome = isAdmin(from.id) ? ADMIN_WELCOME : WELCOME;
      await tgApi('sendMessage', {
        chat_id: chatId,
        text: welcome,
        reply_markup: mainKeyboard(),
      });
      await tgApi('sendMessage', {
        chat_id: chatId,
        text: 'Быстрые ссылки на сайт:',
        reply_markup: inlineLinks(),
      });
      return res.status(200).json({ ok: true });
    }

    if (text === '/help' || text === '❓ Как это работает') {
      await tgApi('sendMessage', {
        chat_id: chatId,
        text: HOW,
        reply_markup: mainKeyboard(),
        disable_web_page_preview: false,
      });
      return res.status(200).json({ ok: true });
    }

    if (text === '/catalog' || text === '📋 Каталог') {
      await tgApi('sendMessage', {
        chat_id: chatId,
        text: `Каталог — 5 направлений, 25 примеров:\n${SITE}/`,
        reply_markup: inlineLinks(),
      });
      return res.status(200).json({ ok: true });
    }

    if (text === '/zayavka' || text === '📝 Заявка на расчёт') {
      await tgApi('sendMessage', {
        chat_id: chatId,
        text: `Заполните форму на сайте — так быстрее посчитать:\n${SITE}/zayavka\n\nИли напишите сюда: изделие, размеры, город и телефон.`,
        reply_markup: mainKeyboard(),
      });
      return res.status(200).json({ ok: true });
    }

    if (text === '🔧 Услуги КД и 3D') {
      await tgApi('sendMessage', {
        chat_id: chatId,
        text: `Проектирование и 3D под ключ:\n${SITE}/uslugi`,
        reply_markup: mainKeyboard(),
      });
      return res.status(200).json({ ok: true });
    }

    if (text.startsWith('/')) {
      await tgApi('sendMessage', {
        chat_id: chatId,
        text: 'Команды: /start /zayavka /catalog /help\nИли используйте кнопки ниже.',
        reply_markup: mainKeyboard(),
      });
      return res.status(200).json({ ok: true });
    }

    if (!text) {
      await tgApi('sendMessage', {
        chat_id: chatId,
        text: 'Пришлите текст с описанием задачи или нажмите «Заявка на расчёт».',
        reply_markup: mainKeyboard(),
      });
      return res.status(200).json({ ok: true });
    }

    if (isAdmin(from.id)) {
      await tgApi('sendMessage', {
        chat_id: chatId,
        text: 'Сообщения админа не пересылаем. Ждите заявки от клиентов и с сайта.',
        reply_markup: mainKeyboard(),
      });
      return res.status(200).json({ ok: true });
    }

    await notifyLeadInbox(formatBotMessage(from, text));

    await tgApi('sendMessage', {
      chat_id: chatId,
      text: '✓ Приняли! Передали мастеру — ответим в течение 1 рабочего дня.',
      reply_markup: mainKeyboard(),
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('telegram-webhook', e);
    return res.status(500).end();
  }
};
