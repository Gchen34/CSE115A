from flask import Flask, json
app = Flask(__name__)

# Retrieve tutors given class ID
@app.route('/tutors/<classid>', methods=['GET'])
def get_tutors(classid):
    data = {}
    if classid == 'CSE128':
        data = {"tutors":[{"name":"Austin Yuan","grade":"A"}, {"name":"Priya Rajarathinam","grade":"C"}]}
    elif classid == 'CSE140':
        data = {"tutors":[{"name":"Fizz Buzz","grade":"B+"}]}
    return app.response_class(response=json.dumps(data),status=200,mimetype='application/json')   