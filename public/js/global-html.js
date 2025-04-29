/* HTML Navbar Template */
const navTmpl = (event) =>
    `
    <nav class="topnav">
        <a href="front-page.html"><img src="../images/logotemp.jpg" alt="logo taking user to frontpage" width="50" height="50"></a>
        <a href="productPage.html" class="product">Produkter <i class="fa fa-caret-down"></i></a>
        <a href="https://www.disney.dk/">Events</a>
        <a href="https://da.wikipedia.org/wiki/Butik">Butikker</a>
        
        <!-- Div used to box elements -->
        <div class="nav-icons">
            <a href="login.html"><i class="fa-solid fa-circle-user"></i></a>
            <a href="https://da.bab.la/ordbog/engelsk-dansk/favorite"><i class="fa-solid fa-heart"></i></a>
            <a class="basket"><i class="fa-solid fa-cart-shopping"></i></a>
        </div>

        <!-- Div used to box search container elements -->
        <form action="https://www.google.com/" class ="search-container">
            <input type="text" placeholder="Search.." name="q">
            <button type="submit"><i class="fa fa-search"></i></button>
        </form>
    </nav>

    <!-- Subnav til products -->
    <div class="product-link">
        <ul>
            <li><a href="https://www.zalando.dk/">Tøj</a>
                <ul>
                    <li><a href="https://www.zalando.dk/herrer-home/">Herre</a></li>
                    <li><a href="https://www.zalando.dk/damer-home/">Damer</a></li>
                    <li><a href="https://www.zalando.dk/boern-home/">Børn</a></li>
                </ul>
            </li>

            <li><a href="https://kunsten.dk/">Kunst</a>
                <ul>
                    <li><a href="https://en.wikipedia.org/wiki/Minions_(Despicable_Me)">Top Dollar</a></li>
                </ul>
            </li>

            <li><a href="https://www.ikea.com/">Husholdning</a>
                <ul>
                    <li><a href="https://www.billigblomst.dk/">Planter</a></li>
                </ul>
            </li>
        
            <li><a href="https://www.fortnite.com/?lang=en-US">Hobby</a>
                <ul>
                    <li><a href="https://lakridspizza.dk/">Musik</a></li>
                    <li><a href="https://laesehesten.dk/">Bøger</a></li>
                    <li><a href="https://hotgirl.dk/shop/webshop-restsalg-tilbud-845c1.html">Legetøj</a></li>
                </ul>
            </li>
        </ul>
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

/* ------ HTML Tmpl Cart/Basket ------ */
const cartTmpl = (event) =>
    `
    <div class="cartTab">
        <h2>Shopping Cart</h2>
        <div class="listCart">
      
        </div>
        <div class=btn>
            <button class="close">Close</button>
            <button class="checkOut">Check Out</button>
        </div>
    </div>
    `

/* Define body used in multiple places below */
let body = document.body; /* Same as querySelector, but more efficient. */

/* JS inserting global content */
function insGlb() {
    body.insertAdjacentHTML('afterbegin', navTmpl());
    body.insertAdjacentHTML('beforeend', footTmpl());
    
    let nav = document.querySelector(".topnav");
    nav.insertAdjacentHTML('beforeend', cartTmpl());
}
/* Call function to insert code */
insGlb();


/* ------ Navbar START ------ */
/* JS to show product drop down on mouseenter and hide on mouseleave */
let productLink = document.querySelector(".product-link");
let product = document.querySelector(".product");

/* Show drop down of product categories */
product.addEventListener("mouseenter", function(){
    productLink.style.display = "block";
});

/* Hide drop down of product categories */
productLink.addEventListener("mouseleave", function(){
    productLink.style.display = "none";
});

/* ------ Navbar END ------ */


/* ------ Cart/Basket START ------ */
/* When content is loaded, make it possible to display shopping cart */
document.addEventListener("DOMContentLoaded", function(){
    /* Basket icon */
    let basket = document.querySelector(".basket");
    /* Cart tab div */
    let cartTab = document.querySelector(".cartTab");
    /* Close button in Cart tab */
    let closeBtn = document.querySelector(".cartTab .btn .close");

    basket.addEventListener("click", function(){
        cartTab.style.display = "grid"; /* Show cart */
        cartTab.style.inset = "0 0 0 auto"; /* Bring cart into view */
        body.classList.add("cart-open"); /* Add class cart-open to body */
    });

    closeBtn.addEventListener("click", function(){
        cartTab.style.inset = "0 -400px 0 auto"; /* hide cart */
        setTimeout(() => { /* remove display of cart after 300 ms */
            cartTab.style.display = "none";
        }, 300);
        body.classList.remove("cart-open"); /* remove body class */
    });
});

/* TODO: read cart array from database */
let cartArr = [];

let addCartButtons = document.querySelectorAll(".addCart");

addCartButtons.forEach(button => {
    button.addEventListener("click", function() {
        addToCart(this); // 'this' refers to the clicked button
    });
});

/* Function adding item to cart */
function addToCart(button){
    let productDiv = button.closest(".productDiv"); /* find closest product container */
    let productID = productDiv.querySelector(".productID").innerText; /* find product id */
    let productName = productDiv.querySelector(".productName").innerText; /* find name of product */
    let productPrice = productDiv.querySelector(".productPrice").innerText; /* find price of product */
    let productImg = productDiv.querySelector(".productIMG").src; /* find img src of product */
    let storeID = productDiv.querySelector(".storeID").innerText; /* find store id */

    let existingItem = cartArr.find(item => item.productID === productID); /* find item in cart */

    if (existingItem) { /* if in cart, increment quantity */
        existingItem.quantity++; /* increment quantity of item in cart */
    } else { /* else add item to cart */
        cartArr.push({
            productID: productID,
            product: productName,
            price: productPrice,
            img: productImg,
            storeID: storeID,
            quantity: 1
        });
    }

    /* Save cart to local storage/cookie whatever */
    //saveCart();

    /* Update the cart ui to display current cart to user */
    updateCartUI(cartArr);
}

/* Function updating cart ui to display current items in basket */
function updateCartUI(cartArr){
    /* Select basket list containing items */
    let listCart = document.querySelector(".listCart");

    /* Remove all existing items from html to prevent duplicates*/
    while(listCart.firstChild){
        listCart.removeChild(listCart.firstChild);
    }

    /* Create list of items in html */
    for(let item of cartArr){
        /* Create div container for item */
        let itemDiv = document.createElement("div");
        itemDiv.setAttribute("class", "item");
        listCart.appendChild(itemDiv);

        /* Create div container for item image */
        let imgDiv = document.createElement("div");
        imgDiv.setAttribute("class", "itemImg");
        listCart.appendChild(imgDiv);

        /* Create div container for item name */
        let nameDiv = document.createElement("div");
        nameDiv.setAttribute("class", "itemName");
        itemDiv.appendChild(nameDiv);

        /* Create div container for total price */
        let priceTotDiv = document.createElement("div");
        priceTotDiv.setAttribute("class", "totalPrice");
        itemDiv.appendChild(priceTotDiv);

        /* Create div container for quantity */
        let qtyDiv = document.createElement("div");
        qtyDiv.setAttribute("class", "quantity");
        itemDiv.appendChild(qtyDiv);
        
        /* Insert product image in item image div */
        let productImg = document.createElement("img");
        productImg.setAttribute("src", item.img);
        productImg.setAttribute("alt", "Image of product");
        imgDiv.appendChild(productImg);

        /* Insert product name in product name div */
        let productName = document.createElement("p");
        productName.innerText = item.product;
        nameDiv.appendChild(productName);

        /* Insert total price of product based on quantity of product in cart */
        let productPrice = document.createElement("p");
        productPrice.innerText = `${parseFloat(item.price) * item.quantity} DKK`; /* Ensure price is a float and not a string */
        priceTotDiv.appendChild(productPrice);

        /* Insert decrement button for quantity */
        let spanMinus = document.createElement("span");
        spanMinus.setAttribute("class", "Minus");
        spanMinus.innerText = '<'
        qtyDiv.appendChild(spanMinus);

        /* Insert quantity */
        let productQty = document.createElement("p");
        productQty.innerText = item.quantity;
        qtyDiv.appendChild(productQty);

        /* Insert increment button for quantity */
        let spanPlus = document.createElement("span");
        spanPlus.setAttribute("class", "plus");
        spanPlus.innerText = '>'
        qtyDiv.appendChild(spanPlus);
    }
}

/* ------ Cart/Basket END ------ */


/*  How items should look when inserted into listCart
            <div class="item">
                <div class="image">
                    <p>INDÆST IMAGE HER</p>
                </div>
                <div class="name">
                    <p>INDÆST NAME HER</p>
                </div>
                <div class="totalPrice">
                    <p>INDÆST PRIS HER</p>
                </div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <p>INDÆST QUANTITY HER</p>
                    <span class="plus">></span>
                </div>
            </div>
 */