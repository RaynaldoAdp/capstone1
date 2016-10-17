var resultsTemplate = '<h2></h2>';

var bmrResult = 0;

function bmrCalculatorForMale(){
  var age = parseInt($('#Age').val());
  var height = parseInt($('#Height').val());
  var weight = parseInt($('#Weight').val());
  bmrResult = 66 + 13.7 * weight + 5 * height - 6.8 * age;
}

function bmrCalculatorForFemale(){
  var age = parseInt($('#Age').val());
  var height = parseInt($('#Height').val());
  var weight = parseInt($('#Weight').val());
  bmrResult = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
}


function renderBmrResult(resultstemplate){
  var renderedBmrResult = $(resultsTemplate).text('Your BMR is ' + bmrResult +'!');
  $('.bmrCalculatorResults').html(renderedBmrResult);
}

function render(){
  if($('.Gender').val() === 'Male') {
    bmrCalculatorForMale();
  }
  else{
    bmrCalculatorForFemale(bmrResult);
  }
  renderBmrResult(resultsTemplate, bmrResult);
}

$(document).ready(function(){
  $('.bmrCalculatorForm').submit(function(){
    event.preventDefault();
    render();
    renderRecipe(bmrResult);
    scroll();
  })
})

// Requesting from API

var spoonacularUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate';


function getDataFromApi(caloriesPerDay, callback) {
  var settings = {
    url: spoonacularUrl,
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-Mashape-Key', 'k5WAlgf0pnmshreZ5sTP5BMWeU90p1gm2eVjsnUAfcgsE5MzCZ');
    },
    data: {
      targetCalories: caloriesPerDay,
      timeFrame: 'day',
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
  };
  $.ajax(settings);
}



function displayData(data) {
  var resultElement = '<h3>Total amount of calories:'+ data.nutrients.calories +'</h3>'+
                      '<h3>Total amount of protein:'+ data.nutrients.protein +'</h3>'+
                      '<h3>Total amount of fat:'+ data.nutrients.fat +'</h3>'+
                      '<h3>Total amount of carbohydrates:'+ data.nutrients.carbohydrates +'</h3><br>'+
                      '<h3>These are the meals:<br><br>';
  if (data.meals) {
    data.meals.forEach(function(item) {
     resultElement += '<div class ="recipes">' +
                      '<p>' + item.title + '</p>' + 
                      '<a href=" https://spoonacular.com/recipes/'+ item.title + '-' + item.id + '"><img src="https://webknox.com/recipeImages/'+ item.id +'-556x370.jpg"></a>' +
                      '</div>';
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }
  
 $('.js-recipeContainer').html(resultElement);
}


function renderRecipe(bmrResult) {
    getDataFromApi(bmrResult, displayData);
  }

//aesthetics
function scroll(){
    $('html, body').animate({
        scrollTop: $("#recipeContainer").offset().top
    }, 2000);
}