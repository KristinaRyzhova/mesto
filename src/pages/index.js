import '../pages/index.css';
import { initialCards, config } from '../scripts/constants.js';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Section } from '../scripts/Section.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { UserInfo } from '../scripts/UserInfo.js'

const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupEditOpen = document.querySelector('.profile__edit-button');
//const profileName = document.querySelector('.profile__name');
//const profileStatus = document.querySelector('.profile__subtitle');
const userNameInput = popupEditProfile.querySelector('.popup__input_type_name');
const userStatusInput = popupEditProfile.querySelector('.popup__input_type_status');
const formEditProfile = popupEditProfile.querySelector('.popup__form');

const popupAddNewPlace = document.querySelector('#popup-add-place');
const addNewPlaceButton = document.querySelector('.profile__add-button');

const elementsList = document.querySelector('.elements__list');

const formAddNewCard = popupAddNewPlace.querySelector('.popup__form');
//const addNameInput = popupAddNewPlace.querySelector('.popup__input_type_add-place');
//const placeDescriptionInput = popupAddNewPlace.querySelector('.popup__input_type_place-description');

//Создаем карточку
function createCard(element) {
  const card = new Card(element, '#element-place-cards', handleCardClick);
  const cardElement = card.createCardElement();
  return cardElement;
};

//подгружаем массив
const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      cardList.addItem(cardElement);
    },
  }, 
  elementsList
);
cardList.renderer();

//экземпляр класса попапа большого фото
const popupWithImage = new PopupWithImage('#popup-open-full-image');
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
};

const formValidatorEditProfile = new FormValidator(config, formEditProfile);
formValidatorEditProfile.enableValidation();

const formValidatorAddCard = new FormValidator(config, formAddNewCard);
formValidatorAddCard.enableValidation();
///////////////////выше линии все работает!///////////

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__subtitle'
});

//создаем экземпляр попапа редактирования профиля
const editProfilePopup = new PopupWithForm('#popup-edit-profile', (data) => {
  userInfo.setUserInfo(data);  ///// ????????????
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

//открываем форму редактирования профиля и вводим в инпуты начальную информацию
const handleEditProfileForm = () => {
  editProfilePopup.open();
  const infoInput = userInfo.getUserInfo();
  userNameInput.value = infoInput.name;
  userStatusInput.value = infoInput.status;
  formValidatorEditProfile.resetValidation();
};
popupEditOpen.addEventListener('click', handleEditProfileForm);

//создаем экземпляр попапа добавления нового места //////
const popupAddNewCardPlace = new PopupWithForm('#popup-add-place', (data) => {
  cardList.addItem(createCard(data));    ///// ????????????
  popupAddNewCardPlace.close();
});
popupAddNewCardPlace.setEventListeners();

//открываем форму добавления карточки
const handleAddNewCardForm = () => {
  popupAddNewCardPlace.open();
  formValidatorAddCard.resetValidation();
};
addNewPlaceButton.addEventListener('click', handleAddNewCardForm);














/* 
//Добавляем новое фото
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const descriptionNewCard = placeDescriptionInput.value;
  const linkNewCard = addNameInput.value;
  renderCard({name:descriptionNewCard, link:linkNewCard}, elementsList);
  close(popupAddNewPlace);
};

formAddNewCard.addEventListener('submit', handleAddFormSubmit); */


/* const popupFullImages = document.querySelector('#popup-open-full-image');
const fullImageText = popupFullImages.querySelector('.popup__full-image-name');
const fullImage = popupFullImages.querySelector('.popup__full-image');
const fullImageClose = popupFullImages.querySelector('.popup__close-button');


//Создаем карточку
function createCard(element) {
  const card = new Card(element, '#element-place-cards');
  const cardElement = card.createCardElement();
  return cardElement;
};

//подгружаем массив
const renderCard = (data) => {
  elementsList.prepend(createCard(data));
};

initialCards.forEach((item) => {
  renderCard(item, elementsList);
}); */

/* //открываем попап
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

//закрываем попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

//закрытие клавишей esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
};

//закрытие по оверлей
const popupArr = Array.from(document.querySelectorAll('.popup'));
popupArr.forEach(function (popup) {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
}); */

/* //открытие попапа с большой фотографией
  _handleOpenFullImage = () => {
    openPopup(popupFullImages);
    fullImage.src = this._link;
    fullImage.alt = this._name;
    fullImageText.textContent = this._name;
  };

//Закрываем большое фото
fullImageClose.addEventListener('click', function() {
  close(popupFullImages);
});
*/

/* //вводим в инпуты начальную информацию
function setPopupEditProfileInputValue() {
  userNameInput.value = profileName.textContent.trim();
  userStatusInput.value = profileStatus.textContent.trim();
};

//вводим в инпуты новую информацию
function setNodeEditProfileTextValue() {
  profileName.textContent = userNameInput.value;
  profileStatus.textContent = userStatusInput.value;
}; 

//закрываем форму редактирования профиля
popupEditClose.addEventListener('click', function() {
  close(popupEditProfile);
});

closeAddPlaceCard.addEventListener('click', function() {
  close(popupAddNewPlace);
});*/
