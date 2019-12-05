import requests
import pytest
import contextlib
from flask import Flask, request, Response, abort, jsonify, json

class TestPisaAPIServer():
    def test_course_fetch_nonempty(self):
        assert(len(requests.get(url='http://127.0.0.1:5001/api/v1.0/courses/all/50000').json()))

class TestWebAPIServer():
    def test_course_fetch_nonempty(self):
        assert(len(requests.get(url='http://127.0.0.1:5000/api/courses/all').json()))
    def test_fetch_tutors(self):
        requests.post(url='http://127.0.0.1:5000/api/addtutor', data = {'id': 'test@gmail.com', 'name': 'test user', 'class_id':json.dumps(["CSE120"])})
        output = requests.get(url='http://127.0.0.1:5000/api/tutors/CSE120').json()
        print(output)
        assert(output['tutors'][0]['name'] == 'test user')
        assert(output['tutors'][0]['email'] == 'test@gmail.com')
    def test_fetch_users(self):
        requests.post(url='http://127.0.0.1:5000/api/adduser', data = {'email': 'test@gmail.com','name': 'test user'})
        output = requests.get(url = 'http://127.0.0.1:5000/api/user/test@gmail.com').json()
        assert(output['name'] == 'test user')
        assert(output['email'] ==  'test@gmail.com')

