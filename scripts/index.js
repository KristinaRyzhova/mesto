import { initialCards } from '../scripts/constants.js';
import { Card } from '../scripts/Card.js';

const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupEditOpen = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__subtitle');
const userNameInput = popupEditProfile.querySelector('.popup__input_type_name');
const userStatusInput = popupEditProfile.querySelector('.popup__input_type_status');
const formElement = popupEditProfile.querySelector('.popup__form');
const popupEditClose = popupEditProfile.querySelector('.popup__close-button');
const submitBattonEdit = popupEditProfile.querySelector('.popup__button');
const elementsList = document.querySelector('.elements__list');

export const popupFullImages = document.querySelector('#popup-open-full-image');
export const fullImageText = popupFullImages.querySelector('.popup__full-image-name');
export const fullImage = popupFullImages.querySelector('.popup__full-image');
const fullImageClose = popupFullImages.querySelector('.popup__close-button');

//открываем попап
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

//закрываем попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

//закрытие клавишей esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

//закрытие по оверлей
const popupArr = Array.from(document.querySelectorAll('.popup'));
popupArr.forEach(function (popup) {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

//вводим в инпуты начальную информацию
function setPopupEditProfileInputValue() {
  userNameInput.value = profileName.textContent.trim();
  userStatusInput.value = profileStatus.textContent.trim();
}

//вводим в инпуты новую информацию
function setNodeEditProfileTextValue() {
  profileName.textContent = userNameInput.value;
  profileStatus.textContent = userStatusInput.value;
}

//открываем форму
popupEditOpen.addEventListener('click', function() {
  openPopup(popupEditProfile);
  setPopupEditProfileInputValue();
  disabledButton(submitBattonEdit, config);
});

//закрываем форму
popupEditClose.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  setNodeEditProfileTextValue();
  closePopup(popupEditProfile);
};

formElement.addEventListener('submit', handleEditProfileFormSubmit);

//форма добавления нового места
const popupAddNewPlace = document.querySelector('#popup-add-place');
const addNewPlaceButton = document.querySelector('.profile__add-button')
const closeAddPlaceCard = popupAddNewPlace.querySelector('.popup__close-button');
const submitBattonAdd = popupAddNewPlace.querySelector('.popup__button');

addNewPlaceButton.addEventListener('click', function() {
  openPopup(popupAddNewPlace);
  disabledButton(submitBattonAdd, config);
  formAddNewCard.reset();
  //hideError(inputElement, errorElement, config);
});

closeAddPlaceCard.addEventListener('click', function() {
  closePopup(popupAddNewPlace);
});

//Закрываем большое фото
fullImageClose.addEventListener('click', function() {
  closePopup(popupFullImages);
});

//Создаем карточку
function createCard(element) {
  const card = new Card(element, '#element-place-cards');
  const cardElement = card.createCardElement();
  return cardElement;
}

const renderCard = (data) => {
  elementsList.prepend(createCard(data));
}

//подгружаем массив
initialCards.forEach((item) => {
  renderCard(item, elementsList);
});

//Добавляем новое фото
const formAddNewCard = popupAddNewPlace.querySelector('.popup__form');
const addNameInput = popupAddNewPlace.querySelector('.popup__input_type_add-place');
const placeDescriptionInput = popupAddNewPlace.querySelector('.popup__input_type_place-description');

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const descriptionNewCard = placeDescriptionInput.value;
  const linkNewCard = addNameInput.value;
  renderCard({name:descriptionNewCard, link:linkNewCard}, elementsList);
  formAddNewCard.reset();
  closePopup(popupAddNewPlace);
}

formAddNewCard.addEventListener('submit', handleAddFormSubmit);