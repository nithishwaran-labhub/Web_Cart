const productContainer = document.getElementById("products");

let products = [];
const categories = ["shoes", "watches", "bags", "electronics", "accessories"];

// Image collections for each category
const categoryImages = {
  shoes: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400",
    "https://images.unsplash.com/photo-1528701800489-20be3c1b02f8?w=400"
  ],
  watches: [
    "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400"
  ],
  bags: [
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400",
    "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?w=400"
  ],
  electronics: [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
  ],
  accessories: [
    "https://images.unsplash.com/photo-1611923134239-b9be5816d53f?w=400",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    "https://images.unsplash.com/photo-1585386959984-a41552231658?w=400"
  ]
};

// Generate 80 products
for (let i = 1; i <= 80; i++) {

  let category = categories[Math.floor(Math.random() * categories.length)];
  let price = Math.floor(Math.random() * 4000) + 500;

  // Pick random image from category
  let imageList = categoryImages[category];
  let image = imageList[Math.floor(Math.random() * imageList.length)];

  products.push({
    id: i,
    name: category.charAt(0).toUpperCase() + category.slice(1) + " Item " + i,
    price: price,
    category: category,
    image: image
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

displayProducts(products);

function addToCart(id) {
  alert("Added to Cart: " + id);
}

function addToWishlist(id) {
  alert("Added to Wishlist: " + id);
}
