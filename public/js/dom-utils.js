//lav en samlet funktion for displayerne
//Skriv export foran funkotinen og importer dem i product.ja (evt en med nyt navn)
    /*
   let mainElement = document.querySelector("main");
    if(mainElement){
        mainElement.appendChild(textElement);
    } else{
        document.body.appendChild(textElement);
        alert("No main element found"); //evt slet eller laves mere subtle
    }
    */
//function that check if there is a main elemet in the html to insert the information into, give by the type defined in the dom-utils functions
async function htmlMainInsert(typeElem){ 
    let mainElement = document.querySelector("main");
    if(mainElement){
        mainElement.appendChild(typeElem);
    } else{
        document.body.appendChild(typeElem);
        alert("No main element found"); //evt slet eller laves mere subtle
    }
return;
}

//function that creates a text element with given type/class, id and the text from database 
export async function renderTextElem(type, id, text) {
    //hent data fra json 
    let textElement = document.createElement(type); //create an element give by the type in the functioncall
    textElement.setAttribute("id", id);
    textElement.innerText = text; //gets the text from the funcion call (can oalso be one gotten from the database (See nameDisplay how))

    //append to the main element from html so it isn't hid behind navn bar
    htmlMainInsert(textElement)
    return;
}

//function that creates an img with given  id and the src from database 
export async function renderImgElem(id, src) {
    let imgElement = document.createElement("img", id); 
    imgElement.setAttribute("src", src);
    imgElement.setAttribute("class", "mainIMG");
    imgElement.setAttribute("alt", "productPicture");

    //append to the main element from html so it isn't hid behind navn bar
    htmlMainInsert(imgElement)
}

//function that creates a text element with given type/class, id and the text from database 
export async function renderInputElem(id, placeholder) {
    let inputElement = document.createElement("input"); 
    inputElement.type = "text";
    inputElement.setAttribute("id", id);
    inputElement.placeholder = placeholder; //the text that is shown when there is no input
    
    //append to the main element from html so it isn't hid behind navn bar
    htmlMainInsert(inputElement)
    return;
}
//function that add the member to the sign up at an event
export async function renderBtn(id, text) {
    let btn = document.createElement("button"); 
    btn.setAttribute("id", id);
    btn.innerText = text; 
    
    //append to the main element from html so it isn't hid behind navn bar
    htmlMainInsert(btn)

        return;
}