import useLanguage from "../../hooks/useLanguage"

import "./../../styles/widgets/footer.css"


function Footer() {
    const { translations } = useLanguage()

    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-brand">

                    <h2>Vexora</h2>

                    <p>
                        {translations.footer.description}
                    </p>

                </div>


                <div className="footer-links">

                    <div className="footer-column">

                        <h3>
                            {translations.footer.navigation.title}
                        </h3>

                        <a href="/">
                            {translations.footer.navigation.home}
                        </a>

                        <a href="/download">
                            {translations.footer.navigation.download}
                        </a>

                        <a href="/about">
                            {translations.footer.navigation.about}
                        </a>

                        <a href="/contact">
                            {translations.footer.navigation.contact}
                        </a>

                    </div>


                    <div className="footer-column">

                        <h3>
                            {translations.footer.support.title}
                        </h3>

                        <a href="/contact">
                            {translations.footer.support.contact}
                        </a>

                        <a href="#">
                            {translations.footer.support.privacy}
                        </a>

                        <a href="#">
                            {translations.footer.support.terms}
                        </a>

                    </div>

                </div>

            </div>


            <div className="footer-bottom">

                <span>
                    © {new Date().getFullYear()} Vexora
                </span>

                <span>
                    {translations.footer.madeBy}
                </span>

            </div>

        </footer>
    )
}

export default Footer