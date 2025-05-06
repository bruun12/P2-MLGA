//  Cookie Utilities reuse from cookiet.js, but for JSON) 
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

export function addToCart(itemId) {
    
    console.log("added to cart " + itemId);
    let product = fetchProductItem(itemId);
    
    console.log(product);

    let cart = getCart();
    if (cart[itemId]) {
        
    }
}

//  Example Usage 
// Suppose you have buttons with data attributes for item id/info
document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const itemId = btn.getAttribute('data-id');
        const itemName = btn.getAttribute('data-name');
        const itemPrice = btn.getAttribute('data-price');
        addToCart(itemId);
        console.log(getCart());
    });
});

// on page load, you can access the cart, same load as cookiet.js:
window.addEventListener('load', () => {
    const cart = getCart();
    // Update your cart UI here
    console.log(cart);
}); 

async function fetchProductItem(id) {
    try {
        const response = await fetch(`/ProductItemById/${id}`);
        const data = await response.json();         
        return data;
    } catch (error) {
        console.error("Error fetching or processing data", error);
    }
}