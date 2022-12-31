import _vars from "../_vars";
import { animatePreviousPass } from "./_animations";

const characters = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~",
};

class Generator {
  _randomPassword = ""; // Получившейся пароль
  _firstHistoryChild = true; // Первый ли пароль в истории?
  _pinCode = false; // Пин-код?

  constructor(options, rangeSlider, output, history, generatorWindow) {
    this.options = options; // Все хар-ки пароля
    this.slider = rangeSlider; // Длина пароля из слайдера
    this.output = output; // Окно вывода
    this.history = history; // История паролей
    this.genWindow = generatorWindow; // Окно всего генератора для прослушивания

    this.#setup(); // Первоначальная настройка
  }
  #setup() {
    if (this.genWindow.classList.contains("pin-code")) {
      this._pinCode = true;
    }
    this.output.value = "";
    this.genWindow.addEventListener("click", (event) => {
      const prevPass =
        event.target.querySelector(".password-history__pass") || "ok boomer";

      switch (event.target.id) {
        case "generateBtn":
          this.generatePassword();
          break;
        case "copyBtn":
          this.copy(this.output.value);
          break;
        case "clearBtn":
          this.#clearHistory();
          break;
        case "previousPassword":
          this.copy(prevPass.textContent);
          break;
        default:
          break;
      }
    });
  }
  #addToHistory(prevPassword) {
    // Если это первая инициализация в историю паролей
    if (this._firstHistoryChild) {
      this.history.parentElement.classList.remove(
        "password-history__wrapper--empty"
      );
      if (document.querySelector(".password-history__joke")) {
        document
          .querySelector(".password-history__joke")
          .parentElement.remove();
      }
    }
    // Добавление пароля в историю
    if (prevPassword) {
      this.history.insertAdjacentHTML(
        "afterbegin",
        `<li class="password-history__item" id="previousPassword">
            <span class="password-history__pass">${prevPassword}</span>
            <button class="password-history__btn btn-reset">
                <svg width="24" height="24">
                    <use xlink:href="./img/sprite.svg#copy"></use>
                </svg>
            </button>
        </li>`
      );
      this._firstHistoryChild = false;
    }
  }
  #clearHistory() {
    this._firstHistoryChild = true; // После очистки истории следующий пароль, будет первым
    // Список паролей пуст
    this.history.parentElement.classList.add(
      "password-history__wrapper--empty"
    );

    // Список очищаем список
    this.history.innerHTML = `
    <li class="password-history__item">
      <span class="password-history__joke"
        >It's quiet here, too quiet...</span
      >
    </li>`;
    animatePreviousPass(".password-history__joke");
  }
  generatePassword() {
    let staticPassword;
    /* Если создаем пароль, а не пин-код*/
    if (!this._pinCode) {
      staticPassword = "abcdefghijklmnopqrstuvwxyz"; // Пароль всегда состоит из этих символов

      // Проходимся по критериям пароля (должны ли быть в нем символы, цифры и т.д)
      this.options.forEach((option) => {
        if (option.checked) {
          staticPassword +=
            characters[
              option.parentElement.getAttribute("data-option").toLowerCase()
            ];
        }
      });
    } else {
      staticPassword = "0123456789";
    }
    // Создаем рандомный пароль
    for (let i = 0; i <= this.slider.value; i++) {
      this._randomPassword +=
        staticPassword[Math.floor(Math.random() * staticPassword.length)];
    }
    // Его вывод
    this.log();
  }
  copy(password) {
    // Копирование в буфер
    if (password) {
      navigator.clipboard.writeText(`Password: ${password}`);
    }
  }
  log() {
    this.output.value = ""; // Очищаем от прошлого пароля
    this.output.value = this._randomPassword; // Присваиваем новый
    this.#addToHistory(this._randomPassword); // Добавляем новый пароль в историю
    this._randomPassword = ""; // Очищаем переменную с паролем
  }
}

const generator = new Generator(
  _vars.options,
  _vars.range,
  _vars.passwordOutput,
  _vars.historyList,
  _vars.generatorWindow
);
