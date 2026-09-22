import { NavLink } from "react-router-dom"

import useLanguage from "../hooks/useLanguage"

import "../styles/pages/home.css"


function Home() {
    const { translations } = useLanguage()

    return (
        <main className="home">

            {/* ========================= */}
            {/* Hero                       */}
            {/* ========================= */}

            <section className="hero">

                <div className="hero-glow hero-glow-left"></div>

                <div className="hero-glow hero-glow-right"></div>


                <div className="hero-content">

                    <div className="hero-badge">

                        <img
                            src="/icon.png"
                            alt="Vexora"
                        />

                        <span>
                            Vexora
                        </span>

                    </div>


                    <h1 className="hero-title">
                        {translations.home.hero.title}
                    </h1>


                    <p className="hero-description">
                        {translations.home.hero.description}
                    </p>


                    <div className="hero-actions">

                        <NavLink
                            to="/download"
                            className="hero-button hero-button-primary"
                        >
                            {translations.home.hero.download}
                        </NavLink>


                        <a
                            href="#features"
                            className="hero-button hero-button-secondary"
                        >
                            {translations.home.hero.explore}
                        </a>

                    </div>


                    <div className="hero-platforms">

                        <span>
                            Windows
                        </span>

                        <i></i>

                        <span>
                            Android
                        </span>

                        <i></i>

                        <span>
                            {translations.home.hero.noAds}
                        </span>

                    </div>

                </div>


                <div className="hero-visual">

                    <div className="hero-card">

                        <img
                            src="/icon.png"
                            alt="Vexora"
                        />

                        <div className="hero-card-content">

                            <span>
                                Vexora
                            </span>

                            <small>
                                {translations.home.hero.cardText}
                            </small>

                        </div>

                    </div>

                </div>

            </section>


            {/* ========================= */}
            {/* Vexora Details              */}
            {/* ========================= */}

            <section
                id="features"
                className="vexora-details"
            >

                <div className="section-heading">

                    <span className="section-badge">
                        {translations.home.details.badge}
                    </span>


                    <h2>
                        {translations.home.details.title}
                    </h2>


                    <p>
                        {translations.home.details.description}
                    </p>

                </div>


                <div className="details-grid">

                    {/* Detail 01 */}

                    <div className="detail-card">

                        <div className="detail-icon">
                            01
                        </div>


                        <h3>
                            {translations.home.details.noAds.title}
                        </h3>


                        <p>
                            {translations.home.details.noAds.description}
                        </p>

                    </div>


                    {/* Detail 02 */}

                    <div className="detail-card">

                        <div className="detail-icon">
                            02
                        </div>


                        <h3>
                            {translations.home.details.lifetime.title}
                        </h3>


                        <p>
                            {translations.home.details.lifetime.description}
                        </p>

                    </div>


                    {/* Detail 03 */}

                    <div className="detail-card">

                        <div className="detail-icon">
                            03
                        </div>


                        <h3>
                            {translations.home.details.platforms.title}
                        </h3>


                        <p>
                            {translations.home.details.platforms.description}
                        </p>

                    </div>

                </div>

            </section>


            {/* ========================= */}
            {/* How To Start               */}
            {/* ========================= */}

            <section className="how-to-section">

                <div className="section-heading">

                    <span className="section-badge">
                        {translations.home.steps.badge}
                    </span>


                    <h2>
                        {translations.home.steps.title}
                    </h2>


                    <p>
                        {translations.home.steps.description}
                    </p>

                </div>


                <div className="steps-wrapper">

                    <div className="steps-line"></div>


                    {/* ========================= */}
                    {/* Step 1                      */}
                    {/* ========================= */}

                    <div className="step-item step-top">

                        <div className="step-content">

                            <span className="step-number">
                                {translations.home.steps.download.number}
                            </span>


                            <h3>
                                {translations.home.steps.download.title}
                            </h3>


                            <p>
                                {translations.home.steps.download.description}
                            </p>

                        </div>


                        <div className="step-circle">
                            1
                        </div>

                    </div>


                    {/* ========================= */}
                    {/* Step 2                      */}
                    {/* ========================= */}

                    <div className="step-item step-bottom">

                        <div className="step-circle">
                            2
                        </div>


                        <div className="step-content">

                            <span className="step-number">
                                {translations.home.steps.whatsapp.number}
                            </span>


                            <h3>
                                {translations.home.steps.whatsapp.title}
                            </h3>


                            <p>
                                {translations.home.steps.whatsapp.description}
                            </p>

                        </div>

                    </div>


                    {/* ========================= */}
                    {/* Step 3                      */}
                    {/* ========================= */}

                    <div className="step-item step-top">

                        <div className="step-content">

                            <span className="step-number">
                                {translations.home.steps.payment.number}
                            </span>


                            <h3>
                                {translations.home.steps.payment.title}
                            </h3>


                            <p>
                                {translations.home.steps.payment.description}
                            </p>

                        </div>


                        <div className="step-circle">
                            3
                        </div>

                    </div>


                    {/* ========================= */}
                    {/* Step 4                      */}
                    {/* ========================= */}

                    <div className="step-item step-bottom">

                        <div className="step-circle">
                            4
                        </div>


                        <div className="step-content">

                            <span className="step-number">
                                {translations.home.steps.activation.number}
                            </span>


                            <h3>
                                {translations.home.steps.activation.title}
                            </h3>


                            <p>
                                {translations.home.steps.activation.description}
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ========================= */}
            {/* Price CTA                  */}
            {/* ========================= */}

            <section className="home-cta">

                <div className="home-cta-content">

                    <span className="section-badge">
                        {translations.home.cta.badge}
                    </span>


                    <h2>
                        {translations.home.cta.title}
                    </h2>


                    <p>
                        {translations.home.cta.description}
                    </p>


                    <NavLink
                        to="/download"
                        className="hero-button hero-button-primary"
                    >
                        {translations.home.cta.button}
                    </NavLink>

                </div>

            </section>

        </main>
    )
}


export default Home