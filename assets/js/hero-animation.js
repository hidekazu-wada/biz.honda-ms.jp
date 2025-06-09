/**
 * Hero Section Animation
 * GSAPを使った4段階フェードインアニメーション
 */

// アニメーション設定
const heroAnimationConfig = {
  // 各要素の表示時間（秒）- ラグジュアリーなゆったり感
  durations: {
    lead: 0.8, // まいにちを（0.8 → 1.2秒）
    main: 1.2, // もっと便利に、もっと楽しく。（1.0 → 1.8秒）
    english: 0.6, // More convenient & fun.（0.6 → 1.0秒）
    arrow: 0.4, // 矢印（0.4 → 0.8秒）
  },

  // 前の要素からの遅延時間（秒）- よりゆったりとした間
  delays: {
    lead: 0,
    main: 0.6, // まいにちを表示開始から0.6秒後（0.3 → 0.6秒）
    english: 0.8, // もっと便利に...表示開始から0.8秒後（0.2 → 0.8秒）
    arrow: 0.4, // More convenient...表示開始から0.4秒後（0.1 → 0.4秒）
  },

  // イージング - より滑らかで上品な動き
  easing: 'power1.out',

  // Y軸移動距離 - より目立つ動き
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

  // 初期状態を設定（念のため）
  gsap.set(Object.values(elements), {
    opacity: 0,
    y: heroAnimationConfig.translateY,
  });

  // タイムラインを作成
  const tl = gsap.timeline();

  // 1. まいにちを
  tl.to(elements.lead, {
    opacity: 1,
    y: 0,
    duration: heroAnimationConfig.durations.lead,
    ease: heroAnimationConfig.easing,
  });

  // 2. もっと便利に、もっと楽しく。
  tl.to(
    elements.main,
    {
      opacity: 1,
      y: 0,
      duration: heroAnimationConfig.durations.main,
      ease: heroAnimationConfig.easing,
    },
    `-=${heroAnimationConfig.durations.lead - heroAnimationConfig.delays.main}`
  );

  // 3. More convenient & fun.
  tl.to(
    elements.english,
    {
      opacity: 1,
      y: 0,
      duration: heroAnimationConfig.durations.english,
      ease: heroAnimationConfig.easing,
    },
    `-=${
      heroAnimationConfig.durations.main - heroAnimationConfig.delays.english
    }`
  );

  // 4. 矢印
  tl.to(
    elements.arrow,
    {
      opacity: 1,
      y: 0,
      duration: heroAnimationConfig.durations.arrow,
      ease: heroAnimationConfig.easing,
    },
    `-=${
      heroAnimationConfig.durations.english - heroAnimationConfig.delays.arrow
    }`
  );

  // デバッグ用
  console.log('Hero animation started');
}

/**
 * レスポンシブ対応：デバイスサイズに応じて設定を調整
 */
function adjustAnimationForDevice() {
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    // モバイルでもラグジュアリーな印象を保つ
    heroAnimationConfig.durations = {
      lead: 1.0, // デスクトップより少し速め
      main: 1.4,
      english: 0.8,
      arrow: 0.6,
    };
    // 遅延時間も調整
    heroAnimationConfig.delays = {
      lead: 0,
      main: 0.4,
      english: 0.6,
      arrow: 0.3,
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
