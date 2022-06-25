const menuToggle = document.querySelector(".menu-toggle input");
const nav = document.querySelector("#navbarNav ul");

menuToggle.addEventListener("click", function () {
    nav.classList.toggle("slide");
});