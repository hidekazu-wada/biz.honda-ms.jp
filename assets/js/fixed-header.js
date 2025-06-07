/**
 * 固定ヘッダーの表示制御
 * トップページでは任意のスクロール量での表示・非表示を制御
 * 下層ページでは常時表示
 * 下層ページでの使い方
 * 下層ページではbodyにclass="page-top"を追加しない
 */
class FixedHeader {
  constructor() {
    this.header = document.querySelector('.site-header--fixed.tablet-up');
    this.isTopPage = document.body.classList.contains('page-top');
    this.threshold = 300; // 表示開始スクロール量（px）
    this.hideThreshold = 300; // 非表示開始スクロール量（px）ヒステリシス効果
    this.isVisible = false;

    this.init();
  }

  init() {
    if (!this.header) {
      return;
    }

    // トップページでのみスクロールハンドラーを設定
    if (this.isTopPage) {
      this.initScrollHandler();
      // 初期状態の設定
      this.checkScrollPosition();
    }
  }

  initScrollHandler() {
    // パフォーマンス最適化のため passive: true を使用
    window.addEventListener('scroll', () => this.handleScroll(), {
      passive: true,
    });

    // 初回読み込み時のスクロール位置チェック
    window.addEventListener('load', () => this.checkScrollPosition());
  }

  handleScroll() {
    // requestAnimationFrame でフレームレート最適化
    if (!this.rafId) {
      this.rafId = requestAnimationFrame(() => {
        this.checkScrollPosition();
        this.rafId = null;
      });
    }
  }

  checkScrollPosition() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollY > this.threshold && !this.isVisible) {
      // 表示
      this.showHeader();
    } else if (scrollY < this.hideThreshold && this.isVisible) {
      // 非表示
      this.hideHeader();
    }
  }

  showHeader() {
    this.isVisible = true;
    this.header.classList.add('is-visible');
  }

  hideHeader() {
    this.isVisible = false;
    this.header.classList.remove('is-visible');
  }
}

// DOMが読み込まれた後に初期化
document.addEventListener('DOMContentLoaded', () => {
  new FixedHeader();
});
