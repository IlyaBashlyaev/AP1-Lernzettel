export default function StartPage() {
    return (
        <div className="start-page">
            <div className="start-copy">
                <p className="eyebrow">AP1 IT-Berufe</p>
                <h1>AP1 IT-Berufe Lernzettel</h1>
                <p className="lead">
                    Der Inhalt wurde aus dem PDF-Dokument in Fachinformatiker.de erstellt. Alle 125 Seiten sind als eigene
                    Ansicht verfügbar und ihre Inhalte bleiben unverändert.
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
}