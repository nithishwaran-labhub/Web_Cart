// WebCart demo: uses localStorage for auth/cart/wishlist
const CURRENCY = '₹'; // change symbol here if you want "$"

// ----------------------------------------------------------------------
// ✔ MORE PRODUCTS ADDED (20 ITEMS)
// ----------------------------------------------------------------------
const PRODUCTS = [
  { id:1, name:"Running Shoes", price:1200, img:"images/shoes.jpg", category:"shoes" },
  { id:2, name:"Smart Watch", price:2500, img:"images/watch.jpg", category:"watches" },
  { id:3, name:"Backpack", price:800, img:"images/bag.jpg", category:"bags" },
  { id:4, name:"Headphones", price:1500, img:"images/earbuds.jpg", category:"electronics" },
  { id:5, name:"Sunglasses", price:700, img:"images/sunglasses.jpg", category:"accessories" },
  { id:6, name:"Laptop", price:45000, img:"images/laptop.jpg", category:"electronics" },
  { id:7, name:"T-Shirt", price:799, img:"images/tshirt.jpg", category:"fashion" },
  { id:8, name:"Casual Shirt", price:999, img:"images/shirt.jpg", category:"fashion" },
  { id:9, name:"Bluetooth Speaker", price:1999, img:"images/speaker.jpg", category:"electronics" },
  { id:10, name:"Gaming Mouse", price:899, img:"images/mouse.jpg", category:"electronics" },
  { id:11, name:"Formal Shoes", price:1800, img:"images/formalshoes.jpg", category:"shoes" },
  { id:12, name:"Travel Bag", price:1600, img:"images/travelbag.jpg", category:"bags" },
  { id:13, name:"Wireless Charger", price:850, img:"images/charger.jpg", category:"electronics" },
  { id:14, name:"Leather Wallet", price:499, img:"images/wallet.jpg", category:"accessories" },
  { id:15, name:"Hoodie", price:1299, img:"images/hoodie.jpg", category:"fashion" },
  { id:16, name:"Air Cooler", price:5999, img:"images/cooler.jpg", category:"electronics" },
  { id:17, name:"Smartphone", price:15999, img:"images/phone.jpg", category:"electronics" },
  { id:18, name:"Sports Watch", price:2199, img:"images/sportswatch.jpg", category:"watches" },
  { id:19, name:"Ladies HandBag", price:1299, img:"images/handbag.jpg", category:"bags" },
  { id:20, name:"Kitchen Mixer", price:3499, img:"images/mixer.jpg", category:"home" }
];

// ----------------------------------------------------------------------
// UTILITIES
// ----------------------------------------------------------------------
function getCart(){ return JSON.parse(localStorage.getItem('cart') || '[]'); }
function setCart(c){ localStorage.setItem('cart', JSON.stringify(c)); updateCartCount(); }

function getWish(){ return JSON.parse(localStorage.getItem('wish') || '[]'); }
function setWish(w){ localStorage.setItem('wish', JSON.stringify(w)); updateWishCount(); }

// ----------------------------------------------------------------------
// LOGIN STATUS
// ----------------------------------------------------------------------
function getLoggedUser(){ return JSON.parse(localStorage.getItem('loggedUser') || 'null'); }
function logout(){ localStorage.removeItem('loggedUser'); window.location.href = 'login.html'; }

// Show email & counts
(function initGlobal(){
  const u = getLoggedUser();
  if(u && document.getElementById('user-email')) document.getElementById('user-email').innerText = u.email;
  updateCartCount();
  updateWishCount();
})();

// ----------------------------------------------------------------------
// DISPLAY PRODUCTS ON HOME PAGE
// ----------------------------------------------------------------------
function displayProducts(products = PRODUCTS){
  const container = document.getElementById('products');
  if(!container) return;

  container.innerHTML = '';
  products.forEach(p=>{
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${CURRENCY}${p.price}</p>

      <div style="display:flex;gap:8px;justify-content:center;margin-top:10px">
        <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
        <button class="btn small" onclick="addToWish(${p.id})">Wishlist</button>
      </div>
    `;
    container.appendChild(div);
  });
}

// ----------------------------------------------------------------------
// SEARCH / CATEGORY FILTER / SORT
// ----------------------------------------------------------------------
if(document.getElementById('searchInput')){
  document.getElementById('searchInput').addEventListener('input', applyFilters);
  document.getElementById('categoryFilter').addEventListener('change', applyFilters);
  document.getElementById('sortPrice').addEventListener('change', applyFilters);
}

function applyFilters(){
  const q = (document.getElementById('searchInput')||{value:''}).value.toLowerCase();
  const cat = (document.getElementById('categoryFilter')||{value:'all'}).value;
  const sort = (document.getElementById('sortPrice')||{value:'none'}).value;

  let res = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) && (cat === 'all' || p.category === cat)
  );

  if(sort === 'low') res.sort((a,b)=>a.price-b.price);
  if(sort === 'high') res.sort((a,b)=>b.price-a.price);

  displayProducts(res);
}

// ----------------------------------------------------------------------
// ADD TO CART
// ----------------------------------------------------------------------
function addToCart(id){
  let cart = getCart();
  const item = PRODUCTS.find(p => p.id === id);
  if(!item) return;

  const existing = cart.find(ci => ci.id === id);
  if(existing) existing.qty++;
  else cart.push({ id:item.id, name:item.name, price:item.price, img:item.img, qty:1 });

  setCart(cart);
  alert(item.name + ' added to cart');
}

// ----------------------------------------------------------------------
// CART COUNT
// ----------------------------------------------------------------------
function updateCartCount(){
  const n = getCart().reduce((s,i)=>s + (i.qty||1), 0);
  const el = document.getElementById('cart-count');
  if(el) el.innerText = n;
}

// ----------------------------------------------------------------------
// WISHLIST HANDLING
// ----------------------------------------------------------------------
function addToWish(id){
  let wish = getWish();
  if(!wish.includes(id)) wish.push(id);
  setWish(wish);
  alert("Added to wishlist!");
}

function updateWishCount(){
  const el = document.getElementById('wish-count');
  if(el) el.innerText = getWish().length;
}

// ----------------------------------------------------------------------
// CART PAGE RENDER
// ----------------------------------------------------------------------
function loadCartPage(){
  const el = document.getElementById('cartList');
  if(!el) return;

  const cart = getCart();
  if(cart.length === 0){
    el.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('cartTotal').innerText = CURRENCY + '0';
    return;
  }

  el.innerHTML = '';
  let total = 0;

  cart.forEach(i => {
    total += i.price * i.qty;

    el.innerHTML += `
      <div class="product" style="display:flex; justify-content:space-between; align-items:center">
        <div style="display:flex; gap:12px">
          <img src="${i.img}" style="width:80px;height:60px;border-radius:6px;">
          <div>
            <b>${i.name}</b>
            <div>${CURRENCY}${i.price}</div>
          </div>
        </div>

        <div style="display:flex; gap:10px">
          <button onclick="changeQty(${i.id}, -1)" class="btn small">-</button>
          <b>${i.qty}</b>
          <button onclick="changeQty(${i.id}, 1)" class="btn small">+</button>
          <button onclick="removeFromCart(${i.id})" class="btn outline">Remove</button>
        </div>
      </div>
    `;
  });

  document.getElementById('cartTotal').innerText = CURRENCY + total;
}

function changeQty(id, d){
  let cart = getCart();
  const item = cart.find(c => c.id === id);
  if(!item) return;

  item.qty += d;
  if(item.qty <= 0) cart = cart.filter(c=>c.id!==id);

  setCart(cart);
  loadCartPage();
}

function removeFromCart(id){
  setCart(getCart().filter(c => c.id !== id));
  loadCartPage();
}

function clearCart(){
  if(confirm("Clear cart?")){
    setCart([]);
    loadCartPage();
  }
}

// ----------------------------------------------------------------------
// WISHLIST PAGE
// ----------------------------------------------------------------------
function loadWishPage(){
  const el = document.getElementById('wishList');
  if(!el) return;

  const wish = getWish();
  el.innerHTML = '';

  if(wish.length === 0){
    el.innerHTML = '<p>Your wishlist is empty.</p>';
    return;
  }

  wish.forEach(id =>{
    const p = PRODUCTS.find(x => x.id === id);
    if(!p) return;

    el.innerHTML += `
      <div class="product">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>${CURRENCY}${p.price}</p>
        <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

// ----------------------------------------------------------------------
// CHECKOUT PAGE
// ----------------------------------------------------------------------
function loadCheckoutPage(){
  const el = document.getElementById('checkoutItems');
  if(!el) return;

  const cart = getCart();
  el.innerHTML = '';
  let total = 0;

  if(cart.length === 0){
    el.innerHTML = '<p>Cart is empty.</p>';
    document.getElementById('checkoutTotal').innerText = CURRENCY + '0';
    return;
  }

  cart.forEach(i => {
    total += i.price * i.qty;
    el.innerHTML += `
      <div class="product" style="display:flex; gap:15px">
        <img src="${i.img}" style="width:80px;height:60px;border-radius:6px;">
        <div>
          <b>${i.name}</b>
          <div>${CURRENCY}${i.price} × ${i.qty}</div>
        </div>
      </div>
    `;
  });

  document.getElementById('checkoutTotal').innerText = CURRENCY + total;
}

// ----------------------------------------------------------------------
// PAGE AUTORUN
// ----------------------------------------------------------------------
if(document.getElementById('products')) displayProducts();
if(document.getElementById('cartList')) loadCartPage();
if(document.getElementById('wishList')) loadWishPage();
if(document.getElementById('checkoutItems')) loadCheckoutPage();
