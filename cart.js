let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
    let cartContainer = document.getElementById("cart-items");
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty</p>";
        document.getElementById("totalPrice").innerText = "₹0";
        return;
    }

    cartContainer.innerHTML = "";
    cart.forEach((item, index) => {
        total += item.price;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" width="120">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById("totalPrice").innerText = "₹" + total;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    cart = [];
    displayCart();
}

displayCart();
