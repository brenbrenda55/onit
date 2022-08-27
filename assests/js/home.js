
// var apiUrl = "https://api.napster.com/v2.1/tracks/top?apikey=NmI1MGU5NWEtNjYwNy00ZmMyLWEzODAtYzJjMGQ1NWNmMDQ4"
var userFormEl = document.querySelector("#user-form");
var artistInputEl = document.querySelector("#artist");
var artistNameContainerEl = document.querySelector("#artist-name-display");
var artistSearchTerm = document.querySelector("#artist-search-term");
var napsterAPI = "https://api.napster.com/v2.2/"
var APIKey = "NmI1MGU5NWEtNjYwNy00ZmMyLWEzODAtYzJjMGQ1NWNmMDQ4";

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
	var apiSearch = napsterAPI + "search?query=" + artist + "&type=artist&apikey=" + APIKey;
	
	// make a request to the url
	fetch(apiSearch).then(function(response) {
		// if request is successful
		if (response.ok) {
			response.json().then(function(data) {
				displayArtist(data, artist);
				// data.search.order will give you Artist Detail which you will use below
				console.log(data.search.order);
				
				var apiArtistSearch = napsterAPI + "artists/" + data.search.order[0] + "?apikey=" + APIKey;
				console.log(apiArtistSearch);
				
				// fetch(apiArtistSearch).then(function(response) {
// 					//
// 					if (response.ok) {
// 						response.jso().then(function(data) {
// 							console.lot(data);
// 						})
// 					}
// 				});
				
			});
		} else {
			console.log("Artist Not Found on Napster")
		}
	}).catch(function(error) {
		console.log("Unable to connect with Napster")
	})
	
};

var displayArtist = function(artistID, searchTerm) {
	// check if api returns an artistID
	if(artistID.length === 0) {
		artistNameContainerEl.textContent = "No artist found.";
		return;
		}
		
	// clear old content
	//artistNameContainerEl.textContent = "";
	artistSearchTerm.textContent = "Artist name " + searchTerm;

	// start by displaying artist name
	var artistNameEl = document.createElement("span");
	artistNameEl.classList = "align-center "			
	}
	

	



userFormEl.addEventListener("submit", formSubmitHandler);

