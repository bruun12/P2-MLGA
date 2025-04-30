console.log("hvis du læser dette, så er det femdreng der elsker agurk");

let carts = document.querySelector('.add-cart');

for (let i = 0; i < basket.length ; i++) {
    carts[i].addEventListener('click', () => {
        console.log("clicked");
        cartNumbers();
    });
    
}