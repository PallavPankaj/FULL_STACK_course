const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 2499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 1999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Travel Backpack",
        price: 999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Bluetooth Speaker",
        price: 1299,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Laptop Stand",
        price: 799,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Mechanical Keyboard",
        price: 2199,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Wireless Mouse",
        price: 699,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80"
    }
];


/* =========================================
   CART FUNCTIONS
   ========================================= */

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}


function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}


/* =========================================
   CART COUNT
   ========================================= */

function updateCartCount() {
    const cart = getCart();

    const count = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    const cartCount = document.querySelector("#cart-count");

    if (cartCount) {
        cartCount.textContent = count;
    }
}


/* =========================================
   ADD TO CART
   ========================================= */

function addToCart(productId) {
    const cart = getCart();

    const product = products.find(item => item.id === productId);

    if (!product) {
        return;
    }

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart(cart);

    updateCartCount();

    showMessage(`${product.name} added to cart!`);
}


/* =========================================
   MESSAGE
   ========================================= */

function showMessage(message) {
    const oldMessage = document.querySelector(".toast");

    if (oldMessage) {
        oldMessage.remove();
    }

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    setTimeout(() => {
        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2000);
}


/* =========================================
   RENDER PRODUCTS
   ========================================= */

function renderProducts() {
    const productContainer = document.querySelector("#product-container");

    if (!productContainer) {
        return;
    }

    productContainer.innerHTML = "";

    products.forEach(product => {

        const productCard = document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `
            <a href="product-detail.html?id=${product.id}">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                >
            </a>

            <h3>
                <a href="product-detail.html?id=${product.id}">
                    ${product.name}
                </a>
            </h3>

            <p>₹${product.price.toLocaleString("en-IN")}</p>

            <button class="add-cart-btn" data-id="${product.id}">
                Add to Cart
            </button>
        `;

        productContainer.appendChild(productCard);
    });

    const buttons = document.querySelectorAll(".add-cart-btn");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const productId = Number(button.dataset.id);

            addToCart(productId);
        });
    });
}


/* =========================================
   RENDER CART
   ========================================= */

function renderCart() {
    const cartContainer = document.querySelector("#cart-container");

    const totalElement = document.querySelector("#cart-total");

    if (!cartContainer || !totalElement) {
        return;
    }

    const cart = getCart();

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>

                <h3>Your cart is empty</h3>

                <p>
                    Looks like you haven't added anything yet.
                </p>

                <a href="products.html">
                    Start Shopping
                </a>
            </div>
        `;

        totalElement.textContent = "₹0";

        return;
    }

    cart.forEach(item => {

        const subtotal = item.price * item.quantity;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="cart-product">
                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <span>${item.name}</span>
            </td>

            <td>
                <input
                    type="number"
                    class="quantity-input"
                    min="1"
                    value="${item.quantity}"
                    data-id="${item.id}"
                >
            </td>

            <td>
                ₹${item.price.toLocaleString("en-IN")}
            </td>

            <td>
                ₹${subtotal.toLocaleString("en-IN")}
            </td>

            <td>
                <button
                    class="remove-btn"
                    data-id="${item.id}"
                >
                    Remove
                </button>
            </td>
        `;

        cartContainer.appendChild(row);
    });


    /* Quantity change */

    const quantityInputs =
        document.querySelectorAll(".quantity-input");

    quantityInputs.forEach(input => {

        input.addEventListener("change", () => {

            const productId = Number(input.dataset.id);

            let quantity = Number(input.value);

            if (quantity < 1 || isNaN(quantity)) {
                quantity = 1;
                input.value = 1;
            }

            const cart = getCart();

            const product = cart.find(
                item => item.id === productId
            );

            if (product) {
                product.quantity = quantity;
            }

            saveCart(cart);

            renderCart();

            updateCartCount();
        });
    });


    /* Remove item */

    const removeButtons =
        document.querySelectorAll(".remove-btn");

    removeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const productId =
                Number(button.dataset.id);

            let cart = getCart();

            cart = cart.filter(
                item => item.id !== productId
            );

            saveCart(cart);

            renderCart();

            updateCartCount();
        });
    });


    calculateTotal();
}


/* =========================================
   CALCULATE TOTAL
   ========================================= */

function calculateTotal() {
    const cart = getCart();

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const totalElement = document.querySelector("#cart-total");

    if (totalElement) {
        totalElement.textContent =
            `₹${total.toLocaleString("en-IN")}`;
    }
}


/* =========================================
   PRODUCT DETAIL
   ========================================= */

function renderProductDetail() {

    const detailContainer =
        document.querySelector("#product-detail-container");

    if (!detailContainer) {
        return;
    }

    const params =
        new URLSearchParams(window.location.search);

    const productId =
        Number(params.get("id")) || 1;

    const product =
        products.find(item => item.id === productId);

    if (!product) {
        detailContainer.innerHTML = `
            <h2>Product not found</h2>
        `;

        return;
    }

    detailContainer.innerHTML = `

        <div class="product-image">

            <img
                src="${product.image}"
                alt="${product.name}"
            >

        </div>


        <div class="product-info">

            <p class="product-category">
                CART HUB FEATURED PRODUCT
            </p>

            <h2>${product.name}</h2>

            <p class="price">
                ₹${product.price.toLocaleString("en-IN")}
            </p>

            <p>
                Experience premium quality with the
                ${product.name}. Designed for everyday use,
                comfort and reliability.
            </p>

            <label for="detail-quantity">
                Quantity:
            </label>

            <select id="detail-quantity">

                <option value="1">1</option>

                <option value="2">2</option>

                <option value="3">3</option>

                <option value="4">4</option>

                <option value="5">5</option>

            </select>

            <br><br>

            <button id="detail-add-cart">
                Add to Cart
            </button>

        </div>
    `;


    const button =
        document.querySelector("#detail-add-cart");

    button.addEventListener("click", () => {

        const quantity =
            Number(
                document.querySelector("#detail-quantity").value
            );

        const cart = getCart();

        const existingProduct =
            cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        saveCart(cart);

        updateCartCount();

        showMessage(`${product.name} added to cart!`);
    });
}


/* =========================================
   CHECKOUT VALIDATION
   ========================================= */

function setupCheckout() {

    const form =
        document.querySelector("#checkout-form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", event => {

        event.preventDefault();

        clearErrors();

        let isValid = true;


        /* Name */

        const name =
            document.querySelector("#name");

        if (name.value.trim() === "") {

            showError(
                "name",
                "Name is required."
            );

            isValid = false;
        }


        /* Address */

        const address =
            document.querySelector("#address");

        if (address.value.trim() === "") {

            showError(
                "address",
                "Address is required."
            );

            isValid = false;
        }


        /* Pincode */

        const pincode =
            document.querySelector("#pincode");

        if (!/^\d{6}$/.test(pincode.value.trim())) {

            showError(
                "pincode",
                "Pincode must be exactly 6 digits."
            );

            isValid = false;
        }


        /* Phone */

        const phone =
            document.querySelector("#phone");

        if (!/^\d{10}$/.test(phone.value.trim())) {

            showError(
                "phone",
                "Phone must be exactly 10 digits."
            );

            isValid = false;
        }


        /* Successful validation */

        if (isValid) {

            localStorage.removeItem("cart");

            updateCartCount();

            form.reset();

            const confirmation =
                document.querySelector("#confirmation");

            confirmation.textContent =
                "✓ Order placed successfully! Thank you for shopping with CartHub.";

            confirmation.classList.add("success-message");
        }
    });
}


/* =========================================
   FORM ERROR
   ========================================= */

function showError(inputId, message) {

    const input =
        document.querySelector(`#${inputId}`);

    const error =
        document.createElement("small");

    error.className = "error-message";

    error.textContent = message;

    input.insertAdjacentElement(
        "afterend",
        error
    );
}


function clearErrors() {

    const errors =
        document.querySelectorAll(".error-message");

    errors.forEach(error => {
        error.remove();
    });

    const confirmation =
        document.querySelector("#confirmation");

    if (confirmation) {
        confirmation.textContent = "";

        confirmation.className = "";
    }
}


/* =========================================
   PAGE INITIALIZATION
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    renderProducts();

    renderCart();

    renderProductDetail();

    setupCheckout();

});