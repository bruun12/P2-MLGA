//setAttribute class?

//function that creates a text element with given type/class, id and the text from database 
export async function renderTextElem(type, id, text, parent = main) {
    //hent data fra json 
    
    let textElement = document.createElement(type); //create an element give by the type in the functioncall
    textElement.setAttribute('id', id);
    textElement.innerText = text; //gets the text from the funcion call (can oalso be one gotten from the database (See nameDisplay how))
    if(text != null){
    //append to the main element from html so it isn't hid behind navn bar
    parent.appendChild(textElement);
    } 
    return textElement;
}

//function that creates an img with given  id and the src from database 
export async function renderImgElem(id, src, parent = main) {
    let imgElement = document.createElement('img'); 
    imgElement.setAttribute('id', id)
    imgElement.setAttribute('src', src);
    imgElement.setAttribute('class', 'mainIMG');
    imgElement.setAttribute('alt', 'productPicture');

    if(src != null){
        // Find the main-image div and append the image to it
        const mainImageDiv = parent.querySelector('.main-image');
        if (mainImageDiv) {
            mainImageDiv.appendChild(imgElement);
        } else {
            parent.appendChild(imgElement);
        }
    }
    return imgElement;
}

//function that creates a text element with given type/class, id and the text from database 
export function renderInputElem({id, className = "", inputType = "text", placeholder = "", defaultValue = "", minValue, parent = document.body}={}) {
    let inputElem = document.createElement("input"); 
    
    inputElem.setAttribute("type", inputType);
    inputElem.setAttribute("id", id);

    //Optionals
    if (placeholder) {
        inputElem.setAttribute("placeholder", placeholder); //text shown when there is no input
    }

    // if (value !== "") instead of (value) to allow 0, which otherwise is falsy
    if (defaultValue !=="") { 
        inputElem.setAttribute("value", defaultValue);; //specifies the default value 
    }

    if (className) { 
        inputElem.setAttribute("class", className);
    }
    
    parent.appendChild(inputElem);
    return inputElem;
}


export function renderButtonElem({id, text, parent = document.body}={}) {
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
  renderLabelElem({forId: associatingId, text: labelText, parent: parent});

  //Create dropdown menu for this label 
  let selectElement = document.createElement("select");
  selectElement.setAttribute("id", associatingId); //associates dropdown w label                this is the important one!!!!!!!!!!!!
  selectElement.setAttribute("name", selectName); //maybe not needed if not using form /should it be id?
  parent.appendChild(selectElement);

  return selectElement;
}

export function renderLabelElem({forId, className, text, parent = document.body} ={}) {
    //Create a label for the select element
  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", forId); //associates label w dropdown

  if (className) {
    labelElement.setAttribute("class", className);
  }

  labelElement.innerText = text; //Display name 
  parent.appendChild(labelElement);
}

export function renderOptionElem(value, text, parent = document) {
 let optionElement = document.createElement("option");
 optionElement.setAttribute("value", value);
 optionElement.innerText = text;

 parent.appendChild(optionElement);
 return optionElement;
}


//Helper function to streamline event listeners with event delegation, modular
/**
 * Adds a delegated event listener to a specified parent element.
 * The event only triggers when the target element matches the given selector
 * Useful for dynamically created elements.
 * 
 * @param {string} type - The type of event (e.g., "click", "input").
 * @param {string} selector - The CSS selector to match elements.
 * @param {function} callback - The function to execute when the event fires.
 * @param {HTMLElement} [parent=document] - The parent element to attach the event to.
 */
export function addDelegatedEventListener(type, selector, callback, parent = document){
  parent.addEventListener(type, (e) => {
    if (e.target.matches(selector)){
      callback(e);
    }
  });
}

//Function to create map
export async function renderMap(id, address) {
    //formats the address to a url to ensure that its safe from special caracters
    const formatAddress = encodeURIComponent(address);
    //create url to insert the given addressses in the google maps map creater thing
    const mapUrl = `https://www.google.com/maps?q=${formatAddress}&output=embed`;
    
    let iframe = document.createElement('iframe')
    const parent = document.querySelector("main .location-map")

    iframe.src = mapUrl;
    iframe.setAttribute('id', id)
    iframe.setAttribute('map', 'class');
    //I know det skal være i css men ville bare lige se det :-))
    iframe.style.height="100%";
    iframe.style.width="100%";
     
    //bruges ikke længere men der skal nok være en anden for for tjek ved manglende addresse
    if(address!=null){
        parent.appendChild(iframe);   
    }
    return iframe;
}
