import contextlib
from model import User, Class, Tutor, Registered, Tutoring, Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import MetaData

engine = create_engine('sqlite:///sqlalchemy_example.db')
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
db = DBSession()
tutors = db.query(Tutor).filter_by(class_id ='CSE128').all()
print(tutors)
test_user = User(id = 1, name = 'Priya',email= 'prajarat@ucsc.edu')
test_user1 = User(id = 2, name = 'Austin',email = 'ajyuan@ucsc.edu')
test_class = Class(id = 'CS128', name = 'CS128')
test_class1 = Class(id = 'CS133', name = 'CS133')
test_tutor = Tutor(id = 1, name = 'Priya', class_id = 'CSE128')
test_tutor1 = Tutor(id = 2, name = 'Austin', class_id = 'CSE133')
test_tutor3 = Tutor(id = 3, name = 'zoowee', class_id = 'CSE128')
db.add(test_user)
db.add(test_user1)
db.add(test_class)
db.add(test_class1)
db.add(test_tutor)
db.add(test_tutor1)
db.add(test_tutor3)
db.commit()
tutors = db.query(Tutor).filter_by(class_id ='CSE128').all()
print(tutors)

print("finished")