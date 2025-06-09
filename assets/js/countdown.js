/**
 * 404ページ カウントダウン機能
 * 10秒後にトップページに自動遷移
 */

class CountdownTimer {
  constructor() {
    this.countElement = document.querySelector('.error404-text-span-number');
    this.initialCount = 10;
    this.currentCount = this.initialCount;
    this.intervalId = null;

    this.init();
  }

  init() {
    // DOMが読み込まれてから実行
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  }

  start() {
    if (!this.countElement) {
      console.warn('カウントダウン要素が見つかりません');
      return;
    }

    // 初期値を設定
    this.updateDisplay();

    // 1秒ごとにカウントダウン
    this.intervalId = setInterval(() => {
      this.currentCount--;
      this.updateDisplay();

      // 0になったらトップページにリダイレクト
      if (this.currentCount <= 0) {
        this.redirect();
      }
    }, 1000);
  }

  updateDisplay() {
    if (this.countElement) {
      this.countElement.textContent = ` ${this.currentCount} `;
    }
  }

  redirect() {
    // カウントダウンを停止
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    // トップページにリダイレクト
    window.location.href = '/';
  }

  // 手動停止用メソッド（必要に応じて）
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// カウントダウンを開始
new CountdownTimer();
