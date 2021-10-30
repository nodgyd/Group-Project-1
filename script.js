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
    // push inputValue text into ingrChoiceArray
    foodChoiceArr.push(inputValue);
    console.log(foodChoiceArr);
      for (var i = 0; i < foodChoiceArr.length; i++) {
          if (foodChoiceArr.includes(foodChoiceArr[i]) === false) {
              foodChoiceArr.push(foodChoiceArr[i]);
            }  
          $(".foodInput").append(`
          <ul>
                <li>${foodChoiceArr[i]}</li>
          </ul>
            `)
      }
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
        // create a new span
        let span = $(`<span><i class='fas fa-times m-1 cursor-pointer'></i>${inputValue}</span>`);
        // in the i-have-tags div, prepend that span
        $(".userInputDiv").append(span);
        // add classes to that span
        span.addClass(
          "right-0 bg-white rounded px-3 py-1 text-sm font-semibold m-1 text-gray-700 ingrChoice"
        );
        // clear the value
        $("input").val("");
    }
});

// pull out 1 string from foodChoice Arr
$("#submit").on("click", function() {
    var randomizedFood = foodChoiceArr[Math.floor(Math.random() * foodChoiceArr.length)];
    finalChoice.push(randomizedFood);   

    function searchBusiness(finalChoice){
        var url = `${requestUrl}/businesses/search?location=${foodLocation}&term=${finalChoice}`;
        console.log(url)
        fetch(url, {
            headers: {
                'Authorization': `Bearer ${yelpKey}`,
                'Access-Control-Allow-Origin': ""
            }
        }).then(function(res){return res.json()}).then(function(data){
            console.log(data)
        })
    }
    searchBusiness(finalChoice)
})

