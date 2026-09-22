import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
    faWhatsapp,
} from "@fortawesome/free-brands-svg-icons"

import {
    faHeadset,
} from "@fortawesome/free-solid-svg-icons"

import useLanguage from "../hooks/useLanguage"

import "../styles/pages/contact.css"


function Contact() {

    const { translations } = useLanguage()

    const whatsappNumber = "201036653241"


    const openWhatsApp = (message) => {

        const url =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        )
    }


    return (

        <main className="contact-page">


            {/* Header */}

            <section className="contact-header">

                <span className="contact-badge">
                    {translations.contact.badge}
                </span>

                <h1>
                    {translations.contact.title}
                </h1>

                <p>
                    {translations.contact.description}
                </p>

            </section>


            {/* Contact Cards */}

            <section className="contact-cards">


                {/* General Contact */}

                <article className="contact-card">

                    <div className="contact-icon">
                        <FontAwesomeIcon
                            icon={faWhatsapp}
                        />
                    </div>


                    <div className="contact-content">

                        <span className="contact-label">
                            {translations.contact.general.label}
                        </span>

                        <h2>
                            {translations.contact.general.title}
                        </h2>

                        <p>
                            {translations.contact.general.description}
                        </p>


                        <button
                            type="button"
                            onClick={() =>
                                openWhatsApp(
                                    translations.contact.general.message
                                )
                            }
                        >

                            <FontAwesomeIcon
                                icon={faWhatsapp}
                            />

                            {translations.contact.general.button}

                        </button>

                    </div>

                </article>


                {/* Technical Support */}

                <article className="contact-card">

                    <div className="contact-icon">
                        <FontAwesomeIcon
                            icon={faHeadset}
                        />
                    </div>


                    <div className="contact-content">

                        <span className="contact-label">
                            {translations.contact.support.label}
                        </span>

                        <h2>
                            {translations.contact.support.title}
                        </h2>

                        <p>
                            {translations.contact.support.description}
                        </p>


                        <button
                            type="button"
                            onClick={() =>
                                openWhatsApp(
                                    translations.contact.support.message
                                )
                            }
                        >

                            <FontAwesomeIcon
                                icon={faWhatsapp}
                            />

                            {translations.contact.support.button}

                        </button>

                    </div>

                </article>


            </section>


            {/* WhatsApp Number */}

            <div className="contact-number">

                <span>
                    {translations.contact.whatsapp}
                </span>

                <strong>
                    01036653241
                </strong>

            </div>


        </main>

    )
}


export default Contact