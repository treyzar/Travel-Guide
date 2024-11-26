document.addEventListener('DOMContentLoaded', function() {
    const isSignedIn = sessionStorage.getItem('sign');
  
    if (isSignedIn === 'true') {
        console.log('Пользователь авторизован');
        document.getElementById('sign').style.display = 'none';
        document.getElementById('reg').style.display = 'none';}})

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Отправляемые данные:', { username, password });

    fetch('https://672b2e13976a834dd025f082.mockapi.io/travelguide/info')
    .then(response => {
        console.log('Статус ответа:', response.status);
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.statusText);
        }
        return response.json();
    })
    .then(users => {
        console.log('Полученные данные:', users);
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            alert('Вход выполнен успешно!');
            
            sessionStorage.setItem('sign', 'true');

            window.location.href = 'main.html';
        } else {
            alert('Ошибка входа: Неверное имя пользователя или пароль');
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при входе: ' + error.message);
    });
});