// Function to update the date and time
function updateDateTime() {
  var currentDate = new Date();

  // Format the date and time as per your requirement
  var formattedDateTime = currentDate.toLocaleString(); // You can customize the format here

  // Update the content of the HTML element with id 'datetime'
  document.getElementById("datetime").innerHTML = formattedDateTime;
}

// Call the updateDateTime function to display date and time initially
updateDateTime();

// Update date and time every second (1000 milliseconds)
setInterval(updateDateTime, 1000);

//task 7: have a remove from cart button that removes the items from cart+update cart total price

// const removeCartItemButton = document.getElementsByClassName("remove-item-btn");
// console.log(removeCartItemButton);
// for (let i = 0; i < removeCartItemButton.length; i++) {
//   const button = removeCartItemButton[i];
//   button.addEventListener("click", function (event) {
//     const buttonClicked = event.target;
//     buttonClicked.parentElement.remove();
//     updateCartTotal();
//   });
// }
function removeCartItemButton(button) {
  var cartItem = button.closest(".cart-item");
  cartItem.remove();
  updateCartTotal(); // Update the cart total after removing an item
}

// Attach the function to the "Remove" buttons
document.addEventListener("click", function (event) {
  if (
    event.target &&
    event.target.tagName === "BUTTON" &&
    event.target.textContent === "Remove"
  ) {
    removeCartItemButton(event.target);
  }
  //remember to updateCartTotal after ADD or REMOVE items.
  updateCartTotal();
});

//Updates carts total
function updateCartTotal() {
  const cartItemContainer = document.getElementsByClassName("cart-items")[0];
  const cartRows = cartItemContainer.getElementsByClassName("cart-item");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-item-total")[0];
    let quantityElement = cartRow.getElementsByClassName("quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("Total: $", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  document.getElementsByClassName("cart-final-total")[0].innerText =
    "Cart Total Price: $" + total;
}

//Variable for CLASS="addToCart"
let addToCartBTN = document.getElementsByClassName("addToCart");
console.log(addToCartBTN);

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
}
