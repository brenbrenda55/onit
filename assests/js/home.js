
  
var apiUrl = "https://api.napster.com/v2.1/tracks/top?apikey=NmI1MGU5NWEtNjYwNy00ZmMyLWEzODAtYzJjMGQ1NWNmMDQ4"

fetch(apiUrl).then(function(response) {
	if (response.ok) {
		response.json().then(function(data) {
			console.log(data);
		})
	}
});
