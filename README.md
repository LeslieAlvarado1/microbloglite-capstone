## PingPost_capstone3

Capstone 3 MicroBlog website.

## About

PingPost is designed to provide a seamless and engaging microblogging experience. Users can create, view, and interact with posts through a simple and intuitive interface. Leveraging the MicroblogLite API, PingPost ensures efficient data management and user interactions.

## Features

Microblogging Interface: Users can post short messages, read posts from others, and engage through likes and comments.

API Integration: Utilizes the MicroblogLite API for backend functionality, ensuring robust data handling.

Postman Testing: Experiment with API endpoints in Postman to understand and utilize the full capabilities of the MicroblogLite API.


## Interesting JavaScript Code

A notable feature of this project is the efficient handling of API requests and responses, enabling real-time updates and interactions. 
Ex:  // New post submission
  document.getElementById("postButton").addEventListener("click", () => {
    const postText = document.getElementById("newPostText").value;
    if (postText.trim()) {
      fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${loginData.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: postText }),
      })
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("newPostText").value = ""; // Clear the input field
          fetchPosts(); // Refresh the list of posts
          showModal("Success", "Post submitted successfully!");
        })
        .catch((error) => {
          console.error("Error posting new content:", error);
          showModal(
            "Error",
            "There was a problem submitting your post. Please try again later."
          );
        });
    }
  });
