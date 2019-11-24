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

function searchTutors(searchTerm) {
  let searchQuery = `http://${flaskURL}/api/tutors/${searchTerm}`;

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

function getProfile(email) { 
  let searchQuery = `http://${flaskURL}/users/${searchTerm}`;
  $.get(searchQuery, function(data) { 
    let user = data['user']
    console.log(user);
    
  })
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