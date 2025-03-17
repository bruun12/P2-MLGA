
/* JS to show product drop down on mouseenter and hide on mouseleave */
let productLink = document.querySelector(".product-link");
let product = document.querySelector(".product");

product.addEventListener("mouseenter", function(){
    productLink.style.display = "block";
});

productLink.addEventListener("mouseleave", function(){
    productLink.style.display = "none";
});


/* JS for slideshow */
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

/* Show the first image afterwards slideshow functions are used */
hideAll();
slides[0].style.display = "block";

/* Hide all slides, then show the next slide*/
let nextSlide = () => {
    hideAll();
    slides[i].style.display = "block";
    i++;

    if(i === slides.length) {
        i = 0;
    }

    /* Reset interval to avoid switching after button change */
    clearInterval(changeSlide);
    changeSlide = setInterval(nextSlide, intervalDuration)
}

let prevSlide = () => {
    hideAll();
    slides[i].style.display = "block"
    i--;

    if(i === -1) {
        i = slides.length - 1;
    }

    /* Reset interval to avoid switching after button change */
    clearInterval(changeSlide);
    changeSlide = setInterval(nextSlide, intervalDuration)
}

/* Set up timer to change slides automatically */
changeSlide = setInterval(nextSlide, intervalDuration);

/* Interactive buttons on slides */
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);













/* STJÅLET FRA W3S TIL TESTING, SKAL LAVES OM TIL QUERYSELECTOR! */
/* document.addEventListener("DOMContentLoaded", function() {
    let slideIndex = 1;
    showSlides(slideIndex);

    // Function to change slides automatically every 10 seconds
    function autoSlide() {
        plusSlides(1); // Move to the next slide
    }
    
    let slideInterval = setInterval(autoSlide, 10000); // 10,000ms = 10 seconds

    // Next/previous controls
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
    }

    // Attach event listeners to buttons
    document.querySelector(".prev").addEventListener("click", function() {
        plusSlides(-1);
        resetTimer();
    });

    document.querySelector(".next").addEventListener("click", function() {
        plusSlides(1);
        resetTimer();
    });

    let dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        dot.addEventListener("click", function() {
            currentSlide(index + 1);
            resetTimer();
        });
    }); */

    // Function to reset the auto-slide timer when user interacts
/*     function resetTimer() {
        clearInterval(slideInterval); // Stop the current interval
        slideInterval = setInterval(autoSlide, 10000); // Restart the timer
    }
}); */

/* STJÅLET FRA W3S TIL TESTING, SKAL LAVES OM TIL QUERYSELECTOR SLUT!  */