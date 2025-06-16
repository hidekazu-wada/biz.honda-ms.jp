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
 * デバイス幅が狭い（タブレット縦より小さい）かどうかの判定
 */
function isNarrowDevice() {
  return window.innerWidth < 1024;
}

/**
 * ヒーローアニメーションを開始
 */
function startHeroAnimation() {
  // GSAPの存在確認
  if (typeof gsap === 'undefined') {
    console.error('GSAP is not loaded');
    return;
  }

  // デバイス判定
  const isNarrow = isNarrowDevice();
  
  // アニメーション対象要素
  const elements = {
    lead: document.querySelector('.hero-message__lead'),
    part1: document.querySelector('.hero-message__part1'),
    part2: document.querySelector('.hero-message__part2'),
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

  // 1. まいにちを
  gsap.fromTo(
    elements.lead,
    {
      opacity: 0,
      y: heroAnimationConfig.translateY,
      visibility: 'hidden',
    },
    {
      opacity: 1,
      y: 0,
      visibility: 'visible',
      duration: heroAnimationConfig.durations.lead,
      ease: heroAnimationConfig.easing,
      delay: heroAnimationConfig.delays.lead,
    }
  );

  // 2. もっと便利に（全デバイス共通）
  const part1Delay = heroAnimationConfig.delays.main;
  gsap.fromTo(
    elements.part1,
    {
      opacity: 0,
      y: heroAnimationConfig.translateY,
      visibility: 'hidden',
    },
    {
      opacity: 1,
      y: 0,
      visibility: 'visible',
      duration: heroAnimationConfig.durations.main,
      ease: heroAnimationConfig.easing,
      delay: part1Delay,
    }
  );

  // 3. もっと楽しく（デバイスによってタイミング調整）
  const part2Delay = isNarrow ? heroAnimationConfig.delays.main + 0.5 : heroAnimationConfig.delays.main;
  gsap.fromTo(
    elements.part2,
    {
      opacity: 0,
      y: heroAnimationConfig.translateY,
      visibility: 'hidden',
    },
    {
      opacity: 1,
      y: 0,
      visibility: 'visible',
      duration: heroAnimationConfig.durations.main,
      ease: heroAnimationConfig.easing,
      delay: part2Delay,
    }
  );

  // 4. More convenient & fun.
  const englishDelay = isNarrow ? heroAnimationConfig.delays.english + 0.5 : heroAnimationConfig.delays.english;
  gsap.fromTo(
    elements.english,
    {
      opacity: 0,
      y: heroAnimationConfig.translateY,
      visibility: 'hidden',
    },
    {
      opacity: 1,
      y: 0,
      visibility: 'visible',
      duration: heroAnimationConfig.durations.english,
      ease: heroAnimationConfig.easing,
      delay: englishDelay,
    }
  );

  // 5. スクロールインジケーター
  const arrowDelay = isNarrow ? heroAnimationConfig.delays.arrow + 0.5 : heroAnimationConfig.delays.arrow;
  gsap.fromTo(
    elements.arrow,
    {
      opacity: 0,
      y: heroAnimationConfig.translateY,
      visibility: 'hidden',
    },
    {
      opacity: 1,
      y: 0,
      visibility: 'visible',
      duration: heroAnimationConfig.durations.arrow,
      ease: heroAnimationConfig.easing,
      delay: arrowDelay,
    }
  );
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
      '.hero-message__part1',
      '.hero-message__part2',
      '.hero-message__english',
      '.scroll-indicator',
    ];

    elements.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) {
        gsap.set(el, { opacity: 1, y: 0, visibility: 'visible' });
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
