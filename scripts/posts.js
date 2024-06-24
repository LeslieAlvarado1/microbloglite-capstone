/* Posts Page JavaScript */
"use strict";

function getLoginData() {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}

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

    const loginData = getLoginData();

    const fetchUserInfo = (username) => {
        return fetch(
            `http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${username}`,
            {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${loginData.token}`,
                },
            }
        ).then((response) => response.json());
    };

    const fetchPosts = () => {
        fetch(
            "http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=50&offset=0",
            {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${loginData.token}`,
                },
            }
        )
        .then((response) => response.json())
        .then((posts) => {
            const postsContainer = document.querySelector("#postsContainer");
            postsContainer.innerHTML = ""; // Clear existing content

            posts.forEach((post) => {
                fetchUserInfo(post.username)
                .then((userInfo) => {
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

                    const postTime = document.createElement("small");
                    postTime.classList.add("text-muted");
                    postTime.textContent = new Date(post.createdAt).toLocaleString();

                    userInfoDiv.appendChild(usernameH5);
                    userInfoDiv.appendChild(postTime);

                    userDiv.appendChild(profileImg);
                    userDiv.appendChild(userInfoDiv);

                    cardBody.appendChild(userDiv);

                    if (userInfo.bio) {
                        const bioTextH5 = document.createElement("h5");
                        bioTextH5.id = "bio";
                        bioTextH5.classList.add("text-muted"); // Make bio text muted
                        bioTextH5.textContent = userInfo.bio;
                        cardBody.appendChild(bioTextH5);
                    }

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
                    likeButton.classList.add("btn", "btn-light");
                    if (post.likes.includes(loginData.username)) {
                        likeButton.classList.add("liked");
                    }
                    likeButton.innerHTML =
                        '<i class="bi bi-heart" id="likes"></i> Like';
                    const likeCount = document.createElement("span");
                    likeCount.textContent = post.likes.length;

                    // Toggle like status
                    likeButton.addEventListener("click", () => {
                        const isLiked = post.likes.includes(loginData.username);

                        if (isLiked) {
                            fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/likes/${post._id}`, {
                                method: "DELETE",
                                headers: {
                                    accept: "application/json",
                                    Authorization: `Bearer ${loginData.token}`,
                                },
                            })
                            .then((response) => response.json())
                            .then(() => {
                                post.likes = post.likes.filter(username => username !== loginData.username);
                                likeCount.textContent = post.likes.length;
                                likeButton.classList.remove("liked");
                                console.log("Removed like:", post._id);
                            })
                            .catch((error) => console.error("Error removing like:", error));
                        } else {
                            fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/likes", {
                                method: "POST",
                                headers: {
                                    "accept": "application/json",
                                    "Authorization": `Bearer ${loginData.token}`,
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ postId: post._id }),
                            })
                            .then((response) => response.json())
                            .then(() => {
                                post.likes.push(loginData.username);
                                likeCount.textContent = post.likes.length;
                                likeButton.classList.add("liked");
                                console.log("Added like:", post._id);
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
                    postsContainer.appendChild(postElement);
                })
                .catch((error) => console.error("Error fetching user info:", error));
            });
        })
        .catch((error) => console.error("Error fetching posts:", error));
    };

    // Fetch and display posts on page load
    fetchPosts();

    // Handle new post submission
    document.getElementById("postButton").addEventListener("click", () => {
        const postText = document.getElementById("newPostText").value;
        if (postText.trim()) {
            fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "Authorization": `Bearer ${loginData.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: postText }),
            })
            .then((response) => response.json())
            .then((data) => {
                document.getElementById("newPostText").value = ""; // Clear the input field
                fetchPosts(); // Refresh the list of posts
            })
            .catch((error) => console.error("Error posting new content:", error));
        }
    });
});