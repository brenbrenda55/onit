var apiUrl = "https://api.napster.com/v2.1/tracks/top?apikey=NmI1MGU5NWEtNjYwNy00ZmMyLWEzODAtYzJjMGQ1NWNmMDQ4"
var userFormEl = document.querySelector("#user-form");
var artistInputEl = document.querySelector("#artist");

var formSubmitHandler = function(event) {
	event.preventDefault();
	
	// get value from input element
	var artistname = artistInputEl.value.trim();
	
	if (artistname) {
			getArtistSongs(artistname);
		return;
	}
};

var getArtistSongs = function(artist) {
	// format the napster api url
	var apiUrl = "https://api.napster.com/v2.2/search?query=" + artist + "&type=artist&apikey=NmI1MGU5NWEtNjYwNy00ZmMyLWEzODAtYzJjMGQ1NWNmMDQ4";
	
	// make a request to the url
	fetch(apiUrl).then(function(response) {
		// if request is successful
		if (response.ok) {
			response.json().then(function(data) {
				console.log(data);
			});
		}
	});
	
};

userFormEl.addEventListener("submit", formSubmitHandler);