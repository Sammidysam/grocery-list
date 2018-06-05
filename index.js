const DEFAULT_LEVEL = 1

const form = document.querySelector('form')
const errorBox = document.querySelector('.error')

// This checks if a string is a number or not.
// Borrowed from https://stackoverflow.com/questions/9716468/is-there-any-function-like-isnumeric-in-javascript-to-validate-numbers
const isNumeric = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n)
}

const spellNameSpan = function (spellName) {
	const spellNameSpan = document.createElement('span')

	spellNameSpan.appendChild(document.createTextNode(spellName))
	spellNameSpan.setAttribute('class', 'spellName')

	return spellNameSpan
}

const spellLevelSpan = function (spellLevel) {
	const spellLevelSpan = document.createElement('span')
  
	spellLevelSpan.appendChild(document.createTextNode(spellLevel))
	spellLevelSpan.setAttribute('class', 'spellLevel')

	return spellLevelSpan
}

const appendSpell = function (spellName, spellLevel) {
	const spellsDiv = document.querySelector('#spells')
	const newItem = document.createElement('li')
  
	newItem.appendChild(spellNameSpan(spellName))
	newItem.appendChild(spellLevelSpan(spellLevel))
  
	spellsDiv.appendChild(newItem)
}

const changeHeading = function(ev) {
  ev.preventDefault()

  const f = ev.target
  const spellName = f.spellName.value
  let spellLevel = f.spellLevel.value

  // If the spell level is not a number, turn it into one.
  if (!isNumeric(spellLevel)) {
	  errorBox.innerHTML = `${spellName} must be given a numeric level<br>Default value of ${DEFAULT_LEVEL} used`
	  spellLevel = DEFAULT_LEVEL
  } else {
	  errorBox.innerHTML = ''
  }

  appendSpell(spellName, spellLevel)

  f.reset()
}

form.addEventListener('submit', changeHeading)