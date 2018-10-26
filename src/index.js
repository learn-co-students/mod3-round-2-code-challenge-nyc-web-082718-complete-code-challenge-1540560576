const theatreId = 9;

// PAGE LOAD START
document.addEventListener('DOMContentLoaded', () => {
  console.log('PAGE IS LOADED')
  fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
    .then(resp => resp.json())
    .then(respJSON => {
      const showings = respJSON.showings

      showings.forEach(movie => {
        const currentMovieCard = makeMovieCard(movie)
        addCardToPage(currentMovieCard)
      })
    })

    const addCardToPage = (movieCard) => {
      const showingsContainer = document.getElementById('showings-container')
      showingsContainer.innerHTML += movieCard
    }

    const makeMovieCard = (movie) => {
      if (movie.capacity - movie.tickets_sold === 0) {
        return `
                <div class="card">
                  <div class="content">
                    <div class="header">
                      ${movie.film.title}
                    </div>
                    <div class="meta">
                      ${movie.film.runtime} minutes
                    </div>
                    <div class="description">
                      <span class="ui label">
                        ${movie.showtime}
                      </span>
                      <div id="num-of-tickets">${movie.capacity - movie.tickets_sold} remaining tickets</div>
                    </div>
                  </div>
                  <div class="extra content">
                    Sold Out
                  </div>
                </div>
               `
      } else { //I know that this is not DRY at all but I had to do it this way in the interest of time :)
        return `
                <div class="card">
                  <div class="content">
                    <div class="header">
                      ${movie.film.title}
                    </div>
                    <div class="meta">
                      ${movie.film.runtime} minutes
                    </div>
                    <div class="description">
                      <span class="ui label">
                        ${movie.showtime}
                      </span>
                      <div id="num-of-tickets">${movie.capacity - movie.tickets_sold} remaining tickets</div>
                    </div>
                  </div>
                  <div class="extra content">
                    <div data-showing="${movie.id}" id="buy-button" class="ui blue button">Buy Ticket</div>
                  </div>
                </div>
               `
      }
    }

  // BUY BUTTON START
  document.addEventListener('click', (event) => {
    if (event.target.id === 'buy-button') {
      fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          showing_id: event.target.dataset.showing
        })
      })

      fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
        .then(resp => resp.json())
        .then(respJSON => {
          const showings = respJSON.showings
          const showingsContainer = document.getElementById('showings-container')

          showingsContainer.innerHTML = ""

          showings.forEach(movie => {
            const currentMovieCard = makeMovieCard(movie)
            addCardToPage(currentMovieCard)
          })
        })
    }
  })
  // BUY BUTTON END
})//PAGE LOAD END

// There is a LOT of refactoring that would need to be done here - but this works for now
