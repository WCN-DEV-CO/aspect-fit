// aspect-fit — aspect-ratio + output-dimension resolver for multi-platform media. Zero deps.
// Original code, released under MIT.
const PRESETS = {
  "9:16": { w: 1080, h: 1920 }, "16:9": { w: 1920, h: 1080 },
  "1:1": { w: 1080, h: 1080 }, "4:5": { w: 1080, h: 1350 }, "4:3": { w: 1440, h: 1080 },
};
function dims(ratio) {
  if (PRESETS[ratio]) return { ...PRESETS[ratio] };
  const m = /^(\d+):(\d+)$/.exec(ratio);
  if (!m) throw new Error(`invalid ratio: ${ratio}`);
  const rw = +m[1], rh = +m[2];
  const base = 1080;
  return rw >= rh ? { w: Math.round((base * rw) / rh), h: base } : { w: base, h: Math.round((base * rh) / rw) };
}
// Fit a source w/h into a target ratio without distortion (contain). Returns scaled box + letterbox pads.
function contain(srcW, srcH, ratio) {
  const t = dims(ratio);
  const scale = Math.min(t.w / srcW, t.h / srcH);
  const w = Math.round(srcW * scale), h = Math.round(srcH * scale);
  return { target: t, fitted: { w, h }, pad: { x: Math.round((t.w - w) / 2), y: Math.round((t.h - h) / 2) } };
}
// Cover (crop to fill).
function cover(srcW, srcH, ratio) {
  const t = dims(ratio);
  const scale = Math.max(t.w / srcW, t.h / srcH);
  const w = Math.round(srcW * scale), h = Math.round(srcH * scale);
  return { target: t, fitted: { w, h }, crop: { x: Math.round((w - t.w) / 2), y: Math.round((h - t.h) / 2) } };
}
function safeArea(ratio, marginPct = 0.1) {
  const t = dims(ratio);
  const mx = Math.round(t.w * marginPct), my = Math.round(t.h * marginPct);
  return { x: mx, y: my, w: t.w - mx * 2, h: t.h - my * 2 };
}
module.exports = { dims, contain, cover, safeArea, PRESETS };
