/* Landing Page JavaScript */

"use strict";

const overlayContainer = document.querySelector(".overlay-container");
const header = document.querySelector("header");
const showLogin = document.getElementById("showContentButtonLogIn");
const showSignUp = document.getElementById("showContentButtonSignUp");
const container = document.querySelector(".container");
const loginForm = document.querySelector("#login");

// Initially hide the header
header.style.display = "none";

showLogin.addEventListener("click", function () {
  // Fade out the overlay
  overlayContainer.style.opacity = "0";
  
  // After a short delay, hide the overlay and show the container
  setTimeout(function () {
    overlayContainer.style.display = "none";
    container.style.display = "block";
    header.style.display = "block"; // Show header
  }, 500); // Adjust delay (in milliseconds) to match transition duration
});

showSignUp.addEventListener("click", function (event) {
  // Prevent default button behavior (form submission)
  event.preventDefault();
  
  // Fade out the overlay
  overlayContainer.style.opacity = "0";
  
  // After a short delay, hide the overlay
  setTimeout(function () {
    overlayContainer.style.display = "none";
    container.style.display = "none";
    header.style.display = "block"; // Show header for consistency
  }, 500); // Adjust delay (in milliseconds) to match transition duration
  
  // Redirect to signup.html after overlay is hidden
  setTimeout(function () {
    window.location.href = "signUp.html";
  }, 400); // Adjust delay as needed
});

loginForm.onsubmit = function (event) {
  // Prevent the form from refreshing the page,
  // as it will do by default when the Submit event is triggered:
  event.preventDefault();

  // We can use loginForm.username (for example) to access
  // the input element in the form which has the ID of "username".
  const loginData = {
    username: loginForm.username.value,
    password: loginForm.password.value,
  };

  // Disables the button after the form has been submitted already:
  loginForm.loginButton.disabled = true;

  // Time to actually process the login using the function from auth.js!
  login(loginData);
};