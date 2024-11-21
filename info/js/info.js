document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cardName = urlParams.get('name');

    if (cardName) {
        fetch(`https://672b2e13976a834dd025f082.mockapi.io/travelguide/info?name=${name}`)
            .then(response => response.json())
            .then(data => {
                const detailsDiv = document.getElementById('attractionInfo');
                if (data.length > 0) {
                    detailsDiv.innerHTML = `<h2>${data[0].name}</h2>
                    <p>${data[0].description}</p>
                    <p>ID: ${data[0].id}</p>`;
                } else {
                    detailsDiv.innerHTML = '<p>No data found for this card name.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                document.getElementById('attractionInfo').innerHTML = '<p>Error fetching data.</p>';
            });
    } else {
        document.getElementById('attractionInfo').innerHTML = '<p>No card name provided.</p>';
    }
});