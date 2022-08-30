var napsterAPI = "https://api.napster.com/v2.2/"
var napsterImageServer = "https://api.napster.com/imageserver/v2/albums/"
var APIKey = "NmI1MGU5NWEtNjYwNy00ZmMyLWEzODAtYzJjMGQ1NWNmMDQ4";
var tracksContainerEl = document.querySelector("#tracks-container");

var getTrackInfo = function(tracksArray) {
	// the trackURLArray has trackName, trackURL, trackAlbumID, repeat
	// console.log(trackURLArray);
	// extract just albumID for each song saved in localStorage
	trackNameArray = [];
	trackURLArray = [];
	trackAlbumIDArray = [];
	trackMP3PreviewArray = [];

	for (i = 0; i < tracksArray.length/4; i++) {
		trackNameArray.push(tracksArray[i*4]);
		trackURLArray.push(tracksArray[(i*4) + 1]);
		trackAlbumIDArray.push(tracksArray[(i*4) + 2]);
		trackMP3PreviewArray.push(tracksArray[(i*4) + 3])
		
	};
// 	console.log(trackNameArray);
// 	console.log(trackURLArray);
// 	console.log(trackAlbumIDArray);
// 	console.log(trackMP3PreviewArray);
	
	trackImageURLArray = [];
	// format the Napster api url for the track
	for (i=0; i < trackAlbumIDArray.length; i++){
		trackImageURLArray.push(napsterImageServer + trackAlbumIDArray[i] + 
		"/images/300x300.jpg?apikey=" + APIKey);
	};
	console.log(trackAlbumIDArray);

	displayAlbumImage(trackImageURLArray, trackNameArray, trackMP3PreviewArray);
};

var displayAlbumImage = function(imageURL, trackName, trackMP3) {
	if(imageURL.length === 0) {
		tracksContainerEl.textConent = "No Songs Found";
		return;
	}
	
	for (i = 0; i < trackNameArray.length; i++) {
		
		var singleTrackContainerEl = document.createElement("figure");
		singleTrackContainerEl.setAttribute("class", "single-track");
		singleTrackContainerEl.setAttribute("id", "track#", i);

		var trackTitleEl = document.createElement("figcaption");
		trackTitleEl.textContent = "Listen to " + trackName[i] + ":";
		singleTrackContainerEl.appendChild(trackTitleEl);
		
		var trackAudioEl = document.createElement("audio")
		trackAudioEl.setAttribute("controls", "");
		trackAudioEl.setAttribute("src", trackMP3[i]);
		trackTitleEl.appendChild(trackAudioEl);
		singleTrackContainerEl.appendChild(trackTitleEl);
	
		tracksContainerEl.appendChild(singleTrackContainerEl);
		
		var trackImageEl = document.createElement("img");
		trackImageEl.setAttribute("src", imageURL[i]);
		
		singleTrackContainerEl.appendChild(trackImageEl);

		console.log(trackImageEl);
	}
};

var loadTaskURL = function() {
	var savedTrackURLArray = localStorage.getItem("trackURL");
	// if there are no trackURls, set trackURL to an empty array and return out
	if(!savedTrackURLArray) {
		return false;
	}
	// parse localStorage
	savedTrackURLArray = JSON.parse(savedTrackURLArray);
	// get the info we need from each track from the getTrackInfo fuction
	getTrackInfo(savedTrackURLArray);
};

loadTaskURL();