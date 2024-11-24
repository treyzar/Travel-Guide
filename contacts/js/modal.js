document.getElementById('openModal').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'block';
});

document.getElementsByClassName('close')[0].addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
});

window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.getElementById('modal').style.display = 'none';
    }
});

function submitForm() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Сохранение данных в localStorage
    localStorage.setItem('contactFormData', JSON.stringify(data));

    alert('Form submitted and data saved to localStorage!');
    document.getElementById('modal').style.display = 'none';
}