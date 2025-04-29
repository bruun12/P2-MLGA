/* Slideshow event templates */
const eventTmpl = (event) =>
    `
    <div class="mySlides fade">
    <img class="slide-image" src="${event.img}">
    <p class="text"><span>${event.description + ' - ' + event.localDate}</span></p>
    </div>
    `;


const eventTmp2 = (event) =>
    `
    <span class="dot"></span>
    `;


/* ------ Slideshow START ------ */
/* Fetch events data for slideshow */
let slidesContainer = document.querySelector('.slideshow-container');
let dotContainer = document.querySelector('.dot-container')
async function fetchEventData() {
    try {
        const response = await fetch('/allEvents');
        const data = await response.json();
        console.log(data);

        // Get current date and date in three weeks.
        const now = new Date(); // Current date in ISO UTC format: "2015-06-13T22:00:00.000Z"
        const inXDays = new Date(); // Variable for date in X days.
        const days = 1500; // Variable used to add to current date.
        inXDays.setDate(now.getDate() + days); // inXDays = current date + x days. (If days = 7, it will be set to next week)

        // Filter events between now and x days.
        const upcomingEvents = data.filter(event => {
            const eventDate = new Date(event.date); // Requires event date to be in ISO format "2015-06-13T22:00:00.000Z"
            return eventDate >= now && eventDate <= inXDays; // eventDate must be today or later and less than or equal to latest date shown.
        });

        // Convert event dates to readable form
        formatEventDates(upcomingEvents, 'date', 'localDate');

        console.log(upcomingEvents);
        // Create slideshow from filtered data
        upcomingEvents.forEach((event) => {
            slidesContainer.insertAdjacentHTML('beforeend', eventTmpl(event));
            dotContainer.insertAdjacentHTML('beforeend', eventTmp2(event));
        });
        
        setupSlideshow();
    } catch (error) {
        console.error('Error fetching or parsing data:', error)
    }
}

fetchEventData(); // Setup slide show of events

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
/**
 * Format UTC date strings in an array of objects into "DD/MM/YY - HH:MM" format.
 * @param {Array} array The array containing the date we want formatted.
 * @param {String} dateKey The string defining what object in the array contains the date.
 * @param {String} outputKey The string defining what the new object in the array contining formatted dates is called.
 * @returns The Array with formatet date.
 */
export function formatEventDates(array, dateKey, outputKey) {
    array.forEach(item => {
        // Convert the ISO UTC format to a JavaScript Date object
        const date = new Date(item[dateKey]);

        // Extract and format each component of the date with leading zeros as needed
        const day = String(date.getDate()).padStart(2, '0');          // Gets the day of the month, ensuring it's always 2 digits ("04" instead of "4").
        const month = String(date.getMonth() + 1).padStart(2, '0');   // Gets the month (add 1 since JavaScript months are 0-based).
        const year = String(date.getFullYear()).slice(-2);            // Takes the year and changes it to the last 2 digits of the year (2028 → "28").
        const hours = String(date.getHours()).padStart(2, '0');       // Hour in 24-hour format (00–23).
        const minutes = String(date.getMinutes()).padStart(2, '0');   // Minutes in 24-hours format (00–59).

        // Combine the formatted components into the desired output string
        item[outputKey] = `${day}/${month}/${year} - ${hours}:${minutes}`;
    });

    // Return the modified array with formatted date strings added
    return array;
}