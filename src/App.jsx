import { useEffect, useState } from 'react';
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import './App.css';

const TOTAL_PAGES = 125;
const pageNumbers = Array.from({ length: TOTAL_PAGES }, (_, index) => index + 1);

const htmlPath = (pageNumber) => `/pages/html/AP1_Lernzettel_${pageNumber}.html`;

const StartPage = () => (
  <div className="start-page">
    <div className="start-copy">
      <p className="eyebrow">AP1 IT-Berufe</p>
      <h1>AP1 IT-Berufe Lernzettel</h1>
      <p className="lead">
        Der Inhalt wurde aus dem PDF-Dokument in Fachinformatiker.de erstellt. Alle 125 Seiten sind als eigene Ansicht verfügbar und ihre Inhalte bleiben unverändert.
      </p>
      <a
        className="link-chip"
        href="https://www.fachinformatiker.de/files/file/36-fachinformatiker-ap1-lernzettel-ab-2025/"
        target="_blank"
        rel="noreferrer"
      >
        https://www.fachinformatiker.de/files/file/36-fachinformatiker-ap1-lernzettel-ab-2025/
      </a>
    </div>
    <div className="start-card">
      <div className="start-card__content">
        <h2>Alle Seiten im Überblick</h2>
        <p>Nutze die linke Seitenleiste, um direkt zu einer Seite zu springen.</p>
        <div className="start-grid">
          <div className="stat">
            <span className="stat__label">Seiten</span>
            <span className="stat__value">125</span>
          </div>
          <div className="stat">
            <span className="stat__label">Themenfelder</span>
            <span className="stat__value">IT &amp; Technik</span>
          </div>
          <div className="stat">
            <span className="stat__label">Inhalt</span>
            <span className="stat__value">Original</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ScaleControl = ({ scale, onChange }) => (
  <div className="scale-control">
    <span>Zoom</span>
    <button type="button" onClick={() => onChange(scale - 0.1)}>−</button>
    <input
      type="range"
      min="0.5"
      max="2"
      step="0.05"
      value={scale}
      onChange={(event) => onChange(Number(event.target.value))}
    />
    <button type="button" onClick={() => onChange(scale + 0.1)}>+</button>
    <span className="scale-value">{Math.round(scale * 100)}%</span>
  </div>
);

const PageView = ({ scale, onScaleChange }) => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const pageNum = Number(pageNumber);
  const [theme, setTheme] = useState('light');
  const [error, setError] = useState('');

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

  useEffect(() => {
    if (Number.isNaN(pageNum) || pageNum < 1 || pageNum > TOTAL_PAGES) {
      navigate('/');
      return;
    }
    setError('');
  }, [pageNum, navigate]);

  return (
    <div className="page-view">
      <div className="page-toolbar">
        <div className="page-title">
          <NavLink
            to={`/page/${pageNum - 1}`}
            className="scale-control"
          >
            ←
          </NavLink>
          <strong>Seite {pageNum}</strong>
          <NavLink
            to={`/page/${pageNum + 1}`}
            className="scale-control"
          >→</NavLink>
        </div>
        <div className="toolbar-actions">
          <ScaleControl scale={scale} onChange={onScaleChange} />
          <button
            type="button"
            className="ghost"
            aria-label="Theme umschalten"
            onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
          >
            {theme === 'light' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      <div className="page-stage">
        {error && <div className="page-status error">{error}</div>}
        {!error && (
          <div className="page-frame">
            <div className="page-canvas" style={{ transform: `scale(${scale})` }}>
              <iframe
                title={`Seite ${pageNum}`}
                src={htmlPath(pageNum)}
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

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="dot" />
        <div>
          <p className="brand-eyebrow">AP1 IT-Berufe</p>
          <p className="brand-title">Lernzettel</p>
        </div>
      </div>

      <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
        Startseite
      </NavLink>

      <div className="sidebar__section">
        <p className="section-title">Inhaltsverzeichnis</p>
        <div className="nav-list">
          {pageNumbers.map((page) => (
            <NavLink
              key={page}
              to={`/page/${page}`}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : location.pathname === '/' ? 'nav-link dim' : 'nav-link'
              }
            >
              Seite {page}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
};

const AppShell = () => {
  const [scale, setScale] = useState(1);

  const handleScaleChange = (nextScale) => {
    const clamped = Math.min(2, Math.max(0.5, nextScale));
    setScale(Number(clamped.toFixed(2)));
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="content">
        <main className="content__body">
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route
              path="/page/:pageNumber"
              element={<PageView scale={scale} onScaleChange={handleScaleChange} />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AppShell;
