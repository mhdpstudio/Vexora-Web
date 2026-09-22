import {
    useEffect,
    useRef,
    useState,
} from "react"

import { NavLink } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
    faPlay,
    faPause,
    faVolumeHigh,
    faVolumeXmark,
    faExpand,
    faCompress,
    faXmark,
    faChevronLeft,
    faChevronRight,
    faPlus,
    faMinus,
    faRotateLeft,
} from "@fortawesome/free-solid-svg-icons"

import useLanguage from "../hooks/useLanguage"

import "../styles/pages/about.css"


function About() {

    const { translations } = useLanguage()

    const videoRef = useRef(null)
    const controlsTimeoutRef = useRef(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [progress, setProgress] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [showControls, setShowControls] = useState(true)

    /* Gallery */
    const [selectedImage, setSelectedImage] = useState(null)
    const [imageZoom, setImageZoom] = useState(1)


    /* ========================================================= */
    /* Gallery Images                                             */
    /* ========================================================= */

    const galleryImages = [
        "/about/vexora-1.png",
        "/about/vexora-2.png",
        "/about/vexora-3.png",
        "/about/vexora-4.png",
        "/about/vexora-5.png",
    ]


    /* ========================================================= */
    /* Format Time                                                */
    /* ========================================================= */

    const formatTime = (time) => {

        if (!Number.isFinite(time)) {
            return "00:00"
        }

        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)

        return `${String(minutes).padStart(2, "0")}:${String(
            seconds
        ).padStart(2, "0")}`
    }


    /* ========================================================= */
    /* Video Controls                                             */
    /* ========================================================= */

    const revealControls = () => {

        setShowControls(true)

        clearTimeout(
            controlsTimeoutRef.current
        )

        if (isPlaying) {

            controlsTimeoutRef.current =
                setTimeout(() => {
                    setShowControls(false)
                }, 3000)
        }
    }


    const togglePlay = async () => {

        const video = videoRef.current

        if (!video) {
            return
        }

        try {

            if (video.paused) {

                await video.play()

            } else {

                video.pause()

            }

        } catch (error) {

            console.error(
                "Unable to control Vexora video:",
                error
            )

        }
    }


    const handlePlay = () => {

        setIsPlaying(true)

        revealControls()
    }


    const handlePause = () => {

        setIsPlaying(false)

        setShowControls(true)

        clearTimeout(
            controlsTimeoutRef.current
        )
    }


    const handleTimeUpdate = () => {

        const video = videoRef.current

        if (!video) {
            return
        }

        setCurrentTime(video.currentTime)

        if (video.duration) {

            setProgress(
                (video.currentTime /
                    video.duration) *
                100
            )
        }
    }


    const handleLoadedMetadata = () => {

        const video = videoRef.current

        if (!video) {
            return
        }

        setDuration(video.duration)
    }


    const handleEnded = () => {

        setIsPlaying(false)

        setProgress(100)

        setShowControls(true)

        clearTimeout(
            controlsTimeoutRef.current
        )
    }


    const toggleMute = () => {

        const video = videoRef.current

        if (!video) {
            return
        }

        video.muted = !video.muted

        setIsMuted(video.muted)

        revealControls()
    }


    const handleProgressChange = (event) => {

        const video = videoRef.current

        if (!video || !video.duration) {
            return
        }

        const value =
            Number(event.target.value)

        video.currentTime =
            (value / 100) *
            video.duration

        setProgress(value)

        revealControls()
    }


    const toggleFullscreen = async () => {

        const wrapper =
            document.querySelector(
                ".about-video-wrapper"
            )

        if (!wrapper) {
            return
        }

        try {

            if (!document.fullscreenElement) {

                await wrapper.requestFullscreen()

                setIsFullscreen(true)

            } else {

                await document.exitFullscreen()

                setIsFullscreen(false)

            }

        } catch (error) {

            console.error(
                "Fullscreen error:",
                error
            )
        }

        revealControls()
    }


    /* ========================================================= */
    /* Video Fullscreen Event                                     */
    /* ========================================================= */

    useEffect(() => {

        const handleFullscreenChange = () => {

            setIsFullscreen(
                Boolean(
                    document.fullscreenElement
                )
            )
        }

        document.addEventListener(
            "fullscreenchange",
            handleFullscreenChange
        )

        return () => {

            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            )

        }

    }, [])


    /* ========================================================= */
    /* Video Cleanup                                              */
    /* ========================================================= */

    useEffect(() => {

        return () => {

            clearTimeout(
                controlsTimeoutRef.current
            )

        }

    }, [])


    /* ========================================================= */
    /* Gallery Open                                               */
    /* ========================================================= */

    const openImage = (index) => {

        setSelectedImage(index)

        setImageZoom(1)

        document.body.style.overflow = "hidden"
    }


    /* ========================================================= */
    /* Gallery Close                                              */
    /* ========================================================= */

    const closeImage = () => {

        setSelectedImage(null)

        setImageZoom(1)

        document.body.style.overflow = ""
    }


    /* ========================================================= */
    /* Gallery Previous                                           */
    /* ========================================================= */

    const previousImage = () => {

        if (selectedImage === null) {
            return
        }

        setSelectedImage(
            (selectedImage - 1 + galleryImages.length) %
            galleryImages.length
        )

        setImageZoom(1)
    }


    /* ========================================================= */
    /* Gallery Next                                               */
    /* ========================================================= */

    const nextImage = () => {

        if (selectedImage === null) {
            return
        }

        setSelectedImage(
            (selectedImage + 1) %
            galleryImages.length
        )

        setImageZoom(1)
    }


    /* ========================================================= */
    /* Gallery Zoom                                               */
    /* ========================================================= */

    const zoomIn = () => {

        setImageZoom(
            (currentZoom) =>
                Math.min(
                    currentZoom + 0.25,
                    3
                )
        )
    }


    const zoomOut = () => {

        setImageZoom(
            (currentZoom) =>
                Math.max(
                    currentZoom - 0.25,
                    0.5
                )
        )
    }


    const resetZoom = () => {

        setImageZoom(1)
    }


    const handleImageDoubleClick = () => {

        setImageZoom(
            (currentZoom) =>
                currentZoom >= 3
                    ? 1
                    : Math.min(
                        currentZoom + 0.5,
                        3
                    )
        )
    }


    /* ========================================================= */
    /* Keyboard Controls                                          */
    /* ========================================================= */

    useEffect(() => {

        const handleKeyDown = (event) => {

            /* Gallery keyboard */

            if (selectedImage !== null) {

                switch (event.key) {

                    case "Escape":

                        event.preventDefault()

                        closeImage()

                        return


                    case "ArrowLeft":

                        event.preventDefault()

                        previousImage()

                        return


                    case "ArrowRight":

                        event.preventDefault()

                        nextImage()

                        return


                    case "+":

                    case "=":

                        event.preventDefault()

                        zoomIn()

                        return


                    case "-":

                        event.preventDefault()

                        zoomOut()

                        return


                    case "0":

                        event.preventDefault()

                        resetZoom()

                        return


                    default:
                        break
                }

                return
            }


            /* Video keyboard controls */

            const video = videoRef.current

            if (!video) {
                return
            }


            const tag =
                document.activeElement?.tagName


            if (
                tag === "INPUT" ||
                tag === "TEXTAREA"
            ) {
                return
            }


            switch (event.code) {

                case "Space":

                    event.preventDefault()

                    togglePlay()

                    break


                case "ArrowRight":

                    event.preventDefault()

                    video.currentTime =
                        Math.min(
                            video.currentTime + 5,
                            video.duration || Infinity
                        )

                    revealControls()

                    break


                case "ArrowLeft":

                    event.preventDefault()

                    video.currentTime =
                        Math.max(
                            video.currentTime - 5,
                            0
                        )

                    revealControls()

                    break


                case "KeyM":

                    event.preventDefault()

                    toggleMute()

                    break


                case "KeyF":

                    event.preventDefault()

                    toggleFullscreen()

                    break


                default:
                    break
            }

        }


        window.addEventListener(
            "keydown",
            handleKeyDown
        )


        return () => {

            window.removeEventListener(
                "keydown",
                handleKeyDown
            )

        }

    })


    /* ========================================================= */
    /* Restore Scroll                                              */
    /* ========================================================= */

    useEffect(() => {

        return () => {

            document.body.style.overflow = ""

        }

    }, [])


    return (
        <main className="about-page">


            {/* ================================================= */}
            {/* Video Hero                                          */}
            {/* ================================================= */}

            <section className="about-video-section">

                <div className="about-video-heading">

                    <span className="about-badge">
                        {translations.about.video.badge}
                    </span>

                    <h1>
                        {translations.about.video.title}
                    </h1>

                    <p>
                        {translations.about.video.description}
                    </p>

                </div>


                <div
                    className={`about-video-wrapper ${showControls
                        ? "controls-visible"
                        : "controls-hidden"
                        }`}
                    onMouseMove={revealControls}
                    onMouseEnter={revealControls}
                    onTouchStart={revealControls}
                    onContextMenu={(event) =>
                        event.preventDefault()
                    }
                >

                    <video
                        ref={videoRef}
                        className="about-video"
                        playsInline
                        preload="metadata"
                        controls={false}
                        controlsList="nodownload noplaybackrate"
                        disablePictureInPicture
                        onPlay={handlePlay}
                        onPause={handlePause}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={
                            handleLoadedMetadata
                        }
                        onEnded={handleEnded}
                        onClick={togglePlay}
                        onContextMenu={(event) =>
                            event.preventDefault()
                        }
                    >

                        <source
                            src="https://pub-c6f31f9164bb4d60a22d6aa9c2d08c2d.r2.dev/Vexora_Vidoe.mp4"
                            type="video/mp4"
                        />

                        {translations.about.video.unsupported}

                    </video>


                    {!isPlaying && (

                        <button
                            type="button"
                            className="video-center-play"
                            onClick={togglePlay}
                            aria-label="Play"
                        >

                            <FontAwesomeIcon
                                icon={faPlay}
                            />

                        </button>

                    )}


                    <div
                        className="custom-video-controls"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="video-progress-row">

                            <span className="video-time">
                                {formatTime(
                                    currentTime
                                )}
                            </span>


                            <input
                                type="range"
                                className="video-progress"
                                min="0"
                                max="100"
                                step="0.1"
                                value={progress}
                                onChange={handleProgressChange}
                                style={{
                                    background: `linear-gradient(
            to right,
            #5fc945 0%,
            #5fc945 ${progress}%,
            rgba(255, 255, 255, 0.14) ${progress}%,
            rgba(255, 255, 255, 0.14) 100%
        )`,
                                }}
                                aria-label="Video progress"
                            />


                            <span className="video-time">
                                {formatTime(
                                    duration
                                )}
                            </span>

                        </div>


                        <div className="video-controls-bottom">

                            <div className="video-controls-left">

                                <button
                                    type="button"
                                    className="video-control-button"
                                    onClick={togglePlay}
                                    aria-label={
                                        isPlaying
                                            ? "Pause"
                                            : "Play"
                                    }
                                >

                                    <FontAwesomeIcon
                                        icon={
                                            isPlaying
                                                ? faPause
                                                : faPlay
                                        }
                                    />

                                </button>


                                <button
                                    type="button"
                                    className="video-control-button"
                                    onClick={toggleMute}
                                    aria-label={
                                        isMuted
                                            ? "Unmute"
                                            : "Mute"
                                    }
                                >

                                    <FontAwesomeIcon
                                        icon={
                                            isMuted
                                                ? faVolumeXmark
                                                : faVolumeHigh
                                        }
                                    />

                                </button>

                            </div>


                            <button
                                type="button"
                                className="video-control-button"
                                onClick={
                                    toggleFullscreen
                                }
                                aria-label="Fullscreen"
                            >

                                <FontAwesomeIcon
                                    icon={
                                        isFullscreen
                                            ? faCompress
                                            : faExpand
                                    }
                                />

                            </button>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================================================= */}
            {/* Gallery                                             */}
            {/* ================================================= */}

            <section className="about-gallery-section">

                <div className="about-section-heading">

                    <span className="about-badge">
                        {translations.about.gallery.badge}
                    </span>

                    <h2>
                        {translations.about.gallery.title}
                    </h2>

                    <p>
                        {translations.about.gallery.description}
                    </p>

                </div>


                <div className="about-gallery">

                    {galleryImages.map((image, index) => (

                        <button
                            key={image}
                            type="button"
                            className={`gallery-item gallery-item-${index + 1}`}
                            onClick={() => openImage(index)}
                        >

                            <div className="gallery-image-wrap">

                                <img
                                    src={image}
                                    alt={`Vexora ${index + 1}`}
                                    loading={index === 0 ? "eager" : "lazy"}
                                />

                            </div>

                            <div className="gallery-number">
                                <span>
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <span className="gallery-number-line" />

                                <span>
                                    05
                                </span>
                            </div>

                            <div className="gallery-open-hint">
                                <FontAwesomeIcon icon={faExpand} />
                            </div>

                        </button>

                    ))}

                </div>

            </section>


            {/* ================================================= */}
            {/* Gallery Lightbox                                    */}
            {/* ================================================= */}

            {selectedImage !== null && (

                <div
                    className="gallery-lightbox"
                    onClick={closeImage}
                >

                    <div
                        className="gallery-lightbox-content"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        {/* Close */}

                        <button
                            type="button"
                            className="gallery-lightbox-close"
                            onClick={closeImage}
                            aria-label="Close"
                        >

                            <FontAwesomeIcon
                                icon={faXmark}
                            />

                        </button>


                        {/* Previous */}

                        <button
                            type="button"
                            className="gallery-lightbox-nav gallery-lightbox-prev"
                            onClick={previousImage}
                            aria-label="Previous image"
                        >

                            <FontAwesomeIcon
                                icon={faChevronLeft}
                            />

                        </button>


                        {/* Image */}

                        <div className="gallery-lightbox-image-container">

                            <img
                                src={
                                    galleryImages[
                                    selectedImage
                                    ]
                                }
                                alt="Vexora preview"
                                className="gallery-lightbox-image"
                                style={{
                                    transform:
                                        `scale(${imageZoom})`,
                                }}
                                onDoubleClick={
                                    handleImageDoubleClick
                                }
                                onContextMenu={(event) =>
                                    event.preventDefault()
                                }
                            />

                        </div>


                        {/* Next */}

                        <button
                            type="button"
                            className="gallery-lightbox-nav gallery-lightbox-next"
                            onClick={nextImage}
                            aria-label="Next image"
                        >

                            <FontAwesomeIcon
                                icon={faChevronRight}
                            />

                        </button>


                        {/* Controls */}

                        <div className="gallery-lightbox-controls">

                            <button
                                type="button"
                                onClick={zoomOut}
                                aria-label="Zoom out"
                            >

                                <FontAwesomeIcon
                                    icon={faMinus}
                                />

                            </button>


                            <span>
                                {Math.round(
                                    imageZoom * 100
                                )}%
                            </span>


                            <button
                                type="button"
                                onClick={resetZoom}
                                aria-label="Reset zoom"
                            >

                                <FontAwesomeIcon
                                    icon={faRotateLeft}
                                />

                            </button>


                            <button
                                type="button"
                                onClick={zoomIn}
                                aria-label="Zoom in"
                            >

                                <FontAwesomeIcon
                                    icon={faPlus}
                                />

                            </button>

                        </div>


                        {/* Counter */}

                        <div className="gallery-lightbox-counter">

                            {selectedImage + 1}

                            <span>
                                /
                            </span>

                            {galleryImages.length}

                        </div>

                    </div>

                </div>

            )}


            {/* ================================================= */}
            {/* About Vexora                                        */}
            {/* ================================================= */}

            <section className="about-info-section">

                <div className="about-info-content">

                    <span className="about-badge">
                        {translations.about.info.badge}
                    </span>

                    <h2>
                        {translations.about.info.title}
                    </h2>

                    <p>
                        {translations.about.info.description}
                    </p>

                </div>

            </section>


            {/* ================================================= */}
            {/* Features                                            */}
            {/* ================================================= */}

            <section className="about-features-section">

                <div className="about-section-heading">

                    <span className="about-badge">
                        {translations.about.features.badge}
                    </span>

                    <h2>
                        {translations.about.features.title}
                    </h2>

                    <p>
                        {translations.about.features.description}
                    </p>

                </div>


                <div className="about-features-grid">


                    <article className="about-feature-card">

                        <div className="feature-number">
                            01
                        </div>

                        <h3>
                            {translations.about.features.server.title}
                        </h3>

                        <p>
                            {translations.about.features.server.description}
                        </p>

                    </article>


                    <article className="about-feature-card">

                        <div className="feature-number">
                            02
                        </div>

                        <h3>
                            {translations.about.features.activation.title}
                        </h3>

                        <p>
                            {translations.about.features.activation.description}
                        </p>

                    </article>


                    <article className="about-feature-card">

                        <div className="feature-number">
                            03
                        </div>

                        <h3>
                            {translations.about.features.easy.title}
                        </h3>

                        <p>
                            {translations.about.features.easy.description}
                        </p>

                    </article>


                    <article className="about-feature-card">

                        <div className="feature-number">
                            04
                        </div>

                        <h3>
                            {translations.about.features.content.title}
                        </h3>

                        <p>
                            {translations.about.features.content.description}
                        </p>

                    </article>


                    <article className="about-feature-card">

                        <div className="feature-number">
                            05
                        </div>

                        <h3>
                            {translations.about.features.search.title}
                        </h3>

                        <p>
                            {translations.about.features.search.description}
                        </p>

                    </article>


                    <article className="about-feature-card">

                        <div className="feature-number">
                            06
                        </div>

                        <h3>
                            {translations.about.features.devices.title}
                        </h3>

                        <p>
                            {translations.about.features.devices.description}
                        </p>

                    </article>


                </div>

            </section>


            {/* ================================================= */}
            {/* CTA                                                 */}
            {/* ================================================= */}

            <section className="about-cta">

                <div className="about-cta-content">

                    <span className="about-badge">
                        {translations.about.cta.badge}
                    </span>

                    <h2>
                        {translations.about.cta.title}
                    </h2>

                    <p>
                        {translations.about.cta.description}
                    </p>

                    <NavLink
                        to="/download"
                        className="about-cta-button"
                    >
                        {translations.about.cta.button}
                    </NavLink>

                </div>

            </section>


        </main>
    )
}


export default About