let button = document.querySelector("#button-menu");
let body = document.body

button.addEventListener("click", () => {
  body.classList.toggle("sidebar")
})