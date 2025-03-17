/* ------ Navbar START ------ */
/* JS to show product drop down on mouseenter and hide on mouseleave */
let productLink = document.querySelector(".product-link");
let product = document.querySelector(".product");

product.addEventListener("mouseenter", function(){
    productLink.style.display = "block";
});

productLink.addEventListener("mouseleave", function(){
    productLink.style.display = "none";
});
/* ------ Navbar END ------ */


/* ------ Slideshow START ------ */
/* Fetch slideshow.json data for slideshow */
function fetchEventData() {
    fetch('/database/slideshow.json')
        .then(response =>{
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error('Failed to fatch data: ', error));
}
fetchEventData();


/* Declare variables */
let slides = document.querySelectorAll('.mySlides');
let i = 0;
let prevBtn = document.querySelector('.prev');
let nextBtn = document.querySelector('.next');

/* Interval */
let changeSlide;
const intervalDuration = 8000; /* ms */

/* Hides all slides */
let hideAll = () => {
    slides.forEach(slide =>{
        slide.style.display ="none";
    })
}

/* Show the first image on load, afterwards slideshow functions are used */
hideAll();
slides[0].style.display = "block";

/* Hide all slides, then show the next slide*/
let nextSlide = () => {
    i++;
    if(i >= slides.length) {
        i = 0;
    }

    hideAll();
    slides[i].style.display = "block";

    /* Reset interval to avoid switching after button change */
    clearInterval(changeSlide);
    changeSlide = setInterval(nextSlide, intervalDuration)
}

/* Hide all slides, then show the previous slide*/
let prevSlide = () => {
    i--;
    if(i < 0) {
        i = slides.length - 1;
    }
    
    hideAll();
    slides[i].style.display = "block"

    /* Reset interval to avoid switching after button change */
    clearInterval(changeSlide);
    changeSlide = setInterval(nextSlide, intervalDuration)
}

/* Set up timer to change slides automatically */
changeSlide = setInterval(nextSlide, intervalDuration);

/* Interactive buttons on slides */
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

/* Interactive dots below images */
let dots = querySelectorAll('.dot')

/* ------ Slideshow END ------ */