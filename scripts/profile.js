"use strict";

document.addEventListener("DOMContentLoaded", function() {
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

    const photoGallery = document.getElementById("photoGallery");
    const photoUrls = [
        "https://t3.ftcdn.net/jpg/07/08/45/24/360_F_708452458_SgLxoyB2qr7B0KWihnFU4isZ7rVK65sF.jpg",
        "https://t4.ftcdn.net/jpg/05/44/52/37/360_F_544523709_3DHt91LCFhfLVJCwvboKBmrS0hPFTJm2.jpg",
        "https://static.vecteezy.com/system/resources/thumbnails/026/189/534/small/stunning-mountain-and-river-background-ai-generated-photo.jpg",
        "https://i.ytimg.com/vi/S6UQ5G8K7Ys/maxresdefault.jpg",
        "https://static.vecteezy.com/system/resources/thumbnails/010/865/555/small/autumn-rural-landscape-farm-fields-and-forest-trees-with-orang-blue-sky-sunset-cartoon-banner-backdrop-farm-field-harvest-scenery-of-natural-countryside-with-sunrise-for-fall-season-background-vector.jpg",
        "https://wallpapercave.com/wp/wp7039537.jpg"
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
    .then(response => response.json())
    .then(data => console.log(data))
    .finally(() => {
        window.localStorage.removeItem("login-data");
        window.location.assign("/");
    });
}