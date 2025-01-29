// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjPkgu2uQ91VlS49F4z8exipxUTW8dN3U",
  authDomain: "jcccontact-cb074.firebaseapp.com",
  databaseURL: "https://jcccontact-cb074-default-rtdb.firebaseio.com",
  projectId: "jcccontact-cb074",
  storageBucket: "jcccontact-cb074.firebasestorage.app",
  messagingSenderId: "541670126336",
  appId: "1:541670126336:web:1a99c9918ab3ddcd67b9e5",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

// Reference to the database
var contactDB = firebase.database().ref("contact");

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Add event listener to the form
  document.getElementById("contactForm").addEventListener("submit", submitForm);
});

// Function to submit the form
function submitForm(e) {
  e.preventDefault(); // Prevent the default form submission

  // Get form values
  var name = getElementVal("name");
  var email = getElementVal("email");
  var subject = getElementVal("subject");
  var message = getElementVal("message");

  // Debugging: log values
  console.log({ name, email, subject, message });

  // Save messages to Firebase
  saveMessages(name, email, subject, message);

  // Show success message
  document.getElementById("success").innerHTML =
      "<p class='text-success'>Your message has been sent successfully!</p>";

  // Remove the success message after 3 seconds
  setTimeout(() => {
      document.getElementById("success").innerHTML = "";
  }, 3000);

  // Reset the form
  document.getElementById("contactForm").reset();
}

// Function to save messages to Firebase
const saveMessages = (name, email, subject, message) => {
  var newContactForm = contactDB.push();
  newContactForm
      .set({
          name: name,
          email: email,
          subject: subject,
          message: message,
      })
      .then(() => console.log("Data saved successfully"))
      .catch((error) => console.error("Error saving data:", error));
};

// Function to get element values by ID
const getElementVal = (id) => {
  const element = document.getElementById(id);
  if (element) {
      const value = element.value;
      console.log(`Element with id ${id} has value:`, value); // Add this for debugging
      return value;
  } else {
      console.log(`Element with id ${id} not found`); // If the element is not found
      return "";
  }
};
