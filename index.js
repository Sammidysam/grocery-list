const form = document.querySelector('form')

const changeHeading = function(ev) {
  ev.preventDefault()

  const f = ev.target
  const spellName = f.spellName.value
  const spellLevel = f.spellLevel.value

  const spellsDiv = document.querySelector('#spells')
  spellsDiv.innerHTML += `<li>${spellName}, Level ${spellLevel}</li>`

  f.reset()
}

form.addEventListener('submit', changeHeading)