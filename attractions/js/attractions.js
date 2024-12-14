const url = "https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd";

const cardsContainer = document.getElementById("cardsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");
const regionFilter = document.getElementById("regionFilter"); // New filter
const ratingFilter = document.getElementById("ratingFilter"); // New filter
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");
const loader = document.getElementById("preloader_malc");

let currentPage = 1;
const itemsPerPage = 10;
let totalItems = 100; // Общее количество элементов (10 страниц × 10 карточек на странице)
let currentPageAttractions = [];

// Сохраняем текущие фильтры и поиск
let currentSearchTerm = "";
let currentCategory = "all";
let currentRegion = "all";
let currentRating = "all";
let currentSortBy = "";
let currentOrder = "";

// Fetch attractions with pagination, search, category, region, rating, and sorting
async function fetchAttractions(
  page,
  searchTerm,
  category,
  region,
  rating,
  sortBy,
  order
) {
  try {
    loader.style.display = "flex";
    const urlWithParams = new URL(url);
    urlWithParams.searchParams.append("page", page);
    urlWithParams.searchParams.append("limit", itemsPerPage);

    // Add search term
    if (searchTerm) urlWithParams.searchParams.append("search", searchTerm);

    // Add category filter
    if (category && category !== "all")
      urlWithParams.searchParams.append("category", category);

    // Add region filter
    if (region && region !== "all")
      urlWithParams.searchParams.append("region", region);

    // Add rating filter
    if (rating && rating !== "all")
      urlWithParams.searchParams.append("rating", rating);

    // Add sorting
    if (sortBy) urlWithParams.searchParams.append("sortBy", sortBy);
    if (order) urlWithParams.searchParams.append("order", order);

    const response = await fetch(urlWithParams, { method: "GET" });
    const data = await response.json();

    currentPageAttractions = data;

    // Store each attraction in sessionStorage
    currentPageAttractions.forEach((attraction) => {
      sessionStorage.setItem(attraction.id, JSON.stringify(attraction));
    });

    // Get total items count from headers
    if (response.headers.has("X-Total-Count")) {
      totalItems = parseInt(response.headers.get("X-Total-Count"), 10);
    } else {
      totalItems = 100; // Общее количество элементов (10 страниц × 10 карточек на странице)
    }

    displayAttractions(currentPageAttractions);
    addPagination();
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loader.style.display = "none";
  }
}

function displayAttractions(data) {
  cardsContainer.innerHTML = ""; // Clear the container

  // Check if no attractions were found
  if (data.length === 0) {
    const noAttractionMessage = document.createElement("p");
    noAttractionMessage.textContent = "Достопримечательность не найдена";
    noAttractionMessage.style.fontSize = "1.5rem";
    noAttractionMessage.style.textAlign = "center";
    noAttractionMessage.style.marginTop = "20px";
    cardsContainer.appendChild(noAttractionMessage);
    return;
  }

  // If attractions are found, display them
  data.forEach((attraction) => {
    const card = document.createElement("div");
    card.className = "card";
    card.id = "card";

    card.innerHTML = `
      <img src="${attraction.image}" alt="${attraction.name}" style="height: 200px; width: 320px; border-radius: 7px;">
      <h2>${attraction.name}</h2>
      <p>${attraction.description}</p>
      <p><strong>Address:</strong> ${attraction.addres}</p>
      <p><strong>Region:</strong> ${attraction.region}</p>
      <p><strong>Rating:</strong> ${attraction.rating}</p>
    `;
    card.addEventListener("click", function redirectToPage() {
      sessionStorage.setItem(attraction.id, JSON.stringify(attraction));
      window.location.href = `./info.html?id=${attraction.id}`;
    });

    cardsContainer.appendChild(card);
  });
}

function addPagination() {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages;
}

function filterAttractions() {
  currentSearchTerm = searchInput.value.toLowerCase();
  currentCategory = categoryFilter.value;
  currentRegion = regionFilter.value; // New filter
  currentRating = ratingFilter.value; // New filter
  currentSortBy = sortSelect.value.split("-")[0];
  currentOrder = sortSelect.value.split("-")[1];

  currentPage = 1;
  fetchAttractions(
    currentPage,
    currentSearchTerm,
    currentCategory,
    currentRegion,
    currentRating,
    currentSortBy,
    currentOrder
  );
}

searchInput.addEventListener("input", filterAttractions);
categoryFilter.addEventListener("change", filterAttractions);
regionFilter.addEventListener("change", filterAttractions); // New filter
ratingFilter.addEventListener("change", filterAttractions); // New filter
sortSelect.addEventListener("change", filterAttractions);

prevPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchAttractions(
      currentPage,
      currentSearchTerm,
      currentCategory,
      currentRegion,
      currentRating,
      currentSortBy,
      currentOrder
    );
  }
});

nextPageButton.addEventListener("click", () => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    fetchAttractions(
      currentPage,
      currentSearchTerm,
      currentCategory,
      currentRegion,
      currentRating,
      currentSortBy,
      currentOrder
    );
  }
});

fetchAttractions(currentPage);
