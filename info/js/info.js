document.addEventListener("DOMContentLoaded", () => {
  const isSignedIn = sessionStorage.getItem("sign");

  if (isSignedIn === "true") {
    console.log("Пользователь авторизован");
    document.getElementById("sign").style.display = "none";
    document.getElementById("reg").style.display = "none";
  }

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const attraction = JSON.parse(sessionStorage.getItem(id));
  const cardInfo = document.getElementById("cardInfo");

  if (!attraction) {
    cardInfo.innerHTML = "<p>Attraction not found.</p>";
    return;
  }

  let galleryHTML = "";
  if (attraction.images && attraction.images.length > 0) {
    galleryHTML = '<div class="gallery">';
    attraction.images.forEach((image) => {
      galleryHTML += `<img src="${image}" alt="${attraction.name}" class="gallery-image">`;
    });
    galleryHTML += "</div>";
  } else {
    galleryHTML = `<img src="${attraction.image}" alt="${attraction.name}" class="card-image">`; // If no array, use single image
  }

  cardInfo.innerHTML = ` 
      <div class="container">
          <div class="card">
          <h2>${attraction.name}</h2>
              <div class="image-map-container" id="image-gallery-container">
                  ${galleryHTML} <iframe src="${attraction.map}" frameborder="0" class="map"></iframe>
              </div>
              <p>${attraction.description2}</p>
              <a href="./attractions.html" class="back-button">Вернуться назад</a>
          </div>
      </div>
  `;

  // Fullscreen Gallery Functionality (place this AFTER cardInfo.innerHTML is set)
  const galleryContainer = document.getElementById("image-gallery-container");
  const fullscreenGallery = document.getElementById("fullscreen-gallery");
  const fullscreenImage = document.getElementById("fullscreen-image");
  const closeGallery = document.getElementById("close-gallery");
  const prevImage = document.getElementById("prev-image");
  const nextImage = document.getElementById("next-image");

  let currentImageIndex = 0;
  let images = [];

  if (galleryContainer) {
    // Check if galleryContainer exists

    galleryContainer.addEventListener("click", (event) => {
      if (attraction.images && attraction.images.length > 0) {
        const clickedImage = event.target.closest(".gallery-image"); // Only open if a .gallery-image was clicked
        if (clickedImage) {
          images = attraction.images;
          currentImageIndex = Array.from(
            galleryContainer.querySelectorAll(".gallery-image")
          ).indexOf(clickedImage);

          openFullscreenGallery();
        }
      } else {
        images = [attraction.image]; // Single image case
        currentImageIndex = 0;
        openFullscreenGallery();
      }
    });

    function openFullscreenGallery() {
      fullscreenImage.src = images[currentImageIndex];
      fullscreenGallery.classList.add("active");

      setTimeout(() => {
        fullscreenGallery.style.opacity = 1; // Fade in the gallery
      }, 100);
    }

    function closeFullscreenGallery() {
      fullscreenGallery.style.opacity = 0; // Fade out the gallery

      setTimeout(() => {
        fullscreenGallery.classList.remove("active");
      }, 500); // Match with transition duration
    }

    function showPrevImage() {
      if (currentImageIndex > 0) {
        currentImageIndex--;
        updateFullscreenImage();
      }
    }

    function showNextImage() {
      if (currentImageIndex < images.length - 1) {
        currentImageIndex++;
        updateFullscreenImage();
      }
    }

    function updateFullscreenImage() {
      fullscreenImage.style.transform = "translateX(-100%)"; // Start off-screen to the left

      setTimeout(() => {
        // Allow the initial transition to finish before updating src
        fullscreenImage.src = images[currentImageIndex];
        fullscreenImage.style.transform = "translateX(0)"; // Move back into view with transition
      }, 100);
    }

    if (closeGallery) {
      // Check if closeGallery exists before adding listener
      closeGallery.addEventListener("click", closeFullscreenGallery);
    }

    if (prevImage) {
      // Check if prevImage exists before adding listener
      prevImage.addEventListener("click", showPrevImage);
    }

    if (nextImage) {
      // Check if nextImage exists before adding listener
      nextImage.addEventListener("click", showNextImage);
    }
  }
});
