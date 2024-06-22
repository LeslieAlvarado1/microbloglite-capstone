/* Sign Up Page JavaScript */

"use strict";

const signUpForm = document.querySelector("#signup");


signUpForm.onsubmit = function(event) {
    event.preventDefault();  // Prevent default form submission

    const signUpForm = event.target;

    const signUpData = {
        username: signUpForm.username.value,
        fullName: signUpForm.fullname.value,  // Notice the case change here
        password: signUpForm.password.value,
    };

    console.log(signUpData); // Log the sign-up data to the console

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
            return response.json();  // Assuming your API returns JSON
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        // Display an alert box on successful account creation
        alert("Account has been created successfully!");
        
        // Redirect to another page
        window.location.assign("index.html");
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        
        // Optionally, you can display an alert or message to inform the user about the error
        alert('There was a problem creating your account. Please try again later.');

        // Re-enable the submit button in case of error
        signUpForm.signUpButton.disabled = false;
    });
};