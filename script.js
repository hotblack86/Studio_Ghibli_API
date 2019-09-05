// DOM
const app = document.getElementById('root')
const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

const rand = Math.random() < 0.5;

// API Handling with XHR
if (rand) {
  var request = new XMLHttpRequest()
  request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
  request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
      console.log("Using XHR!")
      data.forEach(movie => {
        const card = document.createElement('div')
        card.setAttribute('class', 'card')

        const h1 = document.createElement('h1')
        h1.textContent = movie.title

        const p = document.createElement('p')
        movie.description = movie.description.substring(0, 300)
        p.textContent = `${movie.description}...`

        container.appendChild(card)
        card.appendChild(h1)
        card.appendChild(p)
      })
    } else {
      console.log('error')
    }
  }
  request.send()
} else {
// API Handling with Fetch
fetch('https://ghibliapi.herokuapp.com/films')
	.then(function (response) {
    console.log("Using Fetch!");
    return response.json();
	})
	.then(function (data) {
		data.forEach(movie => {
      const card = document.createElement('div')
      card.setAttribute('class', 'card')
      
      const h1 = document.createElement('h1')
      h1.textContent = movie.title
      
      const p = document.createElement('p')
      movie.description = movie.description.substring(0, 300)
      p.textContent = `${movie.description}...`
      
      container.appendChild(card)
      card.appendChild(h1)
      card.appendChild(p)
          })
	})
	.catch(function (error) {
		console.log('error', error);
	});
}