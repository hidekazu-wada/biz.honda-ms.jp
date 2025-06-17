/**
 * スクリプト実行後のデフォルトスクロール復活
 * 他のスクリプト（GSAP、ローディング等）の実行完了後に
 * ブラウザのデフォルトのページ内リンク機能を復活させる
 */

(function () {

  // 一時的にカスタムスクロール処理を保持するためのマップ
  const customHandlers = new Map();

  // CSSのscroll-padding-topの値を取得する関数
  function getScrollPaddingTop() {
    const computedStyle = window.getComputedStyle(document.documentElement);
    const scrollPaddingTop = computedStyle.getPropertyValue('scroll-padding-top');
    const pixelValue = parseInt(scrollPaddingTop, 10) || 0;
    return pixelValue;
  }

  // カスタムスクロール処理を一時的に適用
  function temporaryCustomScroll() {
    const anchorLinks = document.querySelectorAll(
      'a[href^="#"]:not([href="#"])'
    );

    anchorLinks.forEach((link) => {
      const handler = (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);

        if (target) {
          // CSSのscroll-padding-topの値を使用
          const scrollOffset = getScrollPaddingTop();
          const targetPosition = target.offsetTop - scrollOffset;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });

          // URLハッシュを更新
          history.pushState(null, null, `#${targetId}`);
        }
      };

      link.addEventListener('click', handler);
      customHandlers.set(link, handler);
    });
  }

  // デフォルトスクロールを復活させる
  function restoreDefaultScroll() {
    // カスタムイベントリスナーを削除
    customHandlers.forEach((handler, link) => {
      link.removeEventListener('click', handler);
    });
    customHandlers.clear();

    // CSS でスムーズスクロールを有効化（ブラウザのデフォルト動作を活かす）
    // scroll-padding-topは既にCSSで設定されているため、上書きしない
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  // ページ読み込み時のハッシュスクロール処理
  function handleInitialHash() {
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        // 少し遅延してスクロール（ローディング完了を待つ）
        setTimeout(() => {
          // CSSのscroll-padding-topの値を使用 + 追加の余白
          const scrollOffset = getScrollPaddingTop();
          const additionalMargin = 20; // 追加の余白
          const targetPosition = target.offsetTop - scrollOffset - additionalMargin;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }, 500);
      }
    }
  }

  // DOMContentLoaded で一時的にカスタムスクロールを適用
  document.addEventListener('DOMContentLoaded', () => {
    temporaryCustomScroll();
    handleInitialHash();
  });

  // 全てのスクリプトが実行された後にデフォルト動作を復活
  window.addEventListener('load', () => {
    // GSAPやローディングアニメーションの完了を待つ
    // 必要に応じて時間を調整してください
    const RESTORE_DELAY = 2000; // 2秒後に復活（調整可能）

    setTimeout(() => {
      restoreDefaultScroll();
    }, RESTORE_DELAY);
  });

  // カスタムイベントでの制御も可能
  // 他のスクリプトから完了通知を受け取る場合は以下を使用
  window.addEventListener('allScriptsLoaded', () => {
    restoreDefaultScroll();
  });
})();