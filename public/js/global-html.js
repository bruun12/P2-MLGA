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

    <!-- Shopping cart -->
    <div class="cartTab">
        <h2>Shopping Cart</h2>
        <div class="listCart">
            <div class="item">
                <div class="image">
                    
                </div>
                <div class="name">
                    
                </div>
                <div class="totalPrice">
                    
                </div>
                <div class="quantity">
                    <span class="minus"><</span>
                    
                    <span class="plus">></span>
                </div>
            </div>
        </div>
        <div class=btn>
            <button class="closeCart">Close</button>
            <a href="/basket"<button class="checkOut">Check Out</button>
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

product.addEventListener("mouseenter", function(){
    productLink.style.display = "block";
});

productLink.addEventListener("mouseleave", function(){
    productLink.style.display = "none";
});

/* JS to display and hide shopping cart */
let cartIcon = document.querySelector(".cartIcon");
let cartTab = document.querySelector(".cartTab");
let cartClose = document.querySelector(".closeCart");

cartIcon.addEventListener("click", function(event){
    event.preventDefault(); // Prevent default reloading of page, as button is <a></a>
    cartTab.style.display = "block";
})

cartClose.addEventListener("click", function(){
    cartTab.style.display = "none";
})


/* ------ Navbar END ------ */
