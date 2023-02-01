const menuButton = document.querySelector('.navbar-small-hamburger')
const mobileNavbar = document.querySelector('.header-navbar-mob') 

menuButton.addEventListener('click', event => {
    mobileNavbar.classList.toggle('is-active')
})