const text = document.getElementById("change")

const get = function (name) {
    if (name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
       return decodeURIComponent(name[1]);
 }

const newtext = get("newtext")
if (newtext != "") {
    text.textContent = newtext
}