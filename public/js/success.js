import {deleteCookie} from '../js/basketfill.js';
import { loadCart } from '../js/cart.js';

document.addEventListener("DOMContentLoaded", () => {
    deleteCookie("cart");
    loadCart();
});