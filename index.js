const text = document.getElementById("change")
const form = document.querySelector("form")
const input = document.getElementById("changetext")

form.addEventListener("submit", function (ev) {
	ev.preventDefault()

	text.textContent = input.value
})
