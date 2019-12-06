function handleAuthChanges() {
  // if firebase detects a user redirect them to the search page
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
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

window.onload = () => {
  handleAuthChanges()
}