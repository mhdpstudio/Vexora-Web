import { useState } from "react"
import { Outlet } from "react-router-dom"

import Topbar from "./layouts/Topbar"
import Footer from "./layouts/Footer"
import Loading from "./components/loading"


function Layout() {
    const [loading, setLoading] = useState(false)

    const handleLanguageLoading = () => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }

    return (
        <div className="app-layout">

            {loading && <Loading />}

            <Topbar
                onLanguageChange={handleLanguageLoading}
            />

            <main className="page-content">
                <Outlet />
            </main>

            <Footer />

        </div>
    )
}


export default Layout