
// Function to update the date and time
function updateDateTime() {
    var currentDate = new Date();

    // Format the date and time as per your requirement
    var formattedDateTime = currentDate.toLocaleString(); // You can customize the format here

    // Update the content of the HTML element with id 'datetime'
    document.getElementById('datetime').innerHTML = formattedDateTime;
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

function addToCartClicked(event) {
  let button = event.target
  let storeItems = button.parentElement.parentElement
  let title = storeItems.getElementsByClassName('product-name')[0].innerText
  let price = storeItems.getElementsByClassName('price')[0].innerText
  let imageSrc = storeItems.getElementsByClassName('productImages')[0].src
  console.log(title,'/', price, '/', imageSrc)
  addItemToCart(title, price, imageSrc)
}

function addItemToCart(title, price, imageSrc){
  const cart = document.createElement('div')
  cart.inner = title
  const cartItems = document.getElementsByClassName('cart')[0]
}

