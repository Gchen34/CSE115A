import requests
import pytest

class TestPisaAPIServer():
    def test_course_fetch_nonempty(self):
        assert(len(requests.get(url='http://127.0.0.1:5001/api/v1.0/courses/all/50000').json()))

class TestWebAPIServer():
    def test_course_fetch_nonempty(self):
        assert(len(requests.get(url='http://127.0.0.1:5000/api/courses/all').json()))
    def test_fetch_tutors(self):
        assert(len(requests.get(url='http://127.0.0.1:5000/api/tutors/CSE138').json()))