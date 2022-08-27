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
			getArtistID(artistname);
		return;
	}
};

var getArtistID = function(artist) {
	// format the napster api url
	var apiSearch = napsterAPI + "search?query=" + artist + "&type=artist&apikey=" + APIKey;
	
	// make a request to the url
	fetch(apiSearch).then(function(response) {
		// if request is successful
		if (response.ok) {
			response.json().then(function(napsterdata) {
			// here is the whole object if you are interested
			console.log(napsterdata);
			// data.search.order will give you Artist Detail which you will use below
			console.log(napsterdata.search.data.artists[0].name);
			// use this aritistID to get the tracks of the artist
			var napsterArtistID = napsterdata.search.order[0];
			getArtistTrackIDs(napsterArtistID);			
			
			// display the artist name and track on the page
			displayArtistName(napsterdata, artist);
			});
		} else {
			console.log("Artist Not Found on Napster")
		}
	}).catch(function(error) {
		console.log("Unable to connect with Napster")
	})
};

var getArtistTrackIDs = function(ArtistID) {
	console.log(ArtistID); 
	var apiArtistTracksUrl = napsterAPI + "artists/" + ArtistID + "/tracks?apikey=" + APIKey;
		// This fetch will use the artist ID URL to get the artist json data
		fetch(apiArtistTracksUrl).then(function(response) {
			// if request is successful then
			if (response.ok) {
				response.json().then(function(data) {
					// there is a lot of data available for each track
					console.log(data.tracks);
					// how many tracks are there?
					for (i = 0; i < data.tracks.length; i++) {
						console.log(data.tracks[i].id);
					};
					for (i = 0; i < data.tracks.length; i++) {
						console.log(data.tracks[i].href);
					};
					return;
				})
			} else {
				alert("Error: Artist Not Found");
			}
		}).catch(function(error) {
			alert("Unable to connect to napsterAPI");
		});
				
};

var displayArtistName = function(artistID, artistSearchName) {
	// check if api returns an artistID
	if(artistID.length === 0) {
		artistNameContainerEl.textContent = "No artist found.";
		return;
		};

		
	// clear old content
	//artistNameContainerEl.textContent = "";
	artistSearchTerm.textContent = "Artist name " + artistSearchName;

	// start by displaying artist name
	var artistNameEl = document.createElement("span");
	artistNameEl.classList = "align-center ";		
}

var displayArtistTracks = function(artistTracksID, artistReturnName) {
	// check if api returns an artistTracksID
	if(artistTracksID.length === 0) {
		console.log("No artist tracks found.");
		return;
	}
	
	// TODO create a place on the page to display artistTracks
	
	
	
}


userFormEl.addEventListener("submit", formSubmitHandler);