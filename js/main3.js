// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // Use the existing app
}

// Reference to the Firebase Database for Volunteer data
var volunteerDB = firebase.database().ref("volunteers");

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Add event listener to the Volunteer form
  document.getElementById("volunteerForm").addEventListener("submit", submitVolunteerForm);
});

// Function to submit the Volunteer form
function submitVolunteerForm(e) {
  e.preventDefault(); // Prevent the default form submission

  // Get form values for Volunteer form
  var name = getElementVal("volunteerName");
  var email = getElementVal("volunteerEmail");
  var message = getElementVal("volunteerMessage");

  // Save Volunteer info to Firebase
  saveVolunteerInfo(name, email, message);

  // Show success message for Volunteer form
  document.getElementById("volunteerSuccess").innerHTML =
      "<p class='text-success'>Thank you for volunteering!</p>";

  // Reset the form
  document.getElementById("volunteerForm").reset();

  // Remove the success message after 3 seconds
  setTimeout(() => {
      document.getElementById("volunteerSuccess").innerHTML = "";
  }, 3000);
}

// Function to save Volunteer data to Firebase
const saveVolunteerInfo = (name, email, message) => {
  var newVolunteerForm = volunteerDB.push();
  newVolunteerForm
    .set({
      name: name,
      email: email,
      message: message,
    })
    .then(() => console.log("Volunteer data saved successfully"))
    .catch((error) => console.error("Error saving Volunteer data:", error));
};

// Function to get element values by ID
const getElementVal = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const value = element.value;
    console.log(`Element with id ${id} has value:`, value); // Debugging output
    return value;
  } else {
    console.log(`Element with id ${id} not found`); // If the element is not found
    return "";
  }
};