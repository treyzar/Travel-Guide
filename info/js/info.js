class AttractionPageManager {
  constructor() {
    this.isSignedIn = sessionStorage.getItem("sign") === "true";
    this.urlParams = new URLSearchParams(window.location.search);
    this.id = this.urlParams.get("id");
    this.attraction = JSON.parse(sessionStorage.getItem(this.id));
    this.cardInfo = document.getElementById("cardInfo");
    this.reviewsContainer = document.getElementById("reviews-container");
    this.reviewForm = document.getElementById("review-form");
    this.reviewNameInput = document.getElementById("review-name");
    this.reviewTextInput = document.getElementById("review-text");
    this.galleryContainer = document.getElementById("image-gallery-container");
    this.fullscreenGallery = document.getElementById("fullscreen-gallery");
    this.fullscreenImage = document.getElementById("fullscreen-image");
    this.closeGallery = document.getElementById("close-gallery");
    this.prevImage = document.getElementById("prev-image");
    this.nextImage = document.getElementById("next-image");
    this.currentImageIndex = 0;
    this.images = [];

    this.init();
  }

  init() {
    if (this.isSignedIn) {
      console.log("Пользователь авторизован");
      document.getElementById("sign").style.display = "none";
      document.getElementById("reg").style.display = "none";
    }

    if (!this.attraction) {
      this.cardInfo.innerHTML = "<p>Attraction not found.</p>";
      return;
    }

    this.renderAttraction();
    this.setupGallery();
    this.loadReviews();
    this.setupReviewForm();
  }

  renderAttraction() {
    let galleryHTML = "";
    if (this.attraction.images && this.attraction.images.length > 0) {
      galleryHTML = '<div class="gallery">';
      const imagesToShow = this.attraction.images.slice(0, 2); 
      imagesToShow.forEach((image) => {
        galleryHTML += `<img src="${image}" alt="${this.attraction.name}" class="gallery-image">`;
      });
      galleryHTML += "</div>";
    } else {
      galleryHTML = `<img src="${this.attraction.image}" alt="${this.attraction.name}" class="card-image">`;
    }

    this.cardInfo.innerHTML = `
          <div class="container">
              <div class="card">
                  <h2>${this.attraction.name}</h2>
                  <div class="image-map-container" id="image-gallery-container">
                      ${galleryHTML}
                      <iframe src="${this.attraction.map}" frameborder="0" class="map"></iframe>
                  </div>
                  <p>${this.attraction.description2}</p>
                  <a href="./attractions.html" class="back-button">Вернуться назад</a>
              </div>
          </div>
      `;
  }

  setupGallery() {
    if (this.galleryContainer) {
      this.galleryContainer.addEventListener("click", (event) => {
        const clickedImage = event.target.closest(".gallery-image");
        if (clickedImage) {
          this.images = this.attraction.images;
          this.currentImageIndex = Array.from(
            this.galleryContainer.querySelectorAll(".gallery-image")
          ).indexOf(clickedImage);
          this.openFullscreenGallery();
        }
      });

      this.closeGallery.addEventListener(
        "click",
        this.closeFullscreenGallery.bind(this)
      );
      this.prevImage.addEventListener("click", this.showPrevImage.bind(this));
      this.nextImage.addEventListener("click", this.showNextImage.bind(this));
    }
  }

  openFullscreenGallery() {
    this.fullscreenImage.src = this.images[this.currentImageIndex];
    this.fullscreenGallery.classList.add("active");
    setTimeout(() => {
      this.fullscreenGallery.style.opacity = 1;
    }, 100);
  }

  closeFullscreenGallery() {
    this.fullscreenGallery.style.opacity = 0;
    setTimeout(() => {
      this.fullscreenGallery.classList.remove("active");
    }, 500);
  }

  showPrevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.updateFullscreenImage();
    }
  }

  showNextImage() {
    if (this.currentImageIndex < this.images.length - 1) {
      this.currentImageIndex++;
      this.updateFullscreenImage();
    }
  }

  updateFullscreenImage() {
    this.fullscreenImage.src = this.images[this.currentImageIndex];
  }

  loadReviews() {
    fetch(
      `https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd/${this.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.attraction.reviews = data.reviews || [];
        this.displayReviews();
      })
      .catch((error) => console.error("Ошибка при загрузке отзывов:", error));
  }

  displayReviews() {
    this.reviewsContainer.innerHTML = "";
    if (Array.isArray(this.attraction.reviews)) {
      this.attraction.reviews.forEach((review, index) => {
        const reviewElement = document.createElement("div");
        reviewElement.className = "review";
        reviewElement.innerHTML = `
                  <div class="review-name">${review.name}</div>
                  <hr>
                  <div class="review-text">${review.text}</div>
                  <span class="delete-review" data-index="${index}">Удалить</span>
              `;
        this.reviewsContainer.appendChild(reviewElement);
      });

      const deleteReviewButtons = document.querySelectorAll(".delete-review");
      deleteReviewButtons.forEach((button) => {
        button.addEventListener("click", this.deleteReview.bind(this));
      });
    }
  }

  deleteReview(event) {
    const index = event.target.getAttribute("data-index");
    this.attraction.reviews.splice(index, 1);
    this.updateReviewsOnServer();
  }

  updateReviewsOnServer() {
    fetch(
      `https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd/${this.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.attraction),
      }
    )
      .then((response) => response.json())
      .then(() => {
        this.displayReviews();
      })
      .catch((error) => console.error("Ошибка при обновлении отзывов:", error));
  }

  setupReviewForm() {
    this.reviewForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = this.reviewNameInput.value.trim();
      const text = this.reviewTextInput.value.trim();

      if (name === "" || text === "") {
        alert("Пожалуйста, заполните все поля.");
        return;
      }

      const newReview = { name, text };
      if (!Array.isArray(this.attraction.reviews)) {
        this.attraction.reviews = [];
      }
      this.attraction.reviews.push(newReview);
      this.updateReviewsOnServer();

      this.reviewNameInput.value = "";
      this.reviewTextInput.value = "";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new AttractionPageManager();
});
