# AP1 Vorbereitung – Lernzettel als Anwendung

Diese Anwendung stellt die 125 Seiten des AP1-Lernzettels für IT-Berufe als React-Anwendung bereit. Jede Seite ist über einen eigenen Pfad (`/page/1` … `/page/125`) aufrufbar.

Der Lernzettel dient als Vorbereitung für die Abschlussprüfung Teil 1 von der IHK. Es wird für diese IT-Berufe nutzbar:

- Fachinformatiker/-in Anwendungsentwicklung
- Fachinformatiker/-in Systemintegration
- Fachinformatiker/-in Daten- und Prozessanalyse
- Fachinformatiker/-in Digitale Vernetzung
- IT-System-Elektroniker/-in
- Kaufmann/Kauffrau für IT-System-Management
- Kaufmann/Kauffrau für Digitalisierungsmanagement

## Quelle

*Alle Inhalte stammen aus dem PDF-Dokument auf Fachinformatiker.de:*
https://www.fachinformatiker.de/files/file/36-fachinformatiker-ap1-lernzettel-ab-2025/ (Autor: philipredstone)

## Development

- Abhängigkeiten installieren (falls nötig): `npm install`
- Entwicklung starten: `npm run dev`
- Seitenaufruf: `http://localhost:5173/page/1` (oder jede andere Seite 1–125)

## Assets

- Original-HTML-Seiten: `public/pages/html/AP1_Lernzettel-[n].html`
- Hintergrundbilder: `public/pages/png/AP1_Lernzettel[n].png`

## Features

- Sidebar-Navigation mit deutschsprachigen Seitentiteln
- Light/Dark-Theme-Umschalter
- Zoom 50–200 % für die Seitenansicht
