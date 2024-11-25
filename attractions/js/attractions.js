const url = 'https://672b2e13976a834dd025f082.mockapi.io/travelguide/asd';
const URLdescriptions =  'https://672b2e13976a834dd025f082.mockapi.io/travelguide/info';

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
        const response = await fetch(url, {
            method: 'GET'
        });
        const data = await response.json();
        attractions = data;
        filteredAttractions = data;

        await fetchDescriptions();

        attractions.forEach(attraction => {
            const description = attractionsDescriptions.find(desc => desc.id === attraction.id);
        });

        display();
        addPagination();
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    } finally { 
    }
}

let attractionsDescriptions = [];

async function fetchDescriptions() {
    try {
        const responseDescriptions = await fetch(URLdescriptions, {
            method: 'GET'
        });
        const dataDescriptions = await responseDescriptions.json();
        attractionsDescriptions = dataDescriptions;
    } catch (error) {
        console.error('Ошибка при получении описаний:', error);
    }
}


function displayAttractions(data) {
    document.getElementById("preloader_malc").style.display = "flex"; 
    cardsContainer.innerHTML = '';
    if (data.length === 0) {
        cardsContainer.innerHTML = '<p>По вашему запросу ничего не найдено.</p>';
        document.getElementById("preloader_malc").style.display = "none"; 
        return;
    }
    data.forEach(attraction => {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = 'card';

        card.innerHTML = `
            <img src="${attraction.image}" alt="${attraction.name}" style="height: 200px; width: 320px; border-radius: 7px;">
            <h2 alt ="${attraction.name}" style="padding-bottom: 5px;">${attraction.name}</h2>
            <p>${attraction.description}</p>
            <p style = "padding-top: 5px;"><strong>Адрес:</strong> ${attraction.addres}</p>
        `;
        card.addEventListener('click', function redirectToPage(){
            const urlParams = new URLSearchParams();
            urlParams.append('name', attraction.name);
            urlParams.append('image', attraction.image);
            urlParams.append('description2', attraction.description2);
            urlParams.append('map', attraction.map);
            
            
            window.location.href = `./info.html?${urlParams.toString()}`;
        });
        cardsContainer.appendChild(card);
        document.getElementById("preloader_malc").style.display = "none"; 
        
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

    filteredAttractions = attractions.filter(attraction => {
        const matchesSearch = attraction.name.toLowerCase().includes(searchTerm) || attraction.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || attraction.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    currentPage = 1;
    addPagination();
    display();
}

function display() {
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
        display();
        addPagination();
    }
});

nextPageButton.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredAttractions.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        display();
        addPagination();
    }
});

fetchAttractions();