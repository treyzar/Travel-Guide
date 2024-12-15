class AppManager {
    constructor() {
        this.modal = document.getElementById('modal');
        this.openModalButton = document.getElementById('openModal');
        this.closeModalButton = document.getElementsByClassName('close')[0];
        this.contactForm = document.getElementById('contactForm');
        this.signElement = document.getElementById('sign');
        this.regElement = document.getElementById('reg');

        this.init();
    }

    init() {
        this.checkAuthorization();

        this.openModalButton.addEventListener('click', this.openModal.bind(this));
        this.closeModalButton.addEventListener('click', this.closeModal.bind(this));
        window.addEventListener('click', this.handleOutsideClick.bind(this));
        window.addEventListener('keydown', this.handleEscapeKey.bind(this));

        this.contactForm.addEventListener('submit', this.submitForm.bind(this));
    }

    checkAuthorization() {
        const isSignedIn = sessionStorage.getItem('sign');
        if (isSignedIn === 'true') {
            console.log('Пользователь авторизован');
            this.signElement.style.display = 'none';
            this.regElement.style.display = 'none';
        }
    }

    openModal() {
        this.modal.style.display = 'block';
    }

    closeModal() {
        this.modal.style.display = 'none';
    }

    handleOutsideClick(event) {
        if (event.target === this.modal) {
            this.closeModal();
        }
    }

    handleEscapeKey(event) {
        if (event.key === 'Escape') {
            this.closeModal();
        }
    }

    submitForm(event) {
        event.preventDefault();

        const nameInput = this.contactForm.elements.name;
        const emailInput = this.contactForm.elements.email;
        const phoneInput = this.contactForm.elements.phone;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            alert('Введите email адрес, который включает символ @ с окончанием .com/.ru');
            return;
        }

        const phonePattern = /^\+?\d{10,14}$/;
        if (!phonePattern.test(phoneInput.value)) {
            alert('Введите номер телефона для валидации без лишних знаков (от 10 до 14 цифр)');
            return;
        }

        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value
        };

        localStorage.setItem('contactFormData', JSON.stringify(formData));

        this.contactForm.reset();

        this.closeModal();

        alert('Форма успешно отправлена');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AppManager();
});