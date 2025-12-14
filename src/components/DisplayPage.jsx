import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ScaleControl from "./ScaleControl.jsx";
import ToggleTheme from "./ToggleTheme.jsx";

export default function DisplayPage() {
    const { pageNumber } = useParams();
    const navigate = useNavigate();
    const pageNum = Number(pageNumber);
    const [scale, setScale] = useState(1);
    const [error, setError] = useState('');

    const handleScaleChange = (nextScale) => {
        const clamped = Math.min(2, Math.max(0.5, nextScale));
        setScale(Number(clamped.toFixed(2)));
    };

    useEffect(() => {
        if (Number.isNaN(pageNum) || pageNum < 1 || pageNum > 125) {
            navigate('/');
            return;
        }
        setError('');
    }, [pageNum, navigate]);

    /* window.onload = () => {
        const iframe = document.querySelector('iframe.page-iframe');
        iframe.style.width  = window.innerWidth + 'px';
    };

    window.onresize = () => {
        const iframe = document.querySelector('iframe.page-iframe');
        iframe.style.width  = window.innerWidth + 'px';
    }; */

    return (
        <div className="page-view">
            <div className="page-toolbar">
                <div className="page-title">
                    {pageNum > 1 && (
                        <NavLink
                            to={`/page/${pageNum - 1}`}
                            className="scale-control"
                        >←</NavLink>
                    )}
                    <strong>Seite {pageNum}</strong>
                    {pageNum < 125 && (
                        <NavLink
                            to={`/page/${pageNum + 1}`}
                            className="scale-control"
                        >→</NavLink>
                    )}
                </div>
                <div className="toolbar-actions">
                    <ScaleControl scale={scale} onChange={handleScaleChange} />
                    <ToggleTheme/>
                </div>
            </div>

            <div className="page-stage">
                {error && <div className="page-status error">{error}</div>}
                {!error && (
                    <div className="page-frame">
                        <div className="page-canvas" style={{transform: `scale(${scale})`}}>
                            <iframe
                                title={`Seite ${pageNum}`}
                                src={`/pages/html/AP1_Lernzettel_${pageNum}.html`}
                                className="page-iframe"
                                onError={() => setError('Seite konnte nicht geladen werden.')}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};