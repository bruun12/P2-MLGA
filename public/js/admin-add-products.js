/*
let form = document.querySelector(".form");

let submit = document.querySelector("btnSubmitProduct").addEventListener("click", (event)=>{
    event.preventDefault()

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);


    fetch("../database/products.json", {
    
        // Adding method type
        method: "POST",
        
        // Adding body or contents to send
        body: JSON.stringify(data),
        
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(res => res.json()).then(data => console.log(data))
});
*/


//Things for admin add page

//function to print the products 


//!!!!!!!! evt lav en joining der gør at man kan printe productet som helhed i 
//sted for at skulle have to functioner
console.log("hello world");
/*
async function printProducts() {
    const [row] = await pool.query("SELECT * FROM product LIMIT 10");
    return row;
}



//Function to print sigle product by using product id
async function printProductValue(){
    const [row] = await pool.query("SELECT * FROM product WHERE id = ?", [id]);
    return row[0] //prints only the first object in the array
}

//function to print newly added product (item)
async function printNewProduct(){

    //function to add product to the product database
    async function addProduct(name, description, img, category_id) {
        const [productAdd] = await pool.query("INSERT INTO product (name, description, img, category_id) VALUES (?, ?, ?, ?)", [name, description, img, category_id]);
        const id = productAdd.product_id
        return productId
    }

    //function that add product items to database product_item
    async function addProductItem(product_id, SKU, stock_qty, img, price) {
        const productItemAdd = await pool.query(
            "INSERT INTO product_item (product_id, SKU, stock_qty, img, price) VALUES (?, ?, ?, ?, ?)", [product_id, SKU, stock_qty, img, price]);
        const itemId = productItemAdd.product_item_id
        return itemId   
    }

    console.log("add product:", addProduct())
    console.log("add product item: ", addProductItem())

//find måde at printe de ting der intastes så det både er om product og product_item
//evt det med joining


return printProductValue(itemId)
}
//prints functions to check how they look

console.log(printProducts)
console.log(printProductValue)

//prints newly added function
console.log(printNewProduct)
*/

