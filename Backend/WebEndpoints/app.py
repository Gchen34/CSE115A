from model import User, Class, Tutor, Registered, Tutoring, Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import MetaData
from flask import Flask, json, make_response
from flask_cors import CORS

WEB_ENDPOINT_PORT = 5000

app = Flask(__name__)
CORS(app)
meta = MetaData()
engine = create_engine('sqlite:///sqlalchemy_example.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
db = DBSession()

# Retrieve tutors given class ID
@app.route('/tutors/<classid>', methods=['GET'])
def get_tutors(classid):
    data = {}
    tutors = db.query(Tutor).filter_by(class_id ='CSE128').all()
    print(tutors)
    tutor_dict = []
    for tutor in tutors:
        tutor_dict.append({"name":tutor.name})
    data["tutors"] = tutor_dict 
    return app.response_class(response=json.dumps(data),status=200,mimetype='application/json')  

if __name__ == '__main__':
    app.run(port=WEB_ENDPOINT_PORT)