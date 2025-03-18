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
let slidesContainer = document.querySelector('.slideshow-container');

const eventTmpl = (event) =>
    `
    <div class="mySlides fade">
        <img class="slide-image" src="${event.img}">
        <p class="text"><span>${event.event}</span></p>
    </div>
    `;

async function fetchEventData() {
    try {
        const response = await fetch('../database/slideshow.json');
        const data = await response.json();
        const events = data.slides

        events.forEach((event) => {
            slidesContainer.insertAdjacentHTML('beforeend', eventTmpl(event));
        });

        setupSlideshow();
    } catch (error) {
        console.error('Error fetching or parsing data:', error)
    }
}

fetchEventData();

/* Declare variables */
function setupSlideshow(){
    let i = 0;
    let slides = document.querySelectorAll('.mySlides');
    let prevBtn = document.querySelector('.prev');
    let nextBtn = document.querySelector('.next');
    let dots = document.querySelectorAll('.dot');
    
    
    /* Interval */
    let changeSlide;
    const intervalDuration = 8000; /* ms */
    
    /* Hides all slides */
    let hideAll = (n) => {
        n.forEach(n =>{
            n.style.display ="none";
        })
    }
    
    /* Show the first image on load, afterwards slideshow functions are used */
    hideAll(slides);
    slides[0].style.display = "block";
    updateDots();
    
    /* Hide all slides, then show the next slide*/
    let nextSlide = () => {
        i++;
        if(i >= slides.length) {
            i = 0;
        }
    
        hideAll(slides);
        slides[i].style.display = "block";
        updateDots();
    
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
        
        hideAll(slides);
        slides[i].style.display = "block"
        updateDots();
    
        /* Reset interval to avoid switching after button change */
        clearInterval(changeSlide);
        changeSlide = setInterval(nextSlide, intervalDuration)
    }
    
    /* Set up timer to change slides automatically */
    changeSlide = setInterval(nextSlide, intervalDuration);
    
    /* Interactive buttons on slides */
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);
    
    /* Change dot color below images */
    function updateDots(){
        dots.forEach((dot, index) => {
            if(index === i) {
                dot.style.backgroundColor = "#717171";
            } else {
                dot.style.backgroundColor = "#bbb";
            }
        })
    }
    
    /* Make dots clickable */
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            i = index;
            hideAll(slides);
            slides[i].style.display = "block";
            updateDots();
            clearInterval(changeSlide);
            changeSlide = setInterval(nextSlide, intervalDuration);
        });
    });
}


/* ------ Slideshow END ------ */