/*
let form = document.querySelector(".form");

let submit = document.querySelector("btnSubmitProduct").addEventListener("click", (event)=>{
    event.preventDefault()

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);


    fetch("../database/products.json", {
    
        // Adding method type
        method: "POST",
        
        // Adding body or contents to send
        body: JSON.stringify(data),
        
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(res => res.json()).then(data => console.log(data))
});
*/




