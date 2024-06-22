/* Landing Page JavaScript */

"use strict";

const loginForm = document.querySelector("#login");

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



  document.getElementById('showContentButtonLogIn').addEventListener('click', function() {
      // Fade out the overlay
      document.querySelector('.overlay-container').style.opacity = '0';

      // After a short delay, hide the overlay and show the container
      setTimeout(function() {
          document.querySelector('.overlay-container').style.display = 'none';
          document.querySelector('.container').style.display = 'block';
      }, 600); // Adjust delay (in milliseconds) to match transition duration
  });

  document.getElementById('showContentButtonSignUp').addEventListener('click', function(event) {
      // Prevent default button behavior (form submission)
      event.preventDefault();

      // Fade out the overlay
      document.querySelector('.overlay-container').style.opacity = '0';

      // After a short delay, hide the overlay
      setTimeout(function() {
          document.querySelector('.overlay-container').style.display = 'none';
          document.querySelector('.container').style.display = 'none';
      }, 500); // Adjust delay (in milliseconds) to match transition duration

      // Redirect to signup.html after overlay is hidden
      setTimeout(function() {
          window.location.href = 'signUp.html';
      }, 600); // Adjust delay as needed
  });