document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const image = urlParams.get('image');
    const description = urlParams.get('description2');
    console.log(urlParams.get('description2'))

    const cardInfo = document.getElementById('cardInfo');
    cardInfo.innerHTML = `
        <img src="${image}" alt="${name}" style="height: 300px; width: 500px; border-radius: 7px; media (max-width: 401px){.${name}{width:300px;}}">
        <h2>${name}</h2>
        <p>${description}</p>
    `;
});