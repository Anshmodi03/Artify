// Handle navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector("header");
  navbar.classList.toggle("scrolled", window.scrollY > 0);
});

// Unsplash API access key
const accessKey = "O9erzdDlHhVHDIZT14FA11wfDwLiK3w7V3dehLzaKbk";

// Gallery sections with respective search queries
const gallerySections = {
  nature: "Nature",
  wallpapers: "Wallpapers",
  animals: "Animals",
  spirituality: "Spirituality",
  sports: "Sports",
};

// Retrieve favorites from localStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Load images when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  Object.keys(gallerySections).forEach((section) => {
    fetchImages(section, gallerySections[section]);
  });

  // Setup mobile menu toggle
  const toggleButton = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu-items");

  toggleButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
  });
});

// Fetch images from Unsplash API and display them in the respective section
function fetchImages(sectionId, query) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=9&client_id=${accessKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const section = document.querySelector(`#${sectionId} .gallery`);
      if (!section) {
        console.error(`Section not found: ${sectionId}`);
        return;
      }

      data.results.forEach((image) => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("img-container");

        const img = document.createElement("img");
        img.src = image.urls.small;
        img.alt = image.alt_description || "Image";
        img.addEventListener("click", () => {
          displayImageDetails(image);
        });

        // Create heart icon for favorites
        const heartIcon = document.createElement("i");
        heartIcon.classList.add("fas", "fa-heart");
        heartIcon.style.cursor = "pointer";
        heartIcon.style.position = "absolute";
        heartIcon.style.top = "10px";
        heartIcon.style.right = "10px";

        // Check if this image is already in favorites
        if (favorites.some((fav) => fav.id === image.id)) {
          heartIcon.classList.add("favorite");
        }

        // Toggle favorite on click
        heartIcon.addEventListener("click", (e) => {
          e.stopPropagation();
          toggleFavorite(image, heartIcon);
        });

        imgContainer.style.position = "relative";
        imgContainer.appendChild(img);
        imgContainer.appendChild(heartIcon);
        section.appendChild(imgContainer);
      });
    })
    .catch((error) => {
      console.error("Error fetching images: ", error);
    });
}

// Display image details directly on the page
function displayImageDetails(image) {
  const detailsContainer = document.querySelector(".image-details-container");
  detailsContainer.innerHTML = ""; // Clear existing content

  const img = document.createElement("img");
  img.src = image.urls.regular;
  img.alt = image.alt_description || "Image";

  const description = document.createElement("p");
  description.textContent = image.alt_description || "No description available";

  const downloadButton = document.createElement("a");
  downloadButton.href = image.links.download;
  downloadButton.textContent = "Download Image";
  downloadButton.classList.add("download-btn");
  downloadButton.setAttribute("download", "");

  detailsContainer.appendChild(img);
  detailsContainer.appendChild(description);
  detailsContainer.appendChild(downloadButton);
}

// Toggle favorite functionality
function toggleFavorite(image, heartIcon) {
  const isFavorited = favorites.some((fav) => fav.id === image.id);

  if (isFavorited) {
    favorites = favorites.filter((fav) => fav.id !== image.id);
    heartIcon.classList.remove("favorite");
  } else {
    favorites.push(image);
    heartIcon.classList.add("favorite");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}
