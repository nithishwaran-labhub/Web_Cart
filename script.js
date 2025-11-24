// WebCart demo: uses localStorage for auth/cart/wishlist
const CURRENCY = '₹'; // change symbol here if you want "$"

/* ---------- LARGE PRODUCT LIST (30 ITEMS) ---------- */
const PRODUCTS = [
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

/* ---------- LocalStorage helpers ---------- */
function getCart(){ return JSON.parse(localStorage.getItem('cart') || '[]'); }
function setCart(x){ localStorage.setItem('cart', JSON.stringify(x)); updateCartCount(); }

function getWish(){ return JSON.parse(localStorage.getItem('wish') || '[]'); }
function setWish(x){ localStorage.setItem('wish', JSON.stringify(x)); updateWishCount(); }

function getLoggedUser(){ return JSON.parse(localStorage.getItem('loggedUser') || 'null'); }
function logout(){ localStorage.removeItem('loggedUser'); window.location.href = 'login.html'; }

/* ---------- Init for all pages ---------- */
(function(){
  const u = getLoggedUser();
  if(u && document.getElementById("user-email")){
    document.getElementById("user-email").innerText = u.email;
  }
  updateCartCount();
  updateWishCount();
})();

/* ---------- Home Page: Display Products ---------- */
function displayProducts(list = PRODUCTS){
  const box = document.getElementById("products");
  if(!box) return;
  box.innerHTML = "";

  list.forEach(p=>{
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.img}">
      <h3>${p.name}</h3>
      <p>${CURRENCY}${p.price}</p>
      <button onclick="addToCart(${p.id})" class="btn">Add to Cart</button>
      <button onclick="addToWish(${p.id})" class="btn small">Wishlist</button>
    `;
    box.appendChild(div);
  });
}

/* ---------- Search + Filter + Sort ---------- */
if(document.getElementById("searchInput")){
  document.getElementById("searchInput").addEventListener("input", applyFilters);
  document.getElementById("categoryFilter").addEventListener("change", applyFilters);
  document.getElementById("sortPrice").addEventListener("change", applyFilters);
}

function applyFilters(){
  const q = document.getElementById("searchInput").value.toLowerCase();
  const cat = document.getElementById("categoryFilter").value;
  const sort = document.getElementById("sortPrice").value;

  let list = PRODUCTS.filter(x =>
    x.name.toLowerCase().includes(q) && (cat === "all" || x.category === cat)
  );

  if(sort === "low") list.sort((a,b)=>a.price-b.price);
  if(sort === "high") list.sort((a,b)=>b.price-a.price);

  displayProducts(list);
}

/* ---------- Cart ---------- */
function addToCart(id){
  let cart = getCart();
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;

  const item = cart.find(x=>x.id===id);
  if(item) item.qty++;
  else cart.push({ id:p.id, name:p.name, price:p.price, img:p.img, qty:1 });

  setCart(cart);
  alert(p.name + " added to cart");
}

function updateCartCount(){
  const count = getCart().reduce((a,b)=>a+(b.qty||1),0);
  if(document.getElementById("cart-count"))
    document.getElementById("cart-count").innerText = count;
}

function loadCartPage(){
  const box = document.getElementById("cartList");
  if(!box) return;
  const cart = getCart();
  if(cart.length === 0){
    box.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("cartTotal").innerText = CURRENCY + "0";
    return;
  }

  box.innerHTML = "";
  let total = 0;

  cart.forEach(item=>{
    total += item.price * item.qty;
    const row = document.createElement("div");
    row.className = "product";
    row.style.display = "flex";
    row.style.justifyContent = "space-between";
    row.innerHTML = `
      <div style="display:flex;gap:12px;">
        <img src="${item.img}" style="width:70px;height:60px;">
        <div>
          <b>${item.name}</b><br>
          ${CURRENCY}${item.price}
        </div>
      </div>
      <div>
        <button onclick="changeQty(${item.id}, -1)" class="btn small">-</button>
        ${item.qty}
        <button onclick="changeQty(${item.id}, 1)" class="btn small">+</button>
        <button onclick="removeFromCart(${item.id})" class="btn small">Remove</button>
      </div>
    `;
    box.appendChild(row);
  });

  document.getElementById("cartTotal").innerText = CURRENCY + total;
}

function changeQty(id, d){
  let cart = getCart();
  const item = cart.find(x=>x.id===id);
  item.qty += d;
  if(item.qty <= 0){
    cart = cart.filter(x=>x.id!==id);
  }
  setCart(cart);
  loadCartPage();
}

function removeFromCart(id){
  const cart = getCart().filter(x=>x.id!==id);
  setCart(cart);
  loadCartPage();
}

/* ---------- Wishlist ---------- */
function addToWish(id){
  let w = getWish();
  if(!w.includes(id)) w.push(id);
  setWish(w);
  alert("Added to wishlist");
}

function updateWishCount(){
  if(document.getElementById("wish-count"))
    document.getElementById("wish-count").innerText = getWish().length;
}

function loadWishPage(){
  const box = document.getElementById("wishList");
  if(!box) return;

  const w = getWish();
  if(w.length === 0){
    box.innerHTML = "<p>Your wishlist is empty.</p>";
    return;
  }

  box.innerHTML = "";
  w.forEach(id=>{
    const p = PRODUCTS.find(x=>x.id===id);
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.img}">
      <h3>${p.name}</h3>
      <p>${CURRENCY}${p.price}</p>
      <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    box.appendChild(div);
  });
}

/* ---------- Checkout ---------- */
function loadCheckoutPage(){
  const box = document.getElementById("checkoutItems");
  if(!box) return;
  const cart = getCart();

  if(cart.length === 0){
    box.innerHTML = "<p>No items to checkout.</p>";
    document.getElementById("checkoutTotal").innerText = CURRENCY + 0;
    return;
  }

  let total = 0;
  box.innerHTML = "";

  cart.forEach(i=>{
    total += i.price * i.qty;
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <div style="display:flex;gap:10px;">
        <img src="${i.img}" style="width:70px;height:60px;">
        <div>
          <b>${i.name}</b><br>
          ${CURRENCY}${i.price} × ${i.qty}
        </div>
      </div>
    `;
    box.appendChild(div);
  });

  document.getElementById("checkoutTotal").innerText = CURRENCY + total;
}

/* ---------- Auto-run on specific pages ---------- */
if(document.getElementById("products")) displayProducts();
if(document.getElementById("cartList")) loadCartPage();
if(document.getElementById("wishList")) loadWishPage();
if(document.getElementById("checkoutItems")) loadCheckoutPage();
