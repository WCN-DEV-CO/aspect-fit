# aspect-fit
**Aspect-ratio + output-dimension resolver** for multi-platform video/image. Contain, cover, and safe-area helpers. Zero dependencies. Original code, released under MIT.
## Install
```
npm install aspect-fit
```
## Use
```js
const { dims, contain, cover, safeArea } = require("aspect-fit");
dims("9:16");                  // { w: 1080, h: 1920 }
contain(1920, 1080, "9:16");   // fitted box + letterbox pads (no distortion)
cover(1920, 1080, "1:1");      // scaled-to-fill + crop offsets
safeArea("9:16", 0.1);         // inner safe zone for captions/UI
```
Presets: 9:16, 16:9, 1:1, 4:5, 4:3 — or any `W:H`.
## License
Original code, released under the [MIT License](./LICENSE). © 2026 WCN Development Co.
