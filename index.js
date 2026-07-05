/* ============================================
   FOREST AD LAND — Interactivity & Translations
   ============================================ */

// ==================== TRANSLATIONS ====================
const translations = {
  en: {
    // Nav
    nav_about: "About",
    nav_token: "Token",
    nav_roadmap: "Roadmap",
    nav_community: "Community",
    nav_join: "Join Community",

    // Hero
    hero_title: "FOREST AD LAND",
    hero_tagline: "Where Digital Land Meets the Future of Advertising.",
    badge_own: "🌿 OWN",
    badge_build: "🏗️ BUILD",
    badge_grow: "🚀 GROW",
    copy_tooltip: "Copied!",
    cta_telegram: "Join Telegram",
    cta_twitter: "Follow",
    scroll_text: "Scroll",

    // About
    about_label: "The Heart of Forest Ad Land",
    about_title: "What is Forest Ad Land?",
    about_text: "Forest Ad Land is a next-generation digital world where virtual land, advertising, and community come together. It's designed to create value through ownership, visibility, and long-term growth. It gives users, creators, and businesses a shared space to own digital land, showcase brands, and become part of a growing community built for the future.",

    // Own Digital Land
    own_label: "Digital Ownership",
    own_title: "Own Digital Land",
    own_text: "Digital land is more than ownership, it's an opportunity. Secure your place in a growing ecosystem, unlock future possibilities, and become part of a community where every plot has purpose and potential.",
    own_pill1_title: "Own",
    own_pill1_text: "Secure your digital space.",
    own_pill2_title: "Advertise",
    own_pill2_text: "Increase visibility through virtual advertising.",
    own_pill3_title: "Grow",
    own_pill3_text: "Be part of an expanding digital ecosystem.",

    // Advertising
    ads_label: "Advertising Ecosystem",
    ads_title: "Advertising with Purpose",
    ads_text: "Forest Ad Land transforms digital spaces into valuable advertising opportunities. Businesses can place their brands in strategic locations, creators can increase visibility, and communities benefit from an ecosystem designed for real engagement — not just impressions.",
    ads_card1_title: "Advertise",
    ads_card1_text: "Promote your brand in premium digital spaces designed for visibility and impact.",
    ads_card2_title: "Reach",
    ads_card2_text: "Connect with a growing community in high-traffic locations.",
    ads_card3_title: "Expand",
    ads_card3_text: "Grow your brand alongside an evolving ecosystem with endless potential.",

    // Community & Marketplace
    market_label: "More Than Ownership",
    market_title: "Community & Marketplace",
    market_subtitle: "More Than Ownership. Built for Connection.",
    market_text: "Forest Ad Land is designed to bring people together through a growing digital ecosystem. Users can connect, trade digital assets, discover new opportunities, and help shape a community where creativity, collaboration, and long-term participation drive real value.",

    // Vision
    vision_title: "The Vision",
    vision_subtitle: "From one digital forest to a global ecosystem.",
    vision_cta: "Join us as we build the future.",

    // Token
    token_label: "Token Utility",
    token_title: "$FL Token",
    token_subtitle: "The utility layer inside the Forest Ad Land ecosystem. Used for land actions, advertising, upgrades, rewards, marketplace activity, and community incentives.",
    token_card1_title: "Land Actions",
    token_card1_text: "Acquire, upgrade, and manage your digital property.",
    token_card2_title: "Advertising",
    token_card2_text: "Pay for ad placements and premium visibility.",
    token_card3_title: "Upgrades",
    token_card3_text: "Enhance your land, unlock features, and boost value.",
    token_card4_title: "Rewards",
    token_card4_text: "Earn tokens for active participation and contributions.",
    token_card5_title: "Marketplace",
    token_card5_text: "Trade land, ad spaces, and digital assets.",
    token_card6_title: "Community",
    token_card6_text: "Incentives for community growth and governance.",
    ca_label: "Contract Address",
    ca_copy_btn: "Copy",

    // Roadmap
    roadmap_label: "The Journey",
    roadmap_title: "Roadmap",
    roadmap_subtitle: "Our strategic plan for growth, innovation, and community success. Built openly, step by step.",
    roadmap_status_current: "Current",
    roadmap_status_upcoming: "Upcoming",
    roadmap_status_vision: "Vision",
    roadmap_p1_label: "Phase 1",
    roadmap_p1_title: "Foundation",
    roadmap_p1_1: "Token launch on Solana",
    roadmap_p1_2: "Community channels live (Telegram & X)",
    roadmap_p1_3: "Official website launch",
    roadmap_p1_4: "Social media presence established",
    roadmap_p1_5: "Community growth campaigns",
    roadmap_p1_6: "Early supporter rewards",
    roadmap_p2_label: "Phase 2",
    roadmap_p2_title: "Growth & Ecosystem",
    roadmap_p2_1: "Community expansion & partnerships",
    roadmap_p2_2: "Early land concept development",
    roadmap_p2_3: "Token utility rollout begins",
    roadmap_p2_4: "Strategic marketing initiatives",
    roadmap_p2_5: "Liquidity & market stability focus",
    roadmap_p3_label: "Phase 3",
    roadmap_p3_title: "Product Launch",
    roadmap_p3_1: "Digital land platform beta",
    roadmap_p3_2: "Advertising marketplace launch",
    roadmap_p3_3: "Property types system (land, ad spaces, zones)",
    roadmap_p3_4: "Business onboarding program",
    roadmap_p3_5: "Community governance features",
    roadmap_p4_label: "Phase 4",
    roadmap_p4_title: "Global Expansion",
    roadmap_p4_1: "Multi-city digital land expansion",
    roadmap_p4_2: "Global advertising ecosystem",
    roadmap_p4_3: "Enterprise business integrations",
    roadmap_p4_4: "Exchange listings (milestone-based)",
    roadmap_p4_5: "Cross-chain expansion",

    // Supporters
    supporters_label: "Be Early",
    supporters_title: "Early Supporters Matter",
    supporters_text: "We believe the people who join first help build the foundation. Early supporters get advantages that reward their trust and participation from day one.",
    benefit_1: "Early access to new features",
    benefit_2: "Special community roles",
    benefit_3: "Priority in future drops",
    benefit_4: "Limited community rewards",
    benefit_5: "Better starting opportunities",
    benefit_6: "Founding member recognition",
    supporters_cta: "Join the Community Now",

    // Social
    social_label: "Connect",
    social_title: "Join the Community",
    social_subtitle: "Connect with us on social media and be part of our growing community.",
    social_x_desc: "Latest updates and announcements",
    social_tg_desc: "Community chat and support",
    social_email_title: "Email",
    social_email_desc: "Business inquiries and partnerships",
    social_join: "Join Now →",
    social_contact: "Contact Us →",
    social_yt_title: "YouTube",
    social_yt_desc: "Video content and updates",
    social_ig_title: "Instagram",
    social_ig_desc: "Visuals and behind the scenes",

    // Footer
    footer_tagline: "Own. Build. Grow.",
    footer_ca_prefix: "CA: 2iqdyuBEtNeR15PtmuWAZBorK1hEmWhYnpY71j42pump",
    footer_copyright: "© 2026 Forest Ad Land. All rights reserved.",
    footer_disclaimer: "Forest Ad Land is a community-driven project. The token is a utility layer inside the ecosystem. This is not financial advice. Always do your own research before participating in any Web3 project.",
  },

  ru: {
    // Nav
    nav_about: "О проекте",
    nav_token: "Токен",
    nav_roadmap: "Дорожная карта",
    nav_community: "Сообщество",
    nav_join: "Присоединиться",

    // Hero
    hero_title: "FOREST AD LAND",
    hero_tagline: "Где цифровая земля встречает будущее рекламы.",
    badge_own: "🌿 ВЛАДЕЙ",
    badge_build: "🏗️ СТРОЙ",
    badge_grow: "🚀 РАСТИ",
    copy_tooltip: "Скопировано!",
    cta_telegram: "Telegram",
    cta_twitter: "Подписаться",
    scroll_text: "Листать",

    // About
    about_label: "Сердце Forest Ad Land",
    about_title: "Что такое Forest Ad Land?",
    about_text: "Forest Ad Land — это цифровой мир нового поколения, где виртуальная земля, реклама и сообщество объединяются. Проект создан для создания ценности через владение, видимость и долгосрочный рост. Он даёт пользователям, создателям и бизнесам общее пространство для владения цифровой землёй, продвижения брендов и участия в растущем сообществе, построенном для будущего.",

    // Own Digital Land
    own_label: "Цифровое владение",
    own_title: "Владей цифровой землёй",
    own_text: "Цифровая земля — это больше, чем владение, это возможность. Обеспечьте своё место в растущей экосистеме, откройте будущие возможности и станьте частью сообщества, где каждый участок имеет цель и потенциал.",
    own_pill1_title: "Владей",
    own_pill1_text: "Обеспечьте своё цифровое пространство.",
    own_pill2_title: "Рекламируй",
    own_pill2_text: "Увеличьте видимость через виртуальную рекламу.",
    own_pill3_title: "Расти",
    own_pill3_text: "Станьте частью расширяющейся цифровой экосистемы.",

    // Advertising
    ads_label: "Рекламная экосистема",
    ads_title: "Реклама с целью",
    ads_text: "Forest Ad Land превращает цифровые пространства в ценные рекламные возможности. Бизнесы могут размещать свои бренды в стратегических локациях, создатели могут увеличить видимость, а сообщества получают выгоду от экосистемы, созданной для реального вовлечения — а не просто показов.",
    ads_card1_title: "Рекламируй",
    ads_card1_text: "Продвигайте свой бренд в премиальных цифровых пространствах для видимости и воздействия.",
    ads_card2_title: "Охват",
    ads_card2_text: "Свяжитесь с растущим сообществом в высокотрафиковых локациях.",
    ads_card3_title: "Расширяйся",
    ads_card3_text: "Развивайте свой бренд вместе с эволюционирующей экосистемой с безграничным потенциалом.",

    // Community & Marketplace
    market_label: "Больше, чем владение",
    market_title: "Сообщество и маркетплейс",
    market_subtitle: "Больше, чем владение. Создано для связи.",
    market_text: "Forest Ad Land создан, чтобы объединять людей через растущую цифровую экосистему. Пользователи могут общаться, торговать цифровыми активами, открывать новые возможности и формировать сообщество, где творчество, сотрудничество и долгосрочное участие создают реальную ценность.",

    // Vision
    vision_title: "Видение",
    vision_subtitle: "От одного цифрового леса к глобальной экосистеме.",
    vision_cta: "Присоединяйтесь, мы строим будущее.",

    // Token
    token_label: "Утилитарность токена",
    token_title: "Токен $FL",
    token_subtitle: "Утилитарный слой внутри экосистемы Forest Ad Land. Используется для действий с землёй, рекламы, улучшений, наград, торговой площадки и поощрений сообщества.",
    token_card1_title: "Действия с землёй",
    token_card1_text: "Приобретайте, улучшайте и управляйте своей цифровой собственностью.",
    token_card2_title: "Реклама",
    token_card2_text: "Оплата рекламных размещений и премиальной видимости.",
    token_card3_title: "Улучшения",
    token_card3_text: "Улучшайте свою землю, открывайте функции и повышайте ценность.",
    token_card4_title: "Награды",
    token_card4_text: "Зарабатывайте токены за активное участие и вклад.",
    token_card5_title: "Маркетплейс",
    token_card5_text: "Торгуйте землёй, рекламными площадками и цифровыми активами.",
    token_card6_title: "Сообщество",
    token_card6_text: "Поощрения за рост сообщества и управление.",
    ca_label: "Адрес контракта",
    ca_copy_btn: "Копировать",

    // Roadmap
    roadmap_label: "Путь",
    roadmap_title: "Дорожная карта",
    roadmap_subtitle: "Наш стратегический план роста, инноваций и успеха сообщества. Строим открыто, шаг за шагом.",
    roadmap_status_current: "Текущий",
    roadmap_status_upcoming: "Предстоящий",
    roadmap_status_vision: "Видение",
    roadmap_p1_label: "Фаза 1",
    roadmap_p1_title: "Основание",
    roadmap_p1_1: "Запуск токена на Solana",
    roadmap_p1_2: "Каналы сообщества запущены (Telegram & X)",
    roadmap_p1_3: "Запуск официального сайта",
    roadmap_p1_4: "Присутствие в социальных сетях",
    roadmap_p1_5: "Кампании по росту сообщества",
    roadmap_p1_6: "Награды ранним поддерживающим",
    roadmap_p2_label: "Фаза 2",
    roadmap_p2_title: "Рост и экосистема",
    roadmap_p2_1: "Расширение сообщества и партнёрства",
    roadmap_p2_2: "Разработка ранних концепций земли",
    roadmap_p2_3: "Начало внедрения утилитарности токена",
    roadmap_p2_4: "Стратегические маркетинговые инициативы",
    roadmap_p2_5: "Фокус на ликвидности и стабильности рынка",
    roadmap_p3_label: "Фаза 3",
    roadmap_p3_title: "Запуск продукта",
    roadmap_p3_1: "Бета-версия платформы цифровой земли",
    roadmap_p3_2: "Запуск рекламного маркетплейса",
    roadmap_p3_3: "Система типов собственности (земля, рекламные площади, зоны)",
    roadmap_p3_4: "Программа подключения бизнесов",
    roadmap_p3_5: "Функции управления сообществом",
    roadmap_p4_label: "Фаза 4",
    roadmap_p4_title: "Глобальное расширение",
    roadmap_p4_1: "Расширение цифровой земли на несколько городов",
    roadmap_p4_2: "Глобальная рекламная экосистема",
    roadmap_p4_3: "Интеграции с корпоративным бизнесом",
    roadmap_p4_4: "Листинг на биржах (по достижении вех)",
    roadmap_p4_5: "Кросс-чейн расширение",

    // Supporters
    supporters_label: "Будь первым",
    supporters_title: "Ранние поддерживающие важны",
    supporters_text: "Мы верим, что люди, которые присоединяются первыми, помогают строить фундамент. Ранние поддерживающие получают преимущества, которые вознаграждают их доверие и участие с первого дня.",
    benefit_1: "Ранний доступ к новым функциям",
    benefit_2: "Особые роли в сообществе",
    benefit_3: "Приоритет в будущих дропах",
    benefit_4: "Ограниченные награды сообщества",
    benefit_5: "Лучшие стартовые возможности",
    benefit_6: "Признание как участника-основателя",
    supporters_cta: "Присоединиться к сообществу",

    // Social
    social_label: "Связаться",
    social_title: "Присоединяйтесь к сообществу",
    social_subtitle: "Свяжитесь с нами в социальных сетях и станьте частью нашего растущего сообщества.",
    social_x_desc: "Последние обновления и анонсы",
    social_tg_desc: "Чат сообщества и поддержка",
    social_email_title: "Электронная почта",
    social_email_desc: "Деловые запросы и партнёрства",
    social_join: "Присоединиться →",
    social_contact: "Связаться →",
    social_yt_title: "YouTube",
    social_yt_desc: "Видеоконтент и обновления",
    social_ig_title: "Instagram",
    social_ig_desc: "Визуал и закулисье",

    // Footer
    footer_tagline: "Владей. Строй. Расти.",
    footer_ca_prefix: "CA: 2iqdyuBEtNeR15PtmuWAZBorK1hEmWhYnpY71j42pump",
    footer_copyright: "© 2026 Forest Ad Land. Все права защищены.",
    footer_disclaimer: "Forest Ad Land — это проект, управляемый сообществом. Токен является утилитарным слоем внутри экосистемы. Это не финансовый совет. Всегда проводите собственное исследование перед участием в любом Web3-проекте.",
  }
};


// ==================== CONSTANTS ====================
const CA = "2iqdyuBEtNeR15PtmuWAZBorK1hEmWhYnpY71j42pump";


// ==================== DOM READY ====================
document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initNavbar();
  initHamburger();
  initCopyCA();
  initBackToTop();
  initLanguageToggle();
  initSmoothScroll();
});


// ==================== SCROLL REVEAL ====================
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}


// ==================== NAVBAR SCROLL ====================
function initNavbar() {
  const nav = document.getElementById("navbar");
  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}


// ==================== HAMBURGER MENU ====================
function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
    document.body.style.overflow = navLinks.classList.contains("open") ? "hidden" : "";
  });

  // Close on link click
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}


// ==================== COPY CA ====================
function initCopyCA() {
  // Hero CA
  const heroCa = document.getElementById("heroCa");
  const tooltip1 = document.getElementById("copyTooltip");

  if (heroCa) {
    heroCa.addEventListener("click", () => copyToClipboard(CA, tooltip1));
  }

  // Token section CA
  const caCopyBtn = document.getElementById("caCopyBtn");
  const tooltip2 = document.getElementById("copyTooltip2");

  if (caCopyBtn) {
    caCopyBtn.addEventListener("click", () => copyToClipboard(CA, tooltip2));
  }
}

function copyToClipboard(text, tooltipEl) {
  navigator.clipboard.writeText(text).then(() => {
    if (tooltipEl) {
      tooltipEl.classList.add("show");
      setTimeout(() => tooltipEl.classList.remove("show"), 2000);
    }
  }).catch(() => {
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    if (tooltipEl) {
      tooltipEl.classList.add("show");
      setTimeout(() => tooltipEl.classList.remove("show"), 2000);
    }
  });
}


// ==================== BACK TO TOP ====================
function initBackToTop() {
  const btn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 600) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


// ==================== LANGUAGE TOGGLE ====================
function initLanguageToggle() {
  const toggle = document.getElementById("langToggle");
  const buttons = toggle.querySelectorAll("button");

  // Load saved language or default to 'en'
  const savedLang = localStorage.getItem("fal-lang") || "en";
  setLanguage(savedLang);
  updateToggleUI(savedLang);

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      setLanguage(lang);
      updateToggleUI(lang);
      localStorage.setItem("fal-lang", lang);
    });
  });
}

function setLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang === "ru" ? "ru" : "en";
}

function updateToggleUI(lang) {
  const toggle = document.getElementById("langToggle");
  toggle.querySelectorAll("button").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });
}


// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
}
