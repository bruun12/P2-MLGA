import {getCart, deleteCookie} from '/js/basketfill.js';
import { renderTextElem, renderImgElem } from '/js/dom-utils.js';
/* HTML Navbar Template */
const navTmpl = (event) =>
    `
    <nav class="topnav">
        <a href="/"><img src="../images/logo.png" alt="logo taking user to frontpage" width="50" height="50"></a>
        <a href="/overview?type=product" class="product">Produkter <i class="fa fa-caret-down"></i></a>
        <a href="/overview?type=event">Events</a>
        <a href="/overview?type=store">Butikker</a>
        
        <!-- Div used to box elements -->
        <div class="nav-icons">
            <a href="login"><i class="fa-solid fa-circle-user"></i></a>
            <a href="profile"><i class="fa-solid fa-heart"></i></a>
            <a class="cartIcon" href=""><i class="fa-solid fa-cart-shopping"></i></a>
        </div>

        <!-- Div used to box search container elements -->
        <form action="http://localhost:3350/overview" class="search-container">
            <input type="hidden" name="type" value="product">
            <input type="text" placeholder="Search.." name="search">
            <button type="submit"><i class="fa fa-search"></i></button>
        </form>
    </nav>

    <!-- Subnav til products -->
    <div id="category-link" class="product-link">

    </div>

    <!-- Shopping cart -->
    <div class="cartTab">
        <h2>Shopping Cart</h2>
        <div class="listCart">
        </div>
        <div class="listCart"> <p id="finalPrice"> </p> </div>
        <div class="btn">
            <button class="closeCart">Close</button>
            <a href="/basket"><button class="checkOut">Check Out</button></a>
            <button class="closeCart" id="clearBasket">Clear basket</button>

        </div>
    </div>
    `

    /* HTML Footer Template */
const footTmpl = (event) =>
    `
    <footer>
        <p>Author: Biggie Cheese</p>
        <ul>
            <li>Get help here:
                <ul>
                    <li><p>Tlf nr: 8888 8888</p></li>
                    <li><a href="mailto:minionmail@norskemænd.dk">minionmail@norskemænd.dk</a></li>
                </ul>
            </li>
        </ul>
        <a href="https://chatgpt.com/">Om os</a>
    </footer>
    `

/* JS inserting footer and navbar */
let body = document.querySelector("body");

function insGlb() {
    body.insertAdjacentHTML('afterbegin', navTmpl(event));
    body.insertAdjacentHTML('beforeend', footTmpl(event));
}

insGlb()

/* ------ Navbar START ------ */
/* JS to show product drop down on mouseenter and hide on mouseleave */
let productLink = document.querySelector(".product-link");
let product = document.querySelector(".product");
let cartDiv = document.querySelector(".listCart");
let clearBasketBtn = document.querySelector("#clearBasket");



clearBasketBtn.addEventListener("click", function(){
    const itemInfoDivs = document.querySelectorAll(".cartItemDiv"); 
    itemInfoDivs.forEach(div => div.remove()); // Removes all items in cart
    deleteCookie("cart"); //Deletes items in cookie
    loadCart();
})

product.addEventListener("mouseenter", function(event){
    productLink.style.display = "block";
});

productLink.addEventListener("mouseleave", function(){
    productLink.style.display = "none";
});


export function loadCart(){
    setTimeout(() => {
        let cart = getCart();
        let sum = 0;
        let price = 0

        for (const id in cart) {
            let cartItem = document.querySelector(`#cartItemDiv${id}`);
            
            let priceRounded;    
            if (cartItem === null){
                let cartItemDiv = document.createElement("div");
                cartItemDiv.setAttribute("id", `cartItemDiv${id}`);
                cartItemDiv.setAttribute("class", `cartItemDiv`);
                cartDiv.appendChild(cartItemDiv);
                
                let itemInfo = document.createElement("div");
                itemInfo.setAttribute("class", "itemInfo");
                cartItemDiv.appendChild(itemInfo);
                
                renderTextElem(`p`, `item${id}Qty`, `${cart[id].cartQty} x `, itemInfo);
                renderTextElem(`p`, `cartItem${id}`, `${cart[id].name}`, itemInfo);

                price = cart[id].price * cart[id].cartQty;
                priceRounded = price.toFixed(2)
                renderTextElem(`p`, `item${id}Price`, `${priceRounded} kr.`, itemInfo);
            } else {
                document.querySelector(`#item${id}Qty`).innerText = `${cart[id].cartQty} x `;

                price = cart[id].price * cart[id].cartQty;
                priceRounded = price.toFixed(2)
                document.querySelector(`#item${id}Price`).innerText = `${priceRounded} kr.`;
            }

        }
        sum = sum + price;
        let sumRounded = sum.toFixed(2);
        document.querySelector("#finalPrice").innerText = `Total ${sumRounded} kr.`;
        
    }, 100);  // adjust delay as needed

}



/* JS to display and hide shopping cart */
let cartIcon = document.querySelector(".cartIcon");
let cartTab = document.querySelector(".cartTab");
let cartClose = document.querySelector(".closeCart");

cartIcon.addEventListener("click", function(event){
    event.preventDefault(); // Prevent default reloading of page, as button is <a></a>
    if(cartTab.style.display !== "block"){
        cartTab.style.display = "block";
        loadCart();
    } else {
        cartTab.style.display = "none";
    }
})

cartClose.addEventListener("click", function(){
    cartTab.style.display = "none";
})

function storeCategories(categories) {
    for (let i = 0; i < categories.length; i++){
        if(categories[i].id === categories[i].parent_id || categories[i] === undefined){
            createCategory(categories[i].name, categories[i].id)
        }
    }
}

function createCategory(name, id){

    let categoryNavA = document.createElement("a");
    categoryNavA.setAttribute("class", `categoryNavA`);
    productLink.appendChild(categoryNavA);
    categoryNavA.innerText = name;
    
    categoryNavA.href = `/overview?type=product&sortId=${id}`;   
}

async function fetchAndDisplayCategories() {
    try {
        const response = await fetch(`/allCategories`);
        const data = await response.json();

        //Creates the sidebar with all categories
        storeCategories(data);
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

fetchAndDisplayCategories();

/* ------ Navbar END ------ */
