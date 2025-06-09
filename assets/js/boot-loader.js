import { waitForAssets } from '/assets/js/asset-waiter.js';

/* ===== ローディング開始（重複起動防止付き） ===== */
function startLoader() {
  if (startLoader.started) return;
  startLoader.started = true;

  const firstVisit = window.__FIRST_VISIT__ === true;

  /* □ 最低表示: 初回=1s, 再訪=0s ／ □ 最大待機: 共通3s */
  const minHold = new Promise((res) => setTimeout(res, firstVisit ? 1000 : 0));
  const maxHold = new Promise((res) => setTimeout(res, 1000));
  const assets = waitForAssets();

  Promise.race([Promise.all([minHold, assets]), maxHold])
    .then(() => {
      console.log('[Loader] assets loaded');
    })
    .catch((err) => {
      console.warn('[Loader] timeout or error:', err.message);
    })
    .finally(() => {
      const html = document.documentElement;
      html.classList.remove('is-loading');
      html.classList.add('is-loaded');
      /* ページ内通知用イベント */
      document.dispatchEvent(new Event('assets:ready'));

      /* ヒーローアニメーション開始（トップページのみ） */
      if (
        document.body.classList.contains('page-top') &&
        window.initHeroAnimation
      ) {
        window.initHeroAnimation();
      }
    });
}

/* ===== DOM が整い次第 1 回だけ起動 ===== */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startLoader, { once: true });
} else {
  startLoader();
}
