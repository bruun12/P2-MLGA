import { clampQty } from "./dom-utils.js";
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
export function getCart() {
    const cart = getCookie("cart");
    return cart ? JSON.parse(cart) : {};
}

function saveCart(cart) {
    setCookie("cart", JSON.stringify(cart), 7); // 7 days expiry
} 




export async function addToCart(itemId, selectedQty) {
    console.log(`Added to cart: itemId:${itemId}, Quantity: ${selectedQty}`);
    const product = await fetchProductItem(itemId);
    let cart = getCart();
    // Hvis den findes incrementer vi bare, hvor mange vi har i kurv.
    if (cart[itemId]) {
        cart[itemId].cartQty += selectedQty;
        //console.log(cart[itemId].cartQty);
    } else {
        // opretter produkt og gemmer det på dets itemId
        product.cartQty = selectedQty;
        cart[itemId] = product;
    }
    saveCart(cart);
}

export function updateCartQty(itemId, clampedQty) {
    console.log("entered updateCartQTy");
    let cart = getCart();
    
    // Early exit if item is not in the cart
     if (!cart[itemId]) {
      console.warn(`Item ${itemId} not found in cart.`);
        return;
    }

    //Updates quantity
    cart[itemId].cartQty = parseInt(clampedQty);
    saveCart(cart);
}

export function deleteCartItem(itemId) {
    console.log("to delete", itemId);
    //Get the current cart
    let cart = getCart();

    //Early exit if item is not in the cart, log it
    if (!cart[itemId]) {
        console.warn(`Item ${itemId} not found in cart.`);
        return;
    }
    //Item exists, delete it, "delete" operator removes a property from an object. 
    delete cart[itemId];
    saveCart(cart);
}

export function deleteCookie(cookie){
        document.cookie = `${cookie}=; expires=Thu, 11 Sep 2001 00:00:00 UTC; path=/;`;
}

async function fetchProductItem(id) {
    try {
        const response = await fetch(`/ProductItemById/${id}`);
        const data = await response.json();        
        return data[0]; // Return the first object in the array
    } catch (error) {
        console.error("Error fetching or processing data", error);
    }
}


