// Get user data

var db = openDatabase('mydb', '1.0', 'User database', 2 * 1024 * 1024);
let databasekey = `10SKlZqWe3IkC3ymxUWxzMrjgUfNFuixcuqY10gC`;
let dbnum = `01009`;
let ntCategories = `&nutrients=205&nutrients=204&nutrients=208&nutrients=269`;
let flaskURL = `localhost:5000`;

db.transaction(function (tx) {
    //tx.executeSql('DROP TABLE users');
    tx.executeSql('CREATE TABLE IF NOT EXISTS users (email unique, password, name, calories DEFAULT 0, sugar DEFAULT 0, fats DEFAULT 0, carbohydrates DEFAULT 0)');
    //tx.executeSql('CREATE TABLE IF NOT EXISTS nt (email unique, calories, sugar, fats, carbohydrates)')
    tx.executeSql('SELECT * FROM users', [], function (tx, results) {
        var len = results.rows.length, i;
        for (i = 0; i < len; i++) {
            console.log(results.rows.item(i));
        }
    });
    console.log("user handler opened!")
});



function authUser(email, password) {
    //console.log("email: " + email + "\npassword: " + password);
    db.transaction(function (tx) {
        tx.executeSql(`SELECT * FROM users WHERE password =? AND email=?`, [password, email], function (tx, results) {
            var len = results.rows.length, i;
            //console.log(len)
            if (len === 0) {
                alert("User not found, please try again");
            } else {
                console.log(results.rows.item(0).name + " signed in");
                localStorage.setItem('user', results.rows.item(0).email);
                console.log(localStorage.getItem('user') + " is user")
                window.location.href = "./home.html";
            }
        })
    })
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

function handleAuthChanges() {

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        window.location = "home.html";
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
  
  
  function handleSignIn() {
    // const email= document.getElementById("email").value
    // const pass = document.getElementById("password").value
    firebase.auth().signInWithEmailAndPassword(email,pass).catch(function(error){
      const errcode = error.code
      const errmsg = error.message
      alert(errmsg)
    });
  
    console.log("Sign in" + email)
  }
  
//   function handleSignUp() {
//     // const email= document.getElementById("email").value
//     // const pass = document.getElementById("password").value

//   }
  
  window.onload = () => {
    handleAuthChanges()
  }

  function addUser() {
    console.log("here");
    const email= document.getElementById("email").value
    const pass = document.getElementById("password").value
    firebase.auth().createUserWithEmailAndPassword(email,pass).catch(function(error){
        const errcode = error.code
        const errmsg = error.message
        alert(errmsg)
      });
      console.log("Sign in" + email)
    // firebase.auth().currentUser.getIdToken(true).then(function(idToken) { 
    //     // Send token to your backend 
    //     let addUser = `http://${flaskURL}/api/users/`;
    //     var user1 = {
    //         userId = idToken,
    //         name = name,
    //         email = email
    //     }
    //     $.post(addUser, user1, function(data) { 
    //         $.post('./add_users')
    //     })

    // }).catch(function(error) { 

    // });




    console.log("Sign in" + email)
    // console.log("name: " + name + "\nemail: " + email + "\npassword: " + password);
    // db.transaction(function (tx) {
    //     tx.executeSql('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
    //     //tx.executeSql('INSERT INTO nt (email, 0, 0, 0, 0)');
    //     console.log(`Added user ${name}`);
    // })
}


function searchTutors(searchTerm) {
  

  $.get(searchQuery, function(data) {
    if (data[`tutors`] === undefined) {
      $(name).html(`<b>No tutor found for class: ${searchTerm}<b>`)
      return;
    }
    let tutors = data[`tutors`]
    console.log(tutors);
    $("#name").empty();
    $("#name").append(`<b>Available Tutors</b>`);
    
    for(var i = 0; i < tutors.length; i ++){
      $("#name").append(
        `<div class = "column">
        <div class="card" style="width:35%;height:35%;margin-left:0%;margin-right:30%;margin-top:10%; margin-bottom: 10%; text-align:center;">
        <img src = "images/female.png" alt = "Avatar" style = "width:100%;margin-bottom: 10px">
        <div class="container">
        <h3>${tutors[i][`name`]}</h3>
        <p>Request Me</p>
        </div>
        </div>
        </div>
        `
      );
    } 
    //$("#name").html(`<b> ${tutors[0][`name`]} <b>`);
  })
}