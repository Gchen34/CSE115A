# Backend
The backend consists of two API servers.
## Execution
To fetch an updated list of courses, you must first run the Pisa search API server, located in /PisaSearchAPI. Cd to the appropriate directory and run 
```python ucsc_courses.py```

Next, run the main API server for our webapp located in WebEndpoints. Cd to the directory and run ```python app.py```.

## Structure
### PisaSearchAPI
An API server that interacts with UCSC's Pisa course website. It is used for retrieving class information. This code is a fork of https://github.com/AndrewLien/UCSC_Courses_API, an open source 

### WebEndpoints
The API server that website users directly interact with. It will handle retrieving user data, tutoring information, and other information from our database.

## Testing
test_server.py contains tests to ensure proper functionality