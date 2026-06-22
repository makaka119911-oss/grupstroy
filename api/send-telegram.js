function sanitize(v, max = 400) {
  return String(v ?? '')
    .trim()
    .slice(0, max);
}

function formatLead(p) {
  return [
    '🪚 GRUPSTROY — новая заявка',
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

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'TELEGRAM не настроен на сервере' });
  }

  let payload;
  try {
    payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ ok: false, error: 'Invalid JSON' });
  }

  if (!payload?.contact) {
    return res.status(400).json({ ok: false, error: 'Нужен контакт' });
  }

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatLead(payload),
        disable_web_page_preview: true,
      }),
    });
    const data = await tgRes.json();
    if (!tgRes.ok || !data.ok) {
      return res.status(502).json({ ok: false, error: data.description || 'Telegram error' });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(502).json({ ok: false, error: e.message });
  }
};
