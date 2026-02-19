// ==========================
// 🔐 USER LOGIN CHECK
// ==========================
function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
}

// ====================================
// 🛒 DUMMY PRODUCT LIST
// ====================================
let products = [
  { id:1, name:"Running Shoes", price:1200, img:"images/shoes.jpg", category:"shoes" },
  { id:2, name:"Smart Watch", price:2500, img:"images/watch.jpg", category:"watches" },
  { id:3, name:"Backpack", price:800, img:"images/bag.jpg", category:"bags" },
  { id:4, name:"Headphones", price:1500, img:"images/headphones.jpg", category:"electronics" },
  { id:5, name:"Sunglasses", price:700, img:"images/sunglasses.jpg", category:"accessories" },
  { id:6, name:"Laptop", price:45000, img:"images/laptop.jpg", category:"electronics" },
  { id:7, name:"T-Shirt", price:799, img:"images/tshirt.jpg", category:"accessories" },
  { id:8, name:"Bluetooth Speaker", price:1999, img:"images/speaker.jpg", category:"electronics" },
  { id:9, name:"Casual Shoes", price:1400, img:"images/shoes2.jpg", category:"shoes" },
  { id:10, name:"Leather Wallet", price:550, img:"images/wallet.jpg", category:"accessories" }
  // You can keep the remaining products if needed
];

// ==========================
// 🛒 CART / WISHLIST STORAGE
// ==========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// ==========================
// 👉 UPDATE HEADER COUNTS
// ==========================
function updateCounts() {
    const cartCount = document.getElementById("cart-count");
    const wishCount = document.getElementById("wish-count");
    const userEmail = document.getElementById("user-email");

    if (cartCount) cartCount.textContent = cart.length;
    if (wishCount) wishCount.textContent = wishlist.length;

    let user = localStorage.getItem("loggedUser");
    if (user && userEmail) userEmail.innerText = user;
}

updateCounts();

// ==========================
// 🛍 ADD TO CART
// ==========================
function addToCart(id) {
    let item = products.find(p => p.id === id);

    if (!cart.some(p => p.id === id)) {
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCounts();
        alert("✔ Added to Cart!");
    } else {
        alert("Already in Cart!");
    }
}

// ==========================
// ❤️ ADD TO WISHLIST
// ==========================
function addToWishlist(id) {
    let item = products.find(p => p.id === id);

    if (!wishlist.some(p => p.id === id)) {
        wishlist.push(item);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        updateCounts();
        alert("❤️ Added to Wishlist!");
    } else {
        alert("Already in Wishlist!");
    }
}

// ==========================
// 🔎 DISPLAY PRODUCTS
// ==========================
function displayProducts(list) {
    let box = document.getElementById("products");
    if (!box) return;

    box.innerHTML = "";

    list.forEach(p => {
        box.innerHTML += `
        <div class="product">
            <img src="${p.img}" alt="${p.name}">
            <h3 class="product-title">${p.name}</h3>
            <p class="product-price">₹${p.price}</p>

            <button onclick="addToCart(${p.id})">Add to Cart</button>
            <button onclick="addToWishlist(${p.id})" style="background:#ff4081">❤️ Wishlist</button>
        </div>
        `;
    });
}

displayProducts(products);

// ==========================
// 🔍 SEARCH
// ==========================
const searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        let text = e.target.value.toLowerCase();
        let filtered = products.filter(p =>
            p.name.toLowerCase().includes(text)
        );
        displayProducts(filtered);
    });
}

// ==========================
// 🏷 FILTER BY CATEGORY
// ==========================
const categoryFilter = document.getElementById("categoryFilter");
if (categoryFilter) {
    categoryFilter.addEventListener("change", (e) => {
        let cat = e.target.value;

        if (cat === "all") return displayProducts(products);

        let filtered = products.filter(p => p.category === cat);
        displayProducts(filtered);
    });
}

// ==========================
// 💰 SORT BY PRICE
// ==========================
const sortPrice = document.getElementById("sortPrice");
if (sortPrice) {
    sortPrice.addEventListener("change", (e) => {
        let value = e.target.value;
        let sorted = [...products];

        if (value === "low") sorted.sort((a, b) => a.price - b.price);
        if (value === "high") sorted.sort((a, b) => b.price - a.price);

        displayProducts(sorted);
    });
}

// ==========================
// 📲 SERVICE WORKER (PWA)
// ==========================
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("service-worker.js")
        .then(() => console.log("Service Worker Registered"));
}

// ==========================
// 📲 INSTALL APP BUTTON
// ==========================
let deferredPrompt;

window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    deferredPrompt = e;

    const installBtn = document.getElementById("installBtn");
    if (installBtn) installBtn.style.display = "inline-block";
});

const installBtn = document.getElementById("installBtn");
if (installBtn) {
    installBtn.addEventListener("click", () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
        }
    });
}
function openQuickView(id) {
    let p = products.find(item => item.id === id);

    document.getElementById("quickModal").style.display = "flex";
    document.getElementById("modalContent").innerHTML = `
        <h2>${p.name}</h2>
        <img src="${p.img}">
        <p style="margin:15px 0;">Price: ₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
        <button onclick="closeModal()">Close</button>
    `;
}

function closeModal() {
    document.getElementById("quickModal").style.display = "none";
}
function openQuickView() {
    document.getElementById("quickModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("quickModal").style.display = "none";
}
