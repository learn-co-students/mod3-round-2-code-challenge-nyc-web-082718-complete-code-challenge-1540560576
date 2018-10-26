const theatreId = 10;
const cardsShowings = document.getElementById('cardsShowings')
let theatre
// var x = document.getElementsByClassName("example")



showShowings = (resJson) => {
  theatre = resJson
  theatre.showings.map(film => {
    // debugger

    let newCard = document.createElement('div')
    newCard.className = 'card'
    newCard.id = `${film.id} film`
    cardsShowings.appendChild(newCard)

    let newContent = document.createElement('div')
    newContent.className = 'content'
    newCard.appendChild(newContent)

    let newHeader = document.createElement('div')
    newHeader.className = 'header'
    newHeader.innerText = film.film.title
    newContent.appendChild(newHeader)

    let newMeta = document.createElement('div')
    newMeta.className = 'meta'
    newMeta.innerText = `${film.film.runtime} minutes`
    newContent.appendChild(newMeta)

    let newDecs = document.createElement('div')
    newDecs.className = 'description'
    let newSpan = document.createElement('span')
    newSpan.className = 'ui label'
    newSpan.innerText = film.showtime
    newDecs.appendChild(newSpan)
    let ticsLeft = film.capacity - film.tickets_sold
    newDecs.innerText = `${ticsLeft} remaining tickets`
    newContent.appendChild(newDecs)

    let newExtra = document.createElement('div')
    newExtra.className = 'extra content'
    newCard.appendChild(newExtra)

    if (ticsLeft > 0) {
      let uiBlueButton = document.createElement('div')
      uiBlueButton.className = 'ui blue button'
      uiBlueButton.innerText = 'Buy Ticket'
      newExtra.appendChild(uiBlueButton)
    } else {
      let newSoldOut = document.createElement('div')
      newSoldOut.className = 'soldOut'
      newSoldOut.innerText = 'Sold Out'
      newExtra.appendChild(newSoldOut)
    }
  }) // end of map
} // end of showShowings


decreaseTicket = (resJson) => {
  let filmToEdit = document.getElementById(`${resJson.showing_id} film`)
  let innerTextToEdit = filmToEdit.childNodes[0].childNodes[2]
  let ticketsAvail = parseInt(innerTextToEdit.innerText) - 1
  innerTextToEdit.innerText = `${ticketsAvail} remaining tickets`
  if (ticketsAvail === 0)  {
    filmToEdit.childNodes[1].childNodes[0].remove()
    let newSoldOut = document.createElement('div')
    newSoldOut.className = 'soldOut'
    newSoldOut.innerText = 'Sold Out'
    filmToEdit.childNodes[1].appendChild(newSoldOut)
  }
}


document.addEventListener('click', (event) => {
  if (event.target.className === "ui blue button"){
    let filmTicketId = parseInt(event.target.parentElement.parentElement.id)
    let boughtTicket = theatre.showings.filter(show => show.id === filmTicketId)
    boughtTicket = boughtTicket[0]
    if (boughtTicket.capacity - boughtTicket.tickets_sold > 0){
      sendTicketToDB(filmTicketId)
    } else {
      console.log('"error": "That showing is sold out"')
    }
  }
})

sendTicketToDB = (filmTicketId) => {
  fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
    method: 'POST',
    body: JSON.stringify({
      showing_id: filmTicketId
    }),
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(res => res.json())
  .then(resJson => decreaseTicket(resJson))
}








fetch('https://evening-plateau-54365.herokuapp.com/theatres/10')
  .then(res => res.json())
  .then(resJson => showShowings(resJson))
