# CSE115A - SlugStudy

## Code Structure
### Website
The website directory contains the HTML/CSS/JS that is served to the user

### Backend
The backend directory contains the backend logic & database code

### Testing
This directory contains the testing code for our project

# Installation
To run this project, you will require Python 3.x. Install the required Python modules using the command
```pip install -r requirements.txt```

# Execution
## Starting the API Servers
The first step to running this project is starting up the API servers to serve user requests. Cd to the Backend directory and run the following steps:

* To fetch an updated list of courses, you must first run the Pisa search API server, located in /PisaSearchAPI. Cd to the appropriate directory and run 
```python ucsc_courses.py```

* Next, run the main API server for our webapp located in WebEndpoints. Cd to the directory and run ```python app.py```.

## Opening the Webpage
Once the API servers have both successfully started, you can open an HTML page to view the webpage. Webpage files are viewable in the ```Website``` directory. Open ```search.html``` and browse the webpages on the web browser of your choice.