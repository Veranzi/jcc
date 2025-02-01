
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB15WuzF1bcdahZgDWU5ZHWl29M8aCsor0",
    authDomain: "jccvolunteer-70aa5.firebaseapp.com",
    databaseURL: "https://jccvolunteer-70aa5-default-rtdb.firebaseio.com",
    projectId: "jccvolunteer-70aa5",
    storageBucket: "jccvolunteer-70aa5.firebasestorage.app",
    messagingSenderId: "494165171848",
    appId: "1:494165171848:web:1619d39b810b5d6f7f493d"
  };
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

// Reference to Firebase database
const volunteerDB = firebase.database().ref("volunteer");

// Add event listener to the form
document.getElementById("volunteerForm").addEventListener("submit", submitVolunteerForm);

// Function to handle form submission
function submitVolunteerForm(e) {
    e.preventDefault(); // Prevent default form submission

    // Fetch input values
    const name = getElementVal("volunteerName");
    const email = getElementVal("volunteerEmail");
    const message = getElementVal("volunteerMessage");

    // Debugging: Ensure values are fetched correctly
    console.log("Form Values:", { name, email, message });

    // Validate input fields
    if (name && email && message) {
        saveVolunteerInfo(name, email, message); // Save data to Firebase
        alert("Thank you for becoming a volunteer! Your information has been saved.");
        document.getElementById("volunteerForm").reset(); // Reset the form
    } else {
        alert("Please fill out all fields.");
    }
}

// Function to save volunteer information to Firebase
const saveVolunteerInfo = (name, email, message) => {
    const newVolunteerEntry = volunteerDB.push();
    newVolunteerEntry
        .set({
            name: name,
            email: email,
            message: message,
        })
        .then(() => console.log("Volunteer information saved successfully"))
        .catch((error) => console.error("Error saving volunteer information:", error));
};

// Function to fetch input values
const getElementVal = (id) => document.getElementById(id).value;