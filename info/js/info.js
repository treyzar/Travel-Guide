document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const image = urlParams.get('image');
    const description = urlParams.get('description2');
    const map = urlParams.get('map')

    const cardInfo = document.getElementById('cardInfo');
    cardInfo.innerHTML = `
    <div class="container">
        <div class="card">
            <div class="image-map-container">
                <img src="${image}" alt="${name}" class="card-image">
                <iframe src="${map}" frameborder="0" class="map"></iframe>
            </div>
            <h2>${name}</h2>
            <p>${description}</p>
            <a href="./attractions.html" class="back-button">Вернуться назад</a>
        </div>
    </div>
    `;
});