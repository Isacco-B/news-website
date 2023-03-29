const hamburgerico = document.querySelector('.hamburger-ico')
const iconClose = document.querySelector('.icon-close')
const iconHamburger = document.querySelector('.icon-hamburger')
const navBarMenu = document.querySelector('.navbar-menu')

hamburgerico.addEventListener("click", function () {
    navBarMenu.classList.toggle('navbar-menu-open');
    iconClose.classList.toggle('hamburger-open-true');
    iconHamburger.classList.toggle('hamburger-open-false');

})
