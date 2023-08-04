//показать ошибку
function showError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

//скрыть ошибку
function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

//проверка валидности инпутов
function checkInputValidity(inputElement, formElement, config) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (!isInputValid) {
    showError(inputElement, errorElement, config);
  } else {
    hideError(inputElement, errorElement, config);
  }
};

//неактивная кнопка
function disabledButton(buttonElement, config) {
  buttonElement.disabled = 'disabled';
  buttonElement.classList.add(config.inactiveButtonClass);
};

//активная кнопка
function enabledButton(buttonElement, config) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
};

//переключение свойств сабмита
function toggleButtonState(buttonElement, isActive, config) {
  if(!isActive) {
    disabledButton(buttonElement, config);
  } else {
    enabledButton(buttonElement, config);
  }
};

//листнер элементов формы
function setEventListener(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButtonSelector = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(submitButtonSelector, formElement.checkValidity(), config);
  [...inputList].forEach(function(inputElement) {
    inputElement.addEventListener('input', function() {
      toggleButtonState(submitButtonSelector, formElement.checkValidity(), config);
      checkInputValidity(inputElement, formElement, config);
    })
  });
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!formElement.checkValidity()) return;
  });
};

//функция валидации
function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);
  [...formList].forEach(function(formElement) {
    setEventListener(formElement, config);
  });
};

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(config);