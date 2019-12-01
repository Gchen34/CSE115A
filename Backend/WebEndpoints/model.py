from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
 
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    email = Column(String(120), unique=True)
    def __repr__(self):
        return "<User(name='%s', email='%s')>" % (
                                self.name, self.email)

class Class(Base):
    __tablename__ = 'classes'
    id = Column(String(10), primary_key=True)
    name = Column(String(10))
    def __repr__(self):
        return "<Class(name='%s')>" % (
                                self.name)


class Tutor(Base):
    __tablename__ = 'tutor'
    id = Column(Integer, primary_key = True)
    name = Column(String(10))
    class_id = Column(String(10))
    def __repr__(self):
        return "<Tutor(name='%s', class_id='%s')>" % (
                                self.name, self.class_id)
class Registered(Base):
    __tablename__ = 'registered'
    student_id = Column(Integer, primary_key = True)
    class_id = Column(Integer, primary_key = True)
    def __repr__(self):
        return "<Registered(student_id='%s', class_id='%s')>" % (
                                self.student_id, self.class_id)

class Tutoring(Base):
    __tablename__ = 'tutoring'
    student_id = Column(Integer)
    tutor_id = Column(Integer, primary_key = True)
    class_id = Column(Integer, primary_key = True)
    def __repr__(self):
        return "<Tutoring(student_id='%s', tutor_id='%s', class_id='%s')>" % (
                                self.student_id, self.tutor_id, self.class_id)

if __name__ == "__main__":
    # Create an engine that stores data in the local directory's
    # sqlalchemy_example.db file.
    engine = create_engine('sqlite:///sqlalchemy_example.db')
 
    # Create all tables in the engine. This is equivalent to "Create Table"
    # statements in raw SQL.
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(engine)
