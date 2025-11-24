// ==========================
// 🔐 USER LOGIN CHECK
// ==========================
function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
}

// ====================================
// 🛒 DUMMY PRODUCT LIST (20+ ITEMS)
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
  { id:10, name:"Leather Wallet", price:550, img:"images/wallet.jpg", category:"accessories" },
  { id:11, name:"Formal Watch", price:3200, img:"images/watch2.jpg", category:"watches" },
  { id:12, name:"Travel Bag", price:1800, img:"images/bag2.jpg", category:"bags" },
  { id:13, name:"Keyboard", price:999, img:"images/keyboard.jpg", category:"electronics" },
  { id:14, name:"Mouse", price:499, img:"images/mouse.jpg", category:"electronics" },
  { id:15, name:"Gaming Headset", price:2200, img:"images/gamingheadset.jpg", category:"electronics" },
  { id:16, name:"Jeans", price:1299, img:"images/jeans.jpg", category:"accessories" },
  { id:17, name:"Sports Cap", price:399, img:"images/cap.jpg", category:"accessories" },
  { id:18, name:"Office Bag", price:1999, img:"images/officebag.jpg", category:"bags" },
  { id:19, name:"Powerbank", price:999, img:"images/powerbank.jpg", category:"electronics" },
  { id:20, name:"Perfume", price:899, img:"images/perfume.jpg", category:"accessories" },
  { id:21, name:"Sneakers", price:1600, img:"images/sneakers.jpg", category:"shoes" },
  { id:22, name:"Analog Watch", price:1100, img:"images/watch3.jpg", category:"watches" },
  { id:23, name:"Gym Bag", price:1200, img:"images/gymbag.jpg", category:"bags" },
  { id:24, name:"Earbuds", price:1599, img:"images/earbuds.jpg", category:"electronics" },
  { id:25, name:"Mobile Case", price:299, img:"images/case.jpg", category:"accessories" },
  { id:26, name:"Hoodie", price:1499, img:"images/hoodie.jpg", category:"accessories" },
  { id:27, name:"Sports Shoes", price:1700, img:"images/shoes3.jpg", category:"shoes" },
  { id:28, name:"Smartphone", price:19999, img:"images/phone.jpg", category:"electronics" },
  { id:29, name:"Handbag", price:1600, img:"images/handbag.jpg", category:"bags" },
  { id:30, name:"Neckband Earphones", price:799, img:"images/neckband.jpg", category:"electronics" }
];


// ==========================
// 🛒 CART / WISHLIST STORAGE
// ==========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// ==========================
// 👉 DISPLAY COUNTS
// ==========================
function updateCounts() {
    document.getElementById("cart-count").textContent = cart.length;
    document.getElementById("wish-count").textContent = wishlist.length;

    let user = localStorage.getItem("loggedUser");
    if (user) document.getElementById("user-email").innerText = user;
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
    }

    updateCounts();
    alert("✔ Added to Cart!");
}


// ==========================
// ❤️ ADD TO WISHLIST
// ==========================
function addToWishlist(id) {
    let item = products.find(p => p.id === id);

    if (!wishlist.some(p => p.id === id)) {
        wishlist.push(item);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    updateCounts();
    alert("❤️ Added to Wishlist!");
}


// ==========================
// 🔎 DISPLAY PRODUCTS
// ==========================
function displayProducts(list) {
    let box = document.getElementById("products");
    box.innerHTML = "";

    list.forEach(p => {
        box.innerHTML += `
        <div class="product">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>

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
document.getElementById("searchInput").addEventListener("input", (e) => {
    let text = e.target.value.toLowerCase();
    let filtered = products.filter(p => p.name.toLowerCase().includes(text));
    displayProducts(filtered);
});


// ==========================
// 🏷 FILTER BY CATEGORY
// ==========================
document.getElementById("categoryFilter").addEventListener("change", (e) => {
    let cat = e.target.value;

    if (cat === "all") return displayProducts(products);

    let filtered = products.filter(p => p.category === cat);
    displayProducts(filtered);
});


// ==========================
// 💰 SORT BY PRICE
// ==========================
document.getElementById("sortPrice").addEventListener("change", (e) => {
    let value = e.target.value;
    let sorted = [...products];

    if (value === "low") sorted.sort((a, b) => a.price - b.price);
    if (value === "high") sorted.sort((a, b) => b.price - a.price);

    displayProducts(sorted);
});
