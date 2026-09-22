import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faChevronDown,
    faCheck,
    faBars,
    faXmark,
} from "@fortawesome/free-solid-svg-icons"

import useLanguage from "../../hooks/useLanguage"

import "flag-icons/css/flag-icons.min.css"
import "../../styles/widgets/topbar.css"


function Topbar({ onLanguageChange }) {
    const { language, translations, changeLanguage } = useLanguage()

    const [languageOpen, setLanguageOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    const languageRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                languageRef.current &&
                !languageRef.current.contains(event.target)
            ) {
                setLanguageOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            )
        }
    }, [])

    const handleLanguageChange = (newLanguage) => {
        if (newLanguage === language) {
            setLanguageOpen(false)
            return
        }

        setLanguageOpen(false)

        onLanguageChange()

        setTimeout(() => {
            changeLanguage(newLanguage)
        }, 300)
    }

    const handleMenuLinkClick = () => {
        setMenuOpen(false)
    }

    return (
        <header className="topbar">

            <div className="topbar-container">

                {/* Logo */}

                <NavLink
                    to="/"
                    className="topbar-logo"
                    onClick={handleMenuLinkClick}
                >
                    <img
                        src="/icon.png"
                        alt="Vexora"
                        className="topbar-logo-icon"
                    />

                    <span>Vexora</span>
                </NavLink>


                {/* Desktop Navigation */}

                <nav className="topbar-nav">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "topbar-link active"
                                : "topbar-link"
                        }
                    >
                        {translations.nav.home}
                    </NavLink>

                    <NavLink
                        to="/download"
                        className={({ isActive }) =>
                            isActive
                                ? "topbar-link active"
                                : "topbar-link"
                        }
                    >
                        {translations.nav.download}
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive
                                ? "topbar-link active"
                                : "topbar-link"
                        }
                    >
                        {translations.nav.about}
                    </NavLink>

                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive
                                ? "topbar-link active"
                                : "topbar-link"
                        }
                    >
                        {translations.nav.contact}
                    </NavLink>

                </nav>


                {/* Actions */}

                <div className="topbar-actions">

                    {/* Language */}

                    <div
                        className="language-selector"
                        ref={languageRef}
                    >

                        <button
                            type="button"
                            className={`language-button ${
                                languageOpen ? "open" : ""
                            }`}
                            onClick={() =>
                                setLanguageOpen(
                                    (value) => !value
                                )
                            }
                            aria-expanded={languageOpen}
                            aria-haspopup="listbox"
                        >

                            <span className="language-flag">
                                <span
                                    className={`fi fi-${
                                        language === "ar"
                                            ? "eg"
                                            : "us"
                                    }`}
                                />
                            </span>

                            <span className="language-name">
                                {language === "ar"
                                    ? translations.language.arabic
                                    : translations.language.english}
                            </span>

                            <span className="language-arrow">
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                />
                            </span>

                        </button>


                        {languageOpen && (
                            <div
                                className="language-menu"
                                role="listbox"
                            >

                                {/* Arabic */}

                                <button
                                    type="button"
                                    className={`language-option ${
                                        language === "ar"
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleLanguageChange("ar")
                                    }
                                >

                                    <span className="language-option-flag">
                                        <span className="fi fi-eg" />
                                    </span>

                                    <span className="language-option-content">
                                        <strong>
                                            العربية
                                        </strong>

                                        <small>
                                            Arabic
                                        </small>
                                    </span>

                                    {language === "ar" && (
                                        <span className="language-check">
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                            />
                                        </span>
                                    )}

                                </button>


                                {/* English */}

                                <button
                                    type="button"
                                    className={`language-option ${
                                        language === "en"
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleLanguageChange("en")
                                    }
                                >

                                    <span className="language-option-flag">
                                        <span className="fi fi-us" />
                                    </span>

                                    <span className="language-option-content">
                                        <strong>
                                            English
                                        </strong>

                                        <small>
                                            English
                                        </small>
                                    </span>

                                    {language === "en" && (
                                        <span className="language-check">
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                            />
                                        </span>
                                    )}

                                </button>

                            </div>
                        )}

                    </div>


                    {/* Mobile Menu Button */}

                    <button
                        type="button"
                        className="topbar-menu-button"
                        onClick={() =>
                            setMenuOpen((value) => !value)
                        }
                        aria-label="Open menu"
                        aria-expanded={menuOpen}
                    >
                        <FontAwesomeIcon
                            icon={
                                menuOpen
                                    ? faXmark
                                    : faBars
                            }
                        />
                    </button>

                </div>

            </div>


            {/* Mobile Menu */}

            {menuOpen && (
                <div className="mobile-menu">

                    <nav className="mobile-menu-nav">

                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "mobile-menu-link active"
                                    : "mobile-menu-link"
                            }
                            onClick={handleMenuLinkClick}
                        >
                            {translations.nav.home}
                        </NavLink>

                        <NavLink
                            to="/download"
                            className={({ isActive }) =>
                                isActive
                                    ? "mobile-menu-link active"
                                    : "mobile-menu-link"
                            }
                            onClick={handleMenuLinkClick}
                        >
                            {translations.nav.download}
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive
                                    ? "mobile-menu-link active"
                                    : "mobile-menu-link"
                            }
                            onClick={handleMenuLinkClick}
                        >
                            {translations.nav.about}
                        </NavLink>

                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive
                                    ? "mobile-menu-link active"
                                    : "mobile-menu-link"
                            }
                            onClick={handleMenuLinkClick}
                        >
                            {translations.nav.contact}
                        </NavLink>

                    </nav>

                </div>
            )}

        </header>
    )
}

export default Topbar