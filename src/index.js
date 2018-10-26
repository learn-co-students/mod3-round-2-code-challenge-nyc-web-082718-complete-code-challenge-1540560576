document.addEventListener("DOMContentLoaded", function(event) {
  const theatreId = 3;

  const cardContainer = document.querySelector(".ui.cards.showings")
  //when theres a space each is a unique class

  let list = [] //array to hold my card containers

  fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
    .then((response) => {
      return response.json()
    })
    .then((jsonObj) => {
      list = jsonObj
      list.showings.forEach((showing) => {
        let remainingTickets = showing.capacity - showing.tickets_sold

        if(remainingTickets === 0) {
              cardContainer.innerHTML += `<div class="card">
                                        <div class="content">
                                          <div class="header">
                                            ${showing.film.title}
                                          </div>
                                          <div class="meta">
                                            ${showing.film.runtime}
                                          </div>
                                          <div id="${showing.id}" class="description">
                                            <span class="ui label">
                                              ${showing.showtime}
                                            </span>
                                            <div>
                                            ${remainingTickets} remaining tickets
                                            </div>
                                          </div>
                                        </div>
                                        <div class="extra content">
                                          <div data-id="${showing.id}"class="ui blue button">Sold Out</div>
                                        </div>
                                      </div>`
        } //end of if statement
        else {
        cardContainer.innerHTML += `<div class="card">
                                  <div class="content">
                                    <div class="header">
                                      ${showing.film.title}
                                    </div>
                                    <div class="meta">
                                      ${showing.film.runtime}
                                    </div>
                                    <div id="${showing.id}" class="description">
                                      <span class="ui label">
                                        ${showing.showtime}
                                      </span>
                                      <div>
                                      ${remainingTickets} remaining tickets
                                      </div>
                                    </div>
                                  </div>
                                  <div class="extra content">
                                    <div data-id="${showing.id}"class="ui blue button">Buy Ticket</div>
                                  </div>
                                </div>`
        }
      })
    }) //end of second .then function

  cardContainer.addEventListener("click", function(event) {

    if (event.target.className === "ui blue button") {
      let ButtonId = event.target.dataset.id

      const showingDescription = document.getElementById(`${ButtonId}`)

      let movieRemainingTickets = parseInt(showingDescription.lastElementChild.innerText.split(" ")[0])

      showingDescription.lastElementChild.innerText = --movieRemainingTickets

        fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            showing_id: ButtonId
          })
        })
      } //end of if statement
  }) //end of event listener









}); //end of DOM content loader
