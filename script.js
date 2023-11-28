//Praseen Datatime code
// Function to update the date and time
function updateDateTime() {
    let currentDate = new Date();

    // Format the date and time as per your requirement
    let formattedDateTime = currentDate.toLocaleString(); // You can customize the format here

    // Update the content of the HTML element with id 'datetime'
    document.getElementById('datetime').innerHTML = formattedDateTime;
  }

  // Call the updateDateTime function to display date and time initially
  updateDateTime();

  // Update date and time every second (1000 milliseconds)
  setInterval(updateDateTime, 1000);

//Praseen Datatime code End


   // Function to fetch data from the API and update the webpage
   async function fetchAndDisplayNames() {
    try {
      const response = await fetch('https://onlineprojectsgit.github.io/API/WDEndpoint.json');
      const data = await response.json();

      // Assuming the API response is an array of names
      const allNames = data.info.learners;

      // Names you are interested in
      const desiredNames = ['Praseen Shamakura', 'Liam Allen', 'Shihua Xie'];

      // Filter the API response based on desired names
      const selectedNames = allNames.filter(name => desiredNames.includes(name));

      // Update the HTML content with the selected names
      const nameListElement = document.getElementById('names');
      nameListElement.innerHTML = selectedNames.map(name => `&copy;${name}`).join(', ');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Call the fetchAndDisplayNames function to fetch and display names
  fetchAndDisplayNames();



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

