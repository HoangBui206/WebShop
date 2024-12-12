let cart = [];
let products = [];
let index = [];
let productPrice = 0;
//Fetch products
async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    products = await response.json();
    displayProducts(products);
}


//Navigation bar
function loginPage() {
    window.location.href="login.html";
}
function homeSection() {
    document.getElementById('hero').scrollIntoView();
}
function productsSection () {
    document.getElementById('products-container').scrollIntoView();
}
function cartSection() {
    document.getElementById('cart-section').scrollIntoView();
}

//Login page
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        window.location.href="index.html";
    } else {
        document.getElementById('password').value = "";
        alert('Your password or username is wrong, please try again');
    }
}
function Return() {
    window.location.href="index.html";
    displayCart();
}


//Display products
fetchProducts();
function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = ''; // clear to avoid duplicating cards
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productCard); // append productCard to be a child of productContainer
    });
}
function filterProducts(category) {
    // Loop through the products and selects the products matched the category
    const filteredProducts = products.filter(product => product.category === category);
    displayProducts(filteredProducts);
    if (category == "allProducts") {
        displayProducts(products);
    }
}

//Cart section
function addToCart(productID) {
    index.push(productID);
    index = [...new Set(index)]; //contain all the product's ids in cart
    console.log(index);
    const cartProduct = products.find(p => p.id === Number(productID));
    console.log(cartProduct.id);
    const isProductInCart = cart.some(p => p.id === cartProduct.id);    //return true if there is at lease 1 id already in cart
    if (!isProductInCart) { 
        cart.push(cartProduct);
        productPrice += cartProduct.price;
        console.log('Product added to cart');   //log section
    } else {
        console.log('Product already in cart'); //log section
    }
    displayCart();
}

function displayCart() {
    const cartContainer = document.getElementById('cart-product');
    cartContainer.innerHTML = '';
    cart.forEach(item => {
        item.quantity = 1;
        const cartItems = document.createElement('div');
        cartItems.className = 'cart-items'
        cartItems.innerHTML = `
        <td><img src="${item.image}"></td>
        <div class="cart-product-title">
            <td>${item.title}</td>
        </div>
        <div class="cart-product-quantity">
            <td><button onclick="increaseQuantity(${item.id})">+</button></td>
            <td><input type="number" value="1" min="1" max="99" id="${item.id}"></td>
            <td><button onclick="decreaseQuantity(${item.id})">-</button></td>
        </div>
        <div class="cart-product-price"><p id="${item.id + 1000}">$${item.price}</p>
        `;
        cartContainer.appendChild(cartItems);
    });
    document.getElementById('totalPrice').innerText = "$" + productPrice.toFixed(2);
}

function increaseQuantity(itemID) {
    for(let i = 0; i < cart.length; i++) {
        if (cart[i].id == itemID) {
            cart[i].quantity = cart[i].quantity + 1;
            document.getElementById(itemID).value = cart[i].quantity;
            document.getElementById(itemID+1000).innerHTML = "$" + (cart[i].price * cart[i].quantity).toFixed(2);
            productPrice += cart[i].price;
            document.getElementById('totalPrice').innerText = "$" + productPrice.toFixed(2);
        }
    }
}
function decreaseQuantity(itemID) {
    for(let i = 0; i < cart.length; i++) {
        if (cart[i].id == itemID) {
            cart[i].quantity = cart[i].quantity - 1;
            if (cart[i].quantity < 1){
                cart[i].quantity = 1;
                return;
            } 
            document.getElementById(itemID).value = cart[i].quantity;
            document.getElementById(itemID+1000).innerHTML = "$" + (cart[i].price * cart[i].quantity).toFixed(2);
            productPrice -= cart[i].price;
            document.getElementById('totalPrice').innerText = "$" + productPrice.toFixed(2);
        }
    }
}
function cartContinueShopping() {
    document.getElementById('products-container').scrollIntoView();
}
function cartCheckout() {
    if (index == 0) {
        alert('You don\'t have anything in your cart!');
    } else {
        let ans = confirm('You are about to checkout. Confirm?');
        if (ans) {
            alert('Successfully placed your order!');
            window.location.href="index.html";
        } 
    }
}

