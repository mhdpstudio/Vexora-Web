import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom"

import Layout from "./widgets/Layout.jsx"

import Home from "./pages/Home"
import Download from "./pages/Download"
import About from "./pages/About"
import Contact from "./pages/Contact.jsx"

import ScrollToTop from "./hooks/useScrollToTop.jsx"


function App() {
    return (
        <BrowserRouter>

            {/* يرجع الصفحة لأعلى عند تغيير الصفحة */}
            <ScrollToTop />

            <Routes>

                <Route element={<Layout />}>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/download"
                        element={<Download />}
                    />

                    <Route
                        path="/about"
                        element={<About />}
                    />

                    <Route
                        path="/contact"
                        element={<Contact />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    )
}

export default App