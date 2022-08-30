var napsterAPI = "https://api.napster.com/v2.2/"
var napsterImageServer = "https://api.napster.com/imageserver/v2/albums/"
var APIKey = "NmI1MGU5NWEtNjYwNy00ZmMyLWEzODAtYzJjMGQ1NWNmMDQ4";
var tracksContainerEl = document.querySelector("#tracks-container");

var getTrackInfo = function(tracksArray) {
	// the trackURLArray has trackName, trackURL, trackAlbumID, repeat
	// console.log(trackURLArray);
	// extract just albumID for each song saved in localStorage
	trackAlbumIDArray = [];
	console.log(trackAlbumIDArray);
	for (i = 0; i < tracksArray.length/3; i++) {
		trackAlbumIDArray.push(tracksArray[(i*3) + 2]);
	};
	console.log(trackAlbumIDArray);
	trackAlbumIDUrl = [];
	// format the Napster api url for the track
	for (i=0; i < trackAlbumIDArray.length; i++){
		trackAlbumIDUrl.push(napsterImageServer + trackAlbumIDArray[i] + 
		"/images/300x300.jpg?apikey=" + APIKey);
// 		console.log(trackAlbumIDUrl);
	};
	
	console.log(trackAlbumIDUrl);
	console.log(trackAlbumIDUrl.length);
	
	// go get the images from napsterImageServer . this works but some errors
	
	// for(i = 0; i < trackAlbumIDUrl.length; i++) {
// 		fetch(trackAlbumIDUrl[i]).then(function(response) {
// 			if (response.ok) {
// 				response.json().then(function(imageURL) {
// 					console.log(imageURL);
// // 					getTrackImage(trackAlbumID);
// 				});
// 			} else {
// 				console.log("Error nothing found");
// 			}
// 		}).catch(function(error) {
// 			console.log("Unable to connect to Napster api");
// 		});
// 	};
};

var displayAlbumImage = function(imageURL, trackName) {
	if(imageURL.length === 0) {
		tracksContainerEl.textConent = "No Songs Found";
		return;
	}
	tracksContainerEl.textConent = "";	
	
	
}

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