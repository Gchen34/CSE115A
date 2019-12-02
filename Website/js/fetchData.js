// This script is used to replace HTML data with dynamic data

//Map values to html elements
let valToHTML = {}  //Syntax: [`elementID`, `displayName`]
valToHTML[`Energy`] = [`#energy`, `Calories`];
valToHTML[`Sugars, total`] = [`#sugars`, `Sugars`];
valToHTML[`Total lipid (fat)`] = [`#lipids`, `Fats`];
valToHTML[`Carbohydrate, by difference`] = [`#carbs`, `Carbohydrates`];

//Config
let databasekey = `10SKlZqWe3IkC3ymxUWxzMrjgUfNFuixcuqY10gC`;
let dbnum = `01009`;
let ntCategories = `&nutrients=205&nutrients=204&nutrients=208&nutrients=269`;
let flaskURL = `localhost:5000`;

function loadCheckBoxes(filter=undefined) {
  let searchQuery = `http://${flaskURL}/api/courses/all`;

  $.get(searchQuery).then(function (data) {
    if (data === undefined) {
      return;
    }
    options = Object.keys(data);
    $("#listofclasses").empty()
    for(var i = 0; i < options.length; i++){
      var classOptionHtml = 
        `<div class="checkbox">
        <label><input type="checkbox" value="">  ${options[i]}</label>
        </div>`
      if (filter == undefined || options[i].startsWith(filter)) {
        $("#listofclasses").append(classOptionHtml)
      }
    }
  });
}

function addTutor() {
  var checkValues = $('input[name=checkboxlist]:checked').map(function() {
        return $(this).parent().text();
    }).get();
  var user_email = firebase.auth().currentUser.email;
  var user_name;
  var searchQuery = `http://${flaskURL}/api/user/${user_email}`;
    $.get(searchQuery, function(data) {
      console.log(data);
      user_name = data.name;
      searchQuery = `http://${flaskURL}/api/addtutor`;
      for(var i = 0; i < checkValues.length; i++){
        $.post(searchQuery, 
          { id: user_email, 
            name: user_name,
            class_id: checkValues[i]
          }); 
      }
  
    });
    //do something with your checkValues array
}


function clicking(clicked_id) {
  //console.log(tutor);
  if (confirm('Clicking OK will send a tutor an email')) {
    var tutor_name = $(`#${clicked_id}`).data("name");
    var tutor_email = $(`#${clicked_id}`).data("email");
    var class_name = $(`#${clicked_id}`).data("class");
    var currentuser = firebase.auth().currentUser;
    var user_email = currentuser.email;
    var user_name;
    var searchQuery = `http://${flaskURL}/api/user/${user_email}`;
    $.get(searchQuery, function(data) {
      console.log(data);
      user_name = data.name;
      searchQuery = `http://${flaskURL}/api/sendNotification`;
      $.post(searchQuery, 
        { receiver_email: tutor_email, 
          receiver_name: tutor_name,
          student_email: user_email,
          student_name: user_name,
          class_name: class_name
        });  
    });
  } else {
    return false;
  }
}


function getProfile() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var user_email = user.email;
      let searchQuery = `http://${flaskURL}/api/user/${user_email}`;
      $.get(searchQuery, function(data) { 
        console.log(data);
        let user = data['user']
        // console.log(user);
        
      })
    } else {
      // No user is signed in.
    }
  });

}
function searchItemExample(searchTerm) {
  let searchQuery = `http://api.nal.usda.gov/ndb/search/?format=json&q=${searchTerm}&sort=r&max=5&offset=0&api_key=${databasekey}`;
  $.get(searchQuery, function(data){
    let selectIndex = 0;
    let selectedItem = data.list.item[selectIndex];
    console.log(`Database entry: ` + selectedItem.name);
    let nutritionQuery = `https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${databasekey}${ntCategories}&ndbno=${selectedItem.ndbno}`;
    $.get(nutritionQuery, function(data) {
      $(foodName).html(`<b>Nutritional Data for ` + formatTitle(selectedItem.name) + `<b>`);
      data.report.foods[0].nutrients.forEach((e) => {
        console.log(valToHTML[e.nutrient][0] + `: ` + e.value);
        $(valToHTML[e.nutrient][0]).html(`<b>` + valToHTML[e.nutrient][1] + `: </b>` + e.value + ` grams`);
      })
    })
  })
}

function formatTitle(text) {  //Removes UPC and formats capitalization
  return text.toLowerCase()
    .split(` `)
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(` `);
}