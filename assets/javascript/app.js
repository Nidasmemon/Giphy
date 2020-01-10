var topics = ["Cat", "Dog", "Bird", "Squirrel", "Rabbit", "Fish", "Chicken", "Goat", "Turtle", "Horse"];


function showAnimals() {

    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=PKtLuk6BV8QmIANoIdbhfYeNt5Cyig6x&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        for (var i = 0; i < response.data.length; i++) {

            console.log("response... " + response.data[0].rating);

            var animalDiv = $("#animal-gifs");
    
            var rating = response.data[i].rating;
    
            var pRating = $("<p>").text("Rating: " + rating);
    
            animalDiv.append(pRating);

        }

    });

}


function displayButtons() {

    $("#buttons-list").empty();

    for (var i = 0; i < topics.length; i++) {

        var button = $("<button>");

        button.addClass("animal-button");

        button.attr("data-name", topics[i]);

        button.text(topics[i]);

        $("#buttons-list").append(button);
    }
}

    
$("#add-animal").on("click", function(event) {
    event.preventDefault();

    var animal = $("#animal-input").val().trim();
    
    topics.push(animal);

    displayButtons()
})

$(document).on("click", ".animal-button", showAnimals);

displayButtons();