document.addEventListener('DOMContentLoaded', function() {
  let isSignedIn = sessionStorage.getItem('sign');

  if (isSignedIn === 'true') {
    console.log('Пользователь авторизован');
    document.getElementById('sign').style.display = 'none';
    document.getElementById('reg').style.display = 'none';
    document.getElementById('logout').style.display = 'block';

    document.getElementById('logout').addEventListener('click', function() {
      isSignedIn = false;
      document.getElementById('sign').style.display = 'block';
      document.getElementById('reg').style.display = 'block';
      document.getElementById('logout').style.display = 'none';
      sessionStorage.removeItem('sign');
    });
  }
});

const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const slides = Array.from(slider.querySelectorAll('img'));
const slideCount = slides.length;
let slideIndex = 0;

prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

updateSlider();