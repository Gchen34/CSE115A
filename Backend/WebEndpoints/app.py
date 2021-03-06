from model import User, Class, Tutor, Registered, Tutoring, Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import MetaData
from flask import Flask, request, Response, abort, jsonify, json
from flask import Flask, json, make_response
from flask_cors import CORS
import requests
from notify import sendNotification
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
    tutors = db.query(Tutor).filter_by(class_id = classid).all()
    print(tutors)
    tutor_dict = []
    for tutor in tutors:
        tutor_dict.append({"name":tutor.name, "email":tutor.email})
    data["tutors"] = tutor_dict 
    return app.response_class(response=json.dumps(data),status=200,mimetype='application/json')  
# add tutor given list of classes
@app.route('/api/addtutor', methods = ['POST'])
def add_tutor():
    print("added tutor")
    id = request.form['id']
    name = request.form['name']
    class_id = json.loads(request.form['class_id'])
    print(class_id)
    for input in class_id:
        tutor_entry = Tutor(id = (id + "_" + input), email = id, name = name,class_id = input)
        db.add(tutor_entry)

    db.flush()
    db.commit()

    return app.response_class(status = 200)
# get all courses
@app.route('/api/courses/all')
def get_courses():
    return app.response_class(response=json.dumps(COURSES),status=200,mimetype='application/json')  
# add user to db after sign up
@app.route('/api/adduser',methods = ['POST'])
def add_user():
    email = request.form['email']
    name = request.form['name']
    new_user = User(id = email, name = name,email = email)
    try:
        db.add(new_user)
        db.flush()
        db.commit()
    except IntegrityError:
        db.rollback()
    return app.response_class(status=200)
# get user information
@app.route('/api/user/<userid>', methods = ['GET'])
def get_User(userid):
    print(userid)
    user = db.query(User).filter_by(id = userid).all()
    user_dict = {}
    user_dict['name'] = user[0].name
    user_dict['email'] = user[0].email
    return app.response_class(response=json.dumps(user_dict),status=200,mimetype='application/json')

# send email notification 
@app.route('/api/sendNotification', methods = ['POST'])
def send_Email():
    print("in send email")
    receiver_email = request.form['receiver_email']
    receiver_name = request.form['receiver_name']
    student_email = request.form['student_email']
    student_name = request.form['student_name']
    class_name = request.form['class_name']
    print(request.form)
    sendNotification(receiver_email,student_email,student_name,receiver_name, class_name)
    return app.response_class(status=200)

def enter_courses_into_db():
    for id, name in COURSES.items():
        cl = Class(id=id, name=name)
        db.add(cl)
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