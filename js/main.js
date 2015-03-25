//Listen when a button, with a class of "myButton", is clicked
//You can use any jQuery/JavaScript event that you'd like to trigger the call
$('#showButton').click(function() {
  //alert("sup");
//Send the AJAX call to the server
  $.ajax({
	url:"https://www.kimonolabs.com/api/66t7hejw?apikey=cpesi8CvwJQTYs3HWgy2a3BSRvudeOOi",
	beforeSend: function(xhr) { xhr.setRequestHeader('authorization', 'Bearer nsEh7suy3sQKmQAtjY74Bym4yt2IhP8a'); },
	crossDomain:true,
    dataType:"jsonp",
	contentType:"application/json",
	data: { "genres": $("#genreSelect").val(), "release_date": $("#yearSelect").val() },
	success: function (data) {
		//Do something with the response
		//alert("success");
		console.log(data);
		
		
		
		//poster
		//cast
		//rating
		//synopsis
		//	title
		
		$.each(data.results.collection1, function( index, object ) {
				
				
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
	},
	error: function (xhr, status) {
		//handle errors
		//alert("error");
		console.log(xhr);
		console.log(status);
	}
  });
});