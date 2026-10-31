// =========================================
// JavaScript 処理
// HTMLの読み込みが完了してから実行します (DOMContentLoaded)
// =========================================
document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------------------
     1. ハンバーガーメニューの開閉処理
  ----------------------------------------- */
  const hamburger = document.getElementById("js-hamburger");
  const nav = document.getElementById("js-nav");

  // ハンバーガーボタンがクリックされた時の処理
  hamburger.addEventListener("click", () => {
    // ボタンとナビゲーションに 'is-active' クラスを付け外しする
    hamburger.classList.toggle("is-active");
    nav.classList.toggle("is-active");
  });

  /* -----------------------------------------
     2. スムーズスクロール処理
  ----------------------------------------- */
  // ページ内リンク（href が # で始まるaタグ）をすべて取得
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const header = document.querySelector(".header");

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // デフォルトのリンク動作（一瞬でジャンプする動作）を無効化
      e.preventDefault();

      // スマホでメニューが開いている場合は、リンククリック時にメニューを閉じる
      if (nav.classList.contains("is-active")) {
        hamburger.classList.remove("is-active");
        nav.classList.remove("is-active");
      }

      // クリックされたリンクのhref属性（ターゲットのID）を取得
      const targetId = this.getAttribute("href");

      // ターゲットが"#"だけ（トップに戻るなど）の場合は処理を終了
      if (targetId === "#") return;

      // ジャンプ先のHTML要素を取得
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // ヘッダーの高さを取得（固定ヘッダーにコンテンツが隠れないようにするため）
        const headerHeight = header.offsetHeight;

        // ターゲット要素の位置を計算
        // 要素の画面上の位置 + 現在のスクロール量 - ヘッダーの高さ
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;

        // スムーズにスクロールを実行
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {
    card.addEventListener("click", () => {
      const isAlreadyOpen = card.classList.contains("is-expanded");

      skillCards.forEach((c) => c.classList.remove("is-expanded"));
      if (!isAlreadyOpen) {
        card.classList.add("is-expanded");
      }
    });
  });
  /* -----------------------------------------
     3. スクロールに応じたナビリンクのアクティブ切り替え
  ----------------------------------------- */
  const sections = document.querySelectorAll("section");

  // 画面をスクロールするたびに実行されるイベント
  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    const scrollY = window.scrollY;
    const headerHeight = header.offsetHeight;

    // 各セクションの位置を確認
    sections.forEach((section) => {
      // セクションの上端位置（ヘッダー分と少し余裕を持たせる）
      const sectionTop = section.offsetTop - headerHeight - 10;
      const sectionHeight = section.offsetHeight;

      // 現在のスクロール位置が、セクションの範囲内にあるか判定
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    // ナビゲーションのリンク状態を更新
    anchorLinks.forEach((link) => {
      // 一旦すべてのリンクから 'is-active' を外す
      link.classList.remove("is-active");

      // 現在のセクションIDと一致するリンクに 'is-active' を付ける
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("is-active");
      }
    });
  });
});

//スクロールアニメーション//
const fadeElements = document.querySelectorAll(".fade-in-up");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  },
);

fadeElements.forEach((el) => observer.observe(el));

//ローディング//

const loading = document.getElementById("loading");
setTimeout(() => {
  loading.classList.add("is-loaded");
}, 3000);
