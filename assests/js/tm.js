

// variables
var ticketEl = document.querySelector("ticket");
var apiKey = "i2wFUtDDzSGJ8XJ0kVpmMYl3BcrgWqD3";
var ticketconEl = document.querySelectorAll("ticket-btn")
//var tmURL = "https://app.ticketmaster.com/discovery/v2/events/"
var url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=i2wFUtDDzSGJ8XJ0kVpmMYl3BcrgWqD3";


// return call for the click button
var upcomingEvents = function (event) {
    event.preventDefault ();

}




// event search on ticket master 

$.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=i2wFUtDDzSGJ8XJ0kVpmMYl3BcrgWqD3",
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

// upcoming events clicked
  ticketconEl.addEventListner("click", upcomingEvents);