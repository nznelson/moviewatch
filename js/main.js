
$('#showButton').click(function() {
  //alert("sup");
  $('#resultContainer').empty();
  $("#progress").attr("style", "visibility: visible;");
  
  //Send the AJAX call to the server
  $.ajax({
	url:"https://www.kimonolabs.com/api/ondemand/66t7hejw?apikey=cpesi8CvwJQTYs3HWgy2a3BSRvudeOOi",
	
	crossDomain:true,
    dataType:"jsonp",
	contentType:"application/json",
	data: { "genres": $("#genreSelect").val(), "release_date": $("#yearSelect").val() },
	success: function (data) {
		//Do something with the response
		//alert("success");
		console.log(data);
		$("#progress").attr("style", "visibility: hidden;");
		
		
		//poster
		//cast
		//rating
		//synopsis
		//	title
		r = $('#resultContainer');
		if (data.count > 0){
		
			$.each(data.results.collection1, function( index, object ) {
					rate = Math.round(object.rating);
					var html = '<div class="movieContainer">';
					html += '<a href="';
					html += object.title.href;
					html += '"><img id="imgMovie"src="';
					html += object.poster.src;
					html += '"></a><div class="movieRight"><p id="titleMovie"><a href="';
					html += object.title.href;
					html += '">';
					html += object.title.text;
					html += ' ';
					html += object.year;
					html += '</a></p>';
					html += '<img id="rating" src="/img/'
					html += rate + '.png"> '; //todo rating
					html += '<p id="ratingText">';
					html += object.rating;
					html += '/10</p><p id="description">';
					if (typeof object.synopsis.text !== 'undefined') {
						html += object.synopsis.text;
					} else {
						html += object.synopsis;
					}
					
					html += '</p></div></div>';
					
					r.append(html);
					//cast
					//object.cast.text
					
					//img
					//object.poster.alt - alt name
					//object.poster.src - img url
					
					//rating
					//object.rating
					
					//synopsis
					//object.synopsis
					
					//title
					//object.title.text
					//object.title.href - to imdb
					
					//duration
					//object.duration
					
					//year
					//object.year
			});
		}
	},
	error: function (xhr, status) {
		//handle errors
		//alert("error");
		console.log(xhr);
		console.log(status);
		$("#progress").attr("style", "visibility: hidden;");
	}
  });
});

$('#genreSelect').on('change', function (e) {
    //alert("you changin me");
	var gen = $("#genreSelect").val();
	var imgSrc = "/img/" + gen + ".png";
	$("#backgroundImg").fadeOut(100, function() {
            $("#backgroundImg").attr("src", imgSrc);
        }).fadeIn(100);
		
	
	
	
	
});