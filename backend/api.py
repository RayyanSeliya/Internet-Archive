from flask import Flask, request, jsonify
from models import InternetArchiveRecording, Base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, or_

app = Flask(__name__)
engine = create_engine('sqlite:///ia.db')
Session = sessionmaker(bind=engine)

@app.route('/api/ia/search')
def search_ia():
    query = request.args.get('q', '')
    session = Session()
    results = session.query(InternetArchiveRecording).filter(
        or_(
            InternetArchiveRecording.title.ilike(f'%{query}%'),
            InternetArchiveRecording.creator.ilike(f'%{query}%'),
            InternetArchiveRecording.audio_url.ilike(f'%{query}%')
        )
    ).all()
    return jsonify([
        {
            "title": rec.title,
            "creator": rec.creator,
            "date": rec.date,
            "audio_url": rec.audio_url
        } for rec in results
    ])

if __name__ == '__main__':
    app.run(debug=True)