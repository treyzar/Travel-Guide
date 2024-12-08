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

  const galleryContainer = document.getElementById("image-gallery-container");
  const fullscreenGallery = document.getElementById("fullscreen-gallery");
  const fullscreenImage = document.getElementById("fullscreen-image");
  const closeGallery = document.getElementById("close-gallery");
  const prevImage = document.getElementById("prev-image");
  const nextImage = document.getElementById("next-image");

  let currentImageIndex = 0;
  let images = [];

  if (galleryContainer) {

    galleryContainer.addEventListener("click", (event) => {
      if (attraction.images && attraction.images.length > 0) {
        const clickedImage = event.target.closest(".gallery-image");
        if (clickedImage) {
          images = attraction.images;
          currentImageIndex = Array.from(
            galleryContainer.querySelectorAll(".gallery-image")
          ).indexOf(clickedImage);

          openFullscreenGallery();
        }
      } else {
        images = [attraction.image];
        currentImageIndex = 0;
        openFullscreenGallery();
      }
    });

    function openFullscreenGallery() {
      fullscreenImage.src = images[currentImageIndex];
      fullscreenGallery.classList.add("active");

      setTimeout(() => {
        fullscreenGallery.style.opacity = 1;
      }, 100);
    }

    function closeFullscreenGallery() {
      fullscreenGallery.style.opacity = 0;

      setTimeout(() => {
        fullscreenGallery.classList.remove("active");
      }, 500);
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
      fullscreenImage.style.transform = "translateX(-100%)";

      setTimeout(() => {
  
        fullscreenImage.src = images[currentImageIndex];
        fullscreenImage.style.transform = "translateX(0)"; 
      }, 100);
    }

    if (closeGallery) {
      closeGallery.addEventListener("click", closeFullscreenGallery);
    }

    if (prevImage) {
      prevImage.addEventListener("click", showPrevImage);
    }

    if (nextImage) {
      nextImage.addEventListener("click", showNextImage);
    }
  }
});
