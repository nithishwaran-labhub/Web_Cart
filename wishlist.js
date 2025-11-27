let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function displayWishlist() {
    let box = document.getElementById("wishlist-items");

    if (wishlist.length === 0) {
        box.innerHTML = "<p>No items in wishlist</p>";
        return;
    }

    box.innerHTML = "";
    wishlist.forEach((item, index) => {
        box.innerHTML += `
            <div class="wishlist-item">
                <img src="${item.img}" width="120">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
                <button onclick="addToCartFromWish(${index})">Move to Cart</button>
                <button onclick="removeWish(${index})">Remove</button>
            </div>
        `;
    });
}

function addToCartFromWish(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(wishlist[index]);
    localStorage.setItem("cart", JSON.stringify(cart));
    removeWish(index);
}

function removeWish(index) {
    wishlist.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    displayWishlist();
}

displayWishlist();
