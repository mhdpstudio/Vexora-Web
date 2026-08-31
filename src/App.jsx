import { useEffect, useState } from "react";
import "./style/App.css";
import Logo from "./assets/images/icon.png";

/*
=========================================================
ACTIVATION
=========================================================
*/

const ACTIVATION_URL = "https://wa.link/di4jtk";

/*
=========================================================
UPDATE DATA
=========================================================
*/

const UPDATE_URL =
  "https://raw.githubusercontent.com/mhdpstudio/Vexora-data/main/update.json";

/*
=========================================================
STATIC PLATFORM DATA
=========================================================
*/

const platforms = {
  windows: {
    name: "Windows",
    icon: "fa-brands fa-windows",
    type: "Desktop",

    builds: {
      x64: {
        key: "win-x64",
        name: "Windows 64-bit",
        architecture: "x64",
        description:
          "Recommended for modern 64-bit Windows systems.",
      },

      x86: {
        key: "win-x86",
        name: "Windows 32-bit",
        architecture: "x86",
        description:
          "For older 32-bit Windows systems.",
      },
    },
  },

  android: {
    name: "Android",
    icon: "fa-brands fa-android",
    type: "Mobile",

    builds: {
      arm64: {
        key: "android-arm64",
        name: "Android ARM64",
        architecture: "ARM64",
        description:
          "Recommended for modern Android devices.",
      },
    },
  },
};

/*
=========================================================
FEATURES
=========================================================
*/

const features = [
  {
    icon: "fa-solid fa-bolt",
    title: "Fast & Lightweight",
    description:
      "Vexora is designed to provide a smooth experience without unnecessary background overhead.",
  },

  {
    icon: "fa-solid fa-server",
    title: "Server-Powered Content",
    description:
      "Content delivery is handled through Vexora's servers, helping keep the application lightweight and efficient.",
  },

  {
    icon: "fa-solid fa-shield-halved",
    title: "Secure Activation",
    description:
      "Vexora uses an activation system to manage licensed access and protect application features.",
  },

  {
    icon: "fa-solid fa-key",
    title: "Activation Codes",
    description:
      "Request an activation code and enter it directly inside Vexora to activate your license.",
  },

  {
    icon: "fa-solid fa-mobile-screen-button",
    title: "Multi-Platform",
    description:
      "Use Vexora across supported devices, with additional platforms and architectures planned.",
  },

  {
    icon: "fa-solid fa-arrows-rotate",
    title: "Regular Updates",
    description:
      "Vexora continues to evolve with new versions, improvements and additional features.",
  },
];

/*
=========================================================
TRANSLATIONS
=========================================================
*/

const translations = {
  ar: {
    direction: "rtl",

    language: "العربية",
    english: "English",
    arabic: "العربية",

    entertainment: "الترفيه",

    nav: {
      home: "الرئيسية",
      features: "المميزات",
      download: "التحميل",
      about: "عن Vexora",
      downloadButton: "تحميل",
      activation: "طلب التفعيل",
    },

    hero: {
      available: "Vexora متاحة الآن",
      title1: "ترفيهك.",
      title2: "في مكان واحد.",
      description:
        "تجمع Vexora محتواك الترفيهي المفضل في تجربة واحدة جميلة وسريعة وبسيطة عبر الأجهزة المدعومة.",
      download: "تحميل Vexora",
      activation: "طلب كود التفعيل",
      windows: "ويندوز",
      windowsArch: "64-bit و 32-bit",
      android: "أندرويد",
      androidArch: "ARM64",
      activationTitle: "التفعيل",
      activationAvailable: "متاح",
    },

    features: {
      label: "لماذا Vexora",
      title1: " مصممة من أجل ",
      title2: "ترفيهك.",
      description:
        "تجمع Vexora بين واجهة نظيفة ومحتوى يعمل عبر الخوادم ونظام تفعيل في تجربة واحدة بسيطة.",
    },

    activation: {
      label: "نظام الترخيص",
      title1: "تحتاج إلى كود تفعيل؟",
      title2: "نحن هنا لمساعدتك.",
      description:
        "اطلب كود تفعيل Vexora عبر WhatsApp. بعد استلام الكود، أدخله مباشرة داخل تطبيق Vexora لتفعيل الترخيص.",
      point1: "دعم أكواد التفعيل",
      point2: "التحقق من الترخيص",
      point3: "حماية الوصول إلى التطبيق",
      button: "طلب كود التفعيل",
      license: "ترخيص VEXORA",
      verified: "تم التحقق من التفعيل",
      ready: "الترخيص جاهز للاستخدام",
    },

    download: {
      label: "احصل على Vexora",
      title1: "اختر",
      title2: "منصتك.",
      description:
        "اختر جهازك، ثم حدد المعمارية المناسبة وقم بتحميل أحدث إصدار مدعوم من Vexora.",

      desktop: "سطح المكتب",
      mobile: "الهاتف",

      architecture: "المعمارية",
      chooseArchitecture: "اختر المعمارية",
      builds: "إصدارات",

      available: "متاح",
      comingSoon: "قريبًا",
      loading: "جاري التحميل",
      unavailable: "غير متاح",

      version: "الإصدار",
      architectureLabel: "المعمارية",
      size: "الحجم",
      license: "الترخيص",

      activationCode: "كود تفعيل",

      download: "تحميل",

      note:
        "يتم تحميل معلومات الإصدارات والتوفر تلقائيًا من خادم تحديثات Vexora.",
    },

    about: {
      label: "عن Vexora",
      title1: "الترفيه،",
      title2: "بشكل جديد.",
      description:
        "تم بناء Vexora على فكرة بسيطة: يجب أن يكون الترفيه سهلًا وجميلًا وسهل الوصول. يستمر المشروع في التطور مع إضافة مميزات ومنصات وتحسينات جديدة.",
      platforms: "منصات مدعومة",
      architectures: "إصدارات معمارية",
      future: "إمكانيات مستقبلية",
    },

    footer: {
      slogan: "ترفيهك، في مكان واحد.",

      product: "المنتج",
      platforms: "المنصات",
      support: "الدعم",

      features: "المميزات",
      download: "التحميل",
      about: "عن Vexora",

      windows: "Windows",
      android: "Android",
      more: "المزيد قريبًا",

      activation: "التفعيل",
      requestCode: "طلب الكود",
      downloads: "التحميلات",

      rights: "© 2026 Vexora. جميع الحقوق محفوظة.",
      made: "صُنع بواسطة Mahmoud Ahmed",
      by: "بواسطة MhdP Studio",
    },

    visual: {
      welcome: "مرحبًا بك في",
      slogan: "ترفيهك، في مكان واحد.",
      fast: "سريع وخفيف",
      secure: "تفعيل آمن",
    },
  },

  en: {
    direction: "ltr",

    language: "English",
    english: "English",
    arabic: "العربية",

    entertainment: "Entertainment",

    nav: {
      home: "Home",
      features: "Features",
      download: "Download",
      about: "About",
      downloadButton: "Download",
      activation: "Request Activation",
    },

    hero: {
      available: "Vexora is available now",
      title1: "Your entertainment.",
      title2: "One place.",
      description:
        "Vexora brings your favorite entertainment together in one beautiful, fast and simple experience across supported devices.",
      download: "Download Vexora",
      activation: "Request Activation Code",
      windows: "Windows",
      windowsArch: "64-bit & 32-bit",
      android: "Android",
      androidArch: "ARM64",
      activationTitle: "Activation",
      activationAvailable: "Available",
    },

    features: {
      label: "WHY VEXORA",
      title1: "Built for your",
      title2: "entertainment.",
      description:
        "Vexora combines a clean interface, server-powered content and an activation system into one simple experience.",
    },

    activation: {
      label: "LICENSE SYSTEM",
      title1: "Need an activation code?",
      title2: "We've got you.",
      description:
        "Request your Vexora activation code through WhatsApp. After receiving your code, enter it directly inside the Vexora application to activate your license.",
      point1: "Activation code support",
      point2: "License verification",
      point3: "Protected application access",
      button: "Request Activation Code",
      license: "VEXORA LICENSE",
      verified: "Activation verified",
      ready: "License ready to use",
    },

    download: {
      label: "GET VEXORA",
      title1: "Choose your",
      title2: " platform.",
      description:
        "Select your device, choose the correct architecture and download the latest supported version of Vexora.",

      desktop: "Desktop",
      mobile: "Mobile",

      architecture: "ARCHITECTURE",
      chooseArchitecture: "Choose your architecture",
      builds: "builds",

      available: "Available",
      comingSoon: "Coming Soon",
      loading: "Loading",
      unavailable: "Unavailable",

      version: "Version",
      architectureLabel: "Architecture",
      size: "Size",
      license: "License",

      activationCode: "Activation Code",

      download: "Download",

      note:
        "Download availability and version information are loaded automatically from the Vexora update server.",
    },

    about: {
      label: "ABOUT VEXORA",
      title1: "Entertainment,",
      title2: "reimagined.",
      description:
        "Vexora is being built with one simple idea: entertainment should be easy, beautiful and accessible. The project continues to evolve with new features, platforms and improvements.",
      platforms: "Supported platforms",
      architectures: "Architecture builds",
      future: "Future possibilities",
    },

    footer: {
      slogan: "Your entertainment, one place.",

      product: "Product",
      platforms: "Platforms",
      support: "Support",

      features: "Features",
      download: "Download",
      about: "About",

      windows: "Windows",
      android: "Android",
      more: "More coming",

      activation: "Activation",
      requestCode: "Request Code",
      downloads: "Downloads",

      rights: "© 2026 Vexora. All rights reserved.",
      made: "Made with Mahmoud Ahmed",
      by: "by MhdP Studio",
    },

    visual: {
      welcome: "WELCOME TO",
      slogan: "Your entertainment, one place.",
      fast: "Fast & Lightweight",
      secure: "Secure Activation",
    },
  },
};

/*
=========================================================
HELPER
=========================================================
*/

const normalizeUrl = (value) => {
  if (!value || typeof value !== "string") {
    return null;
  }

  const markdownMatch = value.match(
    /^\[.*?\]\((https?:\/\/.*?)\)$/
  );

  if (markdownMatch) {
    return markdownMatch[1];
  }

  return value.trim();
};

/*
=================================================
APP
=================================================
*/

function App() {
  /*
  =================================================
  LANGUAGE
  =================================================
  */

  // Arabic is the default language.
  // If a language was previously saved, use it.
  const [language, setLanguage] = useState(() => {
    try {
      const savedLanguage =
        localStorage.getItem("vexora-language");

      if (
        savedLanguage === "ar" ||
        savedLanguage === "en"
      ) {
        return savedLanguage;
      }

      return "ar";
    } catch (error) {
      console.error(
        "Failed to load saved language:",
        error
      );

      return "ar";
    }
  });

  const [languageOpen, setLanguageOpen] =
    useState(false);

  const [platform, setPlatform] =
    useState("windows");

  const [build, setBuild] =
    useState("x64");

  const [isScrolled, setIsScrolled] =
    useState(false);

  const [updateData, setUpdateData] =
    useState(null);

  const [updateLoading, setUpdateLoading] =
    useState(true);

  const [updateError, setUpdateError] =
    useState(false);

  const t = translations[language];


  /*
  =================================================
  LANGUAGE / RTL
  =================================================
  */

  useEffect(() => {
    document.documentElement.lang =
      language;

    document.documentElement.dir =
      t.direction;

    document.body.dir =
      t.direction;

    return () => {
      document.documentElement.lang =
        "ar";

      document.documentElement.dir =
        "rtl";

      document.body.dir =
        "rtl";
    };
  }, [language, t.direction]);


  /*
  =================================================
  SAVE LANGUAGE
  =================================================
  */

  useEffect(() => {
    try {
      localStorage.setItem(
        "vexora-language",
        language
      );
    } catch (error) {
      console.error(
        "Failed to save language:",
        error
      );
    }
  }, [language]);


  /*
  =================================================
  CLOSE LANGUAGE MENU
  =================================================
  */

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        !event.target.closest(
          ".language-selector"
        )
      ) {
        setLanguageOpen(false);
      }
    };

    document.addEventListener(
      "click",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside
      );
    };
  }, []);


  /*
  =================================================
  SCROLL
  =================================================
  */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(
        window.scrollY > 0
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);


  /*
  =================================================
  LOAD UPDATE.JSON
  =================================================
  */

  useEffect(() => {
    let cancelled = false;

    const loadUpdateData =
      async () => {
        try {
          setUpdateLoading(true);
          setUpdateError(false);

          const response =
            await fetch(
              UPDATE_URL,
              {
                cache: "no-cache",
              }
            );

          if (!response.ok) {
            throw new Error(
              `Failed to load update.json (${response.status})`
            );
          }

          const data =
            await response.json();

          if (
            !data ||
            typeof data !==
            "object"
          ) {
            throw new Error(
              "Invalid update.json format."
            );
          }

          if (!cancelled) {
            setUpdateData(data);
          }
        } catch (error) {
          console.error(
            "Failed to load Vexora update data:",
            error
          );

          if (!cancelled) {
            setUpdateError(true);
            setUpdateData(null);
          }
        } finally {
          if (!cancelled) {
            setUpdateLoading(false);
          }
        }
      };

    loadUpdateData();

    return () => {
      cancelled = true;
    };
  }, []);


  /*
  =================================================
  CURRENT PLATFORM
  =================================================
  */

  const currentPlatform =
    platforms[platform];

  const currentBuild =
    currentPlatform.builds[build];


  /*
  =================================================
  REMOTE BUILD
  =================================================
  */

  const remoteBuild =
    updateData?.[
    currentBuild.key
    ] ?? null;


  /*
  =================================================
  CURRENT VERSION
  =================================================
  */

  const currentVersion =
    remoteBuild?.version ?? "—";


  /*
  =================================================
  CURRENT SIZE
  =================================================
  */

  const currentSize =
    remoteBuild?.size ?? "—";


  /*
  =================================================
  CURRENT DOWNLOAD URL
  =================================================
  */

  const currentDownloadUrl =
    normalizeUrl(
      remoteBuild?.url
    );


  /*
  =================================================
  AVAILABILITY
  =================================================
  */

  const isAvailable =
    Boolean(
      remoteBuild &&
      remoteBuild.version &&
      currentDownloadUrl
    );


  /*
  =================================================
  CHANGE PLATFORM
  =================================================
  */

  const changePlatform = (
    platformKey
  ) => {
    const selectedPlatform =
      platforms[platformKey];

    const firstBuild =
      Object.keys(
        selectedPlatform.builds
      )[0];

    setPlatform(platformKey);
    setBuild(firstBuild);
  };


  /*
  =================================================
  CHANGE LANGUAGE
  =================================================
  */

  const changeLanguage = (
    newLanguage
  ) => {
    if (
      newLanguage !== "ar" &&
      newLanguage !== "en"
    ) {
      return;
    }

    // Change language immediately.
    setLanguage(newLanguage);

    // Save language immediately.
    try {
      localStorage.setItem(
        "vexora-language",
        newLanguage
      );
    } catch (error) {
      console.error(
        "Failed to save language:",
        error
      );
    }

    // Close dropdown.
    setLanguageOpen(false);
  };


  /*
  =================================================
  RENDER
  =================================================
  */

  return (
    <div
      className={`app ${language === "ar"
          ? "app-rtl"
          : "app-ltr"
        }`}
      dir={t.direction}
    >

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="background">

        <div className="background-glow background-glow-one" />

        <div className="background-glow background-glow-two" />

      </div>


      {/* =================================================
          TOPBAR
      ================================================= */}

      <header
        className={`topbar ${isScrolled
            ? "topbar-scrolled"
            : ""
          }`}
      >

        <div className="topbar-inner">

          <a
            href="#home"
            className="brand"
          >

            <div className="brand-icon">

              <img
                src={Logo}
                alt="Vexora"
              />

            </div>

            <div className="brand-text">

              <span>
                Vexora
              </span>

              <small>
                {t.entertainment}
              </small>

            </div>

          </a>


          <nav className="navigation">

            <a href="#home">
              {t.nav.home}
            </a>

            <a href="#features">
              {t.nav.features}
            </a>

            <a href="#download">
              {t.nav.download}
            </a>

            <a href="#about">
              {t.nav.about}
            </a>

          </nav>


          <div className="topbar-actions">

            <a
              href="#download"
              className="nav-download"
            >

              <i className="fa-solid fa-download" />

              {t.nav.downloadButton}

            </a>


            <a
              href={ACTIVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-activation"
            >

              <i className="fa-solid fa-key" />

              {t.nav.activation}

            </a>


            {/* LANGUAGE */}

            <div
              className={`language-selector ${languageOpen
                  ? "language-open"
                  : ""
                }`}
            >

              <button
                type="button"
                className="language-button"
                onClick={(event) => {
                  event.stopPropagation();

                  setLanguageOpen(
                    (previous) =>
                      !previous
                  );
                }}
              >

                <i className="fa-solid fa-language" />

                <span>
                  {language === "ar"
                    ? "العربية"
                    : "English"}
                </span>

                <i
                  className={`fa-solid ${languageOpen
                      ? "fa-chevron-up"
                      : "fa-chevron-down"
                    }`}
                />

              </button>


              {languageOpen && (

                <div className="language-menu">

                  <button
                    type="button"
                    className={
                      language === "ar"
                        ? "language-option active"
                        : "language-option"
                    }
                    onClick={() =>
                      changeLanguage(
                        "ar"
                      )
                    }
                  >

                    <span className="language-option-icon">
                      🇪🇬
                    </span>

                    <span className="language-option-text">

                      <strong>
                        العربية
                      </strong>

                      <small>
                        Arabic
                      </small>

                    </span>

                    {language === "ar" && (

                      <i className="fa-solid fa-check" />

                    )}

                  </button>


                  <button
                    type="button"
                    className={
                      language === "en"
                        ? "language-option active"
                        : "language-option"
                    }
                    onClick={() =>
                      changeLanguage(
                        "en"
                      )
                    }
                  >

                    <span className="language-option-icon">
                      🇺🇸
                    </span>

                    <span className="language-option-text">

                      <strong>
                        English
                      </strong>

                      <small>
                        English
                      </small>

                    </span>

                    {language === "en" && (

                      <i className="fa-solid fa-check" />

                    )}

                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      </header>


      {/* =================================================
          MAIN
      ================================================= */}

      <main>


        {/* =================================================
            HERO
        ================================================= */}

        <section
          className="hero"
          id="home"
        >

          <div className="hero-content">

            <div className="status-badge">

              <span className="status-dot" />

              {t.hero.available}

            </div>


            <h1>

              {t.hero.title1}

              <br />

              <span>
                {t.hero.title2}
              </span>

            </h1>


            <p className="hero-description">
              {t.hero.description}
            </p>


            <div className="hero-actions">

              <a
                href="#download"
                className="primary-button"
              >

                {t.hero.download}

                <i className="fa-solid fa-arrow-down" />

              </a>


              <a
                href={ACTIVATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="activation-button"
              >

                {t.hero.activation}

                <i className="fa-brands fa-whatsapp" />

              </a>

            </div>


            <div className="hero-meta">

              <div>

                <i className="fa-brands fa-windows" />

                <strong>
                  {t.hero.windows}
                </strong>

                <span>
                  {t.hero.windowsArch}
                </span>

              </div>


              <div className="meta-divider" />


              <div>

                <i className="fa-brands fa-android" />

                <strong>
                  {t.hero.android}
                </strong>

                <span>
                  {t.hero.androidArch}
                </span>

              </div>


              <div className="meta-divider" />


              <div>

                <i className="fa-solid fa-key" />

                <strong>
                  {t.hero.activationTitle}
                </strong>

                <span>
                  {t.hero.activationAvailable}
                </span>

              </div>

            </div>

          </div>


          {/* HERO VISUAL */}

          <div className="hero-visual">

            <div className="visual-glow" />


            <div className="vexora-card">

              <div className="card-top">

                <div className="window-dots">

                  <span />
                  <span />
                  <span />

                </div>

                <div className="mini-logo">
                  <img src={Logo} alt="Vexora" />
                </div>

              </div>


              <div className="card-content">

                <div className="fake-sidebar">

                  <div className="sidebar-active">
                    <i className="fa-solid fa-house" />
                  </div>

                  <div>
                    <i className="fa-solid fa-film" />
                  </div>

                  <div>
                    <i className="fa-solid fa-tv" />
                  </div>

                  <div>
                    <i className="fa-solid fa-bookmark" />
                  </div>

                  <div>
                    <i className="fa-solid fa-gear" />
                  </div>

                </div>


                <div className="fake-content">

                  <div className="fake-heading">

                    <span />
                    <span />

                  </div>


                  <div className="fake-hero">

                    <div className="fake-hero-text">

                      <small>
                        {t.visual.welcome}
                      </small>

                      <strong>
                        VEXORA
                      </strong>

                      <span>
                        {t.visual.slogan}
                      </span>

                    </div>

                  </div>


                  <div className="fake-row">

                    <div />
                    <div />
                    <div />

                  </div>

                </div>

              </div>

            </div>


            <div className="floating-badge badge-one">

              <span>
                <i className="fa-solid fa-bolt" />
              </span>

              {t.visual.fast}

            </div>


            <div className="floating-badge badge-two">

              <span>
                <i className="fa-solid fa-shield-halved" />
              </span>

              {t.visual.secure}

            </div>

          </div>

        </section>


        {/* =================================================
            FEATURES
        ================================================= */}

        <section
          className="features-section"
          id="features"
        >

          <div className="section-heading">

            <span className="section-label">
              {t.features.label}
            </span>

            <h2>

              {t.features.title1}

              <span>
                {t.features.title2}
              </span>

            </h2>

            <p>
              {t.features.description}
            </p>

          </div>


          <div className="features-grid">

            {features.map(
              (feature) => {

                const arabicFeatures = {
                  "Fast & Lightweight": {
                    title:
                      "سريع وخفيف",
                    description:
                      "تم تصميم Vexora لتوفير تجربة سلسة وسريعة دون استهلاك غير ضروري للموارد في الخلفية.",
                  },

                  "Server-Powered Content": {
                    title:
                      "محتوى يعمل عبر الخوادم",
                    description:
                      "يتم تقديم المحتوى من خلال خوادم Vexora، مما يساعد على إبقاء التطبيق خفيفًا وفعالًا.",
                  },

                  "Secure Activation": {
                    title:
                      "تفعيل آمن",
                    description:
                      "تستخدم Vexora نظام تفعيل لإدارة الوصول المرخص وحماية مميزات التطبيق.",
                  },

                  "Activation Codes": {
                    title:
                      "أكواد التفعيل",
                    description:
                      "اطلب كود تفعيل وأدخله مباشرة داخل Vexora لتفعيل الترخيص الخاص بك.",
                  },

                  "Multi-Platform": {
                    title:
                      "متعدد المنصات",
                    description:
                      "استخدم Vexora على الأجهزة المدعومة، مع التخطيط لإضافة منصات ومعماريات أخرى.",
                  },

                  "Regular Updates": {
                    title:
                      "تحديثات مستمرة",
                    description:
                      "تستمر Vexora في التطور من خلال إصدارات وتحسينات ومميزات جديدة.",
                  },
                };

                const featureText =
                  language === "ar"
                    ? arabicFeatures[
                    feature.title
                    ]
                    : {
                      title:
                        feature.title,
                      description:
                        feature.description,
                    };

                return (

                  <article
                    className="feature-card"
                    key={feature.title}
                  >

                    <div className="feature-icon">

                      <i
                        className={
                          feature.icon
                        }
                      />

                    </div>


                    <h3>
                      {featureText.title}
                    </h3>


                    <p>
                      {featureText.description}
                    </p>

                  </article>

                );
              }
            )}

          </div>

        </section>


        {/* =================================================
            ACTIVATION
        ================================================= */}

        <section
          className="activation-section"
          id="activation"
        >

          <div className="activation-card">

            <div className="activation-icon">
              <i className="fa-solid fa-key" />
            </div>


            <div className="activation-content">

              <span className="section-label">
                {t.activation.label}
              </span>


              <h2>

                {t.activation.title1}

                <span>
                  {t.activation.title2}
                </span>

              </h2>


              <p>
                {t.activation.description}
              </p>


              <div className="activation-points">

                <div>

                  <i className="fa-solid fa-circle-check" />

                  {t.activation.point1}

                </div>


                <div>

                  <i className="fa-solid fa-circle-check" />

                  {t.activation.point2}

                </div>


                <div>

                  <i className="fa-solid fa-circle-check" />

                  {t.activation.point3}

                </div>

              </div>


              <a
                href={ACTIVATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="activation-link"
              >

                <i className="fa-brands fa-whatsapp" />

                {t.activation.button}

                <i className="fa-solid fa-arrow-up-right-from-square" />

              </a>

            </div>


            <div className="license-preview">

              <div className="license-header">

                <span>
                  {t.activation.license}
                </span>

                <i className="fa-solid fa-shield-halved" />

              </div>


              <div className="license-status">

                <div className="license-check">

                  <i className="fa-solid fa-check" />

                </div>


                <div>

                  <strong>
                    {t.activation.verified}
                  </strong>

                  <span>
                    {t.activation.ready}
                  </span>

                </div>

              </div>


              <div className="license-line" />

              <div className="license-line short" />

            </div>

          </div>

        </section>


        {/* =================================================
            DOWNLOAD
        ================================================= */}

        <section
          className="download-section"
          id="download"
        >

          <div className="download-heading">

            <span className="section-label">
              {t.download.label}
            </span>


            <h2>

              {t.download.title1}

              <span>
                {t.download.title2}
              </span>

            </h2>


            <p>
              {t.download.description}
            </p>

          </div>


          {/* PLATFORM SELECTOR */}

          <div className="platform-selector">

            {Object.entries(
              platforms
            ).map(
              ([key, item]) => (

                <button
                  key={key}
                  className={
                    platform === key
                      ? "platform active"
                      : "platform"
                  }
                  onClick={() =>
                    changePlatform(
                      key
                    )
                  }
                >

                  <span className="platform-icon">

                    <i
                      className={
                        item.icon
                      }
                    />

                  </span>


                  <span className="platform-name">

                    <strong>
                      {item.name}
                    </strong>

                    <small>

                      {key === "windows"
                        ? t.download.desktop
                        : t.download.mobile}

                    </small>

                  </span>


                  {platform === key && (

                    <span className="selected-check">

                      <i className="fa-solid fa-check" />

                    </span>

                  )}

                </button>

              )
            )}

          </div>


          {/* BUILD SELECTOR */}

          <div className="build-selector">

            <div className="build-selector-header">

              <div>

                <span className="section-label">
                  {t.download.architecture}
                </span>

                <h3>
                  {t.download.chooseArchitecture}
                </h3>

              </div>


              <span className="build-count">

                {
                  Object.keys(
                    currentPlatform.builds
                  ).length
                }

                {" "}

                {t.download.builds}

              </span>

            </div>


            <div className="build-grid">

              {Object.entries(
                currentPlatform.builds
              ).map(
                ([key, item]) => {

                  const itemRemote =
                    updateData?.[
                    item.key
                    ] ?? null;

                  const itemUrl =
                    normalizeUrl(
                      itemRemote?.url
                    );

                  const itemAvailable =
                    Boolean(
                      itemRemote &&
                      itemRemote.version &&
                      itemUrl
                    );

                  return (

                    <button
                      key={key}
                      disabled={
                        !itemAvailable
                      }
                      className={
                        build === key &&
                          itemAvailable
                          ? "build-card active"
                          : itemAvailable
                            ? "build-card"
                            : "build-card disabled"
                      }
                      onClick={() => {

                        if (
                          itemAvailable
                        ) {
                          setBuild(key);
                        }

                      }}
                    >

                      <div className="build-icon">

                        <i
                          className={
                            item.architecture ===
                              "x64"
                              ? "fa-solid fa-microchip"
                              : item.architecture ===
                                "x86"
                                ? "fa-solid fa-microchip"
                                : "fa-solid fa-mobile-screen"
                          }
                        />

                      </div>


                      <div className="build-info">

                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          {item.architecture}
                        </span>

                      </div>


                      <div className="build-status">

                        {updateLoading ? (

                          <>

                            <i className="fa-solid fa-spinner fa-spin" />

                            {t.download.loading}

                          </>

                        ) : itemAvailable ? (

                          <>

                            <i className="fa-solid fa-circle-check" />

                            {t.download.available}

                          </>

                        ) : (

                          <>

                            <i className="fa-solid fa-clock" />

                            {t.download.comingSoon}

                          </>

                        )}

                      </div>


                      {build === key &&
                        itemAvailable && (

                          <div className="build-selected">

                            <i className="fa-solid fa-check" />

                          </div>

                        )}

                    </button>

                  );
                }
              )}

            </div>

          </div>


          {/* DOWNLOAD CARD */}

          <div className="download-card">

            <div className="download-card-icon">

              <i
                className={
                  currentPlatform.icon
                }
              />

            </div>


            <div className="download-info">

              <div className="download-title">

                <h3>
                  {currentBuild.name}
                </h3>


                <span className="version-badge">

                  {updateLoading
                    ? t.download.loading
                    : `v${currentVersion}`}

                </span>

              </div>


              <p>

                {language === "ar"
                  ? currentBuild.key ===
                    "win-x64"
                    ? "موصى به لأجهزة Windows الحديثة التي تعمل بمعمارية 64-bit."
                    : currentBuild.key ===
                      "win-x86"
                      ? "للأجهزة القديمة التي تعمل بنظام Windows بمعمارية 32-bit."
                      : "موصى به لأجهزة Android الحديثة."
                  : currentBuild.description}

              </p>


              <div className="download-details">

                <span>

                  <strong>
                    {t.download.version}
                  </strong>

                  {updateLoading
                    ? t.download.loading
                    : currentVersion}

                </span>


                <span>

                  <strong>
                    {t.download.architectureLabel}
                  </strong>

                  {currentBuild.architecture}

                </span>


                <span>

                  <strong>
                    {t.download.size}
                  </strong>

                  {updateLoading
                    ? t.download.loading
                    : currentSize}

                </span>


                <span>

                  <strong>
                    {t.download.license}
                  </strong>

                  {t.download.activationCode}

                </span>

              </div>

            </div>


            {isAvailable ? (

              <a
                href={currentDownloadUrl}
                className="download-button"
                target="_blank"
                rel="noopener noreferrer"
              >

                {t.download.download}

                <i className="fa-solid fa-download" />

              </a>

            ) : (

              <button
                className="download-button disabled"
                disabled
              >

                {updateLoading
                  ? t.download.loading
                  : updateError
                    ? t.download.unavailable
                    : t.download.comingSoon}

                <i
                  className={
                    updateLoading
                      ? "fa-solid fa-spinner fa-spin"
                      : "fa-solid fa-clock"
                  }
                />

              </button>

            )}

          </div>


          <p className="download-note">

            <i className="fa-solid fa-circle-info" />

            {t.download.note}

          </p>

        </section>


        {/* =================================================
            ABOUT
        ================================================= */}

        <section
          className="about-section"
          id="about"
        >

          <div className="about-content">

            <span className="section-label">
              {t.about.label}
            </span>


            <h2>

              {t.about.title1}

              <span>
                {t.about.title2}
              </span>

            </h2>


            <p>
              {t.about.description}
            </p>


            <div className="about-stats">

              <div>

                <strong>
                  2+
                </strong>

                <span>
                  {t.about.platforms}
                </span>

              </div>


              <div>

                <strong>
                  3
                </strong>

                <span>
                  {t.about.architectures}
                </span>

              </div>


              <div>

                <strong>
                  ∞
                </strong>

                <span>
                  {t.about.future}
                </span>

              </div>

            </div>

          </div>


          <div className="about-mark">

            <div className="large-v">
              V
            </div>

            <div className="mark-glow" />

            <div className="orbit orbit-one" />

            <div className="orbit orbit-two" />

          </div>

        </section>

      </main>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="footer">

        <div className="footer-main">

          <div className="footer-brand">

            <a
              href="#home"
              className="brand"
            >

              <div className="brand-icon">

                <img
                  src={Logo}
                  alt="Vexora"
                />

              </div>


              <div className="brand-text">

                <span>
                  Vexora
                </span>

                <small>
                  {t.entertainment}
                </small>

              </div>

            </a>


            <p>
              {t.footer.slogan}
            </p>

          </div>


          <div className="footer-links">

            <div>

              <h4>
                {t.footer.product}
              </h4>

              <a href="#features">
                {t.footer.features}
              </a>

              <a href="#download">
                {t.footer.download}
              </a>

              <a href="#about">
                {t.footer.about}
              </a>

            </div>


            <div>

              <h4>
                {t.footer.platforms}
              </h4>

              <a href="#download">
                {t.footer.windows}
              </a>

              <a href="#download">
                {t.footer.android}
              </a>

              <a href="#download">
                {t.footer.more}
              </a>

            </div>


            <div>

              <h4>
                {t.footer.support}
              </h4>

              <a href="#activation">
                {t.footer.activation}
              </a>

              <a
                href={ACTIVATION_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.footer.requestCode}
              </a>

              <a href="#download">
                {t.footer.downloads}
              </a>

            </div>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            {t.footer.rights}
          </span>


          <span>

            {t.footer.made}

            <i className="fa-solid fa-heart" />

            {" "}

            {t.footer.by}

          </span>

        </div>

      </footer>

    </div>
  );
}

export default App;


