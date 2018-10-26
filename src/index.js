document.addEventListener('DOMContentLoaded', () => {

  const theatreId = 5;
  const movieCardDiv = document.getElementById('card-container')
  let submitButton
  let id


  fetch('https://evening-plateau-54365.herokuapp.com/theatres/5')
    .then(res => res.json())
    .then((theatre) => {
      theatre.showings.forEach((item) => {
        displayMovie(item)
      })
    })

  function displayMovie(showing) {
    const movieCard = document.createElement('div')
    movieCard.class = "card"

    movieCard.innerHTML = `<div class="content">
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
                           <div class="ui blue button" id="${showing.id}">Buy Ticket</div>
                           </div>`


    movieCardDiv.appendChild(movieCard)
    //showingId = showing.id
    submitButton = document.getElementById(`${showing.id}`)


    submitButton.addEventListener('click', (event) => {
      id = parseInt(event.target.id)
      if((showing.capacity - showing.tickets_sold) > 0) {
        newTicket()
        updateDom()
      }
      else {
        alert("SOLD OUT")
      }
    })
  }


  function newTicket() {
    fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        showing_id: id
      })
    })
  }


  function updateDom() {
    movieCardDiv.innerHTML = ''
    fetch('https://evening-plateau-54365.herokuapp.com/theatres/5')
      .then(res => res.json())
      .then((theatre) => {
        theatre.showings.forEach((item) => {
          displayMovie(item)
        })
      })


  }













}) // END OF DOMContentLoaded
