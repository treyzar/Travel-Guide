

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
// Валидация формы в реальном времени
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\d{10}$/; // Пример: 10 цифр
    return re.test(phone);
}

document.getElementById('contactForm').addEventListener('input', function(event) {
    const target = event.target;
    if (target.name === 'email') {
        if (!validateEmail(target.value)) {
            target.setCustomValidity('Invalid email address');
        } else {
            target.setCustomValidity('');
        }
    }
    if (target.name === 'phone') {
        if (!validatePhone(target.value)) {
            target.setCustomValidity('Invalid phone number');
        } else {
            target.setCustomValidity('');
        }
    }
});

// Подтверждение перед закрытием модального окна
let isFormChanged = false;

document.getElementById('contactForm').addEventListener('input', function() {
    isFormChanged = true;
});

document.getElementsByClassName('close')[0].addEventListener('click', function(event) {
    if (isFormChanged) {
        if (!confirm('Are you sure you want to close the modal? Changes will be lost.')) {
            event.preventDefault();
        } else {
            isFormChanged = false;
            const modal = document.getElementById('modal');
            modal.classList.remove('show');
        }
    } else {
        const modal = document.getElementById('modal');
        modal.classList.remove('show');
    }
});

// Анимация загрузки при отправке формы
function showLoading() {
    const loading = document.createElement('div');
    loading.textContent = 'Loading...';
    loading.style.color = 'black';
    loading.style.padding = '10px';
    loading.style.textAlign = 'center';
    document.getElementById('contactForm').appendChild(loading);
    return loading;
}

// Отображение сообщения об успешной отправке
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.textContent = 'Form submitted successfully!';
    successMessage.style.color = 'green';
    successMessage.style.padding = '10px';
    successMessage.style.textAlign = 'center';
    document.body.appendChild(successMessage);
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

// Поддержка клавиатуры
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && document.getElementById('modal').classList.contains('show')) {
        document.getElementById('modal').classList.remove('show');
    }
});


function clearFormFields() {
    const form = document.getElementById('contactForm');
    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];
        element.value = '';
    }
}
