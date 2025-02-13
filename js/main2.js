// Firebase configuration for Contact
const contactConfig = {
  apiKey: "AIzaSyDjPkgu2uQ91VlS49F4z8exipxUTW8dN3U",
  authDomain: "jcccontact-cb074.firebaseapp.com",
  databaseURL: "https://jcccontact-cb074-default-rtdb.firebaseio.com",
  projectId: "jcccontact-cb074",
  storageBucket: "jcccontact-cb074.firebasestorage.app",
  messagingSenderId: "541670126336",
  appId: "1:541670126336:web:1a99c9918ab3ddcd67b9e5"
};

// Firebase configuration for Volunteer
const volunteerConfig = {
  apiKey: "AIzaSyB15WuzF1bcdahZgDWU5ZHWl29M8aCsor0",
  authDomain: "jccvolunteer-70aa5.firebaseapp.com",
  databaseURL: "https://jccvolunteer-70aa5-default-rtdb.firebaseio.com",
  projectId: "jccvolunteer-70aa5",
  storageBucket: "jccvolunteer-70aa5.firebasestorage.app",
  messagingSenderId: "494165171848",
  appId: "1:494165171848:web:1619d39b810b5d6f7f493d"
};

// Firebase configuration for Blog
const blogConfig = {
  apiKey: "AIzaSyAMAMHqBj0EJdYUo7zjKhisDgRaQrFGTwg",
  authDomain: "jccblog-10034.firebaseapp.com",
  databaseURL: "https://jccblog-10034-default-rtdb.firebaseio.com",
  projectId: "jccblog-10034",
  storageBucket: "jccblog-10034.firebasestorage.app",
  messagingSenderId: "843832039493",
  appId: "1:843832039493:web:54930cf208329a3d9beb2c"
};

// Initialize Firebase for Contact, Volunteer, and Blog
const contactApp = firebase.initializeApp(contactConfig, 'contactApp');
const volunteerApp = firebase.initializeApp(volunteerConfig, 'volunteerApp');
const blogApp = firebase.initializeApp(blogConfig, 'blogApp');

// Reference to the databases for Contact, Volunteer, and Blog
var contactDB = contactApp.database().ref("contact");
var volunteerDB = volunteerApp.database().ref("volunteer");
var blogCommentsDB = blogApp.database().ref("blog"); // New reference for blog comments

// Wait until the DOM is fully loaded for both forms
document.addEventListener("DOMContentLoaded", function () {
  // Contact Form Submit
  document.getElementById("contactForm").addEventListener("submit", submitContactForm);
  
  // Volunteer Form Submit
  document.getElementById("volunteerForm").addEventListener("submit", submitVolunteerForm);

  // Blog Comment Form Submit (ensure unique blog IDs for each blog)
  const blogIDs = ['blog1', 'blog2', 'blog3'];  // Example blog IDs, add more if necessary
  blogIDs.forEach(blogID => {
    document.getElementById('commentForm_' + blogID).addEventListener('submit', function(e) {
      e.preventDefault();
      const commentText = document.getElementById('commentText_' + blogID).value;
      if (commentText) {
        saveComment(blogID, commentText);
        document.getElementById('commentText_' + blogID).value = "";  // Clear the input field
      }
    });
    loadComments(blogID); // Load existing comments on page load
  });
});

// Function to submit the Contact Form
function submitContactForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var email = getElementVal("email");
  var subject = getElementVal("subject");
  var message = getElementVal("message");

  console.log({ name, email, subject, message });

  saveContactMessages(name, email, subject, message);

  document.getElementById("success").innerHTML = "<p class='text-success'>Your message has been sent successfully!</p>";
  setTimeout(() => { document.getElementById("success").innerHTML = ""; }, 3000);
  document.getElementById("contactForm").reset();
}

// Function to submit the Volunteer Form
function submitVolunteerForm(e) {
  e.preventDefault();

  var volunteerName = getElementVal("volunteerName");
  var volunteerEmail = getElementVal("volunteerEmail");
  var volunteerMessage = getElementVal("volunteerMessage");

  console.log({ volunteerName, volunteerEmail, volunteerMessage });

  saveVolunteerData(volunteerName, volunteerEmail, volunteerMessage);

  document.getElementById("volunteerSuccess").innerHTML = "<p class='text-success'>Thank you for your interest in volunteering!</p>";
  setTimeout(() => { document.getElementById("volunteerSuccess").innerHTML = ""; }, 3000);
  document.getElementById("volunteerForm").reset();
}

// Function to save messages to Firebase for Contact
const saveContactMessages = (name, email, subject, message) => {
  var newContactForm = contactDB.push();
  newContactForm.set({
    name: name,
    email: email,
    subject: subject,
    message: message,
  }).then(() => console.log("Contact data saved successfully"))
    .catch((error) => console.error("Error saving contact data:", error));
};

// Function to save volunteer data to Firebase
const saveVolunteerData = (name, email, message) => {
  var newVolunteer = volunteerDB.push();
  newVolunteer.set({
    name: name,
    email: email,
    message: message,
  }).then(() => console.log("Volunteer data saved successfully"))
    .catch((error) => console.error("Error saving volunteer data:", error));
};

// Function to save comments to Firebase for Blog
const saveComment = (blogID, commentText) => {
  const newComment = blogCommentsDB.child(blogID).push(); // Save under the specific blogID
  newComment.set({
    text: commentText,
    timestamp: new Date().toISOString(),
  }).then(() => {
    console.log("Comment saved successfully!");
    loadComments(blogID); // Reload the comments after saving
  }).catch((error) => console.error("Error saving comment:", error));
};

// Function to load comments for a specific blog
function loadComments(blogID) {
  const commentsRef = blogCommentsDB.child(blogID);  // Get comments for the specific blog
  commentsRef.once("value", function(snapshot) {
    const commentsList = snapshot.val();
    const commentsContainer = document.getElementById('commentsList_' + blogID);
    let commentCount = 0;
    
    commentsContainer.innerHTML = ""; // Clear previous comments

    // Loop through comments and display them
    for (let key in commentsList) {
      if (commentsList.hasOwnProperty(key)) {
        const comment = commentsList[key];
        const li = document.createElement('li');
        li.textContent = comment.text;
        commentsContainer.appendChild(li);
        commentCount++;
      }
    }

    // Update the comment count
    document.getElementById('commentsCount_' + blogID).innerText = commentCount + " Comments";
  });
}

// Function to get element values by ID
const getElementVal = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const value = element.value;
    console.log(`Element with id ${id} has value:`, value); // Debugging log
    return value;
  } else {
    console.log(`Element with id ${id} not found`);
    return "";
  }
};
