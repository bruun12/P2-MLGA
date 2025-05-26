import {deleteCookie} from '../js/basketfill.js';
import { loadCart } from '../js/cart.js';
/* HTML Navbar Template */
const navTmpl = (event) =>
    `
    <nav class="topnav">
        <a href="/../node0/" class="logo"><img src="images/logo.png" alt="logo taking user to frontpage" width="50" height="50"></a>
        <a href="overview?type=product" class="product layer2">Products <i class="fa fa-caret-down"></i></a>
        <a href="overview?type=event" class="event layer2">Events</a>
        <a href="overview?type=store" class="store layer2">Stores</a>
        
        <!-- Div used to box elements -->
        <div class="nav-icons">
            <a href="login"><i class="fa-solid fa-circle-user"></i></a>
            <a href="profile"><i class="fa-solid fa-heart"></i></a>
            <a class="cartIcon" href=""><i class="fa-solid fa-cart-shopping"></i></a>
        </div>

        <!-- Div used to box search container elements -->
        <form action="overview" class="search-container">
            <input type="hidden" name="type" value="product">
            <input type="text" placeholder="Search for products.." name="search">
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
            <button class="closeCart">Close Cart</button>
            <a href="basket"><button class="checkOut">Check Out</button></a>
            <button class="closeCart" id="clearBasket">Clear Cart</button>

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
                    <li><p>Phone Number: 8888 8888</p></li>
                    <li><a href="mailto:minionmail@norwegianmen.dk">minionmail@norwegianmen.dk</a></li>
                </ul>
            </li>
        </ul>
        <a href="">About us</a>
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
let eventnav = document.querySelector(".event");
let store = document.querySelector(".store")
let logo = document.querySelector(".logo")
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

function hideProdLink() {
    productLink.style.display = "none";
}

productLink.addEventListener("mouseleave", hideProdLink);
eventnav.addEventListener("mouseenter", hideProdLink);
store.addEventListener("mouseenter", hideProdLink);
logo.addEventListener("mouseenter", hideProdLink);




/* JS to display and hide shopping cart */
let cartIcon = document.querySelector(".cartIcon");
let cartTab = document.querySelector(".cartTab");
let cartClose = document.querySelector(".closeCart");

export function showCart(){
    cartTab.style.display = "block";
}

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
    
    categoryNavA.href = `overview?type=product&sortId=${id}`;   
}

async function fetchAndDisplayCategories() {
    try {
        const response = await fetch(`allCategories`);
        const data = await response.json();

        //Creates the sidebar with all categories
        storeCategories(data);
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

fetchAndDisplayCategories();

/* ------ Navbar END ------ */
