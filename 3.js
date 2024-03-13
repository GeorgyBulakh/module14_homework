const input =  document.querySelector('input')
const btn = document.querySelector('button')
const result = document.querySelector('.result')
let value

input.addEventListener('input', () => {
  value = input.value
})

btn.addEventListener('click', () => {
  if (value < 1 || value > 10) {
    result.innerHTML = `<p>Number out of range 1 to 10</p>`
  } else {
    useRequest(displayResult)
  }
})

function useRequest(cb) {
  let xhr = new XMLHttpRequest()
  let url = 'https://jsonplaceholder.typicode.com/photos?_limit=' + value

  xhr.open('GET', url)

  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Cтатус ответа: ', xhr.status)
    } else {
      const result = JSON.parse(xhr.response)
      if (cb) {
        cb(result)
      }
    }
  }

  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status)
  }

  xhr.send()
}

function displayResult(apiData) {
  let cards = ''

  apiData.forEach(item => {
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