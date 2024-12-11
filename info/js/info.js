document.addEventListener("DOMContentLoaded", () => {
  const isSignedIn = sessionStorage.getItem("sign");
  if (isSignedIn === "true") {
    console.log("Пользователь авторизован");
    const signElement = document.getElementById("sign");
    const regElement = document.getElementById("reg");
    if (signElement) signElement.style.display = "none";
    if (regElement) regElement.style.display = "none";
  }

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const cardInfo = document.getElementById("cardInfo");
  const reviewsContainer = document.getElementById("reviews-container");
  const reviewForm = document.getElementById("review-form");
  const reviewNameInput = document.getElementById("review-name");
  const reviewTextInput = document.getElementById("review-text");

  let attraction;

  async function fetchAttractionById(attractionId) {
    try {
      const response = await fetch(
        `https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd/${attractionId}`
      );
      attraction = await response.json();
      displayAttraction(attraction);
      displayReviews();
    } catch (error) {
      console.error("Ошибка при получении данных аттракции:", error);
      cardInfo.innerHTML = "<p>Attraction not found.</p>";
    }
  }

  function displayAttraction(attractionData) {
    let galleryHTML = "";
    if (attractionData.images && attractionData.images.length > 0) {
      galleryHTML = '<div class="gallery">';
      const imagesToShow = attractionData.images.slice(0, 2);
      imagesToShow.forEach((image) => {
        galleryHTML += `<img src="${image}" alt="${attractionData.name}" class="gallery-image">`;
      });
      galleryHTML += "</div>";
    } else {
      galleryHTML = `<img src="${attractionData.image}" alt="${attractionData.name}" class="card-image">`; // If no array, use single image
    }

    cardInfo.innerHTML = `
      <div class="container">
        <div class="card">
          <h2>${attractionData.name}</h2>
          <div class="image-map-container" id="image-gallery-container">
            ${galleryHTML}
            <iframe src="${attractionData.map}" frameborder="0" class="map"></iframe>
          </div>
          <p>${attractionData.description2}</p>
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
        if (attractionData.images && attractionData.images.length > 0) {
          const clickedImage = event.target.closest(".gallery-image");
          if (clickedImage) {
            images = attractionData.images;
            currentImageIndex = Array.from(
              galleryContainer.querySelectorAll(".gallery-image")
            ).indexOf(clickedImage);

            openFullscreenGallery();
          }
        } else {
          images = [attractionData.image];
          currentImageIndex = 0;
          openFullscreenGallery();
        }
      });
    }

    function openFullscreenGallery() {
      if (fullscreenImage) {
        fullscreenImage.src = images[currentImageIndex];
        if (fullscreenGallery) {
          fullscreenGallery.classList.add("active");
          setTimeout(() => {
            fullscreenGallery.style.opacity = 1;
          }, 100);
        }
      }
    }

    function closeFullscreenGallery() {
      if (fullscreenGallery) {
        fullscreenGallery.style.opacity = 0;
        setTimeout(() => {
          fullscreenGallery.classList.remove("active");
        }, 500);
      }
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
      if (fullscreenImage) {
        fullscreenImage.style.transform = "translateX(-100%)";
        setTimeout(() => {
          if (fullscreenImage) {
            fullscreenImage.src = images[currentImageIndex];
            fullscreenImage.style.transform = "translateX(0)";
          }
        }, 100);
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

  function displayReviews() {
    reviewsContainer.innerHTML = "";
    if (Array.isArray(attraction.reviews)) {
      attraction.reviews.forEach((review, index) => {
        const reviewElement = document.createElement("div");
        reviewElement.className = "review";
        reviewElement.innerHTML = `
          <div class="review-name">${review.name}</div>
          <hr>
          <div class="review-text">${review.text}</div>
          <span class="delete-review" data-index="${index}">Удалить</span>
        `;
        reviewsContainer.appendChild(reviewElement);
      });

      const deleteReviewButtons = document.querySelectorAll(".delete-review");
      deleteReviewButtons.forEach((button) => {
        button.addEventListener("click", deleteReview);
      });
    }
  }

  // Function to delete a review
  function deleteReview(event) {
    const index = event.target.getAttribute("data-index");
    attraction.reviews.splice(index, 1);
    updateReviewsOnServer();
  }

  async function updateReviewsOnServer() {
    try {
      await fetch(
        `https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attraction),
        }
      );
      displayReviews();
    } catch (error) {
      console.error("Ошибка при обновлении отзывов:", error);
    }
  }

  if (reviewForm) {
    reviewForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = reviewNameInput.value.trim();
      const text = reviewTextInput.value.trim();

      if (name === "" || text === "") {
        alert("Пожалуйста, заполните все поля.");
        return;
      }

      const newReview = { name, text };
      if (!Array.isArray(attraction.reviews)) {
        attraction.reviews = [];
      }
      attraction.reviews.push(newReview);
      updateReviewsOnServer();

      reviewNameInput.value = "";
      reviewTextInput.value = "";
    });
  }

  if (id) {
    fetchAttractionById(id);
  } else {
    cardInfo.innerHTML = "<p>Attraction ID not provided.</p>";
  }
});
