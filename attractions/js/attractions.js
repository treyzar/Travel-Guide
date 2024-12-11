document.addEventListener("DOMContentLoaded", function () {
  // Check for user authorization
  const isSignedIn = sessionStorage.getItem("sign");
  if (isSignedIn === "true") {
    console.log("Пользователь авторизован");
    const signElement = document.getElementById("sign");
    const regElement = document.getElementById("reg");
    if (signElement) signElement.style.display = "none";
    if (regElement) regElement.style.display = "none";
  }

  // Constants and element selections
  const url = "https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd";
  const cardsContainer = document.getElementById("cardsContainer");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortSelect = document.getElementById("sortSelect");
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");
  const pageInfo = document.getElementById("pageInfo");
  const loader = document.getElementById("preloader_malc");

  // Debugging logs to ensure elements are not null
  console.log(cardsContainer);
  console.log(searchInput);
  console.log(categoryFilter);
  console.log(sortSelect);
  console.log(prevPageButton);
  console.log(nextPageButton);
  console.log(pageInfo);
  console.log(loader);

  // Variables for pagination and filtering
  let currentPage = 1;
  const itemsPerPage = 10;
  let totalItems = 0;
  let filteredAttractions = [];
  let searchTimeout;

  // Function to fetch attractions from the server
  async function fetchAttractions(page, searchTerm, category, sortBy, order) {
    try {
      loader.style.display = "flex";
      const urlWithParams = new URL(url);
      urlWithParams.searchParams.append("page", page);
      urlWithParams.searchParams.append("limit", itemsPerPage);

      // Append filtering parameters
      if (searchTerm) urlWithParams.searchParams.append("search", searchTerm);
      if (category && category !== "all")
        urlWithParams.searchParams.append("category", category);
      if (sortBy) urlWithParams.searchParams.append("sortBy", sortBy);
      if (order) urlWithParams.searchParams.append("order", order);

      const response = await fetch(urlWithParams, { method: "GET" });
      const data = await response.json();

      filteredAttractions = data;

      if (response.headers.has("X-Total-Count")) {
        totalItems = parseInt(response.headers.get("X-Total-Count"), 10);
      } else {
        totalItems = itemsPerPage * 5;
      }

      displayAttractions(filteredAttractions);
      addPagination();
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      loader.style.display = "none";
    }
  }

  // Function to display attractions
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
        <h2 style="padding-bottom: 5px;">${attraction.name}</h2>
        <p>${attraction.description}</p>
        <p style="padding-top: 5px;"><strong>Адрес:</strong> ${attraction.addres}</p>
        <p style="padding-top: 5px;"><strong>Лайки:</strong> ${attraction.likes}</p>
      `;
      card.addEventListener("click", function () {
        window.location.href = `./info.html?id=${attraction.id}`;
      });

      cardsContainer.appendChild(card);
    });
  }

  // Function to add pagination
  function addPagination() {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    pageInfo.textContent = `Страница ${currentPage} из ${totalPages}`;

    if (prevPageButton) prevPageButton.disabled = currentPage === 1;
    if (nextPageButton)
      nextPageButton.disabled =
        currentPage === totalPages || filteredAttractions.length === 0;
  }

  // Function to filter attractions
  function filterAttractions() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
    const selectedCategory = categoryFilter ? categoryFilter.value : "";
    const sortBy = sortSelect ? sortSelect.value.split("-")[0] : "";
    const order = sortSelect ? sortSelect.value.split("-")[1] : "";

    currentPage = 1;
    fetchAttractions(currentPage, searchTerm, selectedCategory, sortBy, order);
  }

  // Event listener for search input with debounce
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        filterAttractions();
      }, 500);
    });
  }

  // Event listeners for category and sort selection changes
  if (categoryFilter)
    categoryFilter.addEventListener("change", filterAttractions);
  if (sortSelect) sortSelect.addEventListener("change", filterAttractions);

  // Event listeners for pagination buttons
  if (prevPageButton) {
    prevPageButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
        const selectedCategory = categoryFilter ? categoryFilter.value : "";
        const sortBy = sortSelect ? sortSelect.value.split("-")[0] : "";
        const order = sortSelect ? sortSelect.value.split("-")[1] : "";
        fetchAttractions(
          currentPage,
          searchTerm,
          selectedCategory,
          sortBy,
          order
        );
      }
    });
  }

  if (nextPageButton) {
    nextPageButton.addEventListener("click", () => {
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
        const selectedCategory = categoryFilter ? categoryFilter.value : "";
        const sortBy = sortSelect ? sortSelect.value.split("-")[0] : "";
        const order = sortSelect ? sortSelect.value.split("-")[1] : "";
        fetchAttractions(
          currentPage,
          searchTerm,
          selectedCategory,
          sortBy,
          order
        );
      }
    });
  }

  // Initialize data fetching
  fetchAttractions(currentPage);
});
