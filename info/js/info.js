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
  const reviewsContainer = document.getElementById("reviews-container");
  const reviewForm = document.getElementById("review-form");
  const reviewNameInput = document.getElementById("review-name");
  const reviewTextInput = document.getElementById("review-text");

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

  // Загрузка отзывов
  function loadReviews() {
    fetch(`https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd/${id}`)
      .then((response) => response.json())
      .then((data) => {
        attraction.reviews = data.reviews || []; // Убедитесь, что reviews всегда массив
        displayReviews();
      })
      .catch((error) => console.error("Ошибка при загрузке отзывов:", error));
  }

  // Отображение отзывов
  function displayReviews() {
    reviewsContainer.innerHTML = "";
    if (Array.isArray(attraction.reviews)) {
      // Проверка, что reviews является массивом
      attraction.reviews.forEach((review, index) => {
        const reviewElement = document.createElement("div");
        reviewElement.className = "review";
        reviewElement.innerHTML = `
          <div class="review-name">${review.name}</div>
          <div class="review-text">${review.text}</div>
          <span class="delete-review" data-index="${index}">Удалить</span>
        `;
        reviewsContainer.appendChild(reviewElement);
      });

      // Добавление обработчиков для удаления отзывов
      const deleteReviewButtons = document.querySelectorAll(".delete-review");
      deleteReviewButtons.forEach((button) => {
        button.addEventListener("click", deleteReview);
      });
    }
  }

  // Удаление отзыва
  function deleteReview(event) {
    const index = event.target.getAttribute("data-index");
    attraction.reviews.splice(index, 1);
    updateReviewsOnServer();
  }

  // Обновление отзывов на сервере
  function updateReviewsOnServer() {
    fetch(`https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attraction),
    })
      .then((response) => response.json())
      .then(() => {
        displayReviews();
      })
      .catch((error) => console.error("Ошибка при обновлении отзывов:", error));
  }

  // Обработка отправки формы
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
      // Проверка, что reviews является массивом
      attraction.reviews = [];
    }
    attraction.reviews.push(newReview);
    updateReviewsOnServer();

    reviewNameInput.value = "";
    reviewTextInput.value = "";
  });

  // Загрузка отзывов при загрузке страницы
  loadReviews();
});
