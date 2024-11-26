document.addEventListener('DOMContentLoaded', function() {
    const isSignedIn = sessionStorage.getItem('sign');
  
    if (isSignedIn === 'true') {
        console.log('Пользователь авторизован');
        document.getElementById('sign').style.display = 'none';
        document.getElementById('reg').style.display = 'none';}})

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!validateInput(username, password)) {
        alert('Пожалуйста, убедитесь, что имя пользователя и пароль соответствуют требованиям.');
        return;
    }

    console.log('Отправляемые данные:', { username, password });

    fetch('https://672b2e13976a834dd025f082.mockapi.io/travelguide/info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        console.log('Статус ответа:', response.status);
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Полученные данные:', data);


        alert('Регистрация прошла успешно!');
        window.location.href = './signin.html';
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при регистрации: ' + error.message);
    });
});

function validateInput(username, password) {
    if (username.length < 3 || username.length > 20) {
        alert('Имя пользователя должно быть от 3 до 20 символов.');
        return false;
    }
    if (password.length < 6) {
        alert('Пароль должен содержать не менее 6 символов.');
        return false;
    }
    return true;
}