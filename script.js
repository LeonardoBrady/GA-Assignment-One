
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

let addToCartBTN = document.getElementsByClassName('addToCart')
  console.log(addToCartBTN)

for(let i = 0; i < addToCartBTN.length; i++) {
  let button = addToCartBTN[i]
  button.addEventListener('click', addToCartClicked)
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


//DOM Objects
const products = [
  { id: 1, name: 'Potato', price: 2.50 },
  { id: 2, name: 'Peach', price: 1.00},
  { id: 3, name: 'Tomato', price: 9.50 },
  { id: 4, name: 'Banana', price: 0.50 },
  { id: 5, name: 'Strawberry', price: 5.45 },
  { id: 6, name: 'Apple', price: 3.55 },
];

// Function to render shop items to the DOM
function renderShopItems() {
  const storeItemsContainer = document.querySelector('.store-items');

  // Goes through the products array
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add(`product-${product.id}`);

    let imagesForDom = 

    // Creates HTML content for the product
    productDiv.innerHTML = `
      <img class="productImages" src="./images/${product.name}.jpeg"/>
      <p class="price" style=" background-color: #f0f0f0; color: #333; padding-right: -5px; border-radius: 5px;">$${product.price.toFixed(2)}</p>
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
    `;

    // Adds click event listener to the "Add to Cart" button
    const addToCartButton = productDiv.querySelector('.addToCart');
    addToCartButton.addEventListener('click', addToCartClicked);

    // Append the product to the store items container
    storeItemsContainer.appendChild(productDiv);
  });
}

// Calls the renderShopItems function to display shop items initially
renderShopItems();