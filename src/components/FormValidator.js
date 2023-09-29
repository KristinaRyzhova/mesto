export class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  //показать ошибку
  _showError(inputElement, errorElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  };

  //скрыть ошибку
  _hideError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  };

  //проверка валидности инпутов
  _checkInputValidity(inputElement) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    if (!isInputValid) {
      this._showError(inputElement, errorElement);
    } else {
      this._hideError(inputElement, errorElement);
    }
  };

  //неактивная кнопка
  disabledButton() {
    this._buttonElement.disabled = 'disabled';
    this._buttonElement.classList.add(this._inactiveButtonClass);
  };

  //активная кнопка
  _enabledButton() {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  };

  //переключение свойств сабмита
  _toggleButtonState(isActive) {
    if (!isActive) {
      this.disabledButton();
    } else {
      this._enabledButton();
    }
  };

  //листнер элементов формы
  _setEventListener() {
    this._inputList = this._formElement.querySelectorAll(this._inputSelector);
    this._toggleButtonState(this._formElement.checkValidity());

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState(this._formElement.checkValidity());
        this._checkInputValidity(inputElement);
      })
    });
  };

  resetValidation() {
    this.disabledButton();
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
      this._hideError(inputElement, errorElement);
    });
  };

  //функция валидации
  enableValidation() {
    this._setEventListener();
  };
};