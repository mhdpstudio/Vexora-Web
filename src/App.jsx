import React, { useEffect, useState } from "react";

import "./style/App.css";

import Logo from "./assets/images/icon.png";

/*
=========================================================
ACTIVATION
=========================================================
*/

const ACTIVATION_URL = "https://wa.link/di4jtk";

// Replace this with the direct .mp4/.webm URL you upload to Cloudflare R2.
// The Google Drive URL is kept as a preview fallback for now.
const VIDEO_URL =
  "https://drive.google.com/file/d/12jzV65rS4QFy4lC2VzY63xG4R467GLs_/view?usp=drivesdk";

const CATALOG_IMAGE = "/gallery/all-cartoons.png";

/*
=========================================================
UPDATE DATA
=========================================================
*/

const UPDATE_URL =
  "https://raw.githubusercontent.com/mhdpstudio/Vexora-data/main/update.json";

/*
=========================================================
GALLERY
=========================================================
*/

const galleryImages = [
  {
    id: 1,
    src: "/gallery/image-1.png",
    title: "Vexora Home",
    description: "The Vexora main interface.",
  },
  {
    id: 2,
    src: "/gallery/image-2.png",
    title: "Movies Section",
    description: "Browse your favorite movies.",
  },
  {
    id: 3,
    src: "/gallery/image-3.png",
    title: "Movies Page",
    description: "Discover and watch your movies.",
  },
  {
    id: 4,
    src: "/gallery/image-4.png",
    title: "Bookmarks",
    description: "Save your favorite content for easy access.",
  },
  {
    id: 5,
    src: "/gallery/image-5.png",
    title: "Movie Page",
    description: "Detailed information about a selected movie and watching it.",
  },
];

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
  { icon: "fa-solid fa-ban", title: "No Ads", description: "استمتع بالمحتوى بدون إعلانات مزعجة أو نوافذ تقطع عليك المشاهدة." },
  { icon: "fa-solid fa-download", title: "Download Content", description: "إمكانية تحميل المحتوى المدعوم للمشاهدة بسهولة عندما يناسبك." },
  { icon: "fa-solid fa-gauge-high", title: "Low Data Usage", description: "تجربة مصممة لتكون خفيفة في استهلاك الإنترنت قدر الإمكان." },
  { icon: "fa-solid fa-clapperboard", title: "100+ Titles", description: "مكتبة تضم أكثر من 100 كرتون وفيلم ومسلسل، مع إضافة محتوى جديد باستمرار." },
  { icon: "fa-solid fa-plus", title: "Request Any Cartoon", description: "اطلب الكرتون أو المحتوى الذي تحبه، ويتم النظر في إضافته للمكتبة." },
  { icon: "fa-solid fa-rotate", title: "Daily Additions", description: "المكتبة تستمر في النمو مع إضافة أفلام ومسلسلات وحلقات جديدة باستمرار." },
  { icon: "fa-solid fa-bookmark", title: "Bookmarks", description: "احفظ المحتوى الذي يعجبك لتعود إليه بسرعة في أي وقت." },
  { icon: "fa-solid fa-clock-rotate-left", title: "Continue Watching", description: "تابع ما بدأت مشاهدته بسهولة بدل البحث عنه من جديد." },
  { icon: "fa-solid fa-magnifying-glass", title: "Fast Search", description: "ابحث عن أفلامك وكرتوناتك ومسلسلاتك المفضلة بسرعة." },
  { icon: "fa-solid fa-layer-group", title: "Organized Library", description: "تصنيفات وأقسام تساعدك على الوصول للمحتوى بشكل مرتب وواضح." },
  { icon: "fa-solid fa-mobile-screen-button", title: "Windows & Android", description: "دعم Windows وAndroid مع استمرار تطوير المنصات والمعماريات." },
  { icon: "fa-solid fa-arrows-rotate", title: "Continuous Updates", description: "تحديثات وتحسينات مستمرة للمكتبة والتطبيق وتجربة الاستخدام." },
  { icon: "fa-solid fa-bolt", title: "Fast & Lightweight", description: "واجهة سريعة وخفيفة بدون تعقيد أو تحميل زائد على الجهاز." },
  { icon: "fa-solid fa-shield-halved", title: "License Activation", description: "نظام تفعيل وإدارة ترخيص للوصول إلى المميزات المدعومة." },
  { icon: "fa-solid fa-heart", title: "Made for You", description: "التطبيق يتطور بناءً على احتياجات المستخدمين واقتراحاتهم للمحتوى." },
  { icon: "fa-solid fa-headset", title: "WhatsApp Activation", description: "إتمام الدفع والتفعيل من خلال WhatsApp بخطوات واضحة وبسيطة." },
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
      gallery: "المعرض",
      guide: "طريقة الاشتراك",
      pricing: "الاشتراك",
      download: "التحميل",
      about: "عن Vexora",
      downloadButton: "تحميل",
      activation: "التفعيل",
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
      title1: "مصممة من أجل ",
      title2: "ترفيهك.",
      description:
        "من غير إعلانات، مع تحميل، استهلاك إنترنت منخفض، مكتبة تكبر باستمرار، وإمكانية طلب المحتوى اللي نفسك تشوفه."
    },

    gallery: {
      label: "معرض VEXORA",
      title1: "شاهد ",
      title2: "Vexora.",
      description:
        "استكشف واجهة Vexora وتجربة الاستخدام من خلال مجموعة من الصور.",
      previous: "السابق",
      next: "التالي",
      open: "فتح الصورة",
      close: "إغلاق",
      zoomIn: "تكبير",
      zoomOut: "تصغير",
      image: "صورة",
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
      button: "طلب كود التفعيل خصم 50% لأول 100 مشترك",
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

    video: {
      label: "شوف VEXORA",
      title1: "شوف التطبيق",
      title2: "قبل ما تشترك.",
      description: "اتفرج على جولة سريعة داخل Vexora وشوف شكل التطبيق وطريقة الاستخدام.",
      play: "تشغيل",
      pause: "إيقاف",
      mute: "كتم",
      unmute: "تشغيل الصوت",
      fullscreen: "ملء الشاشة",
    },

    journey: {
      label: "بكل بساطة",
      title1: "3 خطوات",
      title2: "وتبدأ تتفرج.",
      description: "كل اللي عليك تعمله: حمّل التطبيق، أتمم الدفع عبر WhatsApp، وبعدها فعّل التطبيق بالكود.",
      step1: "تحميل التطبيق",
      step1Desc: "اختار جهازك من قسم التحميل ونزّل أحدث إصدار مناسب ليك.",
      step2: "إتمام الدفع عبر WhatsApp",
      step2Desc: "تواصل معنا عبر WhatsApp لإتمام الدفع والحصول على بيانات التفعيل.",
      step3: "تفعيل التطبيق",
      step3Desc: "افتح Vexora، أدخل كود التفعيل، وابدأ استخدام التطبيق.",
      openWhatsApp: "إتمام الدفع عبر WhatsApp",
    },

    pricing: {
      label: "اشتراك VEXORA",
      title1: "ادفع مرة واحدة.",
      title2: "واستمتع مدى الحياة.",
      description: "لا اشتراك شهري ولا سنوي. ترخيص مدى الحياة بدون إعلانات، مع استمرار تطوير التطبيق والمحتوى.",
      current: "250 جنيه",
      original: "500 جنيه",
      lifetime: "مدى الحياة",
      discount: "خصم 50%",
      noMonthly: "بدون اشتراك شهري",
      noYearly: "بدون اشتراك سنوي",
      noAds: "بدون إعلانات",
      button: "اشترك وفعّل Vexora",
      specialTitle: "مميزات خاصة لأول 100 مشترك",
      special1: "أولوية في طلبات إضافة الكرتونات والمحتوى.",
      special2: "مميزات وتجارب حصرية يتم إطلاقها تدريجيًا.",
      special3: "أولوية في الدعم والاقتراحات الخاصة بالمحتوى.",
    },

    catalog: {
      label: "مكتبة VEXORA",
      title1: "أكثر من 100",
      title2: "عنوان ومحتوى جديد باستمرار.",
      description: "استكشف صورة تجمع محتوى المكتبة. يتم إضافة أفلام ومسلسلات وكرتونات جديدة باستمرار، ويمكنك اقتراح المحتوى الذي تحبه.",
      badge: "100+ محتوى",
      note: "الصورة المعروضة تمثل مكتبة المحتوى داخل Vexora.",
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
      gallery: "المعرض",
      guide: "طريقة الاشتراك",
      pricing: "الاشتراك",
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
      gallery: "Gallery",
      guide: "How it works",
      pricing: "Pricing",
      download: "Download",
      about: "About",
      downloadButton: "Download",
      activation: "Activation",
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
        "No ads, download support, low data usage, a growing library and the ability to request content you want to watch."
    },

    gallery: {
      label: "VEXORA GALLERY",
      title1: "Explore ",
      title2: "Vexora.",
      description:
        "Explore the Vexora interface and experience through a collection of screenshots.",
      previous: "Previous",
      next: "Next",
      open: "Open image",
      close: "Close",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      image: "Image",
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
      button: "Request Activation Code 50% off for the first 100 subscribers",
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

    video: {
      label: "SEE VEXORA",
      title1: "See the app",
      title2: "before you subscribe.",
      description: "Take a quick tour inside Vexora and see the interface and experience before activation.",
      play: "Play",
      pause: "Pause",
      mute: "Mute",
      unmute: "Unmute",
      fullscreen: "Fullscreen",
    },

    journey: {
      label: "HOW IT WORKS",
      title1: "3 simple steps",
      title2: "and you're watching.",
      description: "Download the app, complete payment through WhatsApp, then activate Vexora with your code.",
      step1: "Download the app",
      step1Desc: "Choose your device from the download section and get the latest supported build.",
      step2: "Complete payment via WhatsApp",
      step2Desc: "Contact us through WhatsApp to complete payment and receive your activation details.",
      step3: "Activate the app",
      step3Desc: "Open Vexora, enter your activation code, and start using the application.",
      openWhatsApp: "Complete payment via WhatsApp",
    },

    pricing: {
      label: "VEXORA ACCESS",
      title1: "Pay once.",
      title2: "Enjoy it for life.",
      description: "No monthly or yearly subscription. Lifetime access without ads, while the app and content continue to evolve.",
      current: "250 EGP",
      original: "500 EGP",
      lifetime: "Lifetime",
      discount: "50% OFF",
      noMonthly: "No monthly fee",
      noYearly: "No yearly fee",
      noAds: "No ads",
      button: "Subscribe & Activate Vexora",
      specialTitle: "Special features for the first 100 subscribers",
      special1: "Priority for cartoon and content requests.",
      special2: "Exclusive features and experiences released over time.",
      special3: "Priority support and content suggestions.",
    },

    catalog: {
      label: "VEXORA LIBRARY",
      title1: "100+ titles",
      title2: "with new content added continuously.",
      description: "Explore a visual preview of the library. New movies, series and cartoons are added continuously, and you can request content you want.",
      badge: "100+ CONTENT",
      note: "The image represents the content library inside Vexora.",
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
      gallery: "Gallery",
      guide: "How it works",
      pricing: "Pricing",
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

  return value.trim();
};

/*
=========================================================
APP
=========================================================
*/

function App() {
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
    } catch {
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

  /*
  =================================================
  GALLERY STATE
  =================================================
  */

  const [selectedImage, setSelectedImage] =
    useState(0);

  const [lightboxOpen, setLightboxOpen] =
    useState(false);

  const [zoom, setZoom] =
    useState(1);

  const [isVideoPlaying, setIsVideoPlaying] =
    useState(false);
  const [videoProgress, setVideoProgress] =
    useState(0);
  const [videoDuration, setVideoDuration] =
    useState(0);
  const [videoMuted, setVideoMuted] =
    useState(false);

  const videoRef = React.useRef(null);

  const t = translations[language];

  /*
  =================================================
  LANGUAGE
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

  useEffect(() => {
    try {
      localStorage.setItem(
        "vexora-language",
        language
      );
    } catch {
      //
    }
  }, [language]);

  /*
  =================================================
  CLOSE LANGUAGE MENU
  =================================================
  */

  useEffect(() => {
    const handleClickOutside = (event) => {
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
      setIsScrolled(window.scrollY > 0);
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
AUTO SCROLL TO DOWNLOAD
=================================================
*/

  useEffect(() => {
    const timer = setTimeout(() => {
      const downloadSection =
        document.getElementById("download");

      if (downloadSection) {
        downloadSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  /*
  =================================================
  UPDATE.JSON
  =================================================
  */

  useEffect(() => {
    let cancelled = false;

    const loadUpdateData = async () => {
      try {
        setUpdateLoading(true);
        setUpdateError(false);

        const response = await fetch(
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
          typeof data !== "object"
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
  PLATFORM
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

  const currentVersion =
    remoteBuild?.version ?? "—";

  const currentSize =
    remoteBuild?.size ?? "—";

  const currentDownloadUrl =
    normalizeUrl(
      remoteBuild?.url
    );

  const isAvailable =
    Boolean(
      remoteBuild &&
      remoteBuild.version &&
      currentDownloadUrl
    );

  /*
  =================================================
  PLATFORM CHANGE
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
  LANGUAGE CHANGE
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

    setLanguage(newLanguage);

    try {
      localStorage.setItem(
        "vexora-language",
        newLanguage
      );
    } catch {
      //
    }

    setLanguageOpen(false);
  };

  /*
  =================================================
  GALLERY FUNCTIONS
  =================================================
  */

  const openLightbox = (index) => {
    setSelectedImage(index);
    setZoom(1);
    setLightboxOpen(true);
    document.body.classList.add(
      "gallery-lightbox-open"
    );
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoom(1);
    document.body.classList.remove(
      "gallery-lightbox-open"
    );
  };

  const nextImage = () => {
    setSelectedImage(
      (previous) =>
        (previous + 1) %
        galleryImages.length
    );

    setZoom(1);
  };

  const previousImage = () => {
    setSelectedImage(
      (previous) =>
        (previous - 1 +
          galleryImages.length) %
        galleryImages.length
    );

    setZoom(1);
  };

  const zoomIn = () => {
    setZoom(
      (previous) =>
        Math.min(
          previous + 0.25,
          3
        )
    );
  };

  const zoomOut = () => {
    setZoom(
      (previous) =>
        Math.max(
          previous - 0.25,
          1
        )
    );
  };

  /*
  =================================================
  KEYBOARD GALLERY CONTROLS
  =================================================
  */

  useEffect(() => {
    if (!lightboxOpen) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (
        event.key === "ArrowRight"
      ) {
        if (language === "ar") {
          previousImage();
        } else {
          nextImage();
        }
      }

      if (
        event.key === "ArrowLeft"
      ) {
        if (language === "ar") {
          nextImage();
        } else {
          previousImage();
        }
      }

      if (event.key === "+") {
        zoomIn();
      }

      if (event.key === "-") {
        zoomOut();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    lightboxOpen,
    language,
  ]);

  /*
  =================================================
  CLEANUP LIGHTBOX
  =================================================
  */

  useEffect(() => {
    return () => {
      document.body.classList.remove(
        "gallery-lightbox-open"
      );
    };
  }, []);

  /*
  =================================================
  VIDEO CONTROLS
  =================================================
  */

  const toggleVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play();
      setIsVideoPlaying(true);
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  const handleVideoTime = () => {
    const video = videoRef.current;
    if (!video) return;
    setVideoProgress(video.currentTime);
    setVideoDuration(video.duration || 0);
  };

  const seekVideo = (value) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Number(value);
    setVideoProgress(Number(value));
  };

  const toggleVideoMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setVideoMuted(video.muted);
  };

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const isDriveVideo = VIDEO_URL.includes("drive.google.com");
  const driveEmbedUrl = isDriveVideo
    ? VIDEO_URL.replace(/\/view.*$/, "/preview")
    : VIDEO_URL;

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
      {/* BACKGROUND */}

      <div className="background">
        <div className="background-glow background-glow-one" />
        <div className="background-glow background-glow-two" />
      </div>

      {/* TOPBAR */}

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
              <span>Vexora</span>

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

            <a href="#gallery">
              {t.nav.gallery}
            </a>

            <a href="#how-it-works">
              {t.nav.guide}
            </a>

            <a href="#pricing">
              {t.nav.pricing}
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

            {/* <a
              href={ACTIVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-activation"
            >
              <i className="fa-solid fa-key" />

              {t.nav.activation}
            </a> */}

            <div
              className={`language-selector ${languageOpen ? "language-open" : ""
                }`}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <button
                type="button"
                className="language-button"
                onClick={() => {
                  setLanguageOpen((previous) => !previous);
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

                  {/* ARABIC */}
                  <button
                    type="button"
                    className={`language-option ${language === "ar"
                      ? "active"
                      : ""
                      }`}
                    onClick={() => {
                      changeLanguage("ar");
                    }}
                  >
                    <span className="language-option-icon">
                      🇪🇬
                    </span>

                    <span className="language-option-text">
                      <strong>العربية</strong>
                      <small>Arabic</small>
                    </span>

                    {language === "ar" && (
                      <i className="fa-solid fa-check" />
                    )}
                  </button>

                  {/* ENGLISH */}
                  <button
                    type="button"
                    className={`language-option ${language === "en"
                      ? "active"
                      : ""
                      }`}
                    onClick={() => {
                      changeLanguage("en");
                    }}
                  >
                    <span className="language-option-icon">
                      🇺🇸
                    </span>

                    <span className="language-option-text">
                      <strong>English</strong>
                      <small>English</small>
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

      <main>

        {/* HERO */}

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

              {/* <a
                href={ACTIVATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="activation-button"
              >
                {t.hero.activation}

                <i className="fa-brands fa-whatsapp" />
              </a> */}

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
                  <img
                    src={Logo}
                    alt="Vexora"
                  />
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

        {/* VIDEO */}

        <section className="video-section" id="video">
          <div className="section-heading">
            <span className="section-label">{t.video.label}</span>
            <h2>
              {t.video.title1} <span>{t.video.title2}</span>
            </h2>
            <p>{t.video.description}</p>
          </div>

          <div className="video-shell">
            <div className="video-frame">
              {isDriveVideo ? (
                <iframe
                  src={driveEmbedUrl}
                  title="Vexora Preview"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              ) : (
                <video
                  ref={videoRef}
                  src={VIDEO_URL}
                  preload="metadata"
                  onTimeUpdate={handleVideoTime}
                  onLoadedMetadata={handleVideoTime}
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  onEnded={() => setIsVideoPlaying(false)}
                  playsInline
                />
              )}

              <div className="video-glow" />
              <div className="video-badge">
                <i className="fa-solid fa-play" />
                VEXORA PREVIEW
              </div>
            </div>

            {!isDriveVideo && (
              <div className="video-controls">
                <button type="button" className="video-control-main" onClick={toggleVideo}>
                  <i className={`fa-solid ${isVideoPlaying ? "fa-pause" : "fa-play"}`} />
                </button>

                <span className="video-time">{formatTime(videoProgress)}</span>

                <input
                  className="video-progress"
                  type="range"
                  min="0"
                  max={videoDuration || 0}
                  step="0.1"
                  value={videoProgress}
                  onChange={(event) => seekVideo(event.target.value)}
                  aria-label="Video progress"
                />

                <span className="video-time">{formatTime(videoDuration)}</span>

                <button type="button" className="video-control" onClick={toggleVideoMute}>
                  <i className={`fa-solid ${videoMuted ? "fa-volume-xmark" : "fa-volume-high"}`} />
                </button>

                <button
                  type="button"
                  className="video-control"
                  onClick={() => videoRef.current?.requestFullscreen?.()}
                >
                  <i className="fa-solid fa-expand" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* FEATURES */}

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
                  "No Ads": {
                    title: "بدون إعلانات",
                    description: "استمتع بالمحتوى بدون إعلانات مزعجة أو نوافذ تقطع عليك المشاهدة.",
                  },
                  "Download Content": {
                    title: "تحميل المحتوى",
                    description: "إمكانية تحميل المحتوى المدعوم للمشاهدة بسهولة عندما يناسبك.",
                  },
                  "Low Data Usage": {
                    title: "استهلاك إنترنت منخفض",
                    description: "تجربة مصممة لتكون خفيفة في استهلاك الإنترنت قدر الإمكان.",
                  },
                  "100+ Titles": {
                    title: "أكثر من 100 عنوان",
                    description: "مكتبة تضم أكثر من 100 كرتون وفيلم ومسلسل، مع إضافة محتوى جديد باستمرار.",
                  },
                  "Request Any Cartoon": {
                    title: "اطلب أي كرتون",
                    description: "اطلب الكرتون أو المحتوى الذي تحبه، ويتم النظر في إضافته للمكتبة.",
                  },
                  "Daily Additions": {
                    title: "إضافات مستمرة",
                    description: "المكتبة تستمر في النمو مع إضافة أفلام ومسلسلات وحلقات جديدة باستمرار.",
                  },
                  "Bookmarks": {
                    title: "المفضلة",
                    description: "احفظ المحتوى الذي يعجبك لتعود إليه بسرعة في أي وقت.",
                  },
                  "Continue Watching": {
                    title: "متابعة المشاهدة",
                    description: "تابع ما بدأت مشاهدته بسهولة بدل البحث عنه من جديد.",
                  },
                  "Fast Search": {
                    title: "بحث سريع",
                    description: "ابحث عن أفلامك وكرتوناتك ومسلسلاتك المفضلة بسرعة.",
                  },
                  "Organized Library": {
                    title: "مكتبة منظمة",
                    description: "تصنيفات وأقسام تساعدك على الوصول للمحتوى بشكل مرتب وواضح.",
                  },
                  "Windows & Android": {
                    title: "Windows و Android",
                    description: "دعم Windows وAndroid مع استمرار تطوير المنصات والمعماريات.",
                  },
                  "Continuous Updates": {
                    title: "تحديثات مستمرة",
                    description: "تحديثات وتحسينات مستمرة للمكتبة والتطبيق وتجربة الاستخدام.",
                  },
                  "Fast & Lightweight": {
                    title: "سريع وخفيف",
                    description: "تم تصميم Vexora لتوفير تجربة سلسة وسريعة دون استهلاك غير ضروري للموارد في الخلفية.",
                  },
                  "License Activation": {
                    title: "تفعيل الترخيص",
                    description: "نظام تفعيل وإدارة ترخيص للوصول إلى المميزات المدعومة.",
                  },
                  "Made for You": {
                    title: "مصمم لك",
                    description: "التطبيق يتطور بناءً على احتياجات المستخدمين واقتراحاتهم للمحتوى.",
                  },
                  "WhatsApp Activation": {
                    title: "التفعيل عبر WhatsApp",
                    description: "إتمام الدفع والتفعيل من خلال WhatsApp بخطوات واضحة وبسيطة.",
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
    GALLERY
================================================= */}

        <section
          className="gallery-section"
          id="gallery"
        >
          <div className="section-heading gallery-heading">

            <span className="section-label">
              {t.gallery.label}
            </span>

            <h2>
              {t.gallery.title1}

              <span>
                {t.gallery.title2}
              </span>
            </h2>

            <p>
              {t.gallery.description}
            </p>

          </div>

          <div className="gallery-wrapper">

            {/* =================================================
        MAIN IMAGE
    ================================================= */}

            <div className="gallery-main">

              {/* PREVIOUS */}
              <button
                type="button"
                className="gallery-nav gallery-nav-prev"
                onClick={previousImage}
                aria-label={t.gallery.previous}
              >
                <i className="fa-solid fa-chevron-left" />
              </button>

              {/* MAIN IMAGE */}
              <button
                type="button"
                className="gallery-image-button"
                onClick={() =>
                  openLightbox(selectedImage)
                }
                aria-label={t.gallery.open}
              >
                <img
                  src={
                    galleryImages[
                      selectedImage
                    ].src
                  }
                  alt={
                    galleryImages[
                      selectedImage
                    ].title
                  }
                />

                <div className="gallery-image-overlay">
                  <span>
                    <i className="fa-solid fa-expand" />
                    {t.gallery.open}
                  </span>
                </div>
              </button>

              {/* NEXT */}
              <button
                type="button"
                className="gallery-nav gallery-nav-next"
                onClick={nextImage}
                aria-label={t.gallery.next}
              >
                <i className="fa-solid fa-chevron-right" />
              </button>

            </div>

            {/* =================================================
        IMAGE INFO
    ================================================= */}

            <div className="gallery-info">

              <div className="gallery-counter">

                <span>
                  {String(
                    selectedImage + 1
                  ).padStart(2, "0")}
                </span>

                <div />

                <span>
                  {String(
                    galleryImages.length
                  ).padStart(2, "0")}
                </span>

              </div>

              <div className="gallery-text">

                <h3>
                  {
                    galleryImages[
                      selectedImage
                    ].title
                  }
                </h3>

                <p>
                  {
                    galleryImages[
                      selectedImage
                    ].description
                  }
                </p>

              </div>

            </div>

            {/* =================================================
        THUMBNAILS
    ================================================= */}

            <div className="gallery-thumbnails">

              {galleryImages.map(
                (image, index) => (

                  <button
                    type="button"
                    key={image.id}
                    className={`gallery-thumbnail ${selectedImage === index
                      ? "active"
                      : ""
                      }`}
                    onClick={() =>
                      setSelectedImage(index)
                    }
                    aria-label={`${t.gallery.image} ${index + 1
                      }`}
                  >

                    <img
                      src={image.src}
                      alt={image.title}
                    />

                    <span className="thumbnail-number">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    {selectedImage === index && (
                      <span className="thumbnail-active">
                        <i className="fa-solid fa-check" />
                      </span>
                    )}

                  </button>

                )
              )}

            </div>

          </div>
        </section>

        {/* CATALOG */}

        <section className="catalog-section" id="catalog">
          <div className="catalog-copy">
            <span className="section-label">{t.catalog.label}</span>
            <h2>
              {t.catalog.title1}
              <span> {t.catalog.title2}</span>
            </h2>
            <p>{t.catalog.description}</p>
            <div className="catalog-pill">
              <i className="fa-solid fa-film" />
              <strong>{t.catalog.badge}</strong>
            </div>
            <small>{t.catalog.note}</small>
          </div>

          <div className="catalog-art">
            <div className="catalog-glow" />
            <img
              src={CATALOG_IMAGE}
              alt={t.catalog.badge}
              onError={(event) => {
                event.currentTarget.style.display = "none";
                event.currentTarget.parentElement.classList.add("catalog-placeholder");
              }}
            />
            <div className="catalog-placeholder-content">
              <i className="fa-solid fa-film" />
              <strong>100+</strong>
              <span>Movies • Series • Cartoons</span>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}

        <section className="journey-section" id="how-it-works">
          <div className="section-heading">
            <span className="section-label">{t.journey.label}</span>
            <h2>
              {t.journey.title1} <span>{t.journey.title2}</span>
            </h2>
            <p>{t.journey.description}</p>
          </div>

          <div className="journey-timeline">
            <div className="timeline-line" />

            <article className="journey-step">
              <div className="step-number">01</div>
              <div className="step-node"><i className="fa-solid fa-download" /></div>
              <div className="step-card">
                <span>01</span>
                <h3>{t.journey.step1}</h3>
                <p>{t.journey.step1Desc}</p>
                <a href="#download"><i className="fa-solid fa-arrow-down" /> {t.nav.downloadButton}</a>
              </div>
            </article>

            <article className="journey-step reverse">
              <div className="step-number">02</div>
              <div className="step-node"><i className="fa-brands fa-whatsapp" /></div>
              <div className="step-card">
                <span>02</span>
                <h3>{t.journey.step2}</h3>
                <p>{t.journey.step2Desc}</p>
                <a href={ACTIVATION_URL} target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-whatsapp" /> {t.journey.openWhatsApp}
                </a>
              </div>
            </article>

            <article className="journey-step">
              <div className="step-number">03</div>
              <div className="step-node"><i className="fa-solid fa-key" /></div>
              <div className="step-card">
                <span>03</span>
                <h3>{t.journey.step3}</h3>
                <p>{t.journey.step3Desc}</p>
                <a href="#pricing"><i className="fa-solid fa-arrow-down" /> {t.nav.pricing}</a>
              </div>
            </article>
          </div>
        </section>

        {/* PRICING */}

        <section className="pricing-section" id="pricing">
          <div className="pricing-copy">
            <span className="section-label">{t.pricing.label}</span>
            <h2>
              {t.pricing.title1} <span>{t.pricing.title2}</span>
            </h2>
            <p>{t.pricing.description}</p>

            <div className="price-card">
              <div className="price-top">
                <span>{t.pricing.lifetime}</span>
                <strong>{t.pricing.discount}</strong>
              </div>
              <div className="price-main">
                <strong>{t.pricing.current}</strong>
                <del>{t.pricing.original}</del>
              </div>
              <div className="price-features">
                <div><i className="fa-solid fa-check" /> {t.pricing.noMonthly}</div>
                <div><i className="fa-solid fa-check" /> {t.pricing.noYearly}</div>
                <div><i className="fa-solid fa-check" /> {t.pricing.noAds}</div>
              </div>
              <a href={ACTIVATION_URL} target="_blank" rel="noopener noreferrer" className="price-button">
                <i className="fa-brands fa-whatsapp" />
                {t.pricing.button}
              </a>
            </div>
          </div>

          <div className="special-card">
            <div className="special-icon"><i className="fa-solid fa-gem" /></div>
            <span className="section-label">{t.pricing.label}</span>
            <h3>{t.pricing.specialTitle}</h3>
            <div className="special-list">
              <div><i className="fa-solid fa-star" /><span>{t.pricing.special1}</span></div>
              <div><i className="fa-solid fa-star" /><span>{t.pricing.special2}</span></div>
              <div><i className="fa-solid fa-star" /><span>{t.pricing.special3}</span></div>
            </div>
            <div className="special-glow" />
          </div>
        </section>

        {/* ACTIVATION */}

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
                {language === "ar" ? "التفعيل والدفع عبر WhatsApp" : "Payment & Activation via WhatsApp"}
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

        {/* DOWNLOAD */}

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
                }{" "}
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
                              "x64" ||
                              item.architecture ===
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

        {/* ABOUT */}

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

      {/* FOOTER */}

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

              <a href="#gallery">
                {t.footer.gallery}
              </a>

              <a href="#how-it-works">
                {t.nav.guide}
              </a>

              <a href="#pricing">
                {t.nav.pricing}
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

              {/* <a
                href={ACTIVATION_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.footer.requestCode}
              </a> */}

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

      {/* =================================================
          GALLERY LIGHTBOX
      ================================================= */}

      {lightboxOpen && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeLightbox();
            }
          }}
        >

          <div className="lightbox-background" />

          {/* TOP BAR */}

          <div className="lightbox-topbar">

            <div className="lightbox-title">

              <span>
                {galleryImages[
                  selectedImage
                ].title}
              </span>

              <small>
                {String(
                  selectedImage + 1
                ).padStart(2, "0")}{" "}
                /{" "}
                {String(
                  galleryImages.length
                ).padStart(2, "0")}
              </small>

            </div>

            <button
              type="button"
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label={t.gallery.close}
            >
              <i className="fa-solid fa-xmark" />
            </button>

          </div>

          {/* IMAGE */}

          <div className="lightbox-content">

            <button
              type="button"
              className="lightbox-nav lightbox-prev"
              onClick={previousImage}
              aria-label={
                t.gallery.previous
              }
            >
              <i className="fa-solid fa-chevron-left" />
            </button>

            <div className="lightbox-image-container">

              <img
                src={
                  galleryImages[
                    selectedImage
                  ].src
                }
                alt={
                  galleryImages[
                    selectedImage
                  ].title
                }
                className="lightbox-image"
                style={{
                  transform: `scale(${zoom})`,
                }}
                draggable="false"
              />

            </div>

            <button
              type="button"
              className="lightbox-nav lightbox-next"
              onClick={nextImage}
              aria-label={
                t.gallery.next
              }
            >
              <i className="fa-solid fa-chevron-right" />
            </button>

          </div>

          {/* CONTROLS */}

          <div className="lightbox-controls">

            <button
              type="button"
              onClick={zoomOut}
              disabled={zoom <= 1}
              aria-label={
                t.gallery.zoomOut
              }
            >
              <i className="fa-solid fa-minus" />
            </button>

            <span>
              {Math.round(
                zoom * 100
              )}
              %
            </span>

            <button
              type="button"
              onClick={zoomIn}
              disabled={zoom >= 3}
              aria-label={
                t.gallery.zoomIn
              }
            >
              <i className="fa-solid fa-plus" />
            </button>

          </div>

          {/* LIGHTBOX THUMBNAILS */}

          <div className="lightbox-thumbnails">

            {galleryImages.map(
              (image, index) => (
                <button
                  type="button"
                  key={image.id}
                  className={
                    selectedImage === index
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    setSelectedImage(
                      index
                    );
                    setZoom(1);
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                  />
                </button>
              )
            )}

          </div>

        </div>
      )}
    </div>
  );
}

export default App;
