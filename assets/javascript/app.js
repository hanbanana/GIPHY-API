$( document ).ready(function() {
    var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];
    function displayMovieButtons(){
        $("#movieButtonsView").empty();
        for (var i = 0; i < movies.length; i++){
            var movieButton = $("<button>");
            movieButton.addClass("movie");
            movieButton.addClass("btn btn-primary")
            movieButton.attr("data-name", movies[i]);
            movieButton.text(movies[i]);
            $("#movieButtonsView").append(movieButton);
        }
    }

    function addNewButton(){
        $("#addMovie").on("click", function(){
        var movie = $("#movie-input").val().trim();
        if (movie == ""){
          return false; 
        }
        movies.push(movie);
    
        displayMovieButtons();
        return false;
        });
    }

    function displayMovie(){
        var movie = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=B6UjbAH5FhjOItd0g8H4mc62EwevE4DG&limit=10";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); 
            $("#movieView").empty(); 
            var results = response.data;

            for (var i=0; i<results.length; i++){
    
                var movieDiv = $("<div>"); 
                movieDiv.addClass("movieDiv");
              
                var movieRating = $("<p>").text("Rating: " + results[i].rating);
                movieDiv.append(movieRating);
                
                var movieImage = $("<img>");
                movieImage.attr("src", results[i].images.fixed_height_small_still.url); 
                movieImage.attr("data-still",results[i].images.fixed_height_small_still.url);
                movieImage.attr("data-animate",results[i].images.fixed_height_small.url);
                movieImage.attr("data-state", "still"); 
                movieImage.addClass("image");
                movieDiv.append(movieImage);
              
                $("#movieView").prepend(movieDiv);
            }
        });
    }
   
    displayMovieButtons(); 
    addNewButton();

    $(document).on("click", ".movie", displayMovie);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });