import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import ScaleControl from "./ScaleControl.jsx";
import ToggleTheme from "./ToggleTheme.jsx";

export default function DisplayPage() {
    const { pageNumber } = useParams();
    const navigate = useNavigate();
    const pageNum = Number(pageNumber);
    const [scale, setScale] = useState(1);
    const [error, setError] = useState('');
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragState = useRef({ active: false, origin: { x: 0, y: 0 }, start: { x: 0, y: 0 } });

    const handleScaleChange = (nextScale) => {
        const clamped = Math.min(2, Math.max(0.5, nextScale));
        const value = Number(clamped.toFixed(2));
        setScale(value);

        if (value <= 1) {
            setPan({ x: 0, y: 0 });
        }
    };

    useEffect(() => {
        if (Number.isNaN(pageNum) || pageNum < 1 || pageNum > 125) {
            navigate('/');
            return;
        }
        setError('');
    }, [pageNum, navigate]);

    useEffect(() => {
        setPan({ x: 0, y: 0 });
    }, [pageNum]);

    useEffect(() => {
        const handleWindowMove = (event) => {
            if (!dragState.current.active) return;

            const dx = event.clientX - dragState.current.start.x;
            const dy = event.clientY - dragState.current.start.y;
            setPan({
                x: dragState.current.origin.x + dx,
                y: dragState.current.origin.y + dy,
            });
        };

        const handleWindowUp = () => {
            if (!dragState.current.active) return;
            dragState.current.active = false;
            setIsDragging(false);
        };

        window.addEventListener('mousemove', handleWindowMove);
        window.addEventListener('mouseup', handleWindowUp);
        window.addEventListener('mouseleave', handleWindowUp);

        return () => {
            window.removeEventListener('mousemove', handleWindowMove);
            window.removeEventListener('mouseup', handleWindowUp);
            window.removeEventListener('mouseleave', handleWindowUp);
        };
    }, []);

    const handleDragStart = (event) => {
        if (scale <= 1) return;

        event.preventDefault();
        dragState.current = {
            active: true,
            origin: pan,
            start: { x: event.clientX, y: event.clientY },
        };
        setIsDragging(true);
    };

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
                        <div
                            className={`page-canvas ${scale > 1 ? 'is-zoomed' : ''} ${isDragging ? 'is-dragging' : ''}`}
                            onMouseDown={handleDragStart}
                        >
                            <div
                                className="page-sheet"
                                style={{
                                    left: window.innerWidth >= 1200 && scale < 1 ? (1 - scale) * 50 + '%' : '',
                                    width: window.innerWidth < 1200 && scale < 1 ? 100 / scale + 'vw' : '100%',
                                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`
                                }}
                            >
                                <iframe
                                    title={`Seite ${pageNum}`}
                                    src={`/pages/html/AP1_Lernzettel_${pageNum}.html`}
                                    className="page-iframe"
                                    onError={() => setError('Seite konnte nicht geladen werden.')}
                                    style={{ pointerEvents: scale > 1 ? 'none' : 'auto' }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
