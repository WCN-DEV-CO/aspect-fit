const { AspectFit } = require('./src/index');
const af = new AspectFit();
console.log('Fit 1920x1080 into 1080x1080:', af.fit(1920, 1080, 1080, 1080));
console.log('Fill 1920x1080 into 1080x1080:', af.fill(1920, 1080, 1080, 1080));
console.log('Resolve story preset:', af.resolve('story', 1080));
console.log('All presets:', af.getAllPresets().map(p => `${p.name} ${p.width}x${p.height}`));
