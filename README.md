# Internet Archive Audio Search

A concise full-stack web app to search and stream audio tracks from the Internet Archive using a local database.  
Built with **React** (frontend) and **Flask + SQLAlchemy** (backend).

---

## Demo Video

*Demo video will be added here.*

---

## Features

- Search songs in your local archive database
- Stream audio directly from the Internet Archive
- Clean, modern UI

---

## Quick Note

For demo purposes, the indexer fetches up to 50 tracks (see `indexer.py`) due to API rate limits. This can be expanded later.

---

## Getting Started

**Backend:**

`cd backend`
`python -m venv venv`

## Activate the virtual environment:
**On Linux/Mac:**
`source venv/bin/activate` 

**On Windows:**
`source venv\Scripts\activate`

`pip install flask sqlalchemy requests`

**Index Internet Archive data (fetches track info into ia.db):**
`python indexer.py`

**Start the Flask API:**
`python api.py`

---

### 2. Frontend

**Install dependencies:**
`cd ../frontend`

`npm install`


**Start the React app:**

`npm run dev`

The app runs at [http://localhost:5173](http://localhost:5173)
---

## Usage

- Open [http://localhost:5173](http://localhost:5173)
- Enter a song name (e.g. Peggy O, Sunshine, Queen Jane)
- Click **Search**
- Play a song or click **Open in Archive** to visit the original file

![image](https://github.com/user-attachments/assets/2785fbfa-712b-4812-8a1a-75625eb61955)


---

## Troubleshooting

**No results?**  
- Make sure `ia.db` contains tracks (run `indexer.py`).
- Try searching for a different song name.

**Slow audio loading?**  
- Archive.org files are large; buffering may take time.

**CORS errors?**  
- Ensure the frontend proxies `/api` requests to the backend.

---

## Customization

- **Indexer:** Edit `indexer.py` to fetch different collections or formats.
- **UI:** All styling is in `App.tsx` (frontend/src).
- **Database:** Schema in `models.py` (backend).

---

## Credits

- Internet Archive for audio content and API
- React and Flask frameworks 


