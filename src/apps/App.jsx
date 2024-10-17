import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import '../assets/css/app.css'
import LayoutMain from '../layouts/LayoutMain.jsx'
import PageNotFound from '../pages/PageNotFound.jsx'
import PageDateCalculate from '../pages/PageDateCalculate.jsx'
import PageCameraMatch from '../pages/PageCameraMatch.jsx'
import PageHome from '../pages/PageHome.jsx'

function App() {

    return (

        <Router>
            <Routes>
                <Route path='/' Component={LayoutMain}>
                    <Route
                        path=""
                        exact
                        Component={PageHome}
                    />
                    <Route
                        path="date-calculate"
                        Component={PageDateCalculate}
                    />
                    <Route
                        path="camera-match"
                        Component={PageCameraMatch}
                    />
                </Route>
                <Route path='*' Component={PageNotFound} />
            </Routes>
        </Router>
    )
}

export default App
