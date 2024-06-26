"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const usernameElement = document.getElementById("username");
  const bioElement = document.getElementById("bio");

  const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";
  const loginData = getLoginData();

  const fetchUserInfo = (username) => {
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
        usernameElement.textContent = userInfo.username;
        bioElement.textContent = userInfo.bio || "No bio available.";
      })
      .catch((error) => console.error("Error fetching user info:", error));
  };

  updateProfileSection();

  // Random GIF Player
  const gifElement = document.getElementById("randomGif");
  const gifSources = [
    "https://t3.ftcdn.net/jpg/07/08/45/24/360_F_708452458_SgLxoyB2qr7B0KWihnFU4isZ7rVK65sF.jpg",
    "https://t4.ftcdn.net/jpg/05/44/52/37/360_F_544523709_3DHt91LCFhfLVJCwvboKBmrS0hPFTJm2.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/026/189/534/small/stunning-mountain-and-river-background-ai-generated-photo.jpg",
    "https://i.ytimg.com/vi/S6UQ5G8K7Ys/maxresdefault.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/010/865/555/small/autumn-rural-landscape-farm-fields-and-forest-trees-with-orang-blue-sky-sunset-cartoon-banner-backdrop-farm-field-harvest-scenery-of-natural-countryside-with-sunrise-for-fall-season-background-vector.jpg",
    "https://wallpapercave.com/wp/wp7039537.jpg",
  ];

  function getRandomGif() {
    const randomIndex = Math.floor(Math.random() * gifSources.length);
    return gifSources[randomIndex];
  }

  function displayRandomGif() {
    const randomGif = getRandomGif();
    gifElement.src = randomGif;
  }

  // Initially display a random GIF
  displayRandomGif();

  setInterval(displayRandomGif, 3000);

  const photoGallery = document.getElementById("photoGallery");
  const photoUrls = [
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHZ2eXpvd21yaHI0aXhwbzhvdWpwZDZpcmF1aHIwdmdhM2VrcnkxNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fbHqxBmYngB1U9GTt9/giphy.gif",
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWxja2ZlZWk0NngwdTk3bWdxajlkNjBiM255d3Nwc3JkczZsaTA1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TdMVH60kJvTMI/giphy.gif",
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWMweXh0bm9yM3dkc2hlaG05cnh5eGNlaDEzeGRzdm1oNHN2Nno2YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13JAvS2OyKJDry/giphy.gif",
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHo0eDAzdXZxaTNxODcxaHMwa2szOHp0OWdpNzd0bmx2ZGs1ZWd2dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qLtUw3xX61PHiJKxWD/giphy.gif",
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMm9idWpleWY5ZG01NDFoenY4bmRlMzZwa3lkemhqcGdldzBwZ3d3dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6qFFgNgextP9u/giphy.gif",
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG02cGNmY3M5MHN0cm1wcWdjOGxvczhqYmFpYnJyZm9yaTgxOXc1bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nIJca2o6axtMk/giphy.gif",
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExY25naWI3NWpqejk3anlkOTI2YzV4ZGtnNWpwOHM0dXNwMjh0c2c1eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/deOKie3HCHOAo/giphy.gif",
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWg0eHN4cjlwazYwcWVnYWZoN3E4ZjhycjY3aGpxMjRpZWlsNWE3MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0K4jV7FRv4ymQO52/giphy.gif",
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2V4NWhlOWR0ZDZxZjB0OGF1c3pidjd2Nm05ZHUyMWwxaWh6ejNkYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5HSYaZTcRpYnS/giphy.gif",
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnR5MWt0Z2ttMnAwa2txd3NsMmxyMmFzcG9xOWpuNzZoemNyNXB6cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JlPFFRHrCCDlo5LjU5/giphy.gif",
  ];

  photoUrls.forEach((url, index) => {
    const colDiv = document.createElement("div");
    colDiv.className = "col-6 mb-4 d-flex justify-content-center";

    const img = document.createElement("img");
    img.src = url;
    img.className = "img-fluid";
    img.alt = `Photo ${index + 1}`;

    colDiv.appendChild(img);
    photoGallery.appendChild(colDiv);
  });

// Apply saved theme on page load
const savedTheme = localStorage.getItem("theme") || "light-mode";
document.body.classList.add(savedTheme);

const savedStyle = localStorage.getItem("backgroundStyle");
document.body.style.background = savedStyle;
});

function getLoginData() {
  const loginJSON = window.localStorage.getItem("login-data");
  return JSON.parse(loginJSON) || {};
}

function isLoggedIn() {
  const loginData = getLoginData();
  return Boolean(loginData.token);
}

function logout() {
  const loginData = getLoginData();
  const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";

  fetch(`${apiBaseURL}/auth/logout`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .finally(() => {
      window.localStorage.removeItem("login-data");
      window.location.assign("/");
    });
}
