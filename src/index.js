const theatreId = 6;
let theData

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");

  const theArea = document.getElementById('card-area')


  fetch('https://evening-plateau-54365.herokuapp.com/theatres/6')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    theData = myJson
    const theCard = myJson.showings.map(showingsObj => {
      const remainingTickets = showingsObj.capacity - showingsObj.tickets_sold
      return `<div class="card">
        <div class="content">
          <div class="header">
            ${showingsObj.film.title}
          </div>
          <div class="meta">
            ${showingsObj.film.runtime} minutes
          </div>
          <div class="description">
            <span class="ui label">
              ${showingsObj.showtime}
            </span>
            ${remainingTickets} remaining tickets
          </div>
        </div>
        <div class="extra content">
          <div data-id = ${showingsObj.id} class="ui blue button">Buy Ticket</div>
        </div>
      </div>`
    })
  theArea.innerHTML = theCard
  });

  document.addEventListener('click', event => {
    if (event.target.dataset.id) {
      const findShowing = theData.showings.find(showingObj => {
        return showingObj.id == event.target.dataset.id
      })

      // my logic below is working, however since I'm using a global variable  'theData' when the if statemnt on line 52
      //happens '--theTickets' its not updating tickets cause I'm still pulling from the variable data. solution would be assign line 50
      //to different variables. After the logic I would need to append the HTML inner text elemnt on dom and reflect in db by a patch request.
      let theTickets = findShowing.capacity - findShowing.tickets_sold
      if(theTickets != 0) {
        --theTickets
      }else{
        theTickets = 'sold out'
        //this would become the inner value on the dom for the respective html element on dom
      }

      console.log(theTickets)


    }
  })



});
