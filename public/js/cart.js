import {getCart, updateCartQty, deleteCartItem} from '../js/basketfill.js';
import { renderTextElem, renderDivElem, renderInputElem, renderButtonElem } from '../js/dom-utils.js';
import {clampAndUpdateQty} from '../js/product.js';



export function loadCart({ containerSelector = ".listCart",  finalPriceSelector = "#finalPrice"} = {}){
    //To allow flexible use in other pages, choose container for cart
    const cartDiv = document.querySelector(containerSelector);
    if (!cartDiv) return;

    setTimeout(() => {
        let cart = getCart();
        console.log(cart);
        let sum = 0;
        let pricetot = 0

        for (const id in cart) {
            let cartItem = document.querySelector(`#cartItemDiv${id}`);
            
            let priceRounded;
            //If cartItemDiv does not exist for a unique pi_id, - create it  
            if (cartItem === null){
                // Create container div for the cart item
                let cartItemDiv = renderDivElem({id: `cartItemDiv${id}`, className: `cartItemDiv`, parent: cartDiv});

                // Sub-container for item details
                let itemInfo = renderDivElem({className: "itemInfo", parent: cartItemDiv});
                
                //create a quantity input element and add event listener
                 let qtyInputElem = renderInputElem({id: `item${id}Qty`, inputType: "number", defaultValue: cart[id].cartQty, minValue: 1, parent: itemInfo});
                 
                 //NOT IDEAL, REMEMBER TO MOVE THIS
                 qtyInputElem.addEventListener("change", () => {
                    let clampedQty = clampAndUpdateQty({inputElemOrSelector: qtyInputElem, max: cart[id].stock_qty});
                    updateCartQty(id, clampedQty);
                    loadCart({ containerSelector,  finalPriceSelector});
                });

                // Product name display
                renderTextElem(`p`, `cartItem${id}`, `${cart[id].name}`, itemInfo);

                //Create a text for the price
                pricetot = cart[id].price * cart[id].cartQty;
                priceRounded = pricetot.toFixed(2)
                renderTextElem('p', `item${id}Price`, `Unit Price: ${cart[id].price} kr.`, itemInfo); // Renter price pr. item.
                renderTextElem(`p`, `item${id}TotPrice`, `Total: ${priceRounded} kr.`, itemInfo); // Render total price of product * quantity

                //Create "delete item" button
                let deleteBtn = renderButtonElem({className: "deleteBtn", text: "x", parent: itemInfo});

                //NOT IDEAL, REMEMBER TO MOVE THIS
                deleteBtn.addEventListener("click", () => {
                    console.log("before deletion", cart)
                    deleteCartItem(id);

                    //Visually remove the div
                    const cartItemDiv = document.querySelector(`#cartItemDiv${id}`);
                    if (cartItemDiv) {
                        cartItemDiv.remove();
                    }
                    
                    //Call loadCart to update UI
                    loadCart({containerSelector, finalPriceSelector });
                });

            } else {
                // Update the quantity <input> element's value, so its visible to user
                const qtyInputElem = document.querySelector(`#item${id}Qty`);
                if (qtyInputElem) qtyInputElem.value = cart[id].cartQty;

                pricetot = cart[id].price * cart[id].cartQty;
                priceRounded = pricetot.toFixed(2)
                document.querySelector(`#item${id}TotPrice`).innerText = `Total: ${priceRounded} kr.`;
            }
            
            sum = sum + pricetot;
        }

        let sumRounded = sum.toFixed(2);

        //To allow flexible use in other pages, choose container for finalPrice
        const finalPriceElem = document.querySelector(finalPriceSelector);
        if (finalPriceElem) finalPriceElem.innerText = `Total ${sumRounded} kr.`;
        
    }, 100);  // adjust delay as needed

}