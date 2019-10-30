var appkey="2419e9fc212c3b0c72ddedff3ae75536";
var appid="8a9b994a";
var query="chicken";


function searchItem(search,min,max,diet,health) {
    //var query = `https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${databasekey}${ntCategories}&ndbno=${dbnum}`;
    var url=`https://api.edamam.com/search?q=${search}&app_id=${appid}&app_key=${appkey}&from=0&to=20&calories=${min}-${max}${diet}${health}`;
    console.log(url);
    $.get(url, function(data){
      var report=data;
     //var random=data.hits[Math.floor((Math.random()*data.hits.length-1))];
      var url=data.hits[0].recipe.url;
      console.log(url);
      var placeHolder = document.getElementById("click");
      placeHolder.className="button";
      var temp=placeHolder.innerHTML;
      var url=`<a href=${url}>Click Here!</a>`
      placeHolder.innerHTML=url;
      //autocomplete(document.getElementById("searchField"), data.list.item);
    })
  }

function showRecipe(){
    var query=document.getElementById('mainingredient').value;
    var dropdown=document.getElementById('inputGroupSelect01');
    var diet=dropdown.options[dropdown.selectedIndex].text;
    var yourArray=[];
    var elements=document.getElementsByClassName('form-check-input');
    var list=document.getElementsByName('type');
    for(var i=0;i<elements.length;i++){
        if(elements[i].checked!=false){
            yourArray.push(list[i].innerHTML.toLowerCase());
        }
      
    }
    var health="";
    for(var i=0;i<yourArray.length;i++){
        health='&health='+yourArray[i];
    }
    query=query.toLowerCase();
    diet=diet.toLowerCase();
    if(diet=="none"){
        diet="";
    }else{
        diet='&diet='+diet;
    }

    var min=document.getElementById('min').value;
    var max=document.getElementById('max').value;
    searchItem(query,min,max,diet,health);
    console.log(min);
    console.log(max);
    console.log(query);
    console.log(diet);
    console.log(yourArray);
    console.log(health);
}