const { formatLead, notifyLeadInbox, tryNotifyClient } = require('./lib/telegram');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
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
    await notifyLeadInbox(formatLead(payload));
    await tryNotifyClient(
      payload.contact,
      '✅ GRUPSTROY: заявка принята! Ответим в течение 1 рабочего дня.\n\nБот: @GrupstroyWoodBot'
    );
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(502).json({ ok: false, error: e.message });
  }
};
