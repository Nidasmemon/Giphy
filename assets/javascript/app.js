var topics = ["Cat", "Dog", "Bird", "Squirrel", "Rabbit", "Fish", "Chicken", "Goat", "Turtle", "Horse"];


function showAnimals() {

    $("#animal-gifs").empty();

    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=PKtLuk6BV8QmIANoIdbhfYeNt5Cyig6x&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var countColumns = 0;
        var row;
        for (var i = 0; i < response.data.length; i++) {

            if (response.data[i].rating !== "r" && response.data[i].rating !== "pg-13") {

                console.log("response... ", response.data[0]);

                var animalDiv = $("#animal-gifs");

                var image = $("<img >");
                image.attr("src", response.data[i].images.original.url);
                image.attr("data-still", response.data[i].images.original_still.url);
                image.attr("data-animate", response.data[i].images.original.url);
                image.attr("data-state", "animate");
                image.attr("style", "width:100%;height:30vh");


                var rating = response.data[i].rating;

                var pRating = $("<p>").text("Rating: " + rating);

                if (countColumns === 0 || countColumns === 4) {
                    row = $("<div class='row'>")
                    countColumns = 0;
                }

                countColumns++;

                var column = $("<div class='col-sm-3'>")

                column.append(image, pRating)

                row.append(column)

                animalDiv.append(row);

            }
        }

    });

}

$(document).on("click", "img", function () {
    var state = $(this).attr("data-state")
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})


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


$("#add-animal").on("click", function (event) {
    event.preventDefault();

    var animal = $("#animal-input").val().trim();

    topics.push(animal);

    displayButtons()
})


$(document).on("click", ".animal-button", showAnimals);

displayButtons();

