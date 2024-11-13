// Function to open the booking form modal with dynamic event details
function openBookingForm(eventName, price, date, time) {
  const modal = document.getElementById('booking-form-modal');
  const eventDetails = document.getElementById('event-details');
  const eventDate = document.getElementById('event-date');
  const eventTime = document.getElementById('event-time');
  const ticketDownloadButton = document.getElementById('ticket-download-button');
  const downloadMessage = document.getElementById('download-message');

  // Set event details in the modal
  eventDetails.innerHTML = `You are booking a ticket for <strong>${eventName}</strong><br>Price: $${price}<br>Date: ${date}<br>Time: ${time}`;
  eventDate.value = date;
  eventTime.value = time;

  // Hide the download button and success message initially
  ticketDownloadButton.style.display = 'none';
  downloadMessage.style.display = 'none';

  // Show the modal with a fade-in effect
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

// Function to close the booking form modal
function closeBookingForm() {
  const modal = document.getElementById('booking-form-modal');
  modal.classList.remove('show');  // Remove the fade-in effect
  setTimeout(() => {
    modal.style.display = 'none';  // Hide the modal after the transition
  }, 300); // Wait for the fade-out to complete
}

document.addEventListener("DOMContentLoaded", function() {
  // Check if the ticket form exists on the page
  const ticketForm = document.getElementById('ticket-form');
  if (ticketForm) {
    ticketForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Get user input from the form
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const eventName = document.getElementById('event-details').innerText.split("\n")[0].split("for ")[1];
      const date = document.getElementById('event-date').value;
      const time = document.getElementById('event-time').value;

      // Simulate ticket purchase success
      alert('Your ticket has been booked successfully! A download link will appear shortly.');

      // Generate the ticket content (for a text file)
      const ticketContent = `Ticket for ${eventName}\n\nName: ${name}\nEmail: ${email}\nEvent: ${eventName}\nDate: ${date}\nTime: ${time}\n\nThank you for booking with us!`;

      // Create a Blob object from the ticket content
      const blob = new Blob([ticketContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${eventName.replace(/\s+/g, '_')}_Ticket.txt`;

      // Display download button and success message
      const ticketDownloadButton = document.getElementById('ticket-download-button');
      const downloadMessage = document.getElementById('download-message');

      ticketDownloadButton.style.display = 'inline-block';
      downloadMessage.style.display = 'block';

      // Set up the download button to trigger the download
      ticketDownloadButton.onclick = function() {
        // Trigger the file download
        link.click();

        // Close the booking modal after a short delay
        setTimeout(() => {
          closeBookingForm();
        }, 2000);
      };
    });
  }

  // Prevent the modal from showing up when navigating from home to services page
  const modal = document.getElementById('booking-form-modal');
  if (modal) {
    modal.style.display = 'none'; // Hide the modal on page load
    modal.classList.remove('show');

    // Close the modal when the overlay is clicked
    modal.addEventListener('click', function(event) {
      if (event.target === this) {
        closeBookingForm();
      }
    });
  }
});

// Make sure the code runs after the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navbarLinks = document.querySelector(".navbar-links");

  // Check if elements exist before adding event listeners
  if (hamburgerMenu && navbarLinks) {
    hamburgerMenu.addEventListener("click", () => {
      navbarLinks.classList.toggle("active");
    });
  } else {
    console.error("Hamburger menu or navbar links element not found");
  }
});

// Form submission handling
document.getElementById("contact-Form").addEventListener("submit", async function(event) {
  event.preventDefault();  // Prevent default form submission

  // Collect form data
  const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value
  };

  try {
      // Send form data to the backend API
      const response = await fetch("/api/submit-contact-form", {
          method: "POST",  // HTTP method
          headers: {
              "Content-Type": "application/json"  // Send data as JSON
          },
          body: JSON.stringify(formData)  // Convert formData to JSON string
      });

      // Check if the response was successful
      if (response.ok) {
          // Display success message
          alert("Thank you! Your message has been sent.");

          // Clear form fields after submission
          document.getElementById("contact-Form").reset();
      } else {
          // Handle errors from the backend
          const errorData = await response.json();
          console.error("Error:", errorData.error);
          alert("There was an error: " + errorData.error);
      }
  } catch (error) {
      // Handle any unexpected errors (e.g., network issues)
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again later.");
  }
});
