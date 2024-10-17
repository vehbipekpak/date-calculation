import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './apps/App.jsx'
import './assets/css/index.css'

import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style

createRoot(document.getElementById('root')).render(
    // <StrictMode></StrictMode>,
    <App/>,
)
