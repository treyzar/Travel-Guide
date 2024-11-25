document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const image = urlParams.get('image');
    const description = urlParams.get('description2');
    console.log(urlParams.get('description2'))

    const cardInfo = document.getElementById('cardInfo');
    cardInfo.innerHTML = `
        <img src="${image}" alt="${name}">
        <h2>${name}</h2>
        <p>${description}</p>
        <a href = "./attractions.html">Вернуться назад</p>
    `;
});