from app import app
from app import db

# method to create the db
with app.app_context():
    db.create_all()
