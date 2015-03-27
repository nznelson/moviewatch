var apis = {
    'action' : {
		'oldies' : 'ecpx42jg',
		'90s'    : '6vntqw6m',
		'recent' : '2stcr3pe',
		'latest' : '66t7hejw'
	},
	'adventure' : {
		'oldies' : '6rafilia',
		'90s'    : '9zmhiclg',
		'recent' : '53816cm8',
		'latest' : '8svf0frq'
	},
	'comedy' : {
		'oldies' : '57mt5lce',
		'90s'    : 'bv78ue0y',
		'recent' : '6g782s6m',
		'latest' : 'd9srm54w'
	},
	'horror' : {
		'oldies' : '2gx67pzg',
		'90s'    : '6rcg44we',
		'recent' : '2rbj2g58',
		'latest' : 'eg399fhw'
	},
	'sci_fi' : {
		'oldies' : '2fpu8lue',
		'90s'    : '7a1ojg3u',
		'recent' : '55c4i100',
		'latest' : '3osze1zk'
	},

}

$('#showButton').click(function() {
  //alert("sup");
  $('#resultContainer').empty();
  $("#progress").attr("style", "visibility: visible;");
  
  endpoint = apis[$("#genreSelect").val()][$("#yearSelect").val()];
  //Send the AJAX call to the server
  $.ajax({
    
	url:"https://www.kimonolabs.com/api/" + endpoint + "?apikey=cpesi8CvwJQTYs3HWgy2a3BSRvudeOOi",
	
	crossDomain:true,
    dataType:"jsonp",
	
	data: {},
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
					html += '"></a><div class="movieRight"><p id="titleMovie"><a target="_blank" href="';
					html += object.title.href;
					html += '">';
					html += object.title.text;
					html += ' ';
					html += object.year;
					html += '</a></p>';
					html += '<img id="rating" src="img/'
					html += rate + '.png"> '; //todo rating
					html += '<p id="ratingText">';
					html += object.rating;
					html += '/10</p><p id="duration">';
					html += object.duration;
					html += '</p> <p id="genre">';
					var i = 0;
					for (var genre_tag in object.genre_tags){
						if (i>0){
							html += " | ";
						}
						html +=  object.genre_tags[genre_tag].text;
						i+=1;
					}
					
					html += '</p><p id="description">';
					if (typeof object.synopsis.text !== 'undefined') {
						html += object.synopsis.text;
					} else {
						html += object.synopsis;
					}
					
					html += '</p><p id="cast">';
					html += object.cast.text;
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
	var imgSrc = "img/" + gen + ".jpg";
	$("#backgroundImg").fadeOut(100, function() {
            $("#backgroundImg").attr("src", imgSrc);
        }).fadeIn(100);

});