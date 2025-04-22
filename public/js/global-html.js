/* HTML Navbar Template */
const navTmpl = (event) =>
    `
    <nav class="topnav">
        <a href="front-page.html"><img src="../images/logotemp.jpg" alt="logo taking user to frontpage" width="50" height="50"></a>
        <a href="/overview?type=product" class="product">Produkter <i class="fa fa-caret-down"></i></a>
        <a href="/overview?type=event">Events</a>
        <a href="https://da.wikipedia.org/wiki/Butik">Butikker</a>
        
        <!-- Div used to box elements -->
        <div class="nav-icons">
            <a href="login.html"><i class="fa-solid fa-circle-user"></i></a>
            <a href="https://da.bab.la/ordbog/engelsk-dansk/favorite"><i class="fa-solid fa-heart"></i></a>
            <a href="https://danmad.dk/vare-kategori/dase-konserves/pickles/?srsltid=AfmBOoq8LDLUP8niB2aMm6aOz4LkwSwYLJC4czeFZSM6Yv4jFvOtRnMp"><i class="fa-solid fa-cart-shopping"></i></a>
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

    /* JS inserting footer and navbar */
let body = document.querySelector("body");

function insGlb() {
    body.insertAdjacentHTML('beforebegin', navTmpl(event));
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
/* ------ Navbar END ------ */


/* ------ Cart/Basket START ------ */
/* ------ HTML Tmpl Cart/Basket ------ */
const cartTmpl = (event) =>
    `
    <div class="cartTab">
        <h2>Shopping Cart</h2>
        <div class="listCart">
            <div class="item">
                <div class="image">
                    ${INSERT_IMAGE_HERE}
                </div>
                <div class="name">
                    ${INSERT_NAME_HERE}
                </div>
                <div class="totalPrice">
                    ${INSERT_TOTAL_HERE}
                </div>
                <div class="quantity">
                    <span class="minus"><</span>
                    ${INSERT_QUANTITY_HERE}
                    <span class="plus">></span>
                </div>
            </div>
        </div>
        <div class=btn>
            <button class="close">Close</button>
            <button class="checkOut">Check Out</button>
        </div>
    </div>
    `

/* ------ Cart/Basket END ------ */