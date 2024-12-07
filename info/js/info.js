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

  // Build image gallery HTML
  let galleryHTML = "";
  if (attraction.images && attraction.images.length > 0) {
    galleryHTML = '<div class="gallery">';
    attraction.images.forEach((image) => {
      galleryHTML += `<img src="${image}" alt="${attraction.name}" class="gallery-image">`;
    });
    galleryHTML += "</div>";
  } else {
    galleryHTML = `<img src="${attraction.image}" alt="${attraction.name}" class="card-image">`;
  }

  cardInfo.innerHTML = `
    <div class="container">
      <div class="card">
        <div class="image-map-container" id="image-gallery-container">
          ${galleryHTML}
          <iframe src="${attraction.map}" frameborder="0" class="map"></iframe>
        </div>
        <h2>${attraction.name}</h2>
        <p>${attraction.description2 || attraction.description}</p>
        <a href="./attractions.html" class="back-button">Вернуться назад</a>
      </div>
    </div>
  `;

  // Add event listener after the HTML is set
  if (attraction.images && attraction.images.length > 0) {
    const galleryContainer = document.getElementById("image-gallery-container");
    const galleryImages = galleryContainer.querySelectorAll(".gallery-image");
    let currentImageIndex = 0;

    galleryContainer.addEventListener("click", () => {
      openFullscreenGallery(attraction.images, 0);
    });

    // Fullscreen gallery functionality
    const fullscreenGallery = document.getElementById("fullscreen-gallery");
    const fullscreenImage = document.getElementById("fullscreen-image");
    const closeGallery = document.getElementById("close-gallery");
    const prevImage = document.getElementById("prev-image");
    const nextImage = document.getElementById("next-image");

    function openFullscreenGallery(imageArray, index) {
      images = imageArray;
      currentImageIndex = index;
      if (fullscreenImage) fullscreenImage.src = images[currentImageIndex];
      if (fullscreenGallery) {
        fullscreenGallery.classList.add("active");
      }
    }

    function closeFullscreenGallery() {
      if (fullscreenGallery) {
        fullscreenGallery.classList.remove("active");
      }
    }

    function showPrevImage() {
      if (currentImageIndex > 0) {
        currentImageIndex--;
        if (fullscreenImage) fullscreenImage.src = images[currentImageIndex];
      }
    }

    function showNextImage() {
      if (currentImageIndex < images.length - 1) {
        currentImageIndex++;
        if (fullscreenImage) fullscreenImage.src = images[currentImageIndex];
      }
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
