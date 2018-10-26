document.addEventListener('DOMContentLoaded', () => {
  const theatreId = 8;
  const showingDiv = document.getElementById('showings')
  fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
  .then(resp => resp.json())
  .then(jsonResp => displayAll(jsonResp.showings))



function displayAll(array) {
  array.forEach((showing) => {
    return displayShowing(showing)
  })
}

function displayShowing(showing) {

 showingDiv.innerHTML +=  `<div class="card">
    <div class="content">
      <div class="header">
        ${showing.film.title}
      </div>
      <div class="meta">
        ${showing.film.runtime} minutes
      </div>
      <div class="description">
        <span class="ui label">
          ${showing.showtime}
        </span>
        ${showing.capacity - showing.tickets_sold} remaining tickets
      </div>
    </div>
    <div class="extra content">
      <div id=${showing.id} class="ui blue button">Buy Ticket</div>
    </div>
  </div>`
   const remainTicket = `${showing.capacity - showing.tickets_sold}`
   const showingId = `${showing.id}`
   const btnDiv = document.getElementById(`${showing.id}`)

  const btn = document.getElementById(`${showing.id}`)
  btn.addEventListener('click', (event) => {
    fetch(`https://evening-plateau-54365.herokuapp.com/tickets/${showing.id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        showing_id: showingId
      })
      .then(resp => resp.json())
      .then(jsonResp => soldout(jsonResp))
    })
  })

  function soldOut(response) {
    if(response.error) {
      showingDiv.innerHTML =  `<div class="card">
         <div class="content">
           <div class="header">
             ${showing.film.title}
           </div>
           <div class="meta">
             ${showing.film.runtime} minutes
           </div>
           <div class="description">
             <span class="ui label">
               ${showing.showtime}
             </span>
             ${showing.capacity - showing.tickets_sold - 1} remaining tickets
           </div>
         </div>
         <div class="extra content">
           Sold out
         </div>
       </div>`
    } else {

    }
  }
  // const div = document.createElement('div')
  // div.innerHTML = showing.title
  // showingDiv.appendChild(div)
}




})
