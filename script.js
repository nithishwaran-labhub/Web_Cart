// WebCart — Enhanced Demo Store (LocalStorage Based)

// ----------------------------
// GLOBAL SETTINGS
// ----------------------------
const CURRENCY = "₹"; // change to "$" if needed

// ----------------------------
// PRODUCT LIST
// ----------------------------
const PRODUCTS = [
    { id:1, name:"Running Shoes", price:1200, img:"images/shoes.jpg", category:"shoes" },
    { id:2, name:"Smart Watch", price:2500, img:"images/watch.jpg", category:"watches" },
    { id:3, name:"Backpack", price:800, img:"images/bag.jpg", category:"bags" },
    { id:4, name:"Headphones", price:1500, img:"images/earbuds.jpg", category:"electronics" },
    { id:5, name:"Sunglasses", price:700, img:"images/sunglasses.jpg", category:"accessories" },
    { id:6, name:"Laptop", price:45000, img:"images/laptop.jpg", category:"electronics" },
    { id:7, name:"T-Shirt", price:799, img:"images/tshirt.jpg", category:"accessories" }
];

// ----------------------------
// STORAGE HELPERS
// ----------------------------
const getCart = () => JSON.parse(localStorage.getItem("cart") || "[]");
const setCart = c => { localStorage.setItem("cart", JSON.stringify(c)); updateCartCount(); };

const getWish = () => JSON.parse(localStorage.getItem("wish") || "[]");
const setWish = w => { localStorage.setItem("wish", JSON.stringify(w)); updateWishCount(); };

const getLoggedUser = () => JSON.parse(localStorage.getItem("loggedUser") || "null");

// ----------------------------
// LOGOUT
// ----------------------------
function logout(){
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
}

// ----------------------------
// INITIAL UI UPDATE
// ----------------------------
(function init(){
    const u = getLoggedUser();
    if(u && document.getElementById("user-email")){
        document.getElementById("user-email").innerText = u.email;
    }
    updateCartCount();
    updateWishCount();
})();

// ----------------------------
// HOME PAGE — PRODUCT DISPLAY
// ----------------------------
function displayProducts(list = PRODUCTS){
    const box = document.getElementById("products");
    if(!box) return;
    box.innerHTML = "";

    list.forEach(p => {
        const card = document.createElement("div");
        card.className = "product";

        card.innerHTML = `
            <img src="${p.img}" alt="${p.name}" onclick="viewProduct(${p.id})" style="cursor:pointer">
            <h3>${p.name}</h3>
            <p>${CURRENCY}${p.price}</p>

            <div style="display:flex; gap:8px; justify-content:center;">
                <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
                <button class="btn small" onclick="addToWish(${p.id})">♡ Wish</button>
            </div>
        `;
        box.appendChild(card);
    });
}

// ----------------------------
// VIEW PRODUCT PAGE (NEW)
// ----------------------------
function viewProduct(id){
    localStorage.setItem("viewProduct", id);
    window.location.href = "product.html";
}

// ----------------------------
// SEARCH + FILTER + SORT
// ----------------------------
if(document.getElementById("searchInput")){

    document.getElementById("searchInput").addEventListener("input", applyFilter);
    document.getElementById("categoryFilter").addEventListener("change", applyFilter);
    document.getElementById("sortPrice").addEventListener("change", applyFilter);

    function applyFilter(){
        const q = searchInput.value.toLowerCase();
        const cat = categoryFilter.value;
        const sort = sortPrice.value;

        let result = PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(q) &&
            (cat === "all" || p.category === cat)
        );

        if(sort === "low") result.sort((a,b)=>a.price-b.price);
        if(sort === "high") result.sort((a,b)=>b.price-a.price);

        displayProducts(result);
    }
}

// ----------------------------
// ADD TO CART
// ----------------------------
function addToCart(id){
    let cart = getCart();
    let item = PRODUCTS.find(p => p.id === id);

    if(!item) return;

    let ex = cart.find(c => c.id === id);
    if(ex) ex.qty++;
    else cart.push({ ...item, qty:1 });

    setCart(cart);

    alert(`🛒 ${item.name} added to cart!`);
}

// ----------------------------
// CART COUNT
// ----------------------------
function updateCartCount(){
    const n = getCart().reduce((a,b)=> a + (b.qty || 1), 0);
    const el = document.getElementById("cart-count");
    if(el) el.innerText = n;
}

// ----------------------------
// WISHLIST
// ----------------------------
function addToWish(id){
    let wish = getWish();
    if(!wish.includes(id)){
        wish.push(id);
        setWish(wish);
    }
    alert("❤️ Added to wishlist");
}

function updateWishCount(){
    const el = document.getElementById("wish-count");
    if(el) el.innerText = getWish().length;
}

// ----------------------------
// CART PAGE
// ----------------------------
function loadCartPage(){
    const box = document.getElementById("cartList");
    if(!box) return;

    const cart = getCart();
    let total = 0;

    if(cart.length === 0){
        box.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("cartTotal").innerText = CURRENCY + "0";
        return;
    }

    box.innerHTML = "";

    cart.forEach(i => {
        total += i.price * i.qty;

        const row = document.createElement("div");
        row.className = "product";
        row.style = "display:flex; justify-content:space-between; align-items:center;";

        row.innerHTML = `
            <div style="display:flex; gap:12px; align-items:center;">
                <img src="${i.img}" style="width:80px; height:60px; border-radius:8px; object-fit:cover">
                <div>
                    <b>${i.name}</b>
                    <div>${CURRENCY}${i.price}</div>
                </div>
            </div>

            <div style="display:flex; gap:8px; align-items:center;">
                <button class="btn small" onclick="changeQty(${i.id}, -1)">−</button>
                <span>${i.qty}</span>
                <button class="btn small" onclick="changeQty(${i.id}, 1)">+</button>
                <button class="btn outline" onclick="removeFromCart(${i.id})">Remove</button>
            </div>
        `;

        box.appendChild(row);
    });

    document.getElementById("cartTotal").innerText = CURRENCY + total;
}

function changeQty(id, d){
    let cart = getCart();
    let item = cart.find(c => c.id === id);
    if(!item) return;

    item.qty += d;
    if(item.qty <= 0) cart = cart.filter(c => c.id !== id);

    setCart(cart);
    loadCartPage();
}

function removeFromCart(id){
    let cart = getCart().filter(c => c.id !== id);
    setCart(cart);
    loadCartPage();
}

// ----------------------------
// CHECKOUT PAGE
// ----------------------------
function loadCheckoutPage(){
    const box = document.getElementById("checkoutItems");
    if(!box) return;

    const cart = getCart();
    if(cart.length === 0){
        box.innerHTML = "<p>Cart is empty.</p>";
        document.getElementById("checkoutTotal").innerText = CURRENCY + "0";
        return;
    }

    let total = 0;
    box.innerHTML = "";

    cart.forEach(i => {
        total += i.price * i.qty;

        const row = document.createElement("div");
        row.className = "product";

        row.innerHTML = `
            <div style="display:flex; gap:12px;">
                <img src="${i.img}" style="width:80px; height:60px;">
                <div>
                    <b>${i.name}</b>
                    <div>${CURRENCY}${i.price} × ${i.qty}</div>
                </div>
            </div>
        `;

        box.appendChild(row);
    });

    document.getElementById("checkoutTotal").innerText = CURRENCY + total;
}

// ----------------------------
// EXECUTE ON PAGE LOAD
// ----------------------------
if(document.getElementById("products")) displayProducts();
if(document.getElementById("cartList")) loadCartPage();
if(document.getElementById("wishList")) loadWishPage();
if(document.getElementById("checkoutItems")) loadCheckoutPage();
