function showError(inputElement, errorElement) {
  inputElement.classList.add('popup__input_error-field');
  errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement) {
  inputElement.classList.remove('popup__input_error-field');
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
  buttonElement.classList.add('popup__submit_invalid');
}

function enabledButton(buttonElement) {
  buttonElement.disabled = false;
  buttonElement.classList.remove('popup__submit_invalid');
}

function toggleButtonState(buttonElement, isActive) {
  if(!isActive) {
    disabledButton(buttonElement);
  } else {
    enabledButton(buttonElement);
  }
}

function setEventLitener(formElement) {
  const inputList = formElement.querySelectorAll('.popup__input');
  const submitButtonElement = formElement.querySelector('.popup__submit');
  toggleButtonState(submitButtonElement, formElement.checkValidity());
  [...inputList].forEach(function(inputElement) {
    inputElement.addEventListener('input', function() {
      toggleButtonState(submitButtonElement, formElement.checkValidity());
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
  const formList = document.querySelectorAll('.popup__form');
  [...formList].forEach(function(formElement) {
    setEventLitener(formElement);
  });
}

enableValidation();