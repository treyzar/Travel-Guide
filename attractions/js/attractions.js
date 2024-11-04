const attractions = [
    { name: "Храм Святителя Николая Чудотворца", description: "Старинный православный храм.", image: './attractions/img/1cards.webp', addres: 'asdfjlsdjf', category: "temples" },
    { name: "Свято-Троицкий монастырь", description: "Мужской монастырь Чебоксарской епархии Русской православной церкви.", image: './attractions/img/card2.jpg', category: "museums" },
    { name: "Парк Победы", description: "Мемориальный парк, посвященный победе в Великой Отечественной войне.", image: './attractions/img/card3.jpeg', category: "parks" },
    { name: "Чебоксарский зоопарк", description: "Один из старейших зоопарков России.", image: './attractions/img/card4.jpg', category: "zoos" },
    { name: "Чувашский национальный музей", description: "Музей, рассказывающий об истории и культуре Чувашии.", image: './attractions/img/card5.webp', category: "museums" },
    { name: "Парк 500-летия", description: "Один из самых больших парков города.", image: './attractions/img/card6.jpg', category: "parks" },
    { name: "Сергиевский собор", description: "Православный собор, построенный в 20 веке.", image: './attractions/img/card7.jpg', category: "temples" },
    { name: "Чувашский драмтеатр", description: "Театр, основанный в 1938 году.", image: './attractions/img/card8.jpg', category: "theaters" },
    { name: "Парк им. Ленина", description: "Один из первых парков города.", image: './attractions/img/card9.jpg', category: "parks" },
    { name: "Храм Святой Троицы", description: "Православный храм, построенный в 19 веке.", image: './attractions/img/card10.webp', category: "temples" }
];

const cardsContainer = document.getElementById('cardsContainer');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

let currentPage = 1;
const itemsPerPage = 3;
let filteredAttractions = attractions;

function displayAttractions(attractions) {
    cardsContainer.innerHTML = '';
    attractions.forEach(attraction => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${attraction.image}" alt="${attraction.name}" style="height: 200px; width: 320px; border-radius: 7px;">
            <h2 alt ="${attraction.name}" style="padding-bottom: 5px;">${attraction.name}</h2>
            <p>${attraction.description}</p>
            <p><strong>Адрес:</strong> ${attraction.address}</p>
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
filterAttractions();
