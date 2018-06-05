const form = document.querySelector('form')

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

  if (!isNumeric(spellLevel)) {
	  spellLevel = 1
  }

  const spellsDiv = document.querySelector('#spells')
  spellsDiv.innerHTML += `<li>${spellName}, Level ${spellLevel}</li>`

  f.reset()
}

form.addEventListener('submit', changeHeading)