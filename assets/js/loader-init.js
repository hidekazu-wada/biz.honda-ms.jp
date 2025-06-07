/* ------------------------------------------------------------
 *  ページが描画される前に「初回訪問かどうか」を即判定し、
 *  初回なら <html> に .is-loading .first-visit を付与する
 *  失敗（ストレージ不可）の場合は常に初回扱い
 * ----------------------------------------------------------*/
(function () {
  let first = true;
  try {
    first = !localStorage.getItem('visited');
    if (first) localStorage.setItem('visited', '1');
  } catch {
    first = true; // プライベートブラウズ等で例外 → 初回扱い
  }

  if (first) {
    document.documentElement.classList.add('is-loading', 'first-visit');
  }
  /* 後続スクリプトへの共有フラグ */
  window.__FIRST_VISIT__ = first;
})();
