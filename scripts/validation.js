function showError(inputElement, errorElement) {
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = inputElement.validationMessage;
}




function hideError(inputElement, errorElement) {
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = inputElement.validationMessage;
}

function checkInputValidity(inputElement, formElement) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  console.log(errorElement);
  if(!isInputValid) {
    showError(inputElement, errorElement);
  } else {
    hideError(inputElement, errorElement);
  }
}

function disabledButton(buttonElement) {
  buttonElement.disabled = 'disabled';
  buttonElement.classList.add('popup__button_disabled');
}

function enabledButton(buttonElement) {
  buttonElement.disabled = false;
  buttonElement.classList.remove('popup__button_disabled');
}

function toggleButtonState(buttonElement, isActive) {
  if(!isActive) {
    disabledButton(buttonElement);
  } else {
    enabledButton(buttonElement);
  }
}

function setEventLitener(formElement) {
  const inputSelector = formElement.querySelectorAll('.popup__input');
  const submitButtonSelector = formElement.querySelector('.popup__button');
  toggleButtonState(submitButtonSelector, formElement.checkValidity());
  [...inputSelector].forEach(function(inputElement) {
    inputElement.addEventListener('input', function() {
      toggleButtonState(submitButtonSelector, formElement.checkValidity());
      checkInputValidity(inputElement, formElement);
    })
  });
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!formElement.checkValidity()) return;
    console.log("Форма отравлена.");
  });
}

function enableValidation() {
  const formSelector = document.querySelectorAll('.popup__form');
  [...formSelector].forEach(function(formElement) {
    setEventLitener(formElement);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});