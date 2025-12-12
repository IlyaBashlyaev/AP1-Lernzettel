import {useEffect, useState} from "react";

export default function ToggleTheme() {
    const [theme, setTheme] = useState(localStorage.getItem('theme'));

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <button
            type="button"
            className="ghost"
            aria-label="Theme umschalten"
            onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
        >
            {theme === 'light' ? '☀️' : '🌙'}
        </button>
    );
}