

// variables
var ticketEl = document.querySelector("#ticket");
var inputSearchEl = document.querySelector("#input-search")
var apiKey = "i2wFUtDDzSGJ8XJ0kVpmMYl3BcrgWqD3";
var tmURL ="https://app.ticketmaster.com/discovery/v2/events.json?"
var ticketconEl = document.querySelector("#ticket-title")
var typeListEl = document.querySelector("#type-list")
//var tmURL = "https://app.ticketmaster.com/discovery/v2/events/"
//var url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=i2wFUtDDzSGJ8XJ0kVpmMYl3BcrgWqD3";

var formSubmitHandler = function(event) {
  event.preventDefault();

  //get value from input element
  var eventsearch = inputSearchEl.value.trim();
     console.log(eventsearch);
      if (eventsearch) {
        getSearchesList(eventsTitles)

      }
};

var getSearchesList = function(keyword) {

  var apiSearch = tmURL + keyword + "&" +  apiKey;

  fetch(apiSearch).then(function(response) {

    if (response.ok){
      response.json().then(function(tmdata) {
        console.log(tmdata);

        displaySearches(tmdata);
      });
    } else {
        console.log("search not found")
    }

  }).catch(function(error) {
    console.log("unable to connect with tm")

  })
};



//attractions from tm
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=i2wFUtDDzSGJ8XJ0kVpmMYl3BcrgWqD3",
  async:true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});


//event seach from tm
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=i2wFUtDDzSGJ8XJ0kVpmMYl3BcrgWqD3",
  async:true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});


// images from tm
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/events/k7vGFKzleBdwS/images.json?apikey=i2wFUtDDzSGJ8XJ0kVpmMYl3BcrgWqD3",
  async:true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});




// return call for the click button
// var upcomingEvents = function (event) {
    // event.preventDefault ();

// }



// requesting event from tm website ex
// function getEvents(page) {

    // $('#events-panel').show();
    // $('#attraction-panel').hide();
  
    // if (page < 0) {
      // page = 0;
      // return;
    // }
   /////// if (page > 0) {
      //if (page > getEvents.json.page.totalPages-1) {
        //page=0;
      //}
    //}
    
    // $.ajax({
      // type:"GET",
      // url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=i2wFUtDDzSGJ8XJ0kVpmMYl3BcrgWqD3&size=4&page="+page,
      // async:true,
      // dataType: "json",
      // success: function(json) {
            // getEvents.json = json;
                  // showEvents(json);
              //  },
      // error: function(xhr, status, err) {
                  // console.log(err);
              //  }
    // });
  // }
  




// event search on ticket master 


// upcoming events clicked
  inputSearchEl.addEventListener("submit",formSubmitHandler)
  