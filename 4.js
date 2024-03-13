const inputNum1 = document.querySelector('#num')
const inputNum2 = document.querySelector('#num2')
const btn = document.querySelector('button')
const result = document.querySelector('.result')
let value1 = inputNum1.value
let value2 = inputNum2.value

inputNum1.addEventListener('input', () => value1 = parseInt(inputNum1.value))

inputNum2.addEventListener('input', () => value2 = parseInt(inputNum2.value))

btn.addEventListener('click', () => {
  if (isNaN(value1) || isNaN(value2) || value1 < 100 || value1 > 300 || value2 < 100 || value2 > 300) {
    result.innerHTML = '<p>One of the numbers outside the range 100 to 300</p>'
  } else {
    fetch(`https://dummyimage.com/${value1}x${value2}/`)
      .then(response => response.blob())
      .then(data => {
        const imageUrl = URL.createObjectURL(data)
        const imageElement = document.createElement('img')
        imageElement.src = imageUrl
        result.replaceChild(imageElement, result.firstChild)
      })
      .catch(err => console.error('Error fetching image: ', err))
  }
})
