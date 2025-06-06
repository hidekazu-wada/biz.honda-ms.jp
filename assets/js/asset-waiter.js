/* -----------------------------------------------------------
 *  フォント と 画像 を Promise で待つワンパッケージ
 * ----------------------------------------------------------*/

/* ----- フォント ------------------------------------------------ */
export function waitFonts(ms = 3000) {
  return Promise.race([
    document.fonts.ready,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('font timeout')), ms)
    ),
  ]);
}

/* ----- 画像 --------------------------------------------------- */
export function waitImages(ms = 5000) {
  const imgs = [...document.images];
  if (imgs.length === 0) return Promise.resolve(); // 画像ゼロ

  const promises = imgs.map((img) => {
    if (img.complete) return Promise.resolve(); // キャッシュ済み

    if (img.decode) {
      return img.decode().catch(() => {}); // decode() 対応
    }

    // ★ decode() 非対応フォールバック（Safari≤13 等）
    return new Promise((resolve) => {
      const done = () => {
        img.removeEventListener('load', done);
        img.removeEventListener('error', done);
        resolve();
      };
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    });
  });

  return Promise.race([
    Promise.all(promises),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('img timeout')), ms)
    ),
  ]);
}

/* ----- 両方まとめて ------------------------------------------- */
export function waitForAssets({ fontTimeout = 3000, imgTimeout = 5000 } = {}) {
  return Promise.all([waitFonts(fontTimeout), waitImages(imgTimeout)]);
}
