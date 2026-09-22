import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react"

import ar from "../data/languages/ar.json"
import en from "../data/languages/en.json"

const languages = {
    ar,
    en,
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem("vexora-language") || "ar"
    })

    useEffect(() => {
        localStorage.setItem("vexora-language", language)

        document.documentElement.lang = language

        document.documentElement.dir =
            language === "ar" ? "rtl" : "ltr"
    }, [language])

    const changeLanguage = (newLanguage) => {
        if (!languages[newLanguage]) {
            return
        }

        setLanguage(newLanguage)
    }

    const translations = languages[language]

    return (
        <LanguageContext.Provider
            value={{
                language,
                translations,
                changeLanguage,
            }}
        >
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)

    if (!context) {
        throw new Error(
            "useLanguage must be used inside LanguageProvider"
        )
    }

    return context
}