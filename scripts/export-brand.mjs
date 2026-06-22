import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const brand = join(root, 'public', 'brand');

const jobs = [
  { in: 'telegram-avatar.svg', out: 'telegram-avatar.png', w: 512, h: 512 },
  { in: 'telegram-header.svg', out: 'telegram-header.png', w: 1280, h: 720 },
  { in: 'logo-full.svg', out: 'logo-full.png', w: 1040, h: 240 },
  { in: 'seal-mark.svg', out: 'seal-mark.png', w: 512, h: 512 },
];

for (const job of jobs) {
  const input = readFileSync(join(brand, job.in));
  await sharp(input, { density: 300 })
    .resize(job.w, job.h, { fit: 'contain', background: { r: 14, g: 14, b: 14, alpha: 1 } })
    .png({ quality: 95 })
    .toFile(join(brand, job.out));
  console.log(`✓ ${job.out}`);
}
