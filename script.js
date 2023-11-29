// Function to update the date and time
function updateDateTime() {
  let currentDate = new Date();
  let formattedDateTime = currentDate.toLocaleString();
  document.getElementById("datetime").innerHTML = formattedDateTime;
}
updateDateTime();
setInterval(updateDateTime, 1000);

// Function to fetch data from the API and update the webpage
async function fetchAndDisplayNames() {
  try {
    const response = await fetch(
      "https://onlineprojectsgit.github.io/API/WDEndpoint.json"
    );
    const data = await response.json();
    const allNames = data.info.learners;
    const desiredNames = ["Praseen Shamakura", "Liam Allen", "Shihua Xie"];
    const selectedNames = allNames.filter((name) =>
      desiredNames.includes(name)
    );
    const nameListElement = document.getElementById("names");
    nameListElement.innerHTML = selectedNames
      .map((name) => `&copy;${name}`)
      .join(", ");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
fetchAndDisplayNames();

// Remove Item From Cart Button
function removeCartItemButton(button) {
  var cartItem = button.closest(".cart-item");
  cartItem.remove();
  saveCartToLocalStorage(); // Save the updated cart to local storage
  updateCartTotal(); // Update the cart total after removing an item
}

// Attach removeCartItemButton function to the "Remove" buttons
document.addEventListener("click", function (event) {
  if (
    event.target &&
    event.target.tagName === "BUTTON" &&
    event.target.textContent === "Remove"
  ) {
    removeCartItemButton(event.target);
  }
  saveCartToLocalStorage(); // Save the updated cart to local
  //remember to updateCartTotal after ADD or REMOVE items,otherwise the new added btn cannot be removed
  updateCartTotal();
});

//Updates Cart Total Price
function updateCartTotal() {
  const cartItemContainer = document.getElementsByClassName("cart-items")[0];
  const cartRows = cartItemContainer.getElementsByClassName("cart-item");
  let total = 0;

  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-item-total")[0];
    let quantityElement = cartRow.getElementsByClassName("quantity")[0];

    // Extract the text content and remove non-numeric characters
    let priceText = priceElement.innerText.replace(/[^\d.]/g, "");

    // Attempt to convert the cleaned text to a float
    let price = parseFloat(priceText);

    // Check if the conversion was successful
    if (!isNaN(price)) {
      let quantity = quantityElement.value;
      total += price * quantity;
    }
  }

  document.getElementsByClassName("cart-final-total")[0].innerText =
    "Cart Total Price: $" + total.toFixed(2); // Ensure total is formatted as a fixed-point number
}

//Variable for CLASS="addToCart"
let addToCartBTN = document.getElementsByClassName("addToCart");
// console.log(addToCartBTN);

//For every click on Add to Cart on store, it then logs that item.
for (let i = 0; i < addToCartBTN.length; i++) {
  let button = addToCartBTN[i];
  button.addEventListener("click", addToCartClicked);
}
//Stores elements by class to a few variables.
function addToCartClicked(event) {
  let button = event.target;
  let storeItems = button.parentElement.parentElement;
  let title = storeItems.getElementsByClassName("product-name")[0].innerText;
  let price = storeItems.getElementsByClassName("price")[0].innerText;
  let imageSrc = storeItems.getElementsByClassName("productImages")[0].src;
  console.log(title, "/", price, "/", imageSrc);
  addItemToCart(title, price, imageSrc);
  saveCartToLocalStorage(); // Save the updated cart to local storage
}

//This adds items from the store to the cart section.
function addItemToCart(title, price, imageSrc) {
  const cartRow = document.createElement("div");
  cartRow.classList.add("cart-item");
  const cartItems = document.getElementsByClassName("cart-items")[0];
  const cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      //This loop checks to see if item is already in cart & calls alert()
      alert("This item is already in the cart");
      return;
    }
  }
  //render new added item to cart section.
  let cartRowContents = `
      <img src="${imageSrc}"/>
      <h2 class="cart-item-title">${title}</h2>
      <p class="cart-item-total">Total: ${price}</p>
      <!-- cart QTY part -->
      <div class="quantity-control">
        <button class="quantity-btn minus">-</button>
        <input type="number" class="quantity" value="1" min="1" />
        <button class="quantity-btn plus">+</button>
      </div>
      <button class="remove-item-btn">Remove</button>
  `;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  saveCartToLocalStorage(); // Save the updated cart to local storage
}

// Function to save the cart to local storage
function saveCartToLocalStorage() {
  const cartItems = document.getElementsByClassName("cart-item");
  const cartData = [];

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const title = cartItem.querySelector(".cart-item-title").innerText;
    const price = cartItem.querySelector(".cart-item-total").innerText;
    const imageSrc = cartItem.querySelector("img").src;

    cartData.push({ title, price, imageSrc });
  }

  // Save cart data to local storage
  localStorage.setItem("cart", JSON.stringify(cartData));
}

// Function to load cart items from local storage
function loadCartFromLocalStorage() {
  const cartData = JSON.parse(localStorage.getItem("cart"));

  if (cartData) {
    // Clear existing cart items
    clearCart();
    // Add items from local storage
    cartData.forEach((item) => {
      addItemToCart(item.title, item.price, item.imageSrc);
    });
  }
}

// Function to clear existing cart items
function clearCart() {
  const cartItems = document.getElementsByClassName("cart-items")[0];
  cartItems.innerHTML = "";
}

// Update the cart total price after page load
window.addEventListener("load", function () {
  loadCartFromLocalStorage();
  updateCartTotal();
});

//DOM Objects
const products = [
  { id: 1, name: "Potato", price: 2.5 },
  { id: 2, name: "Peach", price: 1.0 },
  { id: 3, name: "Tomato", price: 9.5 },
  { id: 4, name: "Banana", price: 0.5 },
  { id: 5, name: "Strawberry", price: 5.45 },
  { id: 6, name: "Apple", price: 3.55 },
];

// Function to render shop items to the DOM
function renderShopItems() {
  const storeItemsContainer = document.querySelector(".store-items");

  // Goes through the products array
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add(`product-${product.id}`);

    let imagesForDom =
      // Creates HTML content for the product
      (productDiv.innerHTML = `
      <img class="productImages" src="./images/${product.name}.jpeg"/>
      <p class="price" style=" background-color: #f0f0f0; color: #333; padding-right: -5px; border-radius: 5px;">$${product.price.toFixed(
        2
      )}</p>
      <br />
      <p class="product-name cart-item-title">${product.name}</p>
      <p><button class="addToCart" type="button">Add to Cart</button></p>
      <p>
        QTY:
        <input
          class="product-quantity"
          type="tel"
          name="quantity"
          maxlength="1"
          value="1"
        />
      </p>
    `);

    // Adds click event listener to the "Add to Cart" button
    const addToCartButton = productDiv.querySelector(".addToCart");
    addToCartButton.addEventListener("click", addToCartClicked);

    // Append the product to the store items container
    storeItemsContainer.appendChild(productDiv);
  });
}

// Calls the renderShopItems function to display shop items initially
renderShopItems();
