import { useEffect, useMemo, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
    faWindows,
    faAndroid,
    faLinux,
    faApple,
} from "@fortawesome/free-brands-svg-icons"

import {
    faDownload,
    faCircle,
    faCircleInfo,
    faMobileScreenButton,
    faTabletScreenButton,
    faComputer,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons"

import useLanguage from "../hooks/useLanguage"

import "../styles/pages/download.css"


const UPDATE_URL =
    "https://raw.githubusercontent.com/mhdpstudio/Vexora-data/main/update.json"


function Download() {
    const { translations } = useLanguage()

    const [downloads, setDownloads] = useState(null)
    const [error, setError] = useState(false)

    const [selectedPlatform, setSelectedPlatform] =
        useState(null)


    /*
     * تحميل البيانات
     */

    useEffect(() => {
        const loadDownloads = async () => {
            try {
                const response = await fetch(
                    `${UPDATE_URL}?t=${Date.now()}`
                )

                if (!response.ok) {
                    throw new Error(
                        "Failed to load update data"
                    )
                }

                const data = await response.json()

                setDownloads(data)
            } catch (error) {
                console.error(
                    "Failed to load Vexora update data:",
                    error
                )

                setError(true)
            }
        }

        loadDownloads()
    }, [])


    /*
     * استخراج اسم النظام
     *
     * win-x64       -> win
     * win-x86       -> win
     * android-arm64 -> android
     * linux-x64     -> linux
     */

    const getPlatformKey = (key) => {
        return key.split("-")[0].toLowerCase()
    }


    /*
     * معلومات النظام
     */

    const getPlatformInfo = (platform) => {

        switch (platform) {

            case "win":
                return {
                    title: "Windows",
                    icon: faWindows,
                    type: "windows",
                    order: 1,
                }

            case "android":
                return {
                    title: "Android",
                    icon: faAndroid,
                    type: "android",
                    order: 2,
                }

            case "linux":
                return {
                    title: "Linux",
                    icon: faLinux,
                    type: "linux",
                    order: 3,
                }

            case "mac":
                return {
                    title: "macOS",
                    icon: faApple,
                    type: "mac",
                    order: 4,
                }

            default:
                return {
                    title:
                        platform.charAt(0).toUpperCase() +
                        platform.slice(1),

                    icon: faComputer,
                    type: "other",
                    order: 99,
                }
        }
    }


    /*
     * اسم النسخة
     */

    const getVersionTitle = (key) => {

        switch (key) {

            case "win-x64":
                return "Windows 64-bit"

            case "win-x86":
                return "Windows 32-bit"

            case "android-arm64":
                return "Android ARM64"

            case "android-arm32":
                return "Android ARM32"

            default:
                return key
        }
    }


    /*
     * وصف النسخة
     */

    const getVersionDescription = (
        key,
        platform
    ) => {

        if (key === "win-x64") {
            return translations.download.platforms.win64
        }

        if (key === "win-x86") {
            return translations.download.platforms.win32
        }

        if (platform === "android") {
            return translations.download.platforms.android
        }

        return translations.download.platforms.other
    }


    /*
     * أيقونات الجهاز
     */

    const getDeviceIcons = (type) => {

        if (type === "android") {
            return (
                <>
                    <FontAwesomeIcon
                        icon={faMobileScreenButton}
                    />

                    <FontAwesomeIcon
                        icon={faTabletScreenButton}
                    />
                </>
            )
        }

        return (
            <FontAwesomeIcon
                icon={faComputer}
            />
        )
    }


    /*
     * نص نوع الجهاز
     */

    const getDeviceText = (type) => {

        if (type === "android") {
            return translations.download.phoneTablet
        }

        return translations.download.computer
    }


    /*
     * تجميع الأنظمة تلقائيًا
     */

    const groupedPlatforms = useMemo(() => {

        if (!downloads) {
            return []
        }

        const groups = {}

        Object.entries(downloads).forEach(
            ([key, item]) => {

                const platform =
                    getPlatformKey(key)

                if (!groups[platform]) {
                    groups[platform] = []
                }

                groups[platform].push({
                    key,
                    item,
                })
            }
        )

        return Object.entries(groups)
            .map(([platform, versions]) => ({
                platform,
                info: getPlatformInfo(platform),
                versions,
            }))
            .sort(
                (a, b) =>
                    a.info.order -
                    b.info.order
            )

    }, [downloads, translations])


    /*
     * اختيار أول نظام تلقائيًا
     */

    useEffect(() => {

        if (
            groupedPlatforms.length > 0 &&
            !selectedPlatform
        ) {
            setSelectedPlatform(
                groupedPlatforms[0].platform
            )
        }

    }, [
        groupedPlatforms,
        selectedPlatform,
    ])


    /*
     * النظام المختار
     */

    const currentPlatform =
        groupedPlatforms.find(
            (group) =>
                group.platform ===
                selectedPlatform
        )


    return (
        <main className="download-page">

            {/* ========================= */}
            {/* Header                     */}
            {/* ========================= */}

            <section className="download-header">

                <span className="download-badge">
                    Vexora
                </span>

                <h1>
                    {translations.download.title}
                </h1>

                <p>
                    {translations.download.description}
                </p>

            </section>


            {/* ========================= */}
            {/* Price                      */}
            {/* ========================= */}

            <section className="download-price">

                <div className="price-label">
                    {translations.download.priceLabel}
                </div>

                <div className="price-value">

                    <span>
                        300
                    </span>

                    <small>
                        {translations.download.currency}
                    </small>

                </div>

                <div className="price-old">
                    <span>600</span>
                    <small>
                        {translations.download.currency}
                    </small>
                </div>

                <div className="price-discount">
                    50% {translations.download.off}
                </div>

                <p>
                    {translations.download.lifetime}
                </p>

            </section>


            {/* ========================= */}
            {/* Loading                    */}
            {/* ========================= */}

            {!downloads && !error && (
                <div className="download-loading">

                    <div className="download-loading-spinner"></div>

                    <span>
                        {translations.download.loading}
                    </span>

                </div>
            )}


            {/* ========================= */}
            {/* Error                      */}
            {/* ========================= */}

            {error && (
                <div className="download-error">

                    <FontAwesomeIcon
                        icon={faCircleInfo}
                    />

                    <span>
                        {translations.download.error}
                    </span>

                </div>
            )}


            {/* ========================= */}
            {/* Platform Selector          */}
            {/* ========================= */}

            {downloads &&
                groupedPlatforms.length > 0 && (
                    <section className="platform-selector">

                        {groupedPlatforms.map(
                            (group) => {

                                const active =
                                    selectedPlatform ===
                                    group.platform

                                return (
                                    <button
                                        key={
                                            group.platform
                                        }
                                        type="button"
                                        className={`platform-tab ${active
                                            ? "active"
                                            : ""
                                            }`}
                                        onClick={() =>
                                            setSelectedPlatform(
                                                group.platform
                                            )
                                        }
                                    >

                                        <FontAwesomeIcon
                                            icon={
                                                group.info.icon
                                            }
                                        />

                                        <span>
                                            {
                                                group.info
                                                    .title
                                            }
                                        </span>

                                        <FontAwesomeIcon
                                            className="platform-tab-arrow"
                                            icon={
                                                faChevronDown
                                            }
                                        />

                                    </button>
                                )
                            }
                        )}

                    </section>
                )}


            {/* ========================= */}
            {/* Selected Platform          */}
            {/* ========================= */}

            {currentPlatform && (
                <section className="selected-platform">

                    <div className="selected-platform-header">

                        <div className="selected-platform-title">

                            <div className="selected-platform-icon">

                                <FontAwesomeIcon
                                    icon={
                                        currentPlatform
                                            .info
                                            .icon
                                    }
                                />

                            </div>

                            <div>

                                <h2>
                                    {
                                        currentPlatform
                                            .info
                                            .title
                                    }
                                </h2>

                                <span>
                                    {
                                        currentPlatform
                                            .versions
                                            .length
                                    }{" "}
                                    {
                                        currentPlatform
                                            .versions
                                            .length ===
                                            1
                                            ? "Version"
                                            : "Versions"
                                    }
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* ========================= */}
                    {/* Versions                   */}
                    {/* ========================= */}

                    <div className="download-grid">

                        {currentPlatform.versions.map(
                            ({
                                key,
                                item,
                            }) => {

                                const available =
                                    item.av === true

                                return (
                                    <article
                                        className={`download-card ${available
                                            ? "available"
                                            : "unavailable"
                                            }`}
                                        key={key}
                                    >

                                        {/* Header */}

                                        <div className="download-card-header">

                                            <div className="platform-icon">

                                                <FontAwesomeIcon
                                                    icon={
                                                        currentPlatform
                                                            .info
                                                            .icon
                                                    }
                                                />

                                            </div>


                                            <div className="platform-status">

                                                <span
                                                    className={`status-dot ${available
                                                        ? "online"
                                                        : "offline"
                                                        }`}
                                                >

                                                    <FontAwesomeIcon
                                                        icon={
                                                            faCircle
                                                        }
                                                    />

                                                </span>

                                                <span>
                                                    {available
                                                        ? translations
                                                            .download
                                                            .available
                                                        : translations
                                                            .download
                                                            .comingSoon}
                                                </span>

                                            </div>

                                        </div>


                                        {/* Version Title */}

                                        <div className="download-card-title">

                                            <h2>
                                                {getVersionTitle(
                                                    key
                                                )}
                                            </h2>

                                            <p>
                                                {getVersionDescription(
                                                    key,
                                                    currentPlatform
                                                        .platform
                                                )}
                                            </p>

                                        </div>


                                        {/* Device */}

                                        <div className="download-device">

                                            <span className="device-icons">

                                                {getDeviceIcons(
                                                    currentPlatform
                                                        .info
                                                        .type
                                                )}

                                            </span>

                                            <span>
                                                {getDeviceText(
                                                    currentPlatform
                                                        .info
                                                        .type
                                                )}
                                            </span>

                                        </div>


                                        {/* Information */}

                                        <div className="download-info">

                                            <div>

                                                <span>
                                                    {
                                                        translations
                                                            .download
                                                            .version
                                                    }
                                                </span>

                                                <strong>
                                                    {
                                                        available
                                                            ? item.version || "—"
                                                            : "—"
                                                    }
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    {
                                                        translations
                                                            .download
                                                            .size
                                                    }
                                                </span>

                                                <strong>
                                                    {
                                                        available
                                                            ? item.size || "—"
                                                            : "—"
                                                    }
                                                </strong>

                                            </div>

                                        </div>


                                        {/* Download */}

                                        {available ? (

                                            <a
                                                href={
                                                    item.url
                                                }
                                                className="download-button"
                                                download
                                            >

                                                <FontAwesomeIcon
                                                    icon={
                                                        faDownload
                                                    }
                                                />

                                                <span>
                                                    {
                                                        translations
                                                            .download
                                                            .downloadButton
                                                    }
                                                </span>

                                            </a>

                                        ) : (

                                            <button
                                                type="button"
                                                className="download-button disabled"
                                                disabled
                                            >

                                                <FontAwesomeIcon
                                                    icon={
                                                        faCircleInfo
                                                    }
                                                />

                                                <span>
                                                    {
                                                        translations
                                                            .download
                                                            .comingSoon
                                                    }
                                                </span>

                                            </button>

                                        )}

                                    </article>
                                )
                            }
                        )}

                    </div>

                </section>
            )}

        </main>
    )
}


export default Download