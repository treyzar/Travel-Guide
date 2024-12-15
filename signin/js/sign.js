class AuthManager {
  constructor() {
    this.isSignedIn = sessionStorage.getItem("sign") === "true";
    this.signElement = document.getElementById("sign");
    this.regElement = document.getElementById("reg");
    this.logoutElement = document.getElementById("logout");

    this.init();
  }

  init() {
    if (this.isSignedIn) {
      console.log("Пользователь авторизован");
      this.signElement.style.display = "none";
      this.regElement.style.display = "none";
      this.logoutElement.style.display = "flex";
    }
  }
}

class LoginForm {
  constructor(formId, usernameId, passwordId) {
    this.form = document.getElementById(formId);
    this.usernameInput = document.getElementById(usernameId);
    this.passwordInput = document.getElementById(passwordId);

    this.init();
  }

  init() {
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();

    const username = this.usernameInput.value;
    const password = this.passwordInput.value;


    fetch("https://672b2e13976a834dd025f082.mockapi.io/travelguide/info")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка сети: " + response.statusText);
        }
        return response.json();
      })
      .then((users) => {
        const user = users.find(
          (user) => user.username === username && user.password === password
        );

        if (user) {
          alert("Вход выполнен успешно!");
          sessionStorage.setItem("sign", "true");
          window.location.href = "main.html";
        } else {
          alert("Ошибка входа: Неверное имя пользователя или пароль");
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        alert("Произошла ошибка при входе: " + error.message);
      });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new AuthManager();
  new LoginForm("loginForm", "username", "password");
});
