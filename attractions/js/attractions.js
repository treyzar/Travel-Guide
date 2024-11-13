const url = 'https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd';

const cardsContainer = document.getElementById('cardsContainer');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

let currentPage = 1;
const itemsPerPage = 3;
let attractions = []; 
let filteredAttractions = [];


async function fetchAttractions() {
    try {
        document.getElementById("preloader_malc").style.display = "flex"; 
        const response = await fetch(url, {
            method: 'GET'
        });
        const data = await response.json();
        attractions = data;
        filteredAttractions = data;
        displayPage();
        updatePagination();
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    } finally {
        document.getElementById("preloader_malc").style.display = "none"; 
    }
}

function displayAttractions(data) {
    cardsContainer.innerHTML = '';
    data.forEach(attraction => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${attraction.image}" alt="${attraction.name}" style="height: 200px; width: 320px; border-radius: 7px;">
            <h2 alt ="${attraction.name}" style="padding-bottom: 5px;">${attraction.name}</h2>
            <p>${attraction.description}</p>
            <p><strong>Адрес:</strong> ${attraction.addres}</p>
        `;
        cardsContainer.appendChild(card);
    });
}

function updatePagination() {
    const totalPages = Math.ceil(filteredAttractions.length / itemsPerPage);
    pageInfo.textContent = `Страница ${currentPage} из ${totalPages}`;

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;
}

function filterAttractions() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    filteredAttractions = attractions.filter(attraction => {
        const matchesSearch = attraction.name.toLowerCase().includes(searchTerm) || attraction.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || attraction.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    currentPage = 1;
    updatePagination();
    displayPage();
}

function displayPage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageAttractions = filteredAttractions.slice(startIndex, endIndex);
    displayAttractions(pageAttractions);
}

searchInput.addEventListener('input', filterAttractions);
categoryFilter.addEventListener('change', filterAttractions);

prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayPage();
        updatePagination();
    }
});

nextPageButton.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredAttractions.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayPage();
        updatePagination();
    }
});

// Инициализация
fetchAttractions();