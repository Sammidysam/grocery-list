const DEFAULT_LEVEL = 1
const DEFAULT_MESSAGE = `Default value of ${DEFAULT_LEVEL} used`

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
const checkSpellLevel = function (spellLevel, spellName) {
	if (!isNumeric(spellLevel)) {
		errorBox.innerHTML = `${spellName} must be given a numeric level<br>${DEFAULT_MESSAGE}`
		spellLevel = DEFAULT_LEVEL
	} else if (spellLevel < 0) {
		errorBox.innerHTML = `${spellName} must be given a non-negative level<br>${DEFAULT_MESSAGE}`
		spellLevel = DEFAULT_LEVEL
	} else {
		errorBox.innerHTML = ''
	}

	return spellLevel
}

const changeHeading = function(ev) {
  ev.preventDefault()

  const f = ev.target
  const spellName = f.spellName.value
  const spellLevel = checkSpellLevel(f.spellLevel.value, spellName)

  appendSpell(spellName, spellLevel)
  sortSpells()

  f.reset()
}

form.addEventListener('submit', changeHeading)