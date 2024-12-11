document.addEventListener("DOMContentLoaded", function () {
  const isSignedIn = sessionStorage.getItem("sign");

  if (isSignedIn === "true") {
    console.log("Пользователь авторизован");
    document.getElementById("sign").style.display = "none";
    document.getElementById("reg").style.display = "none";
  }
});

const url = "https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd";

const cardsContainer = document.getElementById("cardsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");
const loader = document.getElementById("preloader_malc");

let currentPage = 1;
const itemsPerPage = 10;
let totalAttractions = [];
let filteredAttractions = [];

async function fetchAttractions(page, searchTerm, category) {
  try {
    loader.style.display = "flex"; // Показать loader
    const urlWithParams = new URL(url);
    urlWithParams.searchParams.append("page", page);
    urlWithParams.searchParams.append("limit", itemsPerPage);
    if (searchTerm) urlWithParams.searchParams.append("search", searchTerm);
    if (category && category !== "all")
      urlWithParams.searchParams.append("category", category);

    const response = await fetch(urlWithParams, { method: "GET" });
    const data = await response.json();

    totalAttractions = data;
    filteredAttractions = data;

    totalAttractions.forEach((attraction) => {
      sessionStorage.setItem(attraction.id, JSON.stringify(attraction));
    });

    displayAttractions(filteredAttractions);
    addPagination();
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  } finally {
    loader.style.display = "none";
  }
}

function displayAttractions(data) {
  cardsContainer.innerHTML = "";
  if (data.length === 0) {
    cardsContainer.innerHTML = "По вашему запросу ничего не найдено.";
    return;
  }
  data.forEach((attraction) => {
    const card = document.createElement("div");
    card.className = "card";
    card.id = "card";

    card.innerHTML = `
      <img src="${attraction.image}" alt="${attraction.name}" style="height: 200px; width: 320px; border-radius: 7px;">
      <h2 alt ="${attraction.name}" style="padding-bottom: 5px;">${attraction.name}</h2>
      <p>${attraction.description}</p>
      <p style = "padding-top: 5px;"><strong>Адрес:</strong> ${attraction.addres}</p>
    `;
    card.addEventListener("click", function redirectToPage() {
      window.location.href = `./info.html?id=${attraction.id}`;
    });

    cardsContainer.appendChild(card);
  });
}

function addPagination() {
  const totalPages = Math.ceil(filteredAttractions.length / itemsPerPage);
  pageInfo.textContent = `Страница ${currentPage} из ${totalPages}`;

  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages;
}

function filterAttractions() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  currentPage = 1;
  fetchAttractions(currentPage, searchTerm, selectedCategory);
}

searchInput.addEventListener("input", filterAttractions);
categoryFilter.addEventListener("change", filterAttractions);

prevPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    fetchAttractions(currentPage, searchTerm, selectedCategory);
  }
});

nextPageButton.addEventListener("click", () => {
  currentPage++;
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  fetchAttractions(currentPage, searchTerm, selectedCategory);
});

fetchAttractions(currentPage);
