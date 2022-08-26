<<<<<<< HEAD
const tracksTemplateSource = document.getElementById('tracks-template').innerHTML;
const tracksTemplate = Handlebars.compile(tracksTemplateSource);

const $tracks = $('#tracks-container');

const getTopTracks = $.get('https://api.napster.com/v2.1/tracks/top?apikey=NmI1MGU5NWEtNjYwNy00ZmMyLWEzODAtYzJjMGQ1NWNmMDQ4');

getTopTracks
  .then((response) => {
    $tracks.html(tracksTemplate(response));
  });
  
// var apiUrl = "https://api.napster.com/v2.1/tracks/top?apikey=NmI1MGU5NWEtNjYwNy00ZmMyLWEzODAtYzJjMGQ1NWNmMDQ4"
// 
// fetch(apiUrl).then(function(response) {
// 	if (response.ok) {
// 		response.json().then(function(data) {
// 			console.log(data);
// 		})
// 	}
// });
=======
>>>>>>> main
