// WebCart demo: uses localStorage for auth/cart/wishlist
const CURRENCY = '₹'; // change symbol here if you want $

/* ---------- Sample products ---------- */
const PRODUCTS = [
  { id:1, name:"Running Shoes", price:1200, img:"images/shoes.jpg", category:"shoes" },
  { id:2, name:"Smart Watch", price:2500, img:"images/watch.jpg", category:"watches" },
  { id:3, name:"Backpack", price:800, img:"images/bag.jpg", category:"bags" },
  { id:4, name:"Headphones", price:1500, img:"images/earbuds.jpg", category:"electronics" },
  { id:5, name:"Sunglasses", price:700, img:"images/sunglasses.jpg", category:"accessories" },
  { id:6, name:"Laptop", price:45000, img:"images/laptop.jpg", category:"electronics" },
  { id:7, name:"T-Shirt", price:799, img:"images/tshirt.jpg", category:"accessories" },
  // add more if needed
];

/* ---------- Utilities ---------- */
function getCart(){ return JSON.parse(localStorage.getItem('cart') || '[]'); }
function setCart(c){ localStorage.setItem('cart', JSON.stringify(c)); updateCartCount(); }
function getWish(){ return JSON.parse(localStorage.getItem('wish') || '[]'); }
function setWish(w){ localStorage.setItem('wish', JSON.stringify(w)); updateWishCount(); }

/* ---------- Auth helpers (demo localStorage) ---------- */
function getLoggedUser(){ return JSON.parse(localStorage.getItem('loggedUser') || 'null'); }
function logout(){ localStorage.removeItem('loggedUser'); window.location.href = 'login.html'; }

/* ---------- On-all-pages init ---------- */
(function initGlobal(){
  // show logged email if present
  const u = getLoggedUser();
  if(u && document.getElementById('user-email')) document.getElementById('user-email').innerText = u.email;
  updateCartCount();
  updateWishCount();
})();

/* ---------- Home: display products & controls ---------- */
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

// filter/search/sort hooks
if(document.getElementById('searchInput')){
  document.getElementById('searchInput').addEventListener('input', e=>{
    applyFilters();
  });
  document.getElementById('categoryFilter').addEventListener('change', applyFilters);
  document.getElementById('sortPrice').addEventListener('change', applyFilters);
}

function applyFilters(){
  const q = (document.getElementById('searchInput')||{value:''}).value.toLowerCase();
  const cat = (document.getElementById('categoryFilter')||{value:'all'}).value;
  const sort = (document.getElementById('sortPrice')||{value:'none'}).value;
  let res = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) && (cat === 'all' || p.category === cat));
  if(sort === 'low') res.sort((a,b)=>a.price-b.price);
  else if(sort === 'high') res.sort((a,b)=>b.price-a.price);
  displayProducts(res);
}

/* ---------- Cart actions ---------- */
function addToCart(id){
  let cart = getCart();
  const item = PRODUCTS.find(p => p.id === id);
  if(!item) return;
  // if exists increase qty otherwise add
  const existing = cart.find(ci => ci.id === id);
  if(existing) existing.qty++;
  else cart.push({ id: item.id, name: item.name, price: item.price, img: item.img, qty: 1 });
  setCart(cart);
  alert(item.name + ' added to cart');
  if(document.getElementById('products')) updateCartCount();
}

function updateCartCount(){
  const n = getCart().reduce((s,i)=>s + (i.qty||1), 0);
  const el = document.getElementById('cart-count');
  if(el) el.innerText = n;
}

/* ---------- Wishlist ---------- */
function addToWish(id){
  let wish = getWish();
  if(!wish.includes(id)) wish.push(id);
  setWish(wish);
  alert('Added to wishlist');
}

function updateWishCount(){
  const el = document.getElementById('wish-count');
  if(el) el.innerText = getWish().length;
}

/* ---------- Cart page rendering ---------- */
function loadCartPage(){
  const el = document.getElementById('cartList');
  if(!el) return;
  const cart = getCart();
  if(cart.length === 0){ el.innerHTML = '<p>Your cart is empty.</p>'; document.getElementById('cartTotal').innerText = CURRENCY + '0'; return; }
  el.innerHTML = '';
  let total = 0;
  cart.forEach((i, idx) => {
    total += i.price * (i.qty || 1);
    const row = document.createElement('div');
    row.className = 'product';
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.justifyContent = 'space-between';
    row.style.gap = '10px';
    row.innerHTML = `
      <div style="display:flex;gap:12px;align-items:center">
        <img src="${i.img}" style="width:80px;height:60px;object-fit:cover;border-radius:6px"/>
        <div>
          <div style="font-weight:700">${i.name}</div>
          <div>${CURRENCY}${i.price}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <button onclick="changeQty(${i.id}, -1)" class="btn small">−</button>
        <span>${i.qty || 1}</span>
        <button onclick="changeQty(${i.id}, 1)" class="btn small">+</button>
        <button onclick="removeFromCart(${i.id})" class="btn outline">Remove</button>
      </div>
    `;
    el.appendChild(row);
  });
  document.getElementById('cartTotal').innerText = CURRENCY + total;
}

function changeQty(id, delta){
  let cart = getCart();
  const item = cart.find(c => c.id === id);
  if(!item) return;
  item.qty = (item.qty || 1) + delta;
  if(item.qty <= 0){
    cart = cart.filter(c => c.id !== id);
  }
  setCart(cart);
  loadCartPage();
}

function removeFromCart(id){
  let cart = getCart().filter(c => c.id !== id);
  setCart(cart);
  loadCartPage();
}

function clearCart(){
  if(!confirm('Clear cart?')) return;
  setCart([]);
  loadCartPage();
}

/* ---------- Wishlist page ---------- */
function loadWishPage(){
  const el = document.getElementById('wishList');
  if(!el) return;
  const wish = getWish();
  if(wish.length === 0){ el.innerHTML = '<p>Your wishlist is empty.</p>'; return; }
  el.innerHTML = '';
  wish.forEach(id => {
    const p = PRODUCTS.find(x => x.id === id);
    if(!p) return;
    const node = document.createElement('div');
    node.className = 'product';
    node.innerHTML = `
      <img src="${p.img}">
      <h3>${p.name}</h3>
      <p>${CURRENCY}${p.price}</p>
      <div style="display:flex;gap:8px;justify-content:center">
        <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
    el.appendChild(node);
  });
}

/* ---------- Checkout page ---------- */
function loadCheckoutPage(){
  const el = document.getElementById('checkoutItems');
  if(!el) return;
  const cart = getCart();
  if(cart.length === 0){ el.innerHTML = '<p>Cart is empty.</p>'; document.getElementById('checkoutTotal').innerText = CURRENCY + '0'; return; }
  let total = 0;
  el.innerHTML = '';
  cart.forEach(i=>{
    total += i.price * (i.qty || 1);
    const r = document.createElement('div');
    r.className = 'product';
    r.innerHTML = `<div style="display:flex;gap:12px;align-items:center"><img src="${i.img}" style="width:80px;height:60px;object-fit:cover"/><div><div style="font-weight:700">${i.name}</div><div>${CURRENCY}${i.price} × ${i.qty}</div></div></div>`;
    el.appendChild(r);
  });
  document.getElementById('checkoutTotal').innerText = CURRENCY + total;
}

/* ---------- Small helpers to run on specific pages ---------- */
// run when cart page loads
if(document.getElementById('cartList')) loadCartPage();
// run when wishlist loads
if(document.getElementById('wishList')) loadWishPage();
// run when checkout loads
if(document.getElementById('checkoutItems')) loadCheckoutPage();
// run when home loads
if(document.getElementById('products')) displayProducts();

