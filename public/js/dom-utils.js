//function that creates a text element with given type/class, id and the text from database 
export async function renderTextElem(type, id, text, parent = main) {
    //hent data fra json 
    let textElement = document.createElement(type); //create an element give by the type in the functioncall
    textElement.setAttribute("id", id);
    textElement.innerText = text; //gets the text from the funcion call (can oalso be one gotten from the database (See nameDisplay how))

    //append to the main element from html so it isn't hid behind navn bar
    parent.appendChild(textElement);

    return textElement;
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


export function renderButtonElem(id, text, parent = document) {
    let buttonElement = document.createElement("button");
    buttonElement.setAttribute("id", id);
    buttonElement.innerText = text;
   
    parent.appendChild(buttonElement);
    return buttonElement;
}


export function renderDivElem({id, className, parent = document.body} = {}) {
    
    let divElem = document.createElement("div");

    if(id) {
        divElem.setAttribute("id", id);
    }

    if (className) {
        divElem.setAttribute("class", className);
    }

    parent.appendChild(divElem);

    return divElem;
}


/* Creates a label and a select (dropdown) element, appends both to the same parent supplied
* @param {*} associatingId - for atribute of label, id attribute of select must match
* @param {string} labelText - text displayed in the label
* @param {string} selectName - not sure
* @param {HTMLElement} parent - parent to attach both to
* @returns 
*/
export function renderSelectWLabelElem(associatingId, labelText, selectName, parent = document) {
  //Create a label for the select element
  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", associatingId); //associates label w dropdown
  labelElement.innerText = labelText; //Display name 
  parent.appendChild(labelElement);

  //Create dropdown menu for this label 
  let selectElement = document.createElement("select");
  selectElement.setAttribute("id", associatingId); //associates dropdown w label                this is the important one!!!!!!!!!!!!
  selectElement.setAttribute("name", selectName); //maybe not needed if not using form /should it be id?
  parent.appendChild(selectElement);

  return selectElement;
}

export function renderOptionElem(value, text, parent = document) {
 let optionElement = document.createElement("option");
 optionElement.setAttribute("value", value);
 optionElement.innerText = text;

 parent.appendChild(optionElement);
 return optionElement;
}