const DEFAULT_LEVEL = 1

const form = document.querySelector('form')
const errorBox = document.querySelector('.error')

// This checks if a string is a number or not.
// Borrowed from https://stackoverflow.com/questions/9716468/is-there-any-function-like-isnumeric-in-javascript-to-validate-numbers
const isNumeric = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n)
}

const changeHeading = function(ev) {
  ev.preventDefault()

  const f = ev.target
  const spellName = f.spellName.value
  let spellLevel = f.spellLevel.value

  // If the spell level is not a number, turn it into one.
  if (!isNumeric(spellLevel)) {
	  errorBox.innerHTML = `${spellName} must be given an integer level<br>Default value of ${DEFAULT_LEVEL} used`
	  spellLevel = DEFAULT_LEVEL
  } else {
	  errorBox.innerHTML = ''
  }

  const spellsDiv = document.querySelector('#spells')
  
  const newItem = document.createElement('li')
  newItem.appendChild(document.createTextNode(`${spellName}, Level ${spellLevel}`))

  spellsDiv.appendChild(newItem)

  f.reset()
}

form.addEventListener('submit', changeHeading)