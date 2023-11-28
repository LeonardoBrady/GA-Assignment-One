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