var requestUrl = 'https://wendy-cors.herokuapp.com/https://api.yelp.com/v3';
var yelpKey = '1yZDubbnd0fetob942sSxY0NwOoeK4luhKs0JAU-B6id-kJ6t6SbBnHABlIDh9-n7t6huj-QlsjzQcE_17b_j2nKM-eIefKDRGib9AiT5gV5O-AFq64XY6B2_Md4YXYx';
var foodChoiceArr = [];
var finalChoice = [];
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
    $(".foodInput").append(`
      <li>${inputValue}</li>`)
    // clear the value
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
    }).then(function (res) { return res.json() }).then(function (data) {
      console.log(data)
      yelpCard(data.businesses)
    })
  }
  searchBusiness(finalChoice)
})

function yelpCard(data) {
  for (var i = 0; i < data.length; i++) {
    $("#cards").append(`
          <a id="yelpTitle" href="${data[i].url}"> ${data[i].name}
            <img id="yelpImg" src="${data[i].image_url}">
            <p id="rating">${data[i].rating}</p>
            <p id="address">${data[i].location.display_address.join(" ")}</p>
          </a>
          `)
  }
}