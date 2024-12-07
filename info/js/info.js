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

  cardInfo.innerHTML = `
          <div class="container">
              <div class="card">
                  <div class="image-map-container">
                      <img src="${attraction.image}" alt="${attraction.name}" class="card-image">
                      <iframe src="${attraction.map}" frameborder="0" class="map"></iframe>
                  </div>
                  <h2>${attraction.name}</h2>
                  <p>${attraction.description2}</p>
                  <a href="./attractions.html" class="back-button">Вернуться назад</a>
              </div>
          </div>
      `;
});
