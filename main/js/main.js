class AuthManager {
  constructor() {
    this.isSignedIn = sessionStorage.getItem("sign") === "true";
    this.signElement = document.getElementById("sign");
    this.regElement = document.getElementById("reg");
    this.logoutElement = document.getElementById("logout");

    this.init();
  }

  init() {
    if (this.isSignedIn) {
      console.log("Пользователь авторизован");
      this.signElement.style.display = "none";
      this.regElement.style.display = "none";
      this.logoutElement.style.display = "block";

      this.logoutElement.addEventListener("click", this.logout.bind(this));
    }
  }

  logout() {
    this.isSignedIn = false;
    this.signElement.style.display = "block";
    this.regElement.style.display = "block";
    this.logoutElement.style.display = "none";
    sessionStorage.removeItem("sign");
  }
}

class Slider {
  constructor(sliderSelector, prevButtonSelector, nextButtonSelector) {
    this.slider = document.querySelector(sliderSelector);
    this.prevButton = document.querySelector(prevButtonSelector);
    this.nextButton = document.querySelector(nextButtonSelector);
    this.slides = Array.from(this.slider.querySelectorAll("img"));
    this.slideCount = this.slides.length;
    this.slideIndex = 0;

    this.init();
  }

  init() {
    this.prevButton.addEventListener(
      "click",
      this.showPreviousSlide.bind(this)
    );
    this.nextButton.addEventListener("click", this.showNextSlide.bind(this));
    this.updateSlider();
  }

  showPreviousSlide() {
    this.slideIndex = (this.slideIndex - 1 + this.slideCount) % this.slideCount;
    this.updateSlider();
  }

  showNextSlide() {
    this.slideIndex = (this.slideIndex + 1) % this.slideCount;
    this.updateSlider();
  }

  updateSlider() {
    this.slides.forEach((slide, index) => {
      slide.style.display = index === this.slideIndex ? "block" : "none";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new AuthManager();
  new Slider(".slider", ".prev-button", ".next-button");
});
