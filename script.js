let products = [
    {name:"Tiwana Cattle Feed 8000", price:1350, img:"Tiwana-8000-Shadow-1072x1536 (1).png"},
    {name:"Tiwana Cattle Feed 10000", price:1650, img:"Tiwana-10000-1072x1536.png"},
    {name:"Tiwana Cattle Feed Milk+", price:1550, img:"Tiwana-Milk-Plus-1072x1536.png"},
    {name:"Tiwana Cattle Feed Buff Special", price:1600, img:"Tiwana-8000-Shadow-1072x1536 (1).png"},
    {name:"Tiwana Cattle Feed M-8000", price:1450, img:"Tiwana-8000-Shadow-1072x1536 (1).png"},
    {name:"Tiwana Cattle Feed M-MilkOn", price:1600, img:"Tiwana-8000-Shadow-1072x1536 (1).png"},
    {name:"Tiwana Calf Starter", price:1000, img:"calf-starter-1-1072x1536.png"},
    {name:"Tiwana Calf Grower", price:1750, img:"calf-grover-1-1072x1536.png"},
    {name:"Tiwana T-20 Dry", price:1950, img:"t20-DRY-1072x1536.png"},
    {name:"Tiwana Heifer Dry", price:1350, img:"dry-heifer-1072x1536.png"},
    {name:"Tiwana 35 Protein", price:1350, img:"35-pro-1-1072x1536.png"},
];

let cart = [];

/* MODE */
function toggleMode(){
    document.body.classList.toggle('dark');
}

/* RENDER PRODUCTS */
function renderProducts(){
    const list = document.getElementById('productList');
    list.innerHTML = '';

    products.forEach((p,i) => {
        list.innerHTML += `
    <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p><strong>₹${p.price}</strong></p>

        <label>Quantity (bags):</label>
        <input id="qty${i}" type="number" min="1" value="1" style="width:80px;padding:5px;margin:5px 0">

        <button class="btn cart-btn" onclick="addToCart(${i})">Add to Cart</button>

        <button class="btn" onclick="whatsappOrder(${i})">WhatsApp Order</button>
    </div>
`;
    });
}

/* CART */
function addToCart(i){
    cart.push(products[i]);
    document.getElementById('cartCount').innerText = cart.length;
    renderCart();
}

function toggleCart(){
    document.getElementById('cartBox').classList.toggle('open');
}

function renderCart(){
    const c = document.getElementById('cartItems');
    c.innerHTML = '';
    let total = 0;

    cart.forEach(p => {
        total += p.price;
        c.innerHTML += `<li>${p.name} - ₹${p.price}</li>`;
    });

    document.getElementById('totalAmount').innerText = total;
}

function goCheckout(){
    location.href = "#checkout";
    toggleCart();
}

/* ADMIN ADD PRODUCT */
function addProduct(){
    const name = document.getElementById('pName').value;
    const price = document.getElementById('pPrice').value;
    const img = document.getElementById('pImage').value;

    products.push({name,price,img});
    renderProducts();
}

/* PAYMENT */
function payNow(){
    alert("Razorpay payment gateway integration coming next.");
}

function whatsappOrder(i) {
    let p = products[i];
    let qty = document.getElementById(`qty${i}`).value;

    let message = 
`📦 *New Order Request*

🛒 *Product:* ${p.name}
📦 *Quantity:* ${qty} Bag(s)
💵 *Price per Bag:* ₹${p.price}
💰 *Total Amount:* ₹${p.price * qty}

👤 *Customer Details*
Name:
Phone:
Village/City:
Address:

Please confirm my order.`;

    let encodedMessage = encodeURIComponent(message);

    // Put your real WhatsApp number here
    let phone = "918607457689"; 

    let url = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(url, "_blank");
}


renderProducts();
