/**
 * グローバルメニューの表示・非表示制御
 */
class GlobalMenu {
  constructor() {
    this.menu = document.querySelector('.global-menu.only-sp');
    this.openButton = document.querySelector('.sp-menu-button');
    this.closeButton = document.querySelector(
      '.global-menu__close .close-button'
    );
    this.isOpen = false;
    this.scrollPosition = 0;

    this.init();
  }

  init() {
    if (!this.menu || !this.openButton || !this.closeButton) {
      return;
    }

    // 初期状態でメニューを非表示に設定
    this.menu.style.opacity = '0';
    this.menu.style.visibility = 'hidden';
    this.menu.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';

    // イベントリスナーを設定
    this.openButton.addEventListener('click', () => this.openMenu());
    this.closeButton.addEventListener('click', () => this.closeMenu());

    // メニュー外クリックで閉じる
    this.menu.addEventListener('click', (e) => {
      if (e.target === this.menu) {
        this.closeMenu();
      }
    });

    // ESCキーで閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });
  }

  openMenu() {
    if (this.isOpen) return;

    this.isOpen = true;
    this.menu.style.visibility = 'visible';

    // 現在のスクロール位置を保存
    this.scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    // 少し遅延させてスムーズなアニメーションを実現
    requestAnimationFrame(() => {
      this.menu.style.opacity = '1';
    });

    // スクロールを無効化（CSSクラスで制御）
    document.body.classList.add('menu-open');
    document.body.style.top = `-${this.scrollPosition}px`;

    // アクセシビリティ: フォーカスをメニューに移動
    this.closeButton.focus();
  }

  closeMenu() {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.menu.style.opacity = '0';

    // アニメーション完了後に非表示にする
    setTimeout(() => {
      if (!this.isOpen) {
        this.menu.style.visibility = 'hidden';
      }
    }, 300);

    // スクロールを有効化（CSSクラスを削除）
    document.body.classList.remove('menu-open');
    document.body.style.top = '';

    // スクロール位置を復元
    window.scrollTo(0, this.scrollPosition);

    // アクセシビリティ: フォーカスを開くボタンに戻す
    this.openButton.focus();
  }
}

// DOMが読み込まれた後に初期化
document.addEventListener('DOMContentLoaded', () => {
  new GlobalMenu();
});
