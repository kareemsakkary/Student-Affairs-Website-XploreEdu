menu = document.querySelector(".menu");
menu.onclick = function () {
    navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
    header = document.querySelector("header");
    header.classList.toggle("active");
}
