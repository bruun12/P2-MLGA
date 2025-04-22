const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

function pathDisplay(path){
    let productPath = document.createElement("P");
    productPath.setAttribute("id", "path");

    let pathNImg = document.querySelector("#pathNImg");
    pathNImg.appendChild(productPath);

    productPath.innerText = path;
} 

function imgDisplay(img){
    let productImg = document.createElement("img");
    productImg.setAttribute("src", img);
    productImg.setAttribute("class", "mainIMG");
    productImg.setAttribute("alt", "productPicture");
    
    let pathNImg = document.querySelector("#pathNImg");
    pathNImg.appendChild(productImg);

    return productImg;
}

function nameDisplay(name){
    let productName = document.createElement("P");
    productName.setAttribute("id", "name");
    
    let productAttributes = document.querySelector("#productAttributes");
    productAttributes.appendChild(productName);

    productName.innerText = `${name}:`;
}

function priceDisplay(price){
    let productPrice = document.createElement("P");
    productPrice.setAttribute("id", "price");
    
    let productAttributes = document.querySelector("#productAttributes");
    productAttributes.appendChild(productPrice);

    productPrice.innerText = `${price}kr.`;
}


function infoDisplay(info){
    let productInfoP = document.createElement("P");
    productInfoP.setAttribute("id", "info");
    
    let productInfo = document.querySelector("#productInfo");
    productInfo.appendChild(productInfoP);

    productInfoP.innerText = info;
}

/*
fetch(`/product/${productId}`)
//Her omskriver vi det fra json til et array i js. Arrayet hedder "data" i næste function
.then(response => {return response.json()})
.then(data=>{
    
    
    let i = 0;
        pathDisplay(data.products[i].subCategory);
        imgDisplay(data.products[i].img);

        nameDisplay(data.products[i].product);
        priceDisplay(data.products[i].price);

        infoDisplay(data.products[i].info);
    
})
*/
async function fetchData() {
    try {
      const response = await fetch(`/product/${productId}`);
      const data = await response.json();
      console.dir(data, { depth: null });
    } catch (error) {
      console.error('Error:', error);
    }
  }
fetchData();