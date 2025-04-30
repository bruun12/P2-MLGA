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
    let imgElement = document.createElement("img", id); 
    imgElement.setAttribute("src", src);
    imgElement.setAttribute("class", "mainIMG");
    imgElement.setAttribute("alt", "productPicture");

    //append to the main element from html so it isn't hid behind navn bar
    parent.appendChild(imgElement);
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