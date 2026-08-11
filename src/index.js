/** WCN AspectFit — Aspect-ratio + output-dimension resolver. */
class AspectFit {
  constructor(presets = {}) {
    this.presets = {
      square: { w: 1, h: 1 },
      portrait: { w: 9, h: 16 },
      landscape: { w: 16, h: 9 },
      story: { w: 9, h: 16 },
      twitter_card: { w: 2, h: 1 },
      instagram_post: { w: 1, h: 1 },
      instagram_story: { w: 9, h: 16 },
      youtube_thumb: { w: 16, h: 9 },
      a4_print: { w: 210, h: 297 },
      ...presets
    };
  }

  fit(sourceW, sourceH, targetW, targetH) {
    const sourceRatio = sourceW / sourceH;
    const targetRatio = targetW / targetH;
    if (sourceRatio > targetRatio) {
      const w = targetW;
      const h = Math.round(targetW / sourceRatio);
      return { width: w, height: h, x: 0, y: Math.round((targetH - h) / 2) };
    } else {
      const h = targetH;
      const w = Math.round(targetH * sourceRatio);
      return { width: w, height: h, x: Math.round((targetW - w) / 2), y: 0 };
    }
  }

  fill(sourceW, sourceH, targetW, targetH) {
    const sourceRatio = sourceW / sourceH;
    const targetRatio = targetW / targetH;
    if (sourceRatio > targetRatio) {
      const h = targetH;
      const w = Math.round(targetH * sourceRatio);
      return { width: w, height: h, cropX: Math.round((w - targetW) / 2), cropY: 0, outW: targetW, outH: targetH };
    } else {
      const w = targetW;
      const h = Math.round(targetW / sourceRatio);
      return { width: w, height: h, cropX: 0, cropY: Math.round((h - targetH) / 2), outW: targetW, outH: targetH };
    }
  }

  resolve(presetName, maxDim = 1920) {
    const ratio = this.presets[presetName];
    if (!ratio) throw new Error(`Unknown preset: ${presetName}`);
    if (ratio.w >= ratio.h) return { width: maxDim, height: Math.round(maxDim * ratio.h / ratio.w) };
    return { width: Math.round(maxDim * ratio.w / ratio.h), height: maxDim };
  }

  getAllPresets() { return Object.entries(this.presets).map(([name, r]) => ({ name, ratio: `${r.w}:${r.h}`, ...this.resolve(name, 1920) })); }
}

module.exports = { AspectFit };
