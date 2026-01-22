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
  { id:30, name:"Neckband Earphones", price:799, img:"images/neckband.jpg", category:"electronics" },

  // ---------- NEW ITEMS FROM HERE ----------
  { id:31, name:"Wireless Charger", price:1299, img:"images/charger.jpg", category:"electronics" },
  { id:32, name:"USB Hub", price:450, img:"images/usb.jpg", category:"electronics" },
  { id:33, name:"Desk Lamp", price:1199, img:"images/lamp.jpg", category:"electronics" },
  { id:34, name:"Action Camera", price:5999, img:"images/actioncamera.jpg", category:"electronics" },
  { id:35, name:"Tablet", price:12999, img:"images/tablet.jpg", category:"electronics" },
  { id:36, name:"Wireless Earphones", price:1799, img:"images/wireless.jpg", category:"electronics" },
  { id:37, name:"Mini Tripod", price:599, img:"images/minitripod.jpg", category:"electronics" },
  { id:38, name:"VR Headset", price:2999, img:"images/vr.jpg", category:"electronics" },
  { id:39, name:"Bluetooth Keyboard", price:1499, img:"images/btkb.jpg", category:"electronics" },
  { id:40, name:"Electric Kettle", price:999, img:"images/kettle.jpg", category:"electronics" },
  { id:41, name:"LED Strip Light", price:499, img:"images/led.jpg", category:"electronics" },
  { id:42, name:"Rechargeable Torch", price:450, img:"images/torch.jpg", category:"electronics" },
  { id:43, name:"Table Fan", price:1399, img:"images/tablefan.jpg", category:"electronics" },
  { id:44, name:"Phone Tripod", price:750, img:"images/tripod.jpg", category:"electronics" },
  { id:45, name:"Smart Bulb", price:899, img:"images/smartbulb.jpg", category:"electronics" },
  { id:46, name:"Laptop Sleeve", price:899, img:"images/sleeve.jpg", category:"accessories" },
  { id:47, name:"Beach Hat", price:499, img:"images/beachhat.jpg", category:"accessories" },
  { id:48, name:"Travel Pillow", price:650, img:"images/pillow.jpg", category:"accessories" },
  { id:49, name:"Yoga Mat", price:699, img:"images/yogamat.jpg", category:"accessories" },
  { id:50, name:"Stylus Pen", price:299, img:"images/stylus.jpg", category:"accessories" },
  { id:51, name:"Cotton Socks (Pack of 3)", price:250, img:"images/socks.jpg", category:"accessories" },
  { id:52, name:"Slim Wallet", price:499, img:"images/slimwallet.jpg", category:"accessories" },
  { id:53, name:"Keychain", price:99, img:"images/keychain.jpg", category:"accessories" },
  { id:54, name:"Sports Water Bottle", price:399, img:"images/bottle.jpg", category:"accessories" },
  { id:55, name:"Hand Gloves", price:150, img:"images/gloves.jpg", category:"accessories" },
  { id:56, name:"Winter Cap", price:299, img:"images/wintercap.jpg", category:"accessories" },
  { id:57, name:"Desk Organizer", price:850, img:"images/organizer.jpg", category:"accessories" },
  { id:58, name:"Flip Flops", price:350, img:"images/flipflops.jpg", category:"shoes" },
  { id:59, name:"Compression Socks", price:450, img:"images/compressionsocks.jpg", category:"accessories" },
  { id:60, name:"Camera Lens Cleaner", price:250, img:"images/lensclean.jpg", category:"electronics" },
  { id:61, name:"Air Cooler", price:7499, img:"images/aircooler.jpg", category:"electronics" },
  { id:62, name:"Car Mobile Holder", price:349, img:"images/carholder.jpg", category:"electronics" },
  { id:63, name:"Face Towels (Set of 6)", price:299, img:"images/towels.jpg", category:"accessories" },
  { id:64, name:"School Bag", price:1000, img:"images/schoolbag.jpg", category:"bags" },
  { id:65, name:"Shoulder Bag", price:999, img:"images/shoulderbag.jpg", category:"bags" },
  { id:66, name:"Duffle Bag", price:1599, img:"images/duffle.jpg", category:"bags" },
  { id:67, name:"Makeup Pouch", price:499, img:"images/makeup.jpg", category:"bags" },
  { id:68, name:"Lunch Bag", price:699, img:"images/lunch.jpg", category:"bags" },
  { id:69, name:"Sling Bag", price:849, img:"images/sling.jpg", category:"bags" },
  { id:70, name:"Luggage Trolley", price:3999, img:"images/trolley.jpg", category:"bags" }
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
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
  .then(() => console.log("Service Worker Registered"));
}
