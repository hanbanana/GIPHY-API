
var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

function displayMovieInfo() {

    var movie = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        movie + "&api_key=B6UjbAH5FhjOItd0g8H4mc62EwevE4DG&limit=10";

     axios({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if (response.data.Error) {
            console.error("ERROR")
            return;
        }
        console.log(response);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var movieDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var movieImg = $("<img>");

            movieImg.attr("src", results[i].images.original_still.url);
            movieImg.attr("data-still", results[i].images.original_still.url);
            movieImg.attr("data-animate", results[i].images.original.url);
            movieImg.attr("data-state", "still");
            movieImg.attr("class", "gif");
            movieDiv.append(p);
            movieDiv.append(movieImg);
            $("#buttons-view").append(movieDiv);
        }
    });

}

function renderButtons() {

    $("#buttons-view").empty();


    for (var i = 0; i < movies.length; i++) {

        var a = $("<button>");  
        a.addClass("movie");  
        a.attr("data-name", movies[i]); 
        a.text(movies[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-movie").on("click", function (event) {
    event.preventDefault();

    var movie = $("#movie-input").val().trim();   
    movies.push(movie);

    renderButtons();

});

$(document).on("click", ".movie", displayMovieInfo);

renderButtons();

$(".gif").on("click", function (e) {
    console.log(e)
   var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});