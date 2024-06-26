/* Posts Page JavaScript */

"use strict";

function getLoginData() {
  const loginJSON = window.localStorage.getItem("login-data");
  return JSON.parse(loginJSON) || {};
}

const loginData = getLoginData();

document.addEventListener("DOMContentLoaded", (event) => {
  const profileImages = [
    "https://media.istockphoto.com/id/1419922260/photo/3d-render-of-a-cat-playing-video-games-with-a-vr-headset.webp?b=1&s=170667a&w=0&k=20&c=cOMTzhJgUbE_GRZUturqnUoZff1wEvSaiRNYD3Nc1HQ=",
    "https://media.istockphoto.com/id/879267420/photo/funny-dog-wearing-ski-goggles-christmas-concept.webp?b=1&s=170667a&w=0&k=20&c=ySR_QDd2czgUTHObV0Ja6_o0GVVlmrYf3BoDfjQLyrk=",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR7eEB2QjfuiAWOPy3B1iF6udQ8q7pJR9CRWjlm2vAdjyyu8E69Z3uh3Of8W3C0wYU2Mk&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu64lKTfGwfl8C3cKLThixyO53rsj-qe892A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuuabpnD2M-DqCbEiCKmsOfbOLo-d3oUNuAg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfV-991JcCVPLiw7AOJgHWWXBSVOD2JxQ5cg&s",
  ];

  const getRandomProfileImage = () => {
    const randomIndex = Math.floor(Math.random() * profileImages.length);
    return profileImages[randomIndex];
  };

  const fetchUserInfo = (username) => {
    const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";
    return fetch(`${apiBaseURL}/api/users/${username}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
    }).then((response) => response.json());
  };

  const updateProfileSection = () => {
    fetchUserInfo(loginData.username)
      .then((userInfo) => {
        document.getElementById("username").textContent = userInfo.username;
        document.getElementById("bio").textContent =
          userInfo.bio || "No bio available.";
      })
      .catch((error) => console.error("Error fetching user info:", error));
  };

  const createPostElement = (post, userInfo) => {
    const postElement = document.createElement("div");
    postElement.classList.add("card", "mb-4");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const userDiv = document.createElement("div");
    userDiv.classList.add("d-flex", "mb-3");

    const profileImg = document.createElement("img");
    profileImg.src = getRandomProfileImage(); // Assign a random profile image
    profileImg.classList.add("rounded-circle", "me-3");
    profileImg.alt = "Profile Picture";
    profileImg.width = 50;

    const userInfoDiv = document.createElement("div");

    const usernameH5 = document.createElement("h5");
    usernameH5.classList.add("mb-0");
    usernameH5.id = "username";
    usernameH5.textContent = post.username;

    const bioText = document.createElement("small");
    bioText.classList.add("text-muted", "ms-2"); // Add left margin for spacing
    bioText.id = "bio";
    bioText.textContent = userInfo.bio || "";

    const postTime = document.createElement("small");
    postTime.classList.add("text-muted", "d-block", "mt-1");
    postTime.textContent = new Date(post.createdAt).toLocaleString();

    userInfoDiv.appendChild(usernameH5);
    userInfoDiv.appendChild(bioText); // Append bio next to username
    userInfoDiv.appendChild(postTime); // Append post time below username and bio

    userDiv.appendChild(profileImg);
    userDiv.appendChild(userInfoDiv);

    cardBody.appendChild(userDiv);

    const postContentP = document.createElement("p");
    postContentP.classList.add("mt-3");
    postContentP.id = "post";
    postContentP.textContent = post.text;

    const interactionDiv = document.createElement("div");
    interactionDiv.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    const likeDiv = document.createElement("div");

    const likeButton = document.createElement("button");
    likeButton.classList.add("btn");
    if (post.likes.some((like) => like.username === loginData.username)) {
      likeButton.classList.add("liked");
    }
    likeButton.innerHTML = '<i class="bi bi-heart" id="likes"></i> Like';
    const likeCount = document.createElement("span");
    likeCount.textContent = post.likes.length;

    // Toggle like status
    likeButton.addEventListener("click", () => {
      const isLiked = post.likes.some(
        (like) => like.username === loginData.username
      );

      if (isLiked) {
        const like = post.likes.find(
          (like) => like.username === loginData.username
        );
        // Optimistically update UI
        post.likes = post.likes.filter(
          (like) => like.username !== loginData.username
        );
        likeCount.textContent = post.likes.length;
        likeButton.classList.remove("liked");
        likeButton.innerHTML = '<i class="bi bi-heart"></i> Like';

        // Send request to remove like
        fetch(
          `http://microbloglite.us-east-2.elasticbeanstalk.com/api/likes/${like._id}`,
          {
            method: "DELETE",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${loginData.token}`,
            },
          }
        )
          .then((response) => {
            if (!response.ok) {
              // If there was an error, revert the UI changes
              post.likes.push(like);
              likeCount.textContent = post.likes.length;
              likeButton.classList.add("liked");
              likeButton.innerHTML = '<i class="bi bi-heart-fill"></i> Liked';
              throw new Error(`Error removing like: ${response.statusText}`);
            }
            return response.json();
          })
          .then(() => {
            console.log("Removed like:", post._id);
          })
          .catch((error) => console.error("Error removing like:", error));
      } else {
        // Optimistically update UI
        post.likes.push({
          _id: null,
          username: loginData.username,
          postId: post._id,
        }); // Temporary like object
        likeCount.textContent = post.likes.length;
        likeButton.classList.add("liked");
        likeButton.innerHTML = '<i class="bi bi-heart-fill"></i> Liked';

        // Send request to add like
        fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/likes", {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${loginData.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId: post._id }),
        })
          .then((response) => {
            if (!response.ok) {
              // If there was an error, revert the UI changes
              post.likes = post.likes.filter(
                (like) => like.username !== loginData.username
              );
              likeCount.textContent = post.likes.length;
              likeButton.classList.remove("liked");
              likeButton.innerHTML = '<i class="bi bi-heart"></i> Like';
              throw new Error(`Error adding like: ${response.statusText}`);
            }
            return response.json();
          })
          .then((newLike) => {
            console.log("Added like:", newLike._id);
            // Update the temporary like object with the real like ID
            const like = post.likes.find(
              (like) => like.username === loginData.username
            );
            like._id = newLike._id;
          })
          .catch((error) => console.error("Error adding like:", error));
      }
    });
    likeDiv.appendChild(likeButton);
    likeDiv.appendChild(likeCount);

    interactionDiv.appendChild(likeDiv);

    cardBody.appendChild(postContentP);
    cardBody.appendChild(document.createElement("hr"));
    cardBody.appendChild(interactionDiv);

    postElement.appendChild(cardBody);
    return postElement;
  };

  const fetchPosts = () => {
    fetch(
      "http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=15&offset=0",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${loginData.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const posts = Array.isArray(data) ? data : [];
        const postsContainer = document.querySelector("#postsContainer");
        postsContainer.innerHTML = ""; // Clear existing content
        posts.forEach((post) => {
          fetchUserInfo(post.username)
            .then((userInfo) => {
              const postElement = createPostElement(post, userInfo);
              postsContainer.appendChild(postElement);
            })
            .catch((error) =>
              console.error("Error fetching user info:", error)
            );
        });
      })
      .catch((error) => console.error("Error fetching posts:", error));
  };

  // Fetch and display posts on page load
  fetchPosts();
  updateProfileSection();

  // Handle new post submission
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

  function showModal(title, message) {
    document.getElementById("statusModalLabel").innerText = title;
    document.getElementById("statusModalBody").innerText = message;
    let statusModal = new bootstrap.Modal(
      document.getElementById("statusModal"),
      {
        keyboard: false,
      }
    );
    statusModal.show();
  }

  function applyBackgroundStyle(style) {
    document.body.style.background = style;
    localStorage.setItem("backgroundStyle", style);
  }

  // Apply saved theme and background style on page load
  const savedTheme = localStorage.getItem("theme") || "light-mode";
  document.body.classList.add(savedTheme);

  const savedStyle = localStorage.getItem("backgroundStyle");
  document.body.style.background = savedStyle;

  document.getElementById("sadButton").addEventListener("click", function () {
    applyBackgroundStyle("linear-gradient(to right, #264050, #433470)");
  });

  document.getElementById("happyButton").addEventListener("click", function () {
    applyBackgroundStyle("linear-gradient(to right, #fbc2eb, #ccd18c)");
  });

  document.getElementById("boredButton").addEventListener("click", function () {
    applyBackgroundStyle("linear-gradient(to right, #848484, #a09145b3)");
  });

  document.getElementById("noneButton").addEventListener("click", function () {
    applyBackgroundStyle("white");
  });
});

function setLightMode() {
  document.body.classList.add("light-mode");
  document.body.classList.remove("dark-mode");
  localStorage.setItem("theme", "light-mode");
}

function setDarkMode() {
  document.body.classList.add("dark-mode");
  document.body.classList.remove("light-mode");
  localStorage.setItem("theme", "dark-mode");
}
