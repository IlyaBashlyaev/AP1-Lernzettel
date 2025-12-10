import {NavLink, useLocation} from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();
    const pageNumbers = Array.from({ length: 125 }, (_, index) => index + 1);

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