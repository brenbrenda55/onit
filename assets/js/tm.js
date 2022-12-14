// variables
var myKey = "i2wFUtDDzSGJ8XJ0kVpmMYl3BcrgWqD3"
var tmURL = "https://app.ticketmaster.com/discovery/v2/attractions"
var searchEl = document.querySelector("#input-search");
var eventEl = document.querySelector("#event");
var displayConEl = document.querySelector("#display-container")


//take the input and pass it to the event seasrch
var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element and format
  var eventname = eventEl.value.trim();
  //now use pass this input into the results function below
  if (eventname) {
    geteventsID(eventname);
    return;
  }
}

//tm fetch api
var geteventsID = function (eventStuff) {
  //format tm api url
  var apiSearch = tmURL + "_links" + "_embedded" + "page" + myKey;
  //make a request to the url 
  fetch(apiSearch).then(function (response) {
    //if request is successful
    if (response.ok) {
      response.json().then(function (tmdata) {
        //object
        console.log(tmdata)
        displayResults(tmdata);
      }
      )
    }
  })
};

//tm object
// console.log(event)
//get value from input element
//var eventsearch = eventEl.value.trim()
// console.log(eventsearch);
//if (eventsearch) {
//placeholer(eventsearch);
//}
//else {
//alert("not an event");
// }



var getSearchesList = function (keyword) {


  var apiSearch = tmURL + "?keyword=" + keyword + "&apikey=" + myKey;
  console.log(apiSearch)

  fetch(apiSearch)
    .then(function (response) {
      console.log(response)

      if (response.ok) {
        response.json().then(function (tmdata) {
          console.log(tmdata);

          displayTMresults(tmdata);
        })
      } else {
        console.log("search not found")
      }

    }).catch(function (error) {
      console.log("unable to connect with tm")

    })
};
//take the input and pass it to the event seasrch
var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element and format
  var eventname = eventEl.value.trim();
  console.log(eventname);
  //now use pass this input into the results function below
  if (eventname) {
    // geteventsID(eventname);
    getSearchesList(eventname)

    return;
  }
}


//attractions from tm
$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=i2wFUtDDzSGJ8XJ0kVpmMYl3BcrgWqD3",
  async: true,
  dataType: "json",
  success: function (json) {
    console.log(json);
    // Parse the response.
    // Do other things.
  },
  error: function (xhr, status, err) {
    // This time, we do not end up here!
  }
});

var displayTMresults = function (results) {
  console.log(results);
  console.log(results._embedded.attractions[0].url);
  if (results.length === 0) {
    displayConEl.textContent = "random stuff palceholder!";
    return;
  }
  for (var i = 0; i < results._embedded.attractions.length; i++) {
    var eventURL = results._embedded.attractions[i].url;
    var displaylistEl = document.createElement("li")
    //create a link element to take users to the results from tm
    displaylistEl.classList  = "list-item flex-row justify-space-between align-center";
    displaylistEl.setAttribute("target", "_blank");

  
    //create span to hold display title
    var listAnchorEl = document.createElement("a");
    listAnchorEl.setAttribute("href",results._embedded.attractions[i].url);
    var titleSpanEl = document.createElement("span");
    titleSpanEl.textContent =results._embedded.attractions[i].name;
    listAnchorEl.appendChild(titleSpanEl);

    
    //append to container
    displaylistEl.appendChild(listAnchorEl);
  
   
  
    // append to the dom 
    displayConEl.appendChild(displaylistEl);
  }
}



// TODO: Display tm
// document.createElement - create the elements you want in the page
// document.querySelector - selecting where you want to put the elements in the page
// for loop - looping over the weather forcast
// appendChild - add the elements in the page


searchEl.addEventListener("click", formSubmitHandler);


