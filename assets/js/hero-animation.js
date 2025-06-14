/**
 * Hero Section Animation
 * GSAPのfromToを使った4段階フェードインアニメーション
 */

// アニメーション設定
const heroAnimationConfig = {
  // 各要素の表示時間（秒）
  durations: {
    lead: 0.8,
    main: 1.0,
    english: 0.6,
    arrow: 0.4,
  },

  // 前の要素からの遅延時間（秒）
  delays: {
    lead: 0.3,
    main: 0.8,
    english: 1.3,
    arrow: 1.8,
  },

  // イージング
  easing: 'power2.out',

  // Y軸移動距離
  translateY: 30,
};

/**
 * ヒーローアニメーションを開始
 */
function startHeroAnimation() {
  // GSAPの存在確認
  if (typeof gsap === 'undefined') {
    console.error('GSAP is not loaded');
    return;
  }

  // アニメーション対象要素
  const elements = {
    lead: document.querySelector('.hero-message__lead'),
    main: document.querySelector('.hero-message__main'),
    english: document.querySelector('.hero-message__english'),
    arrow: document.querySelector('.scroll-indicator'),
  };

  // 要素の存在確認
  const missingElements = Object.entries(elements)
    .filter(([key, el]) => !el)
    .map(([key]) => key);

  if (missingElements.length > 0) {
    console.error('Hero animation elements not found:', missingElements);
    return;
  }

  console.log('Starting hero animation with fromTo');

  // 1. まいにちを
  gsap.fromTo(
    elements.lead,
    {
      opacity: 0,
      y: heroAnimationConfig.translateY,
    },
    {
      opacity: 1,
      y: 0,
      duration: heroAnimationConfig.durations.lead,
      ease: heroAnimationConfig.easing,
      delay: heroAnimationConfig.delays.lead,
      onComplete: () => console.log('Lead animation completed'),
    }
  );

  // 2. もっと便利に、もっと楽しく
  gsap.fromTo(
    elements.main,
    {
      opacity: 0,
      y: heroAnimationConfig.translateY,
    },
    {
      opacity: 1,
      y: 0,
      duration: heroAnimationConfig.durations.main,
      ease: heroAnimationConfig.easing,
      delay: heroAnimationConfig.delays.main,
      onComplete: () => console.log('Main animation completed'),
    }
  );

  // 3. More convenient & fun.
  gsap.fromTo(
    elements.english,
    {
      opacity: 0,
      y: heroAnimationConfig.translateY,
    },
    {
      opacity: 1,
      y: 0,
      duration: heroAnimationConfig.durations.english,
      ease: heroAnimationConfig.easing,
      delay: heroAnimationConfig.delays.english,
      onComplete: () => console.log('English animation completed'),
    }
  );

  // 4. スクロールインジケーター
  gsap.fromTo(
    elements.arrow,
    {
      opacity: 0,
      y: heroAnimationConfig.translateY,
    },
    {
      opacity: 1,
      y: 0,
      duration: heroAnimationConfig.durations.arrow,
      ease: heroAnimationConfig.easing,
      delay: heroAnimationConfig.delays.arrow,
      onComplete: () => console.log('Arrow animation completed'),
    }
  );

  console.log('Hero animation started with fromTo method');
}

/**
 * レスポンシブ対応：デバイスサイズに応じて設定を調整
 */
function adjustAnimationForDevice() {
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    heroAnimationConfig.durations = {
      lead: 0.6,
      main: 0.8,
      english: 0.5,
      arrow: 0.4,
    };
    heroAnimationConfig.delays = {
      lead: 0.2,
      main: 0.6,
      english: 1.0,
      arrow: 1.4,
    };
  }
}

/**
 * prefers-reduced-motionへの配慮
 */
function respectsReducedMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // アニメーションを無効化し、即座に表示
    const elements = [
      '.hero-message__lead',
      '.hero-message__main',
      '.hero-message__english',
      '.scroll-indicator',
    ];

    elements.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) {
        gsap.set(el, { opacity: 1, y: 0 });
      }
    });

    console.log('Animation disabled due to prefers-reduced-motion');
    return true;
  }
  return false;
}

/**
 * 初期化とアニメーション実行
 */
function initHeroAnimation() {
  console.log('Initializing hero animation');

  // reduced-motionのチェック
  if (respectsReducedMotion()) {
    return;
  }

  // デバイス対応
  adjustAnimationForDevice();

  // アニメーション開始
  startHeroAnimation();
}

// エクスポート（boot-loader.jsから呼び出し用）
window.initHeroAnimation = initHeroAnimation;
