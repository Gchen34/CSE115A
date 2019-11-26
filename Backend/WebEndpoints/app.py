from model import User, Class, Tutor, Registered, Tutoring, Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import MetaData
from flask import Flask, json, make_response
from flask_cors import CORS
import requests

WEB_ENDPOINT_PORT = 5000
COURSES = {}
COURSES_OUTDATED = False

app = Flask(__name__)
CORS(app)
meta = MetaData()
engine = create_engine('sqlite:///sqlalchemy_example.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
db = DBSession()

# Retrieve tutors given class ID
@app.route('/api/tutors/<classid>', methods=['GET'])
def get_tutors(classid):
    data = {}
    tutors = db.query(Tutor).filter_by(class_id ='CSE128').all()
    print(tutors)
    tutor_dict = []
    for tutor in tutors:
        tutor_dict.append({"name":tutor.name})
    data["tutors"] = tutor_dict 
    return app.response_class(response=json.dumps(data),status=200,mimetype='application/json')  

@app.route('/api/courses/all')
def get_courses():
    return app.response_class(response=json.dumps(COURSES),status=200,mimetype='application/json')  

def enter_courses_into_db():
    for id, name in COURSES.items():
        cl = Class(id=id, name=name)
        db.add(cl)
    db.commit()

@app.route('/api/users')
def add_user(id, name, email):
    data = {}
    user = User(id = id, name = name, email = email)
    db.query(User).add(user)
    db.commit()

if __name__ == '__main__':
    # Fetch COURSES
    print('Retrieving course list')
    resp = requests.get(url='http://127.0.0.1:5001/api/v1.0/courses/all/50000').json()
    
    # Parse course data
    for course in resp:
        key = course['class_name'][:course['class_name'].index('-')-1].replace(' ','')
        if key not in COURSES:
            COURSES[key] = course['class_name'][course['class_name'].index('-')+7:].replace('&amp;', 'and').replace('\u00a0', ' ')
    print(COURSES)
    print('Course list retrieved!')

    if COURSES_OUTDATED:
        enter_courses_into_db()
        print('Course DB updated!')

    app.run(port=WEB_ENDPOINT_PORT)

