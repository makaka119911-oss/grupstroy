/**
 * Одноразовая настройка webhook после добавления env в Vercel.
 * Локально: скопируй .env.example → .env.local и заполни значения.
 * Запуск: node scripts/setup-telegram.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes } from 'node:crypto';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = join(root, '.env.local');

function loadEnv() {
  if (!existsSync(envPath)) return {};
  const out = {};
  const raw = readFileSync(envPath, 'utf8').replace(/^\uFEFF/, '');
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    out[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
  }
  return out;
}

const fileEnv = loadEnv();
const env = { ...process.env, ...fileEnv };
const token = fileEnv.TELEGRAM_BOT_TOKEN || env.TELEGRAM_BOT_TOKEN;
const site = env.PUBLIC_SITE_URL || 'https://grupstroy.vercel.app';
let secret = env.TELEGRAM_WEBHOOK_SECRET;

if (!token) {
  console.error('Нет TELEGRAM_BOT_TOKEN в .env.local');
  process.exit(1);
}

if (!secret) {
  secret = randomBytes(16).toString('hex');
  console.log(`Сгенерирован TELEGRAM_WEBHOOK_SECRET (добавь в Vercel):\n${secret}\n`);
}

const webhookUrl = `${site}/api/telegram-webhook`;

const setRes = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: webhookUrl,
    secret_token: secret,
    allowed_updates: ['message'],
    drop_pending_updates: true,
  }),
});
const setData = await setRes.json();
console.log('setWebhook:', setData);

const cmds = await fetch(`https://api.telegram.org/bot${token}/setMyCommands`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    commands: [
      { command: 'start', description: 'Главное меню' },
      { command: 'zayavka', description: 'Заявка на расчёт' },
      { command: 'catalog', description: 'Каталог на сайте' },
      { command: 'help', description: 'Как заказать' },
    ],
  }),
});
console.log('setMyCommands:', await cmds.json());

const me = await fetch(`https://api.telegram.org/bot${token}/getMe`);
console.log('bot:', await me.json());

console.log(`\nГотово. Напиши боту /start: https://t.me/GrupstroyWoodBot`);
console.log(`Webhook: ${webhookUrl}`);
