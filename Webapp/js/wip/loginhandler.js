var database=firebase.database();

var highPrice=0;
database.ref().on("value", function(snapshot){
    console.log("value recieved")
})
database.ref().set({
    password: 10
})

database.ref().set({
    highPrice: 5
});
function writeUser(email,password){
    database.ref('users'+ email).set({
        password: password
    })
};
function createUser(email,password){
    console.log("Creating user")
    console.log("hi");
    debugger;
    authObject = firebase.auth();
    console.log("im working");
    console.log(authObject);
    authObject.createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
    // ...
    });
    

}

function signInUser(email,password){
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(data) {
        console.log(data);
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}
