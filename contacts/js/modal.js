document.addEventListener('DOMContentLoaded', function() {
    const isSignedIn = sessionStorage.getItem('sign');
  
    if (isSignedIn === 'true') {
        console.log('Пользователь авторизован');
        document.getElementById('sign').style.display = 'none';
        document.getElementById('reg').style.display = 'none';}})

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
    const nameInput = form.elements.name;
    const emailInput = form.elements.email;
    const phoneInput = form.elements.phone;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        alert('введите емейл адрес который включает в себя символ @ с окончанием .com/.ru');
        return;
    }

    const phonePattern = /^\+?\d{10,14}$/;
    if (!phonePattern.test(phoneInput.value)) {
        alert('введите номер для валидации без лишних знаков от 10 до 14 цифр');
        return;
    }


    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value
    };

    localStorage.setItem('contactFormData', JSON.stringify(formData));

    form.reset();


    const modal = document.getElementById('modal');
    modal.style.display = 'none';


    alert('форма успешно отправлена');
}


document.querySelector('.close').addEventListener('click', function() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
});