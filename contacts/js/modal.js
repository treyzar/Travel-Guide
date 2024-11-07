// Получаем элементы модального окна и кнопки открытия
const modal = document.getElementById('modal');
const openModalButton = document.getElementById('openModal');

// Добавляем обработчик события для открытия модального окна
openModalButton.addEventListener('click', function() {
    modal.classList.add('show');
});

// Получаем кнопку закрытия модального окна
const closeModalButton = document.getElementsByClassName('close')[0];

// Добавляем обработчик события для закрытия модального окна по клику на кнопку
closeModalButton.addEventListener('click', function() {
    modal.classList.remove('show');
});

// Добавляем обработчик события для закрытия модального окна по клику вне его
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.classList.remove('show');
    }
});

// Добавляем обработчик события для закрытия модального окна по нажатию клавиши "Escape"
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
    }
});

// Функция для отправки формы
function submitForm() {
    const form = document.getElementById('contactForm');
    const formData = {};

    let isValid = true;

    // Собираем данные из формы
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

    // Если форма валидна, выводим данные в консоль, закрываем модальное окно и очищаем поля формы
    if (isValid) {
        console.log(formData);
        modal.classList.remove('show'); // Закрываем модальное окно после успешной валидации
        clearFormFields();
    }
}

// Функция для очистки полей формы
function clearFormFields() {
    const form = document.getElementById('contactForm');
    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];
        element.value = '';
    }
}