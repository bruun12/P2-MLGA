//function that creates a text element with given type/class, id and the text from database 
export async function renderTextElem(type, id, text, parent = main) {
    //hent data fra json 
    let textElement = document.createElement(type); //create an element give by the type in the functioncall
    textElement.setAttribute("id", id);
    textElement.innerText = text; //gets the text from the funcion call (can oalso be one gotten from the database (See nameDisplay how))

    //append to the main element from html so it isn't hid behind navn bar
    parent.appendChild(textElement);
}

//function that creates an img with given  id and the src from database 
export async function renderImgElem(id, src, parent = main) {
    let imgElement = document.createElement("img"); 
    imgElement.setAttribute("src", src);
    imgElement.setAttribute("class", "mainIMG");
    imgElement.setAttribute("alt", "productPicture");

    // Find the main-image div and append the image to it
    const mainImageDiv = parent.querySelector('.main-image');
    if (mainImageDiv) {
        mainImageDiv.appendChild(imgElement);
    } else {
        // Fallback to appending to parent if main-image div is not found
        parent.appendChild(imgElement);
    }
}

//function that creates a text element with given type/class, id and the text from database 
export async function renderInputElem(id, placeholder, parent = main) {
    let inputElement = document.createElement("input"); 
    inputElement.type = "text";
    inputElement.setAttribute("id", id);
    inputElement.placeholder = placeholder; //the text that is shown when there is no input
    
    //append to the main element from html so it isn't hid behind navn bar
    parent.appendChild(inputElement);
}

//function that add the member to the sign up at an event
export async function renderBtn(id, text, parent = main) {
    let btn = document.createElement("button"); 
    btn.setAttribute("id", id);
    btn.innerText = text; 
    
    //append to the main element from html so it isn't hid behind navn bar
    parent.appendChild(btn);
}

/**
 * Format UTC date strings in an array of objects into "DD/MM/YY - HH:MM" format.
 * @param {Array} array The array containing the date we want formatted.
 * @param {String} dateKey The string defining what object in the array contains the date.
 * @param {String} outputKey The string defining what the new object in the array contining formatted dates is called.
 * @returns The Array with formatet date.
 */
export function formatDates(array, dateKey, outputKey) {
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