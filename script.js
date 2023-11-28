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