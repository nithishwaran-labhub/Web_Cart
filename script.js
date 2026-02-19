const productContainer = document.getElementById("product-list");

const productNames = [
  "Smart Watch", "Wireless Headphones", "Running Shoes", "Backpack",
  "Gaming Mouse", "Keyboard", "Bluetooth Speaker", "Sunglasses",
  "Leather Wallet", "Casual Shirt", "Formal Shoes", "Power Bank",
  "Laptop Bag", "Fitness Band", "Mobile Stand", "Water Bottle"
];

let products = [];

// Generate 80 products automatically
for (let i = 1; i <= 80; i++) {
  let randomName = productNames[Math.floor(Math.random() * productNames.length)];
  let randomPrice = Math.floor(Math.random() * 4000) + 500;

  products.push({
    id: i,
    name: randomName + " " + i,
    price: randomPrice,
    image: "https://via.placeholder.com/300x300"
  });
}

// Display Products
products.forEach(product => {
  productContainer.innerHTML += `
    <div class="product">
      <img src="${product.image}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button>Add to Cart</button>
      <button>❤ Wishlist</button>
    </div>
  `;
});
