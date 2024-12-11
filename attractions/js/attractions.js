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
const sortSelect = document.getElementById("sortSelect");
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");
const loader = document.getElementById("preloader_malc");

let currentPage = 1;
const itemsPerPage = 10;
let totalItems = 0;
let filteredAttractions = [];

let searchTimeout;

async function fetchAttractions(page, searchTerm, category, sortBy, order) {
  try {
    loader.style.display = "flex";
    const urlWithParams = new URL(url);
    urlWithParams.searchParams.append("page", page);
    urlWithParams.searchParams.append("limit", itemsPerPage);

    // Добавляем параметры фильтрации
    if (searchTerm) urlWithParams.searchParams.append("search", searchTerm);
    if (category && category !== "all")
      urlWithParams.searchParams.append("category", category);
    if (sortBy) urlWithParams.searchParams.append("sortBy", sortBy);
    if (order) urlWithParams.searchParams.append("order", order);

    const response = await fetch(urlWithParams, { method: "GET" });
    const data = await response.json();

    // Обновляем данные для текущей страницы
    filteredAttractions = data;

    // Обновляем общее количество элементов (используем заголовок X-Total-Count)
    if (response.headers.has("X-Total-Count")) {
      totalItems = parseInt(response.headers.get("X-Total-Count"), 10);
    } else {
      totalItems = itemsPerPage * 10; // Предположим, что максимум 10 страниц
    }

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
      <p style = "padding-top: 5px;"><strong>Лайки:</strong> ${attraction.likes}</p>
    `;
    card.addEventListener("click", function redirectToPage() {
      window.location.href = `./info.html?id=${attraction.id}`;
    });

    cardsContainer.appendChild(card);
  });
}

function addPagination() {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  pageInfo.textContent = `Страница ${currentPage} из ${totalPages}`;

  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled =
    currentPage === totalPages || filteredAttractions.length === 0;
}

function filterAttractions() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  const sortBy = sortSelect.value.split("-")[0];
  const order = sortSelect.value.split("-")[1];

  currentPage = 1;
  fetchAttractions(currentPage, searchTerm, selectedCategory, sortBy, order);
}

searchInput.addEventListener("input", () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    filterAttractions();
  }, 500);
});

categoryFilter.addEventListener("change", filterAttractions);
sortSelect.addEventListener("change", filterAttractions);

prevPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const sortBy = sortSelect.value.split("-")[0];
    const order = sortSelect.value.split("-")[1];
    fetchAttractions(currentPage, searchTerm, selectedCategory, sortBy, order);
  }
});

nextPageButton.addEventListener("click", () => {
  if (filteredAttractions.length > 0) {
    currentPage++;
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const sortBy = sortSelect.value.split("-")[0];
    const order = sortSelect.value.split("-")[1];
    fetchAttractions(currentPage, searchTerm, selectedCategory, sortBy, order);
  }
});

fetchAttractions(currentPage);
