document.addEventListener('DOMContentLoaded', () => {

  const theatreId = 7;

  const uiCardShowings = document.getElementById('ui-card-showings')

  fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    console.log(data)

    data.showings.forEach((showing) => {
      const card = document.createElement('div')
      card.setAttribute('class', "card")

      const content = document.createElement('div')
      content.setAttribute('class', "content")

      const header = document.createElement('div')
      header.setAttribute('class', "header")
      header.innerText = showing.film.title

      const meta = document.createElement('div')
      meta.setAttribute('class', "meta")
      meta.innerText = showing.film.runtime

      const description = document.createElement('div')
      description.setAttribute('class', "description")
      description.innerText = (showing.capacity - showing.tickets_sold)

      const uiLabel = document.createElement('span')
      uiLabel.setAttribute('class', "ui-label")
      uiLabel.innerText = showing.showtime

      const extraContent = document.createElement('div')
      extraContent.setAttribute('class', "extra-content")

      const buyButton = document.createElement('button')
      buyButton.setAttribute('class', "ui-blue-button")
      buyButton.id = showing.id
      buyButton.innerText = 'Buy Ticket'

//       buyButton.addEventListener('click', (event) => {
// event.target.parentElement.parentElement.children[0].children[2].innerText
//         debugger
//
//       })

      uiCardShowings.appendChild(card)
      card.appendChild(content)
      content.appendChild(header)
      content.appendChild(meta)
      content.appendChild(description)
      description.appendChild(uiLabel)

      card.appendChild(extraContent)
      extraContent.appendChild(buyButton)

    })
  }) // end of get fetched

}) // end of DOM

//DID NOT FINISH

//i would fix the positions of the tickest remaining and time
//was working on buyButton addEventListener

//i would add an addEventListener on the buyButton where on click, would grab the ticket remaining innertext and replace with what is subtracted by one (optimistic rendering)
//make a patch request then make a get request
//make an if statement of if the remaining ticket reaches 0, remove the button and replace to 'Sold Out'
