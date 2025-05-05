//function that creates a text element with given type/class, id and the text from database 
//Return elements!!!ABTIN request
export async function renderTextElem(type, id, text, parent = main) {
    //hent data fra json 
    
    let textElement = document.createElement(type); //create an element give by the type in the functioncall
    textElement.setAttribute('id', id);
    textElement.innerText = text; //gets the text from the funcion call (can oalso be one gotten from the database (See nameDisplay how))
    if(text != null){
    //append to the main element from html so it isn't hid behind navn bar
    parent.appendChild(textElement);
    } 
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
}

//function that creates a text element with given type/class, id and the text from database 
export async function renderInputElem(id, placeholder, parent = main) {
    let inputElement = document.createElement('input'); 
    inputElement.type = 'text';
    inputElement.setAttribute('id', id);
    inputElement.placeholder = placeholder; //the text that is shown when there is no input
    
    parent.appendChild(inputElement);
}

//function that add the member to the sign up at an event
export async function renderBtn(id, text, parent = main) {
    let btn = document.createElement('button'); 
    btn.setAttribute('id', id);
    btn.innerText = text; 
    
    parent.appendChild(btn);
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
}