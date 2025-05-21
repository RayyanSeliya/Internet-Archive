import internetarchive
from models import InternetArchiveRecording, Base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

engine = create_engine('sqlite:///ia.db')
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

def fetch_and_store_ia_metadata(limit=50):
    results = internetarchive.search_items('collection:GratefulDead AND mediatype:audio')
    count = 0
    for item in results:
        identifier = item.get('identifier')
        print(f"Checking item: {identifier}")
        # Fetch full metadata for the item
        ia_item = internetarchive.get_item(identifier)
        files = list(ia_item.get_files())
        print(f"  Number of files: {len(files)}")
        if not files:
            print(f"  No files found for item: {identifier}")
        for file in files:
            # File objects have attributes, not dictionary keys
            fmt = file.format.lower() if hasattr(file, 'format') and file.format else ''
            name = file.name
            print(f"    File format: {fmt}")
            if fmt.endswith('mp3') or 'ogg' in fmt:
                audio_url = f"https://archive.org/download/{identifier}/{name}"
                if not session.query(InternetArchiveRecording).filter_by(audio_url=audio_url).first():
                    session.add(InternetArchiveRecording(
                        identifier=identifier,
                        title=item.get('title', ''),
                        creator=item.get('creator', ''),
                        date=item.get('date', ''),
                        audio_url=audio_url
                    ))
                    count += 1
                    print(f"Added: {audio_url}")
                    if count % 10 == 0:
                        print(f"Progress: {count} tracks added...")
                        session.commit()  # Commit every 10 tracks to avoid losing progress
                    if count >= limit:
                        session.commit()
                        print(f"Reached limit of {limit} recordings. Stopping indexer.")
                        return
    session.commit()
    print(f"Finished indexing. Total recordings added: {count}")

if __name__ == '__main__':
    fetch_and_store_ia_metadata()
