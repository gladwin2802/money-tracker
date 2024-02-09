import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RecordContextProvider } from './context/RecordContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RecordContextProvider>
            <App />
        </RecordContextProvider>
    </React.StrictMode>
)
