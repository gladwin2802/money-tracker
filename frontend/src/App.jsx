import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react';

import Home from './pages/Home'
import Navbar from './components/Navbar'
import ScrollToTopButton from './components/ScrollToTopButton'

function App() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoaded(true);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className={`app ${loaded ? 'loaded' : ''}`}>
            <BrowserRouter>
                <Navbar />
                <div className="pages">
                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}
                        />
                    </Routes>
                <ScrollToTopButton />
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
