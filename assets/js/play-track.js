var napsterAPI = "https://api.napster.com/v2.2/"
var napsterImageServer = "https://api.napster.com/imageserver/v2/albums/"
var APIKey = "NmI1MGU5NWEtNjYwNy00ZmMyLWEzODAtYzJjMGQ1NWNmMDQ4";
var tracksContainerEl = document.querySelector("#tracks-container");

var getTrackInfo = function(tracksArray) {
	// the trackURLArray has trackName, trackURL, trackAlbumID, repeat
	// console.log(trackURLArray);
	// extract just albumID for each song saved in localStorage
	trackAlbumIDArray = [];
	trackNameArray = [];
	console.log(trackAlbumIDArray);
	for (i = 0; i < tracksArray.length/3; i++) {
		trackAlbumIDArray.push(tracksArray[(i*3) + 2]);
		trackNameArray.push(tracksArray[i*3]);
	};
	console.log(trackNameArray);
	console.log(trackAlbumIDArray);
	trackImageUrl = [];
	// format the Napster api url for the track
	for (i=0; i < trackAlbumIDArray.length; i++){
		trackImageUrl.push(napsterImageServer + trackAlbumIDArray[i] + 
		"/images/300x300.jpg?apikey=" + APIKey);
	};
	console.log(trackImageUrl);
	console.log(trackImageUrl.length);
	displayAlbumImage(trackImageUrl, trackNameArray);
};

var displayAlbumImage = function(imageURL, trackName) {
	if(imageURL.length === 0) {
		tracksContainerEl.textConent = "No Songs Found";
		return;
	}
// 	var trackEl = document.createElement("img");
// 	trackEl.setAttribute("src", imageURL[0]);
	
// 	var titleEl = document.
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