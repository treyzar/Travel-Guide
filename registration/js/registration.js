class AuthManager {
  constructor() {
    this.isSignedIn = sessionStorage.getItem("sign") === "true";
    this.signElement = document.getElementById("sign");
    this.regElement = document.getElementById("reg");

    this.init();
  }

  init() {
    if (this.isSignedIn) {
      console.log("Пользователь авторизован");
      this.signElement.style.display = "none";
      this.regElement.style.display = "none";
    }
  }
}

class RegistrationForm {
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

    if (!this.validateInput(username, password)) {
      alert(
        "Пожалуйста, убедитесь, что имя пользователя и пароль соответствуют требованиям."
      );
      return;
    }

    console.log("Отправляемые данные:", { username, password });

    this.checkUsername(username)
      .then((exists) => {
        if (exists) {
          alert("Ошибка, такое имя пользователя уже есть");
        } else {
          this.registerUser(username, password);
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        alert(
          "Произошла ошибка при проверке имени пользователя: " + error.message
        );
      });
  }

  validateInput(username, password) {
    if (username.length < 3 || username.length > 20) {
      alert("Имя пользователя должно быть от 3 до 20 символов.");
      return false;
    }
    if (password.length < 6) {
      alert("Пароль должен содержать не менее 6 символов.");
      return false;
    }
    return true;
  }

  checkUsername(username) {
    return fetch("https://672b2e13976a834dd025f082.mockapi.io/travelguide/info")
      .then((response) => response.json())
      .then((users) => users.some((user) => user.username === username));
  }

  registerUser(username, password) {
    fetch("https://672b2e13976a834dd025f082.mockapi.io/travelguide/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Полученные данные:", data);
        alert("Регистрация прошла успешно!");
        window.location.href = "./signin.html";
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        alert("Произошла ошибка при регистрации: " + error.message);
      });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new AuthManager();
  new RegistrationForm("registrationForm", "username", "password");
});
