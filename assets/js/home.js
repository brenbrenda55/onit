var userFormEl = document.querySelector("#user-form");
var artistInputEl = document.querySelector("#artist");
var artistNameContainerEl = document.querySelector("#artist-name-display");
var artistSearchTerm = document.querySelector("#artist-search-term");
var napsterAPI = "https://api.napster.com/v2.2/"
var APIKey = "NmI1MGU5NWEtNjYwNy00ZmMyLWEzODAtYzJjMGQ1NWNmMDQ4";
var trackNameContainerEl = document.querySelector("#track-name-display"); //temporary for testing
var trackContainerEl = document.querySelector("#tracks-container");
var recent = document.querySelector("#ra");
var trackURLStored = [];

// take the input and pass it to the getArtistID function
var formSubmitHandler = function(event) {
	event.preventDefault();	
	// get value from input element and format
	var artistname = artistInputEl.value.trim();
	// now use pass this input into the getArtistID function below
	if (artistname) {
			getArtistID(artistname);
			saveRecentArtist(artistname);
		return;
	}
};

// Napster api fetch artist name, artistID, and use displayArtistName function
// pass ArtistID to the getArtistTrackIDs function by using function inside
var getArtistID = function(artist) {
	// format the napster api url
	var apiSearch = napsterAPI + "search?query=" + artist + "&type=artist&apikey=" + APIKey;
	// make a request to the url
	fetch(apiSearch).then(function(response) {
		// if request is successful
		if (response.ok) {
			response.json().then(function(napsterdata) {
			// here is the whole object if you are interested
			// console.log(napsterdata);
			// check if there exists something on Napster
			if(napsterdata.meta.totalCount === 0) {
				console.log("No artist exists with " + artist + " name.");
				displayNoArtistError(artist);
				return;
			};
			// data.search.order will give you Artist Detail which you will use below
			// console.log(napsterdata.search.data.artists[0].name);
			artistReturnedName = napsterdata.search.data.artists[0].name;
			// use this aritistID to get the tracks of the artist
			var napsterArtistID = napsterdata.search.order[0];
			getArtistTrackIDs(napsterArtistID);						
			// display the artist name on the page
			displayArtistName(artistReturnedName);
			});
		} else {
			console.log("Artist Not Found on Napster")
		}
	}).catch(function(error) {
		console.log("Unable to connect with Napster")
	})
};

// Napster api fetch artist tracks, trackIDs, and use displayArtistTracks function 
var getArtistTrackIDs = function(ArtistID) {
	// console.log(ArtistID); 
	var apiArtistTracksUrl = napsterAPI + "artists/" + ArtistID + "/tracks?apikey=" + APIKey;
		// This fetch will use the artist ID URL to get the artist json data
		fetch(apiArtistTracksUrl).then(function(response) {
			// if request is successful then
			if (response.ok) {
				response.json().then(function(data) {
					// there is a lot of data available for each track

					// console.log(data.tracks);
					// console.log(data.tracks.previewURL);
					// console.log(data.tracks.name);
					// how many tracks are there?
					for (i = 0; i < data.tracks.length; i++) {
						// console.log(data.tracks[i].id);
						// console.log(data.tracks[i].name);
						var trackID = data.tracks[i].id;
						var trackName = data.tracks[i].name;
						var trackURL = data.tracks[i].href;
						var albumID = data.tracks[i].albumId;
						var previewURL = data.tracks[i].previewURL;
						
						displayArtistTracks(trackID, trackName, trackURL);
						
						trackURLStored.push(trackName, trackURL, albumID, previewURL);
						saveTrackUrl();
					};
					for (i = 0; i < data.tracks.length; i++) {
						// console.log(data.tracks[i].href);
					};
					return;
				})
			} else {
				console.log("Error: Artist Not Found");
			}
		}).catch(function(error) {
			console.log("Unable to connect to napsterAPI");
	});				
};

var displayArtistName = function(artistReturnedName) {
	// clear previous artist name
	artistNameContainerEl.textContent = "";
	// lets clear out trackContainerEl 
	clearDisplayArtistTracks();
	
	// check if api returns an artistID
	if(artistReturnedName.length === 0) {
		artistNameContainerEl.textContent = "No artist found.";
		return;
		};	
	// display artist name
	artistNameContainerEl.textContent = "Artist Name: " + artistReturnedName;
}

var displayNoArtistError = function(artistSearchTerm) {
	// clear previous artist name
	artistNameContainerEl.textContent = "";
	// check if api returns an artistID
	if(artistSearchTerm.length === 0) {
		artistNameContainerEl.textContent = "No artist found.";
		return;
		};	
	// display artist name
	artistNameContainerEl.textContent = "No artist exists with the name: " + artistSearchTerm;
}

var clearDisplayArtistTracks = function() {
	trackContainerEl.textContent = "";
}

var displayArtistTracks = function(trackID, trackName, trackURL) {
	// check if api returns an artistTracksID
	if(trackID.length === 0) {
		trackContainerEl.textContent = "No tracks found.";
		return;
	};
	// create a container for each track
	var trackEl = document.createElement("a");
	trackEl.classList = "list-item flex-box justify-space-between align-center";
	trackEl.setAttribute("href", "./assets/html/play-track.html");
	trackEl.setAttribute("data", trackURL);
	// create a span element to hold track name
	var titleEl = document.createElement("span");
	titleEl.textContent = " Song: " + trackName;
	
	// append to container
	trackEl.appendChild(titleEl);
	
	// append to container to the DOM
	trackContainerEl.appendChild(trackEl);
}

var saveTrackUrl = function() {
	localStorage.setItem("trackURL", JSON.stringify(trackURLStored));
};

userFormEl.addEventListener("submit", formSubmitHandler);











var getArtist = [];

var saveRecentArtist = function(artistname){
	
	localStorage.setItem("artist", JSON.stringify(artistname));
	getArtistName();
}

var getArtistName = function(){
	getArtist.push(JSON.parse(localStorage.getItem("artist")));
	var allArtist = "";
	for(i=0; i < getArtist.length; i++){
		var currentArtist = getArtist[i];  
		allArtist = allArtist + " / " + currentArtist;
	}
	document.getElementById('ra').innerHTML = allArtist;
}