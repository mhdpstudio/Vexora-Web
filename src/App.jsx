import React, { useEffect, useMemo, useRef, useState } from "react";
import "./style/App.css";
import Logo from "./assets/images/icon.png";

const ACTIVATION_URL = "https://wa.link/di4jtk";
const UPDATE_URL =
  "https://raw.githubusercontent.com/mhdpstudio/Vexora-data/main/update.json";

/*
  ضع فيديو Vexora العمودي هنا داخل:
  public/videos/vexora-preview.mp4

  وبعدها سيظهر مباشرة داخل الموقع بدون Google Drive.
*/
const VIDEO_URL =
  "https://drive.google.com/uc?export=download&id=12jzV65rS4QFy4lC2VzY63xG4R467GLs_";
const CATALOG_IMAGE = "/gallery/all-cartoons.png";

const galleryImages = [
  {
    id: 1,
    src: "/gallery/image-1.png",
    title: "Vexora Home",
    arTitle: "الواجهة الرئيسية",
    description: "The Vexora main interface.",
    arDescription: "الواجهة الرئيسية لتطبيق Vexora.",
  },
  {
    id: 2,
    src: "/gallery/image-2.png",
    title: "Movies Section",
    arTitle: "قسم الأفلام",
    description: "Browse your favorite movies.",
    arDescription: "تصفح الأفلام والمحتوى المفضل لديك.",
  },
  {
    id: 3,
    src: "/gallery/image-3.png",
    title: "Movies Page",
    arTitle: "صفحة الفيلم",
    description: "Discover and watch your movies.",
    arDescription: "تفاصيل المحتوى وبدء المشاهدة.",
  },
  {
    id: 4,
    src: "/gallery/image-4.png",
    title: "Bookmarks",
    arTitle: "المفضلة",
    description: "Save your favorite content.",
    arDescription: "احفظ المحتوى الذي تريد الرجوع إليه.",
  },
  {
    id: 5,
    src: "/gallery/image-5.png",
    title: "Movie Page",
    arTitle: "تفاصيل المحتوى",
    description: "Detailed content information.",
    arDescription: "صفحة تفاصيل المحتوى وتجربة المشاهدة.",
  },
];

const platforms = {
  windows: {
    key: "windows",
    name: "Windows",
    arName: "ويندوز",
    icon: "fa-brands fa-windows",
    type: "Desktop",
    arType: "كمبيوتر",
    builds: {
      x64: {
        key: "win-x64",
        name: "Windows 64-bit",
        arName: "Windows 64-bit",
        architecture: "x64",
        description:
          "For Windows 10 and newer.",
        arDescription:
          "لويندوز 10 وما فوق.",
      },
      x86: {
        key: "win-x86",
        name: "Windows 32-bit",
        arName: "Windows 32-bit",
        architecture: "x86",
        description:
          "For Windows 8, Windows 7 and earlier.",
        arDescription:
          "لويندوز 8 وWindows 7 وما أقل.",
      },
    },
  },

  phone: {
    key: "phone",
    name: "Phone",
    arName: "الهاتف",
    icon: "fa-solid fa-mobile-screen-button",
    type: "Android Phone",
    arType: "هاتف Android",
    builds: {
      arm64: {
        key: "android-arm64",
        name: "Android ARM64",
        arName: "Android ARM64",
        architecture: "ARM64",
        description:
          "For supported Android phones.",
        arDescription:
          "للهواتف التي تعمل بنظام Android ومعمارية ARM64.",
      },
    },
  },

  tablet: {
    key: "tablet",
    name: "Tablet",
    arName: "التابلت",
    icon: "fa-solid fa-tablet-screen-button",
    type: "Android Tablet",
    arType: "تابلت Android",
    builds: {
      arm64: {
        key: "android-arm64",
        name: "Android ARM64",
        arName: "Android ARM64",
        architecture: "ARM64",
        description:
          "For supported Android tablets.",
        arDescription:
          "لأجهزة التابلت التي تعمل بنظام Android ومعمارية ARM64.",
      },
    },
  },
};

const features = [
  {
    icon: "fa-solid fa-ban",
    title: "No Ads",
    arTitle: "بدون إعلانات",
    description:
      "Enjoy your content without distracting ads.",
    arDescription:
      "استمتع بالمحتوى بدون إعلانات مزعجة.",
  },
  {
    icon: "fa-solid fa-download",
    title: "Download Content",
    arTitle: "تحميل المحتوى",
    description:
      "Download supported content for convenient watching.",
    arDescription:
      "حمّل المحتوى المدعوم وشاهده وقت ما يناسبك.",
  },
  {
    icon: "fa-solid fa-gauge-high",
    title: "Low Data Usage",
    arTitle: "استهلاك إنترنت منخفض",
    description:
      "A lightweight experience designed to reduce unnecessary data usage.",
    arDescription:
      "تجربة خفيفة ومصممة لتقليل استهلاك الإنترنت قدر الإمكان.",
  },
  {
    icon: "fa-solid fa-clapperboard",
    title: "100+ Movies & Series",
    arTitle: "أكثر من 100 فيلم ومسلسل كرتون",
    description:
      "A growing library with more than 100 movies, series and cartoons.",
    arDescription:
      "مكتبة تضم أكثر من 100 فيلم ومسلسل وكرتون، مع محتوى جديد باستمرار.",
  },
  {
    icon: "fa-solid fa-plus",
    title: "Request Content",
    arTitle: "اطلب أي كرتون",
    description:
      "Tell us what you want to see and request new content.",
    arDescription:
      "اطلب الكرتون أو المحتوى الذي تريد مشاهدته.",
  },
  {
    icon: "fa-solid fa-rotate",
    title: "Continuous Additions",
    arTitle: "إضافات مستمرة",
    description:
      "The library keeps growing with new movies, series and episodes.",
    arDescription:
      "المكتبة تكبر باستمرار بإضافات جديدة.",
  },
  {
    icon: "fa-solid fa-bookmark",
    title: "Bookmarks",
    arTitle: "المفضلة",
    description:
      "Save content and find it again quickly.",
    arDescription:
      "احفظ المحتوى المفضل لديك للوصول إليه بسرعة.",
  },
  {
    icon: "fa-solid fa-clock-rotate-left",
    title: "Continue Watching",
    arTitle: "متابعة المشاهدة",
    description:
      "Continue from where you stopped without searching again.",
    arDescription:
      "كمّل المشاهدة من المكان الذي توقفت عنده.",
  },
  {
    icon: "fa-solid fa-magnifying-glass",
    title: "Fast Search",
    arTitle: "بحث سريع",
    description:
      "Find movies, series and cartoons quickly.",
    arDescription:
      "ابحث عن الأفلام والمسلسلات والكرتونات بسرعة.",
  },
  {
    icon: "fa-solid fa-layer-group",
    title: "Organized Library",
    arTitle: "مكتبة منظمة",
    description:
      "Clear sections make the library easier to explore.",
    arDescription:
      "أقسام واضحة تساعدك على الوصول للمحتوى بسهولة.",
  },
  {
    icon: "fa-solid fa-bolt",
    title: "Fast & Lightweight",
    arTitle: "سريع وخفيف",
    description:
      "A clean experience without unnecessary complexity.",
    arDescription:
      "تجربة سريعة وخفيفة بدون تعقيد غير ضروري.",
  },
  {
    icon: "fa-solid fa-shield-halved",
    title: "License Activation",
    arTitle: "تفعيل الترخيص",
    description:
      "A dedicated activation system for licensed access.",
    arDescription:
      "نظام تفعيل مخصص لإدارة الوصول المرخص.",
  },
];

const translations = {
  ar: {
    direction: "rtl",
    nav: {
      home: "الرئيسية",
      preview: "شوف التطبيق",
      features: "المميزات",
      library: "المكتبة",
      download: "التحميل",
      pricing: "الاشتراك",
      downloadButton: "تحميل",
    },
    hero: {
      badge: "Vexora متاحة الآن",
      title1: "ترفيهك.",
      title2: "في مكان واحد.",
      description:
        "تطبيق واحد للمحتوى الكرتوني والترفيهي، بواجهة بسيطة وسريعة وبدون إعلانات.",
      download: "تحميل Vexora",
      preview: "شوف التطبيق",
      stat1: "100+",
      stat1Text: "فيلم ومسلسل كرتون",
      stat2: "300 جنيه",
      stat2Text: "مدى الحياة",
      stat3: "0",
      stat3Text: "إعلانات",
    },
    preview: {
      label: "شوف التطبيق قبل ما تشترك",
      title1: "جولة سريعة",
      title2: "داخل Vexora.",
      description:
        "شوف شكل التطبيق وطريقة الاستخدام بنفسك قبل الاشتراك.",
      fullscreen: "ملء الشاشة",
      play: "تشغيل",
      pause: "إيقاف",
      mute: "كتم",
      unmute: "تشغيل الصوت",
      videoMissing:
        "ارفع فيديو Vexora العمودي داخل public/videos/vexora-preview.mp4",
    },
    app: {
      label: "داخل التطبيق",
      title1: "واجهة Vexora",
      title2: "الحقيقية.",
      description:
        "صور من التطبيق نفسه بدل النماذج الافتراضية، عشان العميل يشوف التجربة كما هي.",
      open: "تكبير الصورة",
    },
    features: {
      label: "ليه Vexora؟",
      title1: "كل اللي تحتاجه",
      title2: "من غير زحمة.",
      description:
        "مميزات واضحة ومباشرة بدون تكرار أو تفاصيل تشتت العميل.",
    },
    library: {
      label: "مكتبة VEXORA",
      title1: "أكثر من 100",
      title2: "فيلم ومسلسل كرتون.",
      description:
        "مكتبة تتوسع باستمرار، مع إمكانية طلب المحتوى الذي تريد إضافته.",
      badge: "100+ فيلم ومسلسل كرتون",
      note: "الصورة توضح مكتبة المحتوى داخل Vexora.",
    },
    download: {
      label: "تحميل VEXORA",
      title1: "اختار جهازك",
      title2: "بوضوح.",
      description:
        "اختار نوع جهازك أولًا، وبعدها حمّل الإصدار المناسب. لا تحتاج تعرف معنى x64 أو x86.",
      windows: "ويندوز",
      phone: "الهاتف",
      tablet: "التابلت",
      windows64: "Windows 10 وما فوق",
      windows32: "Windows 8 و7 وما أقل",
      phoneText: "Android للهاتف",
      tabletText: "Android للتابلت",
      architecture: "الإصدار",
      available: "متاح الآن",
      comingSoon: "قريبًا",
      loading: "جاري التحميل",
      unavailable: "غير متاح",
      version: "الإصدار",
      size: "الحجم",
      download: "تحميل الآن",
      note:
        "اختر جهازك فقط. الموقع يختار الإصدار المناسب تلقائيًا.",
    },
    pricing: {
      label: "الاشتراك",
      title1: "ادفع مرة واحدة.",
      title2: "واستمتع مدى الحياة.",
      description:
        "300 جنيه فقط بدل 500 جنيه. لا يوجد اشتراك شهري أو سنوي.",
      current: "300 جنيه",
      original: "500 جنيه",
      lifetime: "ترخيص مدى الحياة",
      discount: "خصم 50%",
      item1: "بدون إعلانات",
      item2: "تحديثات ومحتوى مستمر",
      item3: "دعم طلبات المحتوى",
      button: "الدفع والتفعيل عبر WhatsApp",
      special: "مميزات خاصة لأول 100 مشترك",
    },
    journey: {
      label: "طريقة الاشتراك",
      title1: "3 خطوات فقط",
      title2: "وتبدأ المشاهدة.",
      step1: "حمّل التطبيق",
      step1Text: "اختار جهازك من قسم التحميل ونزّل الإصدار المناسب.",
      step2: "أتمم الدفع",
      step2Text: "تواصل معنا عبر WhatsApp لإتمام الدفع.",
      step3: "فعّل التطبيق",
      step3Text: "استلم كود التفعيل وأدخله داخل Vexora.",
    },
    footer: {
      text: "Vexora — ترفيهك، في مكان واحد.",
      rights: "© 2026 Vexora. جميع الحقوق محفوظة.",
    },
  },

  en: {
    direction: "ltr",
    nav: {
      home: "Home",
      preview: "See the app",
      features: "Features",
      library: "Library",
      download: "Download",
      pricing: "Pricing",
      downloadButton: "Download",
    },
    hero: {
      badge: "Vexora is available now",
      title1: "Your entertainment.",
      title2: "One place.",
      description:
        "One simple app for cartoons and entertainment, with a clean, fast and ad-free experience.",
      download: "Download Vexora",
      preview: "See the app",
      stat1: "100+",
      stat1Text: "cartoon movies & series",
      stat2: "300 EGP",
      stat2Text: "lifetime",
      stat3: "0",
      stat3Text: "ads",
    },
    preview: {
      label: "SEE THE APP BEFORE YOU SUBSCRIBE",
      title1: "A quick tour",
      title2: "inside Vexora.",
      description:
        "See the real interface and experience before subscribing.",
      fullscreen: "Fullscreen",
      play: "Play",
      pause: "Pause",
      mute: "Mute",
      unmute: "Unmute",
      videoMissing:
        "Upload the vertical Vexora video to public/videos/vexora-preview.mp4",
    },
    app: {
      label: "INSIDE THE APP",
      title1: "The real Vexora",
      title2: "interface.",
      description:
        "Real screenshots from the app instead of fake mockups.",
      open: "Open image",
    },
    features: {
      label: "WHY VEXORA?",
      title1: "Everything you need",
      title2: "without the clutter.",
      description:
        "Clear features with no repeated sections or unnecessary distractions.",
    },
    library: {
      label: "VEXORA LIBRARY",
      title1: "100+",
      title2: "cartoon movies & series.",
      description:
        "A growing library with new content and content requests.",
      badge: "100+ cartoon movies & series",
      note: "This image represents the content library inside Vexora.",
    },
    download: {
      label: "DOWNLOAD VEXORA",
      title1: "Choose your device",
      title2: "clearly.",
      description:
        "Choose your device first. You do not need to understand x64 or x86.",
      windows: "Windows",
      phone: "Phone",
      tablet: "Tablet",
      windows64: "Windows 10 and newer",
      windows32: "Windows 8, 7 and earlier",
      phoneText: "Android phone",
      tabletText: "Android tablet",
      architecture: "Build",
      available: "Available now",
      comingSoon: "Coming soon",
      loading: "Loading",
      unavailable: "Unavailable",
      version: "Version",
      size: "Size",
      download: "Download now",
      note:
        "Just choose your device. The site selects the correct build automatically.",
    },
    pricing: {
      label: "PRICING",
      title1: "Pay once.",
      title2: "Enjoy it for life.",
      description:
        "300 EGP instead of 500 EGP. No monthly or yearly subscription.",
      current: "300 EGP",
      original: "500 EGP",
      lifetime: "Lifetime license",
      discount: "50% OFF",
      item1: "No ads",
      item2: "Continuous content updates",
      item3: "Content request support",
      button: "Payment & activation via WhatsApp",
      special: "Special features for the first 100 subscribers",
    },
    journey: {
      label: "HOW IT WORKS",
      title1: "Just 3 steps",
      title2: "and you are watching.",
      step1: "Download the app",
      step1Text: "Choose your device and download the correct build.",
      step2: "Complete payment",
      step2Text: "Contact us through WhatsApp to complete payment.",
      step3: "Activate the app",
      step3Text: "Receive your activation code and enter it in Vexora.",
    },
    footer: {
      text: "Vexora — Your entertainment, one place.",
      rights: "© 2026 Vexora. All rights reserved.",
    },
  },
};

function normalizeUrl(value) {
  if (!value || typeof value !== "string") return null;
  return value.trim();
}

function App() {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem("vexora-language");
      return saved === "en" || saved === "ar" ? saved : "ar";
    } catch {
      return "ar";
    }
  });

  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platform, setPlatform] = useState("windows");
  const [build, setBuild] = useState("x64");
  const [isScrolled, setIsScrolled] = useState(false);

  const [updateData, setUpdateData] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(true);
  const [updateError, setUpdateError] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoMuted, setVideoMuted] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef(null);
  const videoFrameRef = useRef(null);

  const t = translations[language];

  const currentPlatform = platforms[platform];
  const currentBuild = currentPlatform.builds[build];

  const remoteBuild = updateData?.[currentBuild.key] ?? null;
  const currentVersion = remoteBuild?.version ?? "—";
  const currentSize = remoteBuild?.size ?? "—";
  const currentDownloadUrl = normalizeUrl(remoteBuild?.url);

  const isAvailable = Boolean(
    remoteBuild?.version && currentDownloadUrl
  );

  const selectedImageData = galleryImages[selectedImage];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = t.direction || (language === "ar" ? "rtl" : "ltr");
    document.body.dir = t.direction || (language === "ar" ? "rtl" : "ltr");

    try {
      localStorage.setItem("vexora-language", language);
    } catch {
      // ignore storage errors
    }
  }, [language, t.direction]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (event) => {
      if (!event.target.closest(".language-selector")) {
        setLanguageOpen(false);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadUpdateData() {
      try {
        setUpdateLoading(true);
        setUpdateError(false);

        const response = await fetch(UPDATE_URL, {
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error(`update.json failed: ${response.status}`);
        }

        const data = await response.json();

        if (!data || typeof data !== "object") {
          throw new Error("Invalid update.json");
        }

        if (!cancelled) setUpdateData(data);
      } catch (error) {
        console.error("Vexora update data error:", error);
        if (!cancelled) {
          setUpdateData(null);
          setUpdateError(true);
        }
      } finally {
        if (!cancelled) setUpdateLoading(false);
      }
    }

    loadUpdateData();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [language]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setLanguageOpen(false);
        setMobileMenuOpen(false);

        if (lightboxOpen) {
          closeLightbox();
        }
      }

      if (lightboxOpen && event.key === "ArrowRight") {
        nextImage();
      }

      if (lightboxOpen && event.key === "ArrowLeft") {
        previousImage();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    document.body.classList.toggle("lightbox-open", lightboxOpen);
    return () => document.body.classList.remove("lightbox-open");
  }, [lightboxOpen]);

  const changeLanguage = (nextLanguage) => {
    if (nextLanguage !== "ar" && nextLanguage !== "en") return;
    setLanguage(nextLanguage);
    setLanguageOpen(false);
    setMobileMenuOpen(false);
  };

  const changePlatform = (nextPlatform) => {
    const next = platforms[nextPlatform];
    const firstBuild = Object.keys(next.builds)[0];

    setPlatform(nextPlatform);
    setBuild(firstBuild);
  };

  const toggleVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
        setIsVideoPlaying(true);
      } else {
        video.pause();
        setIsVideoPlaying(false);
      }
    } catch (error) {
      console.error("Video playback error:", error);
    }
  };

  const toggleVideoMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setVideoMuted(video.muted);
  };

  const seekVideo = (value) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Number(value);
    setVideoProgress(Number(value));
  };

  const toggleFullscreen = async () => {
    const target = videoFrameRef.current;
    if (!target) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (target.requestFullscreen) {
        await target.requestFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const openLightbox = (index) => {
    setSelectedImage(index);
    setZoom(1);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoom(1);
  };

  const previousImage = () => {
    setSelectedImage((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1
    );
    setZoom(1);
  };

  const nextImage = () => {
    setSelectedImage((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1
    );
    setZoom(1);
  };

  const platformButtons = useMemo(
    () => [
      {
        key: "windows",
        icon: platforms.windows.icon,
        title: t.download.windows,
        subtitle: language === "ar" ? "كمبيوتر Windows" : "Windows PC",
      },
      {
        key: "phone",
        icon: platforms.phone.icon,
        title: t.download.phone,
        subtitle: t.download.phoneText,
      },
      {
        key: "tablet",
        icon: platforms.tablet.icon,
        title: t.download.tablet,
        subtitle: t.download.tabletText,
      },
    ],
    [language, t.download]
  );

  const deviceDescription =
    platform === "windows"
      ? build === "x64"
        ? t.download.windows64
        : t.download.windows32
      : platform === "phone"
        ? t.download.phoneText
        : t.download.tabletText;

  return (
    <div
      className={`app ${language === "ar" ? "app-rtl" : "app-ltr"}`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="site-noise" />
      <div className="site-orb site-orb-one" />
      <div className="site-orb site-orb-two" />

      <header className={`topbar ${isScrolled ? "topbar-scrolled" : ""}`}>
        <div className="topbar-inner">
          <a className="brand" href="#home" onClick={() => setMobileMenuOpen(false)}>
            <span className="brand-icon">
              <img src={Logo} alt="Vexora" />
            </span>
            <span className="brand-copy">
              <strong>Vexora</strong>
              <small>{language === "ar" ? "الترفيه" : "Entertainment"}</small>
            </span>
          </a>

          <nav className={`navigation ${mobileMenuOpen ? "navigation-open" : ""}`}>
            <a href="#home" onClick={() => setMobileMenuOpen(false)}>{t.nav.home}</a>
            <a href="#preview" onClick={() => setMobileMenuOpen(false)}>{t.nav.preview}</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>{t.nav.features}</a>
            <a href="#library" onClick={() => setMobileMenuOpen(false)}>{t.nav.library}</a>
            <a href="#download" onClick={() => setMobileMenuOpen(false)}>{t.nav.download}</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>{t.nav.pricing}</a>
          </nav>

          <div className="topbar-actions">
            <a className="header-download" href="#download">
              <i className="fa-solid fa-download" />
              <span>{t.nav.downloadButton}</span>
            </a>

            <div className="language-selector">
              <button
                className="language-button"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setLanguageOpen((value) => !value);
                }}
              >
                <i className="fa-solid fa-language" />
                <span>{language === "ar" ? "العربية" : "English"}</span>
                <i className={`fa-solid ${languageOpen ? "fa-chevron-up" : "fa-chevron-down"}`} />
              </button>

              {languageOpen && (
                <div className="language-menu">
                  <button
                    type="button"
                    className={language === "ar" ? "active" : ""}
                    onClick={() => changeLanguage("ar")}
                  >
                    🇪🇬 <span>العربية</span>
                    {language === "ar" && <i className="fa-solid fa-check" />}
                  </button>

                  <button
                    type="button"
                    className={language === "en" ? "active" : ""}
                    onClick={() => changeLanguage("en")}
                  >
                    🇺🇸 <span>English</span>
                    {language === "en" && <i className="fa-solid fa-check" />}
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              className={`menu-toggle ${mobileMenuOpen ? "active" : ""}`}
              aria-label="Menu"
              onClick={() => setMobileMenuOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-copy reveal">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              {t.hero.badge}
            </div>

            <h1>
              {t.hero.title1}
              <br />
              <span>{t.hero.title2}</span>
            </h1>

            <p>{t.hero.description}</p>

            <div className="hero-actions">
              <a href="#download" className="btn btn-primary">
                {t.hero.download}
                <i className="fa-solid fa-arrow-down" />
              </a>

              <a href="#preview" className="btn btn-ghost">
                <i className="fa-solid fa-play" />
                {t.hero.preview}
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>{t.hero.stat1}</strong>
                <span>{t.hero.stat1Text}</span>
              </div>
              <div>
                <strong>{t.hero.stat2}</strong>
                <span>{t.hero.stat2Text}</span>
              </div>
              <div>
                <strong>{t.hero.stat3}</strong>
                <span>{t.hero.stat3Text}</span>
              </div>
            </div>
          </div>

          <div className="hero-showcase reveal">
            <div className="showcase-main">
              <img src={galleryImages[0].src} alt="Vexora application" />
              <div className="showcase-gradient" />
              <div className="showcase-label">
                <span>{language === "ar" ? "تجربة حقيقية من التطبيق" : "Real app experience"}</span>
                <i className="fa-solid fa-arrow-up-right-from-square" />
              </div>
            </div>

            <div className="showcase-stack">
              <div className="showcase-small showcase-small-one">
                <img src={galleryImages[1].src} alt="Vexora movies" />
              </div>
              <div className="showcase-small showcase-small-two">
                <img src={galleryImages[3].src} alt="Vexora bookmarks" />
              </div>
            </div>

            <div className="floating-pill floating-pill-one">
              <i className="fa-solid fa-circle-check" />
              {language === "ar" ? "بدون إعلانات" : "No ads"}
            </div>

            <div className="floating-pill floating-pill-two">
              <i className="fa-solid fa-bolt" />
              {language === "ar" ? "سريع وخفيف" : "Fast & light"}
            </div>
          </div>
        </section>

        <section className="preview-section section-block" id="preview">
          <div className="section-head reveal">
            <span className="section-kicker">{t.preview.label}</span>
            <h2>
              {t.preview.title1} <span>{t.preview.title2}</span>
            </h2>
            <p>{t.preview.description}</p>
          </div>

          <div className="video-card reveal">
            <div className="video-frame" ref={videoFrameRef}>
              <video
                ref={videoRef}
                src={VIDEO_URL}
                preload="metadata"
                playsInline
                onError={() => setVideoError(true)}
                onLoadedMetadata={(event) => {
                  setVideoDuration(event.currentTarget.duration || 0);
                  setVideoError(false);
                }}
                onTimeUpdate={(event) => {
                  setVideoProgress(event.currentTarget.currentTime);
                }}
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
                onEnded={() => setIsVideoPlaying(false)}
              />

              {videoError && (
                <div className="video-error">
                  <i className="fa-solid fa-video-slash" />
                  <span>{t.preview.videoMissing}</span>
                </div>
              )}

              {!isVideoPlaying && !videoError && (
                <button
                  type="button"
                  className="video-big-play"
                  onClick={toggleVideo}
                  aria-label={t.preview.play}
                >
                  <i className="fa-solid fa-play" />
                </button>
              )}

              <div className="video-top-tag">
                <i className="fa-solid fa-circle-play" />
                VEXORA PREVIEW
              </div>

              <div className="video-controls">
                <button type="button" onClick={toggleVideo} aria-label={isVideoPlaying ? t.preview.pause : t.preview.play}>
                  <i className={`fa-solid ${isVideoPlaying ? "fa-pause" : "fa-play"}`} />
                </button>

                <span className="video-time">{formatTime(videoProgress)}</span>

                <input
                  type="range"
                  min="0"
                  max={videoDuration || 0}
                  step="0.1"
                  value={videoProgress}
                  onChange={(event) => seekVideo(event.target.value)}
                  aria-label="Video progress"
                />

                <span className="video-time">{formatTime(videoDuration)}</span>

                <button type="button" onClick={toggleVideoMute} aria-label={videoMuted ? t.preview.unmute : t.preview.mute}>
                  <i className={`fa-solid ${videoMuted ? "fa-volume-xmark" : "fa-volume-high"}`} />
                </button>

                <button type="button" onClick={toggleFullscreen} aria-label={t.preview.fullscreen}>
                  <i className="fa-solid fa-expand" />
                </button>
              </div>
            </div>

            <div className="video-caption">
              <div>
                <span className="caption-dot" />
                <strong>{language === "ar" ? "الفيديو بالطول" : "Vertical video"}</strong>
              </div>
              <span>{language === "ar" ? "اضغط زر التكبير لمشاهدة الفيديو بكامل الشاشة" : "Use fullscreen to watch it larger"}</span>
            </div>
          </div>
        </section>

        <section className="app-preview-section section-block" id="app-preview">
          <div className="section-head reveal">
            <span className="section-kicker">{t.app.label}</span>
            <h2>
              {t.app.title1} <span>{t.app.title2}</span>
            </h2>
            <p>{t.app.description}</p>
          </div>

          <div className="app-shot-grid">
            {galleryImages.slice(0, 4).map((image, index) => (
              <button
                type="button"
                className={`app-shot app-shot-${index + 1} reveal`}
                key={image.id}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={language === "ar" ? image.arTitle : image.title}
                />
                <span className="shot-overlay">
                  <i className="fa-solid fa-expand" />
                  {t.app.open}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="features-section section-block" id="features">
          <div className="section-head reveal">
            <span className="section-kicker">{t.features.label}</span>
            <h2>
              {t.features.title1} <span>{t.features.title2}</span>
            </h2>
            <p>{t.features.description}</p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card reveal" key={feature.title}>
                <div className="feature-icon">
                  <i className={feature.icon} />
                </div>
                <h3>{language === "ar" ? feature.arTitle : feature.title}</h3>
                <p>{language === "ar" ? feature.arDescription : feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="library-section section-block" id="library">
          <div className="library-layout">
            <div className="library-copy reveal">
              <span className="section-kicker">{t.library.label}</span>
              <h2>
                {t.library.title1}
                <br />
                <span>{t.library.title2}</span>
              </h2>
              <p>{t.library.description}</p>

              <div className="library-badge">
                <i className="fa-solid fa-clapperboard" />
                <span>{t.library.badge}</span>
              </div>
            </div>

            <div className="library-image-card reveal">
              <img src={CATALOG_IMAGE} alt={t.library.badge} />
              <div className="library-image-overlay">
                <span>{t.library.note}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="download-section section-block" id="download">
          <div className="section-head reveal">
            <span className="section-kicker">{t.download.label}</span>
            <h2>
              {t.download.title1} <span>{t.download.title2}</span>
            </h2>
            <p>{t.download.description}</p>
          </div>

          <div className="device-picker reveal">
            {platformButtons.map((item) => (
              <button
                type="button"
                key={item.key}
                className={`device-option ${platform === item.key ? "active" : ""}`}
                onClick={() => changePlatform(item.key)}
              >
                <span className="device-option-icon">
                  <i className={item.icon} />
                </span>
                <span className="device-option-copy">
                  <strong>{item.title}</strong>
                  <small>{item.subtitle}</small>
                </span>
                {platform === item.key && (
                  <span className="device-option-check">
                    <i className="fa-solid fa-check" />
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="download-panel reveal">
            <div className="download-panel-top">
              <div className="selected-device">
                <div className="selected-device-icon">
                  <i className={currentPlatform.icon} />
                </div>
                <div>
                  <span>{language === "ar" ? "جهازك المختار" : "Selected device"}</span>
                  <strong>{language === "ar" ? currentPlatform.arName : currentPlatform.name}</strong>
                </div>
              </div>

              <div className="device-compatibility">
                <i className="fa-solid fa-circle-check" />
                <span>{deviceDescription}</span>
              </div>
            </div>

            <div className="build-choice">
              {Object.entries(currentPlatform.builds).map(([key, item]) => {
                const itemRemote = updateData?.[item.key] ?? null;
                const itemUrl = normalizeUrl(itemRemote?.url);
                const itemAvailable = Boolean(itemRemote?.version && itemUrl);

                return (
                  <button
                    type="button"
                    key={key}
                    disabled={!itemAvailable}
                    className={`build-option ${build === key ? "active" : ""} ${!itemAvailable ? "disabled" : ""}`}
                    onClick={() => itemAvailable && setBuild(key)}
                  >
                    <span className="build-option-icon">
                      <i className={platform === "windows" ? "fa-solid fa-microchip" : "fa-solid fa-mobile-screen"} />
                    </span>
                    <span>
                      <strong>{language === "ar" ? item.arName : item.name}</strong>
                      <small>{language === "ar" ? item.arDescription : item.description}</small>
                    </span>
                    <span className={`build-status ${itemAvailable ? "ready" : ""}`}>
                      <i className={`fa-solid ${updateLoading ? "fa-spinner fa-spin" : itemAvailable ? "fa-circle-check" : "fa-clock"}`} />
                      {updateLoading ? t.download.loading : itemAvailable ? t.download.available : t.download.comingSoon}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="download-main">
              <div className="download-main-copy">
                <span className="download-version">
                  {updateLoading ? t.download.loading : `v${currentVersion}`}
                </span>

                <h3>{language === "ar" ? currentBuild.arName : currentBuild.name}</h3>
                <p>{language === "ar" ? currentBuild.arDescription : currentBuild.description}</p>

                <div className="download-meta">
                  <span>
                    <small>{t.download.version}</small>
                    <strong>{updateLoading ? "…" : currentVersion}</strong>
                  </span>
                  <span>
                    <small>{t.download.size}</small>
                    <strong>{updateLoading ? "…" : currentSize}</strong>
                  </span>
                  <span>
                    <small>{language === "ar" ? "الترخيص" : "License"}</small>
                    <strong>{language === "ar" ? "كود تفعيل" : "Activation code"}</strong>
                  </span>
                </div>
              </div>

              {isAvailable ? (
                <a
                  href={currentDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-now"
                >
                  <span>{t.download.download}</span>
                  <i className="fa-solid fa-arrow-down" />
                </a>
              ) : (
                <button type="button" className="download-now disabled" disabled>
                  <span>{updateLoading ? t.download.loading : updateError ? t.download.unavailable : t.download.comingSoon}</span>
                  <i className={`fa-solid ${updateLoading ? "fa-spinner fa-spin" : "fa-clock"}`} />
                </button>
              )}
            </div>
          </div>

          <p className="download-note">
            <i className="fa-solid fa-circle-info" />
            {t.download.note}
          </p>
        </section>

        <section className="pricing-section section-block" id="pricing">
          <div className="pricing-card reveal">
            <div className="pricing-main">
              <span className="section-kicker">{t.pricing.label}</span>
              <h2>
                {t.pricing.title1}
                <br />
                <span>{t.pricing.title2}</span>
              </h2>
              <p>{t.pricing.description}</p>

              <div className="price-row">
                <strong>{t.pricing.current}</strong>
                <del>{t.pricing.original}</del>
                <span>{t.pricing.discount}</span>
              </div>

              <a
                href={ACTIVATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary pricing-button"
              >
                <i className="fa-brands fa-whatsapp" />
                {t.pricing.button}
              </a>
            </div>

            <div className="pricing-side">
              <div className="lifetime-chip">
                <i className="fa-solid fa-infinity" />
                {t.pricing.lifetime}
              </div>

              <div className="pricing-list">
                <div><i className="fa-solid fa-check" />{t.pricing.item1}</div>
                <div><i className="fa-solid fa-check" />{t.pricing.item2}</div>
                <div><i className="fa-solid fa-check" />{t.pricing.item3}</div>
              </div>

              <div className="first-100">
                <i className="fa-solid fa-gem" />
                <span>{t.pricing.special}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="journey-section section-block" id="how-it-works">
          <div className="section-head reveal">
            <span className="section-kicker">{t.journey.label}</span>
            <h2>
              {t.journey.title1} <span>{t.journey.title2}</span>
            </h2>
          </div>

          <div className="journey-grid">
            <article className="journey-step reveal">
              <span>01</span>
              <i className="fa-solid fa-download" />
              <h3>{t.journey.step1}</h3>
              <p>{t.journey.step1Text}</p>
            </article>

            <article className="journey-step reveal">
              <span>02</span>
              <i className="fa-brands fa-whatsapp" />
              <h3>{t.journey.step2}</h3>
              <p>{t.journey.step2Text}</p>
            </article>

            <article className="journey-step reveal">
              <span>03</span>
              <i className="fa-solid fa-key" />
              <h3>{t.journey.step3}</h3>
              <p>{t.journey.step3Text}</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <a className="brand" href="#home">
            <span className="brand-icon">
              <img src={Logo} alt="Vexora" />
            </span>
            <span className="brand-copy">
              <strong>Vexora</strong>
              <small>{language === "ar" ? "الترفيه" : "Entertainment"}</small>
            </span>
          </a>

          <p>{t.footer.text}</p>
          <span>{t.footer.rights}</span>
        </div>
      </footer>

      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <button
            type="button"
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark" />
          </button>

          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={(event) => {
              event.stopPropagation();
              previousImage();
            }}
            aria-label="Previous"
          >
            <i className="fa-solid fa-chevron-left" />
          </button>

          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <img
              src={selectedImageData.src}
              alt={language === "ar" ? selectedImageData.arTitle : selectedImageData.title}
              style={{ transform: `scale(${zoom})` }}
            />

            <div className="lightbox-toolbar">
              <button type="button" onClick={() => setZoom((value) => Math.max(1, value - 0.2))}>
                <i className="fa-solid fa-minus" />
              </button>
              <span>{Math.round(zoom * 100)}%</span>
              <button type="button" onClick={() => setZoom((value) => Math.min(2.5, value + 0.2))}>
                <i className="fa-solid fa-plus" />
              </button>
            </div>
          </div>

          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={(event) => {
              event.stopPropagation();
              nextImage();
            }}
            aria-label="Next"
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
