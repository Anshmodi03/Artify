// Handle navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector("header");
  navbar.classList.toggle("scrolled", window.scrollY > 0);
});

document.addEventListener("DOMContentLoaded", () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoritesGallery = document.querySelector("#favorites-gallery");

  if (favorites.length === 0) {
    favoritesGallery.innerHTML = "<p>No favorite images yet!</p>";
    return;
  }

  favorites.forEach((image) => {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    const img = document.createElement("img");
    img.src = image.urls.small;
    img.alt = image.alt_description || "Image";
    img.addEventListener("click", () => {
      window.open(image.links.html, "_blank");
    });

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fas", "fa-heart", "favorite");

    imgContainer.appendChild(img);
    imgContainer.appendChild(heartIcon);
    favoritesGallery.appendChild(imgContainer);
  });

  // Setup mobile menu toggle
  const toggleButton = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu-items");

  toggleButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
  });
});
