// Firebase Configuration
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
  
  // Reference to the Firebase database
  var volunteerDB = firebase.database().ref("volunteer");
  
  // Add event listener to the form
  document.getElementById("volunteerForm").addEventListener("submit", submitVolunteerForm);
  
  // Function to submit the form
  function submitVolunteerForm(e) {
    e.preventDefault(); // Prevent default form submission
  
    // Get form values
    var name = getElementVal("volunteerName");
    var email = getElementVal("volunteerEmail");
    var message = getElementVal("volunteerMessage");
  
    // Debugging: log values to ensure they're captured
    console.log({ name, email, message });
  
    // Check if fields are not empty before saving
    if (name && email && message) {
      // Save volunteer information to Firebase
      saveVolunteerInfo(name, email, message);
  
      // Show success message
      alert("Thank you for wanting to become a volunteer! Your information has been saved.");
  
      // Reset the form after submission
      document.getElementById("volunteerForm").reset();
    } else {
      // Show error message if fields are empty
      alert("Please fill out all fields.");
    }
  }
  
  // Function to save volunteer information to Firebase
  const saveVolunteerInfo = (name, email, message) => {
    var newVolunteerEntry = volunteerDB.push();
    newVolunteerEntry
      .set({
        name: name,
        email: email,
        message: message,
      })
      .then(() => console.log("Volunteer information saved successfully"))
      .catch((error) => console.error("Error saving volunteer information:", error));
  };
  
  // Function to get element values
  const getElementVal = (id) => {
    const value = document.getElementById(id).value;
    console.log(`Element with id ${id} has value:`, value); // Log value for debugging
    return value;
  };
  