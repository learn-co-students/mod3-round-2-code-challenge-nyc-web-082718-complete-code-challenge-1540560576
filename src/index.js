document.addEventListener('DOMContentLoaded', event => {
  const theatreId = 11;

  // SHOW ALL MOVIES
  // first, assign the <div> you'll be appending each card to:
  const cardShowings = document.getElementsByClassName('ui cards showings')[0]

  // next, fetch the showings from the API, parse the response
  // then, iterate over each card, grabbing the relevant data and creating the appropriate tags and assigning the data to them, appending all of that to the cardShowings <div> according to the html commented out at the bottom.

  function showAllCards() {
    fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
      .then(resp => resp.json())
      .then(parsedJSON => {
        // console.log(parsedJSON)
        parsedJSON.showings.forEach(showingObj => {
          console.log(showingObj)
          const card = document.createElement('div')
          card.class = 'card'

          card.innerHTML = `<div class="content">
            <div class="header">
              ${showingObj.film.title}
            </div>
            <div class="meta">
              ${showingObj.film.runtime} minutes
            </div>
            <div class="description">
              <span class="ui label">
                ${showingObj.showtime}
              </span>
              ${showingObj.capacity - showingObj.tickets_sold} remaining tickets
            </div>
          </div>
          <div class="extra content">
            <div class="ui blue button">Buy Ticket</div>
          </div>`


          cardShowings.appendChild(card) //very last thing
        })
        const buyTicketButtonCollection = document.getElementsByClassName('ui blue button')
        // console.log(buyTicketButtonCollection)

        const buyTicketButtonArray = Array.from(buyTicketButtonCollection)
        console.log(buyTicketButtonArray)
        console.log(parsedJSON)

        // i need to assign each button its corresponding movie ID
        // i also need to add an event listener to each one

        buyTicketButtonArray.forEach(ticketButton => {

          ticketButton.addEventListener('click', event => {

          })
        })

      })
  }

  showAllCards()

  function updateTickets() {

  }

  // Well, I got tripped up by the HTML collection
  // I've obviously got to associate each button with its movie ID
  // That'll then let me call on my updateTickets function with the event listener
  // It's in the updateTickets function that I'll be able to increase the number of tickets sold with a POST method
  // then at the end of my updateTickets function, I'd call on showAllCards to refresh the page

})


/*
<div class="card">
  <div class="content">
    <div class="header">
      (Film Title)
    </div>
    <div class="meta">
      (Runtime) minutes
    </div>
    <div class="description">
      <span class="ui label">
        (Showtime)
      </span>
      (Num Tickets) remaining tickets
    </div>
  </div>
  <div class="extra content">
    <div class="ui blue button">Buy Ticket</div>
  </div>
</div>
*/
