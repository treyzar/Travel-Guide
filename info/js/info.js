document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const image = urlParams.get('image');
    const description = urlParams.get('description2');
    const map = urlParams.get('map')

    const cardInfo = document.getElementById('cardInfo');
    cardInfo.innerHTML = `
        <img src="${image}" alt="${name}">
        <h2>${name}</h2>
        <p>${description}</p>
        <div id="map">
                <iframe src="${map}" width="250" height="250" frameborder="0"></iframe>
        </div>
        <a href = "./attractions.html">Вернуться назад</p>
    `;
});