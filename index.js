const spells = []

const DEFAULT_LEVEL = 1
const DEFAULT_MESSAGE = `Default value of ${DEFAULT_LEVEL} used`

const form = document.querySelector('form')
const errorBox = document.querySelector('.error')

// This checks if a string is a number or not.
// Borrowed from https://stackoverflow.com/questions/9716468/is-there-any-function-like-isnumeric-in-javascript-to-validate-numbers
const isNumeric = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n)
}

const spellSpan = function (name, value) {
	const spellSpan = document.createElement('span')

	spellSpan.appendChild(document.createTextNode(value))
	spellSpan.setAttribute('class', 'spell' + name)

	return spellSpan
}

const deleteListener = function(ev) {
	const btn = ev.target

	spells.splice(spells.indexOf(btn.spell), 1)

	addSortedSpells()
}

const appendSpellToLayout = function (spell) {
	const spellsDiv = document.querySelector('#spells')
	const newItem = document.createElement('li')
  
	newItem.appendChild(spellSpan('Name', spell.name))
	newItem.appendChild(spellSpan('Level', spell.level))

	// Add delete button.
	const deleteBtn = document.createElement('button')
	deleteBtn.textContent = "Delete"
	deleteBtn.className = "delete"
	deleteBtn.spell = spell
	deleteBtn.addEventListener("click", deleteListener)

	newItem.appendChild(deleteBtn)
  
	spellsDiv.appendChild(newItem)
}

const sortSpells = function () {
	spells.sort(function (a, b) {
		return parseFloat(a.level) - parseFloat(b.level)
	})
}

const addSortedSpells = function () {
	sortSpells()

	const spellList = document.getElementById('spells')
	spellList.innerHTML = ''

	spells.forEach(function (spell) {
		appendSpellToLayout(spell)
	})
}

// Validates that the spell level is good:
// - numeric
// - non-negative
const validateSpellLevel = function (spell) {
	if (!isNumeric(spell.level)) {
		errorBox.innerHTML = `${spell.name} must be given a numeric level<br>${DEFAULT_MESSAGE}`
		spell.level = DEFAULT_LEVEL
	} else if (spell.level < 0) {
		errorBox.innerHTML = `${spell.name} must be given a non-negative level<br>${DEFAULT_MESSAGE}`
		spell.level = DEFAULT_LEVEL
	} else {
		errorBox.innerHTML = ''
	}

	return spell.level
}

const changeHeading = function(ev) {
  ev.preventDefault()

  const f = ev.target
  const spell = {
	  name: f.spellName.value,
	  level: f.spellLevel.value
  }
  
  validateSpellLevel(spell)

  spells.push(spell)
  addSortedSpells()

  f.reset()
}

form.addEventListener('submit', changeHeading)