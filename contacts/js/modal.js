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
    // Получаем элементы формы
    const form = document.getElementById('contactForm');
    const nameInput = form.elements.name;
    const emailInput = form.elements.email;
    const phoneInput = form.elements.phone;

    // Валидация email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        alert('введите емейл адрес');
        return;
    }

    // Валидация номера телефона (простой пример, можно использовать более сложные регулярные выражения)
    const phonePattern = /^\+?\d{10,14}$/;
    if (!phonePattern.test(phoneInput.value)) {
        alert('введите номер для валидации');
        return;
    }

    // Создаем объект с данными формы
    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value
    };

    // Сохраняем данные в localStorage
    localStorage.setItem('contactFormData', JSON.stringify(formData));

    // Очищаем форму
    form.reset();

    // Закрываем модальное окно (если оно открыто)
    const modal = document.getElementById('modal');
    modal.style.display = 'none';

    // Выводим сообщение об успешной отправке
    alert('форма успешно отправлена');
}

// Функция для закрытия модального окна
document.querySelector('.close').addEventListener('click', function() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
});