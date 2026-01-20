/* =================================================
  main.js（安全版・全ページ共通）
  ・要素が無いページでは何もしない
  ・returnで全体を止めない
================================================= */

$(function () {

    /* ===============================
      ハンバーガーメニュー
    =============================== */
    const $hamburger = $(".hamburger");
    const $header = $("header");
    const $naviLinks = $("#navi a");

    if ($hamburger.length) {
        $hamburger.on("click", () => {
            $header.toggleClass("open");
        });
    }

    if ($naviLinks.length) {
        $naviLinks.on("click", () => {
            $header.removeClass("open");
        });
    }


    /* ===============================
      フッター肉球（IntersectionObserver）
    =============================== */
    const footer = document.querySelector("#footer");
    const paws = document.querySelectorAll(".footer-paw");

    if (footer && paws.length && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                paws.forEach(paw =>
                    paw.classList.toggle("is-show", entry.isIntersecting)
                );
            });
        });
        observer.observe(footer);
    }


    /* ===============================
      LINE固定ボタン（フッターで非表示）
    =============================== */
    const $lineBtn = $(".line-btn");
    const $footerEl = $("footer");

    if ($lineBtn.length && $footerEl.length) {
        $(window).on("scroll resize", function () {
            const scroll = $(this).scrollTop();
            const winH = $(this).height();
            const footerTop = $footerEl.offset().top;

            const show = scroll > 50 && scroll + winH < footerTop;
            $lineBtn.toggleClass("is-show", show);
        }).trigger("scroll");
    }


    /* ===============================
      サービススライダー（画像）
    =============================== */
    const slides = document.querySelectorAll("#serviceSlider .service-slide");

    if (slides.length) {
        let i = 0;
        setInterval(() => {
            slides[i].classList.remove("is-active");
            i = (i + 1) % slides.length;
            slides[i].classList.add("is-active");
        }, 4000);
    }


    /* ===============================
      桜背景（肉球混じり）
    =============================== */
    (() => {
        const wrap = document.querySelector(".sakura");
        if (!wrap) return;

        const COUNT = 14;
        const PAW_RATE = 0.18;

        for (let i = 0; i < COUNT; i++) {
            const el = document.createElement("span");
            el.className = "sakura__petal";

            if (Math.random() < PAW_RATE) el.classList.add("is-paw");

            el.style.setProperty("--size", `${rand(10, 26)}px`);
            el.style.setProperty("--x", `${rand(0, 100)}vw`);
            el.style.setProperty("--dur", `${rand(10, 22)}s`);
            el.style.setProperty("--opacity", rand(0.35, 0.9));
            el.style.setProperty("--rot", `${rand(-180, 180)}deg`);
            el.style.animationDelay = `${rand(0, 18)}s`;

            wrap.appendChild(el);
        }

        function rand(min, max) {
            return Math.random() * (max - min) + min;
        }
    })();


    /* ===============================
      about動画スライダー
    =============================== */
    const videoSlides = document.querySelectorAll(".videoSlide");

    if (videoSlides.length) {
        let current = 0;
        const intervalMs = 6000;

        videoSlides.forEach((v, idx) => {
            v.muted = true;
            v.playsInline = true;
            v.preload = "auto";
            v.classList.toggle("is-active", idx === 0);
        });

        videoSlides[0].play().catch(() => { });

        setInterval(() => {
            videoSlides[current].classList.remove("is-active");
            current = (current + 1) % videoSlides.length;
            videoSlides[current].classList.add("is-active");
            videoSlides[current].play().catch(() => { });
        }, intervalMs);
    }


    /* ===============================
      QRモーダル
    =============================== */
    const qrDummy = document.getElementById("qrDummy");

    if (qrDummy) {
        document.querySelectorAll(".js-qr-open").forEach(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault();
                qrDummy.classList.add("is-show");
            });
        });

        document.querySelectorAll(".js-qr-close").forEach(btn => {
            btn.addEventListener("click", () => {
                qrDummy.classList.remove("is-show");
            });
        });
    }


    /* ===============================
      料金ページ：メニュー絞り込み
    =============================== */
    (() => {
        const btns = document.querySelectorAll(".filterBtn");
        const cards = document.querySelectorAll(".menuCard");
        if (!btns.length || !cards.length) return;

        btns.forEach(btn => {
            btn.addEventListener("click", () => {
                const filter = btn.dataset.filter;

                btns.forEach(b => b.classList.remove("is-active"));
                btn.classList.add("is-active");

                cards.forEach(card => {
                    const show =
                        filter === "all" || card.dataset.cat === filter;
                    card.classList.toggle("is-hidden", !show);
                });
            });
        });
    })();


    /* ===============================
      スクロールで猫ぴょこ
    =============================== */
    (() => {
        const peekCats = document.querySelectorAll(".js-peek");
        if (!peekCats.length) return;

        const showAfter = 140;

        const onScroll = () => {
            const show = window.scrollY > showAfter;
            peekCats.forEach(el => el.classList.toggle("is-show", show));
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    })();


    /* ===============================
      振込モーダル（寄付ページ）
    =============================== */
    (() => {
        const modal = document.getElementById("bankModal");
        if (!modal) return;

        document.querySelectorAll(".js-openBank").forEach(btn => {
            btn.addEventListener("click", () => {
                modal.classList.add("is-open");
                modal.setAttribute("aria-hidden", "false");
                document.body.style.overflow = "hidden";
            });
        });

        modal.querySelectorAll(".js-closeBank").forEach(btn => {
            btn.addEventListener("click", () => {
                modal.classList.remove("is-open");
                modal.setAttribute("aria-hidden", "true");
                document.body.style.overflow = "";
            });
        });
    })();


    /* ===============================
      特典「もっと見る」
    =============================== */
    document.querySelectorAll(".js-togglePerks").forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".planCard");
            if (!card) return;

            card.classList.toggle("is-expanded");
            btn.textContent = card.classList.contains("is-expanded")
                ? "閉じる"
                : "特典をもっと見る";
        });
    });


    /* ===============================
      準備中アラート
    =============================== */
    document.querySelectorAll(".js-comingSoon").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            alert("現在準備中です🌸 公開までお待ちください。");
        });
    });

    // 猫ホバー
    /* =========================
  Paw Button：左/右ランダム + 手画像ランダム
========================= */
    /* =========================
  Paw Button：左右ランダム + 左は反転
  ・画像は右向き1枚（paw-right.png）でOK
========================= */
    (() => {
        const wraps = document.querySelectorAll('.paw-wrap');
        if (!wraps.length) return;

        const pawImages = [
            'img/paw-white-right.png',
            'img/paw-mike-right.png',
            'img/paw-brown-right.png'
        ];

        const directions = [
            { side: 'left', offset: -90, tx: 42, flip: -1 },
            { side: 'right', offset: -90, tx: -42, flip: 1 }
        ];

        const SHOW_RATE = 0.75;

        wraps.forEach(wrap => {
            const paw = wrap.querySelector('.paw');
            const btn = wrap.querySelector('.paw-btn');
            if (!paw || !btn) return;

            btn.addEventListener('mouseenter', () => {
                if (Math.random() > SHOW_RATE) return;

                const img = pawImages[Math.floor(Math.random() * pawImages.length)];
                paw.style.backgroundImage = `url(${img})`;

                const dir = directions[Math.floor(Math.random() * directions.length)];

                paw.style.left = 'auto';
                paw.style.right = 'auto';
                paw.style.top = '50%';

                if (dir.side === 'left') {
                    paw.style.left = `${dir.offset}px`;
                } else {
                    paw.style.right = `${dir.offset}px`;
                }

                paw.style.setProperty('--tx', `${dir.tx}px`);
                paw.style.setProperty('--ty', `0%`);
                paw.style.setProperty('--flip', `${dir.flip}`);

                paw.classList.remove('is-active');
                void paw.offsetWidth;
                paw.classList.add('is-active');
            });

            btn.addEventListener('mouseleave', () => {
                paw.classList.remove('is-active');
                paw.style.opacity = '0';
            });
        });
    })();

});
