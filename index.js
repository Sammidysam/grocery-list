const btnText = document.getElementById("button")
const inputText = document.getElementById("input")
const form = document.querySelector("form")
const btn = document.querySelector("button")

btn.addEventListener("click", function () {
	btnText.textContent = "New text!"
})

form.addEventListener("submit", function (ev) {
	ev.preventDefault()

	inputText.textContent = ev.target.newtext.value
})
