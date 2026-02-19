const productContainer = document.getElementById("products");

let products = [];
const categories = ["shoes", "watches", "bags", "electronics", "accessories"];

// Generate 80 Products
for (let i = 1; i <= 80; i++) {
  let category = categories[Math.floor(Math.random() * categories.length)];
  let price = Math.floor(Math.random() * 4000) + 500;

  products.push({
    id: i,
    name: category.charAt(0).toUpperCase() + category.slice(1) + " Item " + i,
    price: price,
    category: category,
    image: "https://via.placeholder.com/300x300"
  });
}

// Display Products
function displayProducts(list) {
  productContainer.innerHTML = "";

  list.forEach(product => {
    productContainer.innerHTML += `
      <div class="product">
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <button onclick="addToWishlist(${product.id})">❤️ Wishlist</button>
      </div>
    `;
  });
}

// Search
document.getElementById("searchInput").addEventListener("input", function() {
  let value = this.value.toLowerCase();
  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );
  displayProducts(filtered);
});

// Category Filter
document.getElementById("categoryFilter").addEventListener("change", function() {
  let value = this.value;
  if (value === "all") {
    displayProducts(products);
  } else {
    let filtered = products.filter(p => p.category === value);
    displayProducts(filtered);
  }
});

// Price Sort
document.getElementById("sortPrice").addEventListener("change", function() {
  let sorted = [...products];

  if (this.value === "low") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (this.value === "high") {
    sorted.sort((a, b) => b.price - a.price);
  }

  displayProducts(sorted);
});

// Dummy Cart & Wishlist Functions
function addToCart(id) {
  alert("Added to Cart: " + id);
}

function addToWishlist(id) {
  alert("Added to Wishlist: " + id);
}

// Initial Load
displayProducts(products);
