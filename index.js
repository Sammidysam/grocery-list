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

const appendSpell = function (spell) {
	const spellsDiv = document.querySelector('#spells')
	const newItem = document.createElement('li')
  
	newItem.appendChild(spellSpan('Name', spell.name))
	newItem.appendChild(spellSpan('Level', spell.level))
  
	spellsDiv.appendChild(newItem)
}

const sortSpells = function () {
	const spellList = document.getElementById('spells')
	const newList = spellList.cloneNode(false)

	let list = []
	for (let i = spellList.childNodes.length; i--;) {
		if (spellList.childNodes[i].nodeName == 'LI')
			list.push(spellList.childNodes[i])
	}

	list.sort(function (a, b) {
		return parseFloat(a.childNodes[1].textContent) - parseFloat(b.childNodes[1].textContent)
	})

	for (let i = 0; i < list.length; i++)
		newList.appendChild(list[i])
	
	spellList.parentNode.replaceChild(newList, spellList)
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

  appendSpell(spell)
  sortSpells()

  f.reset()
}

form.addEventListener('submit', changeHeading)