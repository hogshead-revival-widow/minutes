Mit *minutes* können redaktionell Arbeitende Protokolle von Ereignissen (wie z.B. der Ahrtal-Flut im Sommer 2021) erstellen, um:

- Ereignisse einmal zu notieren und das Wissen zugleich **mit allen** im Haus **teilen** zu können,
- Ereignis-**Expert:innen sicht- und ansprechbar** zu machen,
- und Ereignisse schließlich **strukturiert zu erfassen**, was eine Weiterverwendung (zum Beispiel zur Datenanalyse oder Übernahme in Archivsysteme) erleichtert.

**Achtung**: Zurzeit ist *minutes* eine Alpha-Version.

# Screenshots

| | | |
|:-------------------------:|:-------------------------:|:-------------------------:|
|![Übersicht Protokoll](/screenshots/Übersicht.png?raw=true)  Übersicht |  ![Kontakt Ereignis-Expert:in](/screenshots/Kontakt.png?raw=true "Direkter Verweis im Ereignis auf Expert:in") Verweis auf Ereignis-Expertin|![Visualisierung](/screenshots/Visualisierung.png?raw=true "Protokoll: Visualisierung") Visualisierung |
|![Suchfunktion](/screenshots/Suchfunktion.png?raw=true "Suchen im Protokoll") Suchfunktion |  ![Visualisierte Suchergebnisse](/screenshots/Suche_Visualisierung.png?raw=true "Interaktive Visualisierung") Interaktive Visualisierung |![Eingabemaske](/screenshots/Eingabemaske.png?raw=true "Eingabemaske") Eingabemaske |
|![Bearbeitungsmaske](/screenshots/Bearbeitungsmaske.png?raw=true "Bearbeitungsmaske") Bearbeitungsmaske  |  ![Swagger UI für Beispiel-Endpunkt](/screenshots/API.png?raw=true "Modellierte API")| |


# Installation 

## Entwicklung

**Vorab**: Repo klonen oder herunterladen

## Frontend

1. `cd` ins Repo
2. `cd minutes/frontend/`
3. Dort `.env`-Datei nach dem Beispiel in `minutes/examples` anlegen
4. `npm i`
5. `npm run dev`

*Minutes* ist zwar unter http://localhost:5173/ erreichbar, wird aber einen Fehler anzeigen. Schließlich läuft das Backend noch nicht.

## Backend

1. `cd` ins Repo
2. `cd minutes/backend/settings`
3. Dort `.secrets.toml` nach dem Beispiel in `minutes/examples` anlegen und ggf. `config.toml` anpassen
4. `cd minutes/backend`
5. `python3 -m venv .venv` 
6. `source .venv/bin/activate`
7. `pip install .`
8. `mkdir uploads` (oder was auch immer in in .secrets.toml angegeben wurde)
9. `minutes` (vgl. `minutes --help` für Konfigurationsmöglichkeiten)

Die API ist unter http://localhost:8000 (Swagger UI unter: http://localhost:8000/docs) erreichbar. 

Und *minutes* wartet nun ohne Fehler unter http://localhost:5173

## API-Client für Frontend automatisch generieren
 
Unter http://localhost:8000/openapi.json ist die API-Spezifikation verfügbar. Mit dieser kann per `npx swagger-typescript-api -p openapi.json -o ./src --unwrap-response-data --single-http-client --modular` ein Client erzeugt werden.
 

## Produktion

### Frontend

Statt `npm run dev` (Schritt 6) `npm run build` ausführen.  In `minutes/frontend/build` finden sich nun Javascript-Dateien, die so von beliebigen Webservern statisch ausgeliefert werden können. Mehr Informationen dazu finden sich [hier](https://kit.svelte.dev/docs/adapters#supported-environments-static-sites).

Mit `npm run preview` lässt sich die Produktivbuild ausprobieren. 

### Backend

Statt `minutes` (Schritt 8) `ENV_FOR_MINUTES=production minutes` ausführen und die mit `?` markierten Werte in `minutes/backend/settings/config.toml` ersetzen.

Je nach Verwendungszweck empfiehlt sich in `.secrets.toml` unter `[production.db]` eine andere Datenbank als SQLite (z. B. PostgreSQL) einzusetzen sowie uvicorn in Verbindung mit z. B. guvicorn zu nutzen; Informationen zu Letzterem finden sich [hier](https://fastapi.tiangolo.com/deployment/server-workers/).


# Nutzung

Wurde nichts geändert, ist *minutes* nun unter http://localhost:5173 zu erreichen, die API unter http://localhost:8000 (Swagger UI unter: http://localhost:8000/docs).


