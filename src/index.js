// create DOM loaded event listener
// use fetch GET request to obtain data from https://evening-plateau-54365.herokuapp.com/theatres/3
// create function to loop trough showings and create a card for each showing
// remaining ticekts will equal capaciy - tickets sold
// add event listener to the buy tickets button which will send a POST request to https://evening-plateau-54365.herokuapp.com/tickets
// with the showing id
// once that request is sent, rerender the ticket cards with the new data from https://evening-plateau-54365.herokuapp.com/theatres/3


document.addEventListener("DOMContentLoaded", () => {
  const theatreId = 2
  const theatreCardShowings = document.getElementById("theater-card-showings")
  // console.log(theatreCardShowings)
  function renderAllShowings() {
    fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
    .then(r => r.json())
    .then( (theatreResponse) => {
      const theatreShowings = theatreResponse["showings"]
      addShowingsToTheatreCardShowings(theatreShowings)
      console.log(theatreShowings)
    })
  }

  renderAllShowings()

  function addShowingsToTheatreCardShowings(theatreShowings) {
    theatreCardShowings.innerHTML = ''
    theatreShowings.forEach((showing) => addOneShowingTotheatreCardShowings(showing))
  }

  function addOneShowingTotheatreCardShowings(showing) {
    const cardDiv = document.createElement("div")
    cardDiv.setAttribute("class", "card")
    // console.log(showing)
    cardDiv.innerHTML = `
      <div class="content">
        <div class="header">
          ${showing.film.title}
        </div>
        <div class="meta">
          ${showing.film.runtime}
        </div>
        <div class="description">
          <span class="ui label">
            ${showing.showtime}
          </span>
          ${showing.capacity - showing.tickets_sold} remaining tickets
        </div>
      </div>
      <div class="extra content">
        <div data-set=${showing.id} class="ui blue button">Buy Ticket</div>
      </div>
    `
    theatreCardShowings.appendChild(cardDiv)
  }

  document.addEventListener("click", (event) => {
    if (event.target.className = "button"){
      const showingId = event.target.getAttribute("data-set")
      // extra optimistic rendering made weird by semantic
      // const cardDiv = event.target.parentElement.parentElement
      // const cardDescription = cardDiv.querySelector(".description")
      // const cardInnerText = cardDescription.innerText
      // const cardTextAry = cardInnerText.split(' ')
      // let cardTicketNum = cardTextAry[2]
      // let newTicketNum = --cardTicketNum
      // cardTextAry[2] = newTicketNum
      // let newCardInnerText = cardTextAry.join(" ")
      // cardDescription.innerText = newCardInnerText
      fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          showing_id: showingId
        })
      })// end of fetch POST to tickets URL
      .then( r => r.json())
      .then( (ticketResponse) => {
        renderAllShowings()
      })// end of POST THEN chain
    }// end of button logic

  })// end of event delegation listener


}) // end of DOM content loaded event listener
