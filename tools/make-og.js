// Génère assets/img/og-image.png (1200×630) — l'image d'aperçu utilisée par les
// balises og:image / twitter:image quand on partage le site.
//
// Usage : node tools/make-og.js
// Dépendance : sharp (déjà dans devDependencies)
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const photoPath = path.join(ROOT, "assets", "img", "photo-square.jpg");
const outPath = path.join(ROOT, "assets", "img", "og-image.png");

const W = 1200;
const H = 630;
const photo = fs.readFileSync(photoPath).toString("base64");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2fe6a0"/>
      <stop offset="55%" stop-color="#9ade5e"/>
      <stop offset="100%" stop-color="#f0b35c"/>
    </linearGradient>
    <radialGradient id="glowA" cx="85%" cy="-10%" r="70%">
      <stop offset="0%" stop-color="#2fe6a0" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#2fe6a0" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="-5%" cy="80%" r="65%">
      <stop offset="0%" stop-color="#f0b35c" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#f0b35c" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#96c3aa" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
    <clipPath id="avatar"><circle cx="196" cy="315" r="112"/></clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="#0b100e"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glowA)"/>
  <rect width="${W}" height="${H}" fill="url(#glowB)"/>

  <circle cx="196" cy="315" r="118" fill="url(#brand)"/>
  <image href="data:image/jpeg;base64,${photo}" x="84" y="203" width="224" height="224"
         preserveAspectRatio="xMidYMid slice" clip-path="url(#avatar)"/>

  <rect x="352" y="150" width="3" height="330" fill="url(#brand)" opacity="0.55" rx="2"/>

  <text x="396" y="228" font-family="Segoe UI, Arial, Helvetica, sans-serif"
        font-size="50" font-weight="600" fill="#e9f2ed" letter-spacing="-0.5">Louis Gildas</text>
  <text x="396" y="300" font-family="Segoe UI, Arial, Helvetica, sans-serif"
        font-size="58" font-weight="700" fill="url(#brand)" letter-spacing="-1">MEBADA NDZIE</text>

  <text x="398" y="352" font-family="Segoe UI, Arial, Helvetica, sans-serif"
        font-size="24" fill="#9db3a9">Développeur Frontend Angular &amp; Contrôle Qualité</text>

  <text x="398" y="396" font-family="Consolas, Courier New, monospace"
        font-size="19" fill="#2fe6a0" letter-spacing="0.5">Angular · TypeScript · HTML/SCSS · API REST · QA</text>

  <text x="398" y="452" font-family="Segoe UI, Arial, Helvetica, sans-serif"
        font-size="19" fill="#6e837a">Advance IT Group · Yaoundé, Cameroun</text>

  <line x1="60" y1="536" x2="1140" y2="536" stroke="#96c3aa" stroke-opacity="0.16" stroke-width="1"/>
  <text x="60" y="578" font-family="Consolas, Courier New, monospace"
        font-size="19" fill="#9db3a9">portfolio-gildas.netlify.app</text>
  <text x="1140" y="578" text-anchor="end" font-family="Consolas, Courier New, monospace"
        font-size="19" fill="#6e837a">&lt; hello world /&gt;</text>
</svg>`;

sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(outPath)
  .then((info) => {
    console.log(`OK ${outPath} ${info.width}x${info.height} ${Math.round(info.size / 1024)} Ko`);
  })
  .catch((err) => {
    console.error("ECHEC:", err.message);
    process.exit(1);
  });
