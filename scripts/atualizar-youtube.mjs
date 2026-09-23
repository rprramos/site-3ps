// Busca os vídeos novos do canal no YouTube e atualiza data/youtube.json.
// Roda sozinho todo dia pelo GitHub Actions (.github/workflows/youtube.yml).
import { readFile, writeFile } from 'node:fs/promises';

const FILE = 'data/youtube.json';
const data = JSON.parse(await readFile(FILE, 'utf8'));
const canal = data.canal;

const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${canal}`);
if (!res.ok) throw new Error(`Feed do YouTube respondeu ${res.status}`);
const xml = await res.text();

const decode = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(m => ({
  id: m[1].match(/<yt:videoId>([^<]+)<\/yt:videoId>/)[1],
  t: decode(m[1].match(/<title>([^<]*)<\/title>/)[1]),
  published: m[1].match(/<published>([^<]+)<\/published>/)[1],
}));

const known = new Set(data.videos.map(v => v.id));
const novos = [];
for (const e of entries) {
  if (known.has(e.id)) continue;
  // Shorts respondem 200 em /shorts/ID; vídeos comuns redirecionam.
  let short = false;
  try {
    const r = await fetch(`https://www.youtube.com/shorts/${e.id}`, { method: 'HEAD', redirect: 'manual' });
    short = r.status === 200;
  } catch {}
  novos.push({ id: e.id, t: e.t, short, published: e.published });
}

if (!novos.length) { console.log('Nenhum vídeo novo.'); process.exit(0); }
novos.sort((a, b) => b.published.localeCompare(a.published));
data.videos = [...novos, ...data.videos];
data.atualizado = new Date().toISOString().slice(0, 10);
await writeFile(FILE, JSON.stringify(data, null, 1) + '\n');
console.log(`Adicionados ${novos.length} vídeos:`, novos.map(v => v.t).join(' | '));
