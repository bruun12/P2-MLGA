console.log("hvis du læser dette, så er det femdreng der elsker agurk");

let carts = document.querySelector('.add-cart');

for (let i = 0; i < basket.length ; i++) {
    carts[i].addEventListener('click', () => {
        console.log("clicked");
        cartNumbers();
    });
    
}

//  Cookie Utilities (reuse from Untitled-1, but for JSON) 
function setCookie(name, value, daysToLive) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
}

function getCookie(name) {
    const cDecoded = decodeURIComponent(document.cookie);
    const cArray = cDecoded.split("; ");
    let result = null;
    cArray.forEach(element => {
        if (element.indexOf(name + "=") === 0) {
            result = element.substring(name.length + 1);
        }
    });
    return result;
}

//  Cart Functions 
function getCart() {
    const cart = getCookie("cart");
    return cart ? JSON.parse(cart) : {};
}

function saveCart(cart) {
    setCookie("cart", JSON.stringify(cart), 7); // 7 days expiry
}

function addToCart(itemId, itemInfo) {
    let cart = getCart();
    if (cart[itemId]) {
        cart[itemId].quantity += 1;
    } else {
        cart[itemId] = { ...itemInfo, quantity: 1 };
    }
    saveCart(cart);
}

//  Example Usage 
// Suppose you have buttons with data attributes for item id/info
document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const itemId = btn.getAttribute('data-id');
        const itemName = btn.getAttribute('data-name');
        const itemPrice = btn.getAttribute('data-price');
        addToCart(itemId, { name: itemName, price: itemPrice });
        console.log(getCart());
    });
});

// On page load, you can access the cart:
window.addEventListener('load', () => {
    const cart = getCart();
    // Update your cart UI here
    console.log(cart);
});

// html knap

<button class="add-cart" data-id="123" data-name="Apple" data-price="2.99">Add to Cart</button>