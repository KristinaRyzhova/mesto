const popupEditProfile = document.querySelector('.popup');
const popupOpen = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__subtitle');
let userNameInput = document.querySelector('.popup__input_type_name');
let userStatusInput = document.querySelector('.popup__input_type_status');
const popupClose = document.querySelector('.popup__close-button');

function setPopupInputValue() {
  userNameInput.value = profileName.textContent.trim() ;
  userStatusInput.value = profileStatus.textContent.trim();
}

function openPopup() {
  popupEditProfile.classList.add('popup_opened');
  setPopupInputValue();
}

popupOpen.addEventListener('click', openPopup);

function closePopup() {
  popupEditProfile.classList.remove('popup_opened');
}

popupClose.addEventListener('click', closePopup);

function setNodeTextValue() {
  profileName.textContent = userNameInput.value;
  profileStatus.textContent = userStatusInput.value;
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  setNodeTextValue();
  closePopup();
};

formElement.addEventListener('submit', handleFormSubmit);