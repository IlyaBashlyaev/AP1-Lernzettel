import {useMemo, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import tocRaw from "../../Inhaltsverzeichnis/AP1_Lernzettel_Inhaltsverzeichnis.txt?raw";

const parseTopics = (text) => {
    return text
        .split("\n")
        .map((line) => {
            const trimmed = line.trim();
            if (!trimmed) return null;

            const match = trimmed.match(/^(\d+(?:\.\d+)*)\.?\s+(.+?)\s*\(S\.?\s*(\d+)\)/i);
            if (!match) return null;

            const [, number, title, page] = match;
            const depth = line.startsWith("\t") ? 2 : 1;

            return {
                number,
                title: title.trim(),
                page: Number(page),
                depth,
            };
        })
        .filter(Boolean);
};

export default function Sidebar() {
    const location = useLocation();
    const [viewMode, setViewMode] = useState("topics");
    const pageNumbers = Array.from({ length: 125 }, (_, index) => index + 1);
    const topics = useMemo(() => parseTopics(tocRaw), []);

    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');

    const buildLinkClass = (isTopic = false, number = null, depth = 1) => ({ isActive }) => {
        const baseClass = isTopic ? `nav-link topic-link${depth > 1 ? " subtopic" : ""}` : "nav-link";

        if (isActive && number === id) return `${baseClass} active`;

        if (location.pathname === "/") return `${baseClass} dim`;
        return baseClass;
    };

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
                <div className="section-header">
                    <p className="section-title">Inhaltsverzeichnis</p>
                    <select
                        className="section-select"
                        value={viewMode}
                        onChange={(event) => setViewMode(event.target.value)}
                    >
                        <option value="topics">Themen</option>
                        <option value="pages">Seiten</option>
                    </select>
                </div>

                <div className={`nav-list ${viewMode === "topics" ? "topics-view" : ""}`}>
                    {viewMode === "topics"
                        ? topics.map(({ number, title, page, depth }) => (
                            <NavLink
                                key={`${number}-${page}`}
                                to={`/page/${page}?id=${number}`}
                                className={buildLinkClass(true, number, depth)}
                            >
                                <span className="topic-label">
                                    <span className="topic-number">{number}</span>
                                    <span className="topic-title-text">{title}</span>
                                </span>
                                <span className="topic-page">{page}</span>
                            </NavLink>
                        ))
                        : pageNumbers.map((page) => (
                            <NavLink
                                key={page}
                                to={`/page/${page}`}
                                className={buildLinkClass()}
                            >
                                Seite {page}
                            </NavLink>
                        ))}
                </div>
            </div>
        </aside>
    );
};
