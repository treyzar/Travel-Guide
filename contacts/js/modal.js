document.getElementById('openModal').addEventListener('click', function() {
    const modal = document.getElementById('modal');
    modal.classList.add('show');
});

document.getElementsByClassName('close')[0].addEventListener('click', function() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');
});

window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('modal')) {
        document.getElementById('modal').classList.remove('show');
    }
});

function submitForm() {
    const form = document.getElementById('contactForm');
    const formData = {};

    let isValid = true;

    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];
        if (element.name && element.value) {
            formData[element.name] = element.value;
        }
    }

    // Проверка email
    const email = formData.email;
    if (!email.includes('@') || !email.includes('.com')) {
        alert('Email must contain "@" symbol and ".com" domain.');
        isValid = false;
    }

    // Проверка номера телефона
    const phone = formData.phone;
    if (!/^\d+$/.test(phone)) {
        alert('Phone number must contain only digits.');
        isValid = false;
    }

    if (isValid) {
        console.log(formData);
        document.getElementById('modal').classList.remove('show');
        clearFormFields();
    }
}

function clearFormFields() {
    const form = document.getElementById('contactForm');
    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];
        element.value = '';
    }
}