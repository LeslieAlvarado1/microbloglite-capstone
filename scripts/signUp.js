/* Sign Up Page JavaScript */
"use strict";

let signUp = document.getElementById("signup");

signUp.addEventListener("submit", function (event) {
  let password = document.getElementById("signup-password").value;
  let verifyPassword = document.getElementById("signup-verify-password").value;

  if (password !== verifyPassword) {
    showModal("Error", "Passwords do not match!");
    event.preventDefault(); // Prevent form submission
  }
});

function showModal(title, message, redirect = false) {
  document.getElementById("statusModalLabel").innerText = title;
  document.getElementById("statusModalBody").innerText = message;
  let statusModal = new bootstrap.Modal(
    document.getElementById("statusModal"),
    {
      keyboard: false,
    }
  );  if (redirect) {
    document.getElementById('statusModal').addEventListener('hidden.bs.modal', function () {
        window.location.assign("index.html");
    }, { once: true });
}
  statusModal.show();
}

signUp.onsubmit = function (event) {
  event.preventDefault(); // Prevent default form submission

  const signUpForm = event.target;

  const signUpData = {
    username: signUpForm.username.value,
    fullName: signUpForm.fullname.value,
    password: signUpForm.password.value,
  };

  console.log(signUpData); 

  // Disable the submit button to prevent multiple submissions
  signUpForm.signUpButton.disabled = true;

  // Making the API call using fetch
  fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/users', {
    method: 'POST',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(signUpData)
})
.then(response => {
    if (response.ok) {
        return response.json(); 
    }
    throw new Error('Network response was not ok.');
})
.then(data => {
    // Display a modal on successful account creation
    showModal('Success', 'Account has been created successfully!', true);
})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    
    // Display a modal to inform the user about the error
    showModal('Error', 'There was a problem creating your account. Please try again later.');

    // Re-enable the submit button in case of error
    signUpForm.signUpButton.disabled = false;
});
};