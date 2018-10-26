const theatreId = 48; //4 was my original ID but i wanted to re-seed data
const cardsShowings = document.getElementById('showings-div')


function fetchMovieShowings(){
  cardsShowings.innerHTML = ''
  fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
  .then(response => response.json())
  .then(theaterObj => {
    theaterObj.showings.forEach(showingObj => {
      displayOnShowingsDiv(showingObj);
    })
  })
}
fetchMovieShowings()


function displayOnShowingsDiv(showingObj){
  console.log(showingObj);
  cardsShowings.innerHTML += `
  <div class="card">
    <div class="content">
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
        ${(showingObj.capacity) - (showingObj.tickets_sold)} remaining tickets
      </div>
    </div>
    <div class="extra content">
      <div id='${showingObj.id}' class="ui blue button">Buy Ticket</div>
    </div>
  </div>
  `

  let buyButton = document.getElementById(`${showingObj.id}`)

  let remainingTickets = (showingObj.capacity) - (showingObj.tickets_sold)


  buyButton.addEventListener('click', event  => {
    if ( ((showingObj.capacity - showingObj.tickets_sold)) === 0) {
      buyButton.remove()
    } else {
      buyTicket(showingObj)
    }
  })


  function buyTicket(showingObj){

    fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        showing_id: showingObj.id
      })
    }).then(response => response.json())
      .then(json => fetchMovieShowings(json))

  }

}
