const enteredText = document.querySelector('input')
const englishBox = document.querySelector('#english_box')
const russianBox = document.querySelector('#russian_box')
const symbols = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '`',
  '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=',
  '|', '[', ']', '{', '}', ':', ';', '"', "'", '<', '>', ',', '.', '?', '/']

enteredText.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const getValue = () => {
      return enteredText.value
    }

    const appendItem = (boxName, getMethod) => {
      boxName.appendChild(document.createElement('p'))
      boxName.lastChild.append(getMethod(), document.createElement('br'), document.createElement('br'))
    }

    appendItem(russianBox, getValue)

    const copy = (boxName) => {
      const boxP = document.querySelectorAll(`${boxName} p`)

      for (let i = 0; i < boxP.length; i++) {
        boxP[i].ondblclick = () => {
          enteredText.placeholder = 'Copied!'
          enteredText.setAttribute('title', enteredText.placeholder)
          return navigator.clipboard.writeText(boxP[i].textContent)
        }
      }
    }

    copy('#russian_box')

    const getReversedValue = () => {
      const spl = russianBox.lastChild.textContent.split('')
      const letterArray = []

      const checkLetter = (langLetters, i) => {
        for (letter in langLetters) {
          if (letter.toUpperCase() === spl[i]) return letterArray.push(langLetters[letter])
          if (letter.toLowerCase() === spl[i]) return letterArray.push(langLetters[letter].toLowerCase())
        }
      }

      for (let i = 0; i < spl.length; i++) {
        for (elem of symbols) if (spl[i] === elem) letterArray.push(elem)
        checkLetter(rusLetters, i)
        checkLetter(engLetters, i)
      }
      return letterArray.join('')
    }

    appendItem(englishBox, getReversedValue)
    copy('#english_box')
    enteredText.value = ''
  }
})
