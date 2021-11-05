var requestUrl = 'https://wendy-cors.herokuapp.com/https://api.yelp.com/v3';
var yelpKey = '1yZDubbnd0fetob942sSxY0NwOoeK4luhKs0JAU-B6id-kJ6t6SbBnHABlIDh9-n7t6huj-QlsjzQcE_17b_j2nKM-eIefKDRGib9AiT5gV5O-AFq64XY6B2_Md4YXYx';
var foodChoiceArr = [];
var finalChoice = [];

//when app is loaded check localStorage
//if there is data obj in localStorage, and iterable, call yelpCard to render data --
var data = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")): [];
if(data.length) yelpCard(data)
// input for food types
$("#food").keydown(function (event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    // gather value from input field
    let inputValue = $("#food").val();
    // push inputValue text into foodChoiceArr
    foodChoiceArr.push(inputValue);
    console.log(foodChoiceArr);
    // user input 
    if(!inputValue) {
    } else {
      $(".foodInput").append(`
      <li>${inputValue}</li>`)
      // clear the value
    }
    $("input").val("");
  }
});

// input for food location
$("#location").keydown(function (event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    // gather value from input field
    let inputValue = $("#location").val().trim();
    // push inputValue text into ingrChoiceArray
    foodLocation = inputValue.split(" ").join("%20");
    console.log(foodLocation);
    if (!inputValue){
    } else (
      $(".cityInput").append(`
      <p>${inputValue}</p>
    `)
    )
    // clear the value
    $("input").val("");
  }
});

// pull out 1 string from foodChoice Arr
var submitBtn = $("#submit").on("click", function () {
  var randomizedFood = foodChoiceArr[Math.floor(Math.random() * foodChoiceArr.length)];
  finalChoice.push(randomizedFood);

  function searchBusiness(finalChoice) {
    var url = `${requestUrl}/businesses/search?location=${foodLocation}&term=${finalChoice}`;
    console.log(url)
    fetch(url, {
      headers: {
        'Authorization': `Bearer ${yelpKey}`,
        'Access-Control-Allow-Origin': ""
      }
    }).then(function (res) { return res.json() }).then(function (api) {
      console.log(api)
      yelpCard(api.businesses)
      localStorage.setItem("data", JSON.stringify(api.businesses))
    })
  }
  localStorage.setItem("food", finalChoice);
  localStorage.setItem("location", foodLocation);
  searchBusiness(finalChoice);
})
// added classes to correspond to bootstrap here, is this correct? 
function yelpCard(data) {
  for (var i = 0; i < data.length; i++) {
    $("#cards").append(`
    <div class="col-4">
      <div class="card py-3 shadow-lg rounded">
        <img id="yelpImg" class="card-img-top border border-black img-fluid" src="${data[i].image_url}">
        <div class="card-body">
          <a id="yelpTitle" class="card-title" href="${data[i].url}" target="_blank">Go Here: ${data[i].name}</a>
          <p id="rating" class="card-text mt-3">Rating: ${data[i].rating}</p>
          <p id="address" class="card-text">Address: ${data[i].location.display_address.join(" ")}</p>
        </div>
      </div>
    </div>
    `)
  }
}

$("#clear").on("click", function (){
  localStorage.clear();
  location.reload();
})
