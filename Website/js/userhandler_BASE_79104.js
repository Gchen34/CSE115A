// Get user data

var db = openDatabase('mydb', '1.0', 'User database', 2 * 1024 * 1024);

db.transaction(function (tx) {
    //tx.executeSql('DROP TABLE users');
    tx.executeSql('CREATE TABLE IF NOT EXISTS users (email unique, password, name, calories DEFAULT 0, sugar DEFAULT 0, fats DEFAULT 0, carbohydrates DEFAULT 0)');
    //tx.executeSql('CREATE TABLE IF NOT EXISTS nt (email unique, calories, sugar, fats, carbohydrates)')
    tx.executeSql('SELECT * FROM users', [], function (tx, results) {
        var len = results.rows.length, i;
    });
    console.log("user handler opened!")
});
  
function handleAuthChanges() {

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        if(window.location = "signup.html"){
            console.log("hi");
        }
        window.location = "search.html";
      } else {
        firebase.auth().signOut().then(function () {
          // Sign-out successful.
        }).catch(function (error) {
          console.log(error)
          alert("An error has occoured")
        });
      }
    });
  
  }
function addUser(name, email, password) {
    firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error){
        const errcode = error.code
        const errmsg = error.message
        alert(errmsg)
    });
    var flaskURL = `localhost:5000`;
    var requestURL = `http://${flaskURL}/api/adduser`;
    $.post(requestURL, {name: name, email: email});
    
    console.log("Sign in" + email)
    
    console.log("name: " + name + "\nemail: " + email + "\npassword: " + password);
}

function authUser(email, password) {
    console.log("email: " + email + "\npassword: " + password);
    firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error){
        const errcode = error.code;
        const errmsg = error.message;
        alert(errmsg);
    });
   
}

function signOutUser() {
    firebase.auth().signOut().then(function() {
    console.log('Signed Out');
    }, function(error) {
    console.error('Sign Out Error', error);
    });
    
}
function updateUser(calories = 0, sugar = 0, fats = 0, carbs = 0) {
    console.log("Values: " + calories + " " + sugar + " " + fats + " " + carbs + " " + localStorage.getItem('user'))
    db.transaction(function (tx) {
        tx.executeSql('UPDATE users SET calories=calories+?,sugar=sugar+?,fats=fats+?,carbohydrates=carbohydrates+? WHERE email=?', [calories, sugar, fats, carbs, localStorage.getItem('user')],
            function (tx, results) { console.log("Success") }, function (transaction, error) { console.log(error); }
        );
    })
}

function updateUserData() {
    db.transaction(function (tx) {
        tx.executeSql('SELECT name,calories,sugar,fats,carbohydrates FROM users WHERE email=?', [localStorage.getItem('user')], function (tx, results) {
            let ud = results.rows.item(0);
            $("#userStats").html(`Good afternoon ${ud.name}. Today you ate <b>${ud.carbohydrates.toFixed(1)} grams of carbohydrates, ${ud.sugar.toFixed(1)} grams of sugar, </b>and<b> ${ud.fats.toFixed(1)} grams of fat.</b>You are at <b>${(ud.calories / 2400 * 100).toFixed(1)}% of your daily calorie goal</b>. Have a great day :>`);
        })
    });
}

function setGreeting() {
    db.transaction(function (tx) {
        tx.executeSql('SELECT name FROm users WHERE email=?', [localStorage.getItem('user')], function (tx, results) {
            let ud = results.rows.item(0);
            $("#greeting").html(`Hello, ${ud.name}`);
        })
    });
}

window.onload = () => {
    handleAuthChanges()
  }