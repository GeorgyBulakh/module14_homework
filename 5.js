const inputNum1 = document.getElementById('num')
const inputNum2 = document.getElementById('num2')
const btn = document.querySelector('button')
const result = document.querySelector('.result')

btn.addEventListener('click', function() {
  const value1 = parseInt(inputNum1.value)
  const value2 = parseInt(inputNum2.value)

  if ((isNaN(value1) || value1 < 1 || value1 > 10) && (isNaN(value2) || value2 < 1 || value2 > 10)) {
    result.innerHTML = '<p>Page number and limit outside the range 1 to 10</p>'
  } else if (isNaN(value1) || value1 < 1 || value1 > 10) {
    result.innerHTML = '<p>Page number outside the range 1 to 10</p>'
  } else if (isNaN(value2) || value2 < 1 || value2 > 10) {
    result.innerHTML = '<p>Limit outside the range 1 to 10</p>'
  } else {
    fetch(`https://jsonplaceholder.typicode.com/photos?_page=${value1}&_limit=${value2}`)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('value1', value1)
        localStorage.setItem('value2', value2)
        localStorage.setItem('imagesData', JSON.stringify(data))
        displayResult(data)
      })
      .catch(err => console.error('Error: ', err))
  }
})

function displayResult(data) {
  let cards = ''

  data.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.thumbnailUrl}"
          class="card-image"
        />
        <p>${item.title}</p>
      </div>
    `
    cards += cardBlock
  })

  result.innerHTML = cards
}

const storedValue1 = localStorage.getItem('value1')
const storedValue2 = localStorage.getItem('value2')
const storedData = localStorage.getItem('imagesData')
if (storedData) {
  const parsedData = JSON.parse(storedData)
  inputNum1.value = storedValue1
  inputNum2.value = storedValue2
  displayResult(parsedData)
}