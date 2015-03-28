google.load('search', '1');
//var imageSearch;

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
	'animation' : {
		'oldies' : '5i6pd0bw',
		'90s'    : 'e3ki0ofg',
		'recent' : '7q53ga2g',
		'latest' : '4ywlw76o'
	},
	'comedy' : {
		'oldies' : '57mt5lce',
		'90s'    : 'bv78ue0y',
		'recent' : '6g782s6m',
		'latest' : 'd9srm54w'
	},
	'crime' : {
		'oldies' : 'b63o9vva',
		'90s'    : '8i3rjv90',
		'recent' : '33xq66wg',
		'latest' : '8aemrnla'
	},
	'drama' : {
		'oldies' : 'a6mv9i7m',
		'90s'    : 'bbzy0swe',
		'recent' : 'ah3ru530',
		'latest' : '78gjh2wo'
	},
	'family' : {
		'oldies' : 'efavxq3s',
		'90s'    : 'cfyzr8fo',
		'recent' : '3kk3hh3c',
		'latest' : 'dsgcixge'
	},
	'fantasy' : {
		'oldies' : '35n1iv4k',
		'90s'    : '5xo0uu62',
		'recent' : '1w2xrg3g',
		'latest' : 'di48k714'
	},
	'horror' : {
		'oldies' : '2rbj2g58',
		'90s'    : '6rcg44we',
		'recent' : '2gx67pzg',
		'latest' : 'eg399fhw'
	},
	'sci_fi' : {
		'oldies' : '2fpu8lue',
		'90s'    : '7a1ojg3u',
		'recent' : '55c4i100',
		'latest' : '3osze1zk'
	},
	'thriller' : {
		'oldies' : 'd9jccpgo',
		'90s'    : '2flknxy2',
		'recent' : '5acl56ho',
		'latest' : 'a6eygxv6'
	},
}

function loadData() {
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
		r = $('#resultContainer');
		if (data.count > 0){
			var j=0;
			$.each(data.results.collection1, function( index, object ) {
			
					rate = Math.round(object.rating);
					var html = '<div class="movieContainer">';
					html += '<a href="';
					html += object.title.href;
					
					html += '"><img class="imgMovie" style="visibility: hidden;" id="imgMovie' + j + '" src="';
					//html += object.poster.src;
					html += '"></a><div class="movieRight topInfo"><p id="titleMovie"><a target="_blank" href="';
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
					
					
					if( Object.prototype.toString.call( object.genre_tags ) === '[object Array]' ) {
						for (var genre_tag in object.genre_tags){
							if (i>0){
								html += "  |  ";
							}
							html +=  object.genre_tags[genre_tag].text;
							i+=1;
						}
					} else {
						html +=  object.genre_tags.text;
					}
					
					
					html += '</p></div><div class="movieRight"><p id="description">';
					if (typeof object.synopsis.text !== 'undefined') {
						html += object.synopsis.text;
					} else {
						html += object.synopsis;
					}
					
					html += '</p><p id="cast">';
					html += object.cast.text;
					html += '</p></div></div>';
					
					r.append(html);
					
					//Google image search
					// Create an Image Search instance.
					var imageSearch = new google.search.ImageSearch();
					var n = j;
					// Set searchComplete as the callback function when a search is 
					// complete.  The imageSearch object will have results in it.
					imageSearch.setSearchCompleteCallback(this, function () {

						// Check that we got results
						if (imageSearch.results && imageSearch.results.length > 0) {
						  //the first image should be good enough
						  var results = imageSearch.results;
						  var result = results[0];
						  // set the correct img src
						  img = $("#imgMovie" + n)
						  img.attr("src", result.tbUrl);
						  img.attr("style", "visibility: visible;");
						}
					}, null);

					// find the movie poster image
					imageSearch.execute(object.title.text + ' ' + object.year + ' movie poster');
					j+=1;
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
}

$('#showButton').click(loadData);

$('#genreSelect').on('change', function (e) {
    //alert("you changin me");
	var gen = $("#genreSelect").val();
	var imgSrc = "img/" + gen + ".jpg";
	$("#backgroundImg").fadeOut(100, function() {
            $("#backgroundImg").attr("src", imgSrc);
        }).fadeIn(100);
});

loadData();

