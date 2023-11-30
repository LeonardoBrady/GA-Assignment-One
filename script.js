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
  const cartItem = button.closest(".cart-item");
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

  // Extract only the numeric part of the price
  let numericPrice = parseFloat(price.replace(/[^\d.]/g, ""));

  //render new added item to cart section.
  let cartRowContents = `
      <img src="${imageSrc}"/>
      <h2 class="cart-item-title">${title}</h2>
      <p class="cart-item-total">Per Item: $${numericPrice}</p>
      <!-- cart QTY part -->
      <div class="quantity-control">
        <button class="quantity-btn minus">-</button>
        <input type="text" class="quantity" value="1" maxlength="1" min="1" max="9" oninput="this.value=this.value.replace(/[^1-9]/g,'');" />
        <button class="quantity-btn plus">+</button>
      </div>
      <button class="remove-item-btn">Remove</button>
  `;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);

   // Add event listeners to plus and minus buttons
   const minusButton = cartRow.querySelector(".minus");
   const plusButton = cartRow.querySelector(".plus");
   const quantityInput = cartRow.querySelector(".quantity");
 
   minusButton.addEventListener("click", function () {
    // Decrement the value and make sure it doesn't go below the minimum value (1)
    const currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
      quantityInput.value = currentQuantity - 1;
      //updateCartTotal(cartRow, numericPrice, quantityInput.value);
      saveCartToLocalStorage();
    } else {
      alert("Minimum quantity reached (1)");
    }
  });
 
   plusButton.addEventListener("click", function () {
     // Increment the value, but don't allow it to go past 9
     const currentQuantity = parseInt(quantityInput.value);
     if (currentQuantity < 9) {
       quantityInput.value = currentQuantity + 1;
       //updateCartTotal(cartRow, numericPrice, quantityInput.value);
       saveCartToLocalStorage();
     } else {
       alert("Maximum quantity reached (9)");
     }
   });
 
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
      // Creates HTML content for the product
      (productDiv.innerHTML = `
      <img class="productImages" src="./images/${product.name}.jpeg"/>
      <p class="price" style=" background-color: #f0f0f0; color: #333; padding-right: -5px; border-radius: 5px;">
      $${product.price.toFixed(2)}
      </p>
      <br />
      <p class="product-name cart-item-title">${product.name}</p>
      <p><button class="addToCart" type="button">Add to Cart</button></p>
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

// clear cart function
function clearCart() {
  // Clear existing cart items
  clearCartItems();
  // Save the updated cart to local storage
  saveCartToLocalStorage();
  // Update the cart total after clearing the cart
  updateCartTotal();
}

// clear existing cart items
function clearCartItems() {
  const cartItemsContainer = document.getElementsByClassName("cart-items")[0];
  // Remove all cart items from the container
  // Check if the cart is already empty
  if (cartItemsContainer.children.length === 0) {
    alert("The cart is already empty!");
    return; // Exit the function if the cart is already empty
  }
  while (cartItemsContainer.firstChild) {
    cartItemsContainer.removeChild(cartItemsContainer.firstChild);
  }
}


//Alerts user when payment is processed.
function payNow() {
  {
    // Check if there is at least one item in the cart
    const cartItems = document.getElementsByClassName("cart-item");
    
    if (cartItems.length > 0) {
      // Add your payment logic or any other actions here
      alert("Payment successful! Thank you for shopping!");
      
      // Clear the cart (you can customize this part based on your actual implementation)
      clearCart();
    } else {
      // Display an alert if the cart is empty
      alert("Please add at least one item to the cart before proceeding with payment.");
    }
  }
  
}