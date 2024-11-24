document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const image = urlParams.get('image');
    const description = urlParams.get('description');

    const cardInfo = document.getElementById('cardInfo');
    cardInfo.innerHTML = `
        <img src="${image}" alt="${name}" style="height: 200px; width: 320px; border-radius: 7px;">
        <h2>${name}</h2>
        <p>${description}</p>
    `;
});