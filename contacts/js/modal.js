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
    const email = formData.email;
    if (!email.includes('@') || !email.includes('.com')) {
        alert('Email must contain "@" symbol and ".com" domain.');
        isValid = false;
    }
    const phone = formData.phone;
    if (!/^\d+$/.test(phone)) {
        alert('Phone number must contain only digits.');
        isValid = false;
    }
    if (isValid) {
        localStorage.setItem('Данные о пользователе', JSON.stringify(formData));

        document.getElementById('modal').style.display = 'none';
        localStorage.clear()
        clearFormFields();
        scrollToBottom();
    }
}
function clearFormFields() {
    const form = document.getElementById('contactForm');
    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];
        element.value = '';
    }
}
function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}
console.log(localStorage);
