const form = document.querySelector("form")
const text = document.getElementById("change")
const btn = document.querySelector("button")

const changeText = function () {
    const field = document.getElementById("changetext")

    text.textContent = field.value
}

btn.addEventListener("click", changeText)