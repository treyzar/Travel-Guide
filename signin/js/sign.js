document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username.trim() === '' || password.trim() === '') {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    window.location.href = './main.html'})
