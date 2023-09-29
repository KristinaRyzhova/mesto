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
const userNameInput = popupEditProfile.querySelector('.popup__input_type_name');
const userInfoInput = popupEditProfile.querySelector('.popup__input_type_info');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const popupAddNewPlace = document.querySelector('#popup-add-place');
const addNewPlaceButton = document.querySelector('.profile__add-button');
const formAddNewCard = popupAddNewPlace.querySelector('.popup__form');

///// информация в профиле пользователя
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__subtitle'
});

//создаем экземпляр попапа редактирования профиля
const editProfilePopup = new PopupWithForm('#popup-edit-profile', { 
  callbackSubmitForm: (data) => {
    console.log(data);
    userInfo.setUserInfo(data);
  }
});

//экземпляр класса Card
const createCard = (data) => {
  const card = new Card(data, '#element-place-cards', handleCardClick);
  const cardElement = card.createCardElement(data);
  cardList.addItem(cardElement);
}

// Создаем экземпляр класса Section и подгружаем массив с  карточками
const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      createCard(data);
    }
  }, '.elements__list'
);
cardList.renderer();

//создаем экземпляр попапа добавления нового места
const popupAddNewCardPlace = new PopupWithForm('#popup-add-place', { 
  callbackSubmitForm: (data) => {
    console.log(data);
    const dataCard = {
      name: data.placename,
      link: data.placelink,
    };
    createCard(dataCard);
  }
});

//экземпляр класса попапа большого фото
const popupWithImage = new PopupWithImage('#popup-open-full-image');

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
};

//открываем форму редактирования профиля и вводим в инпуты начальную информацию
const handleEditProfileForm = () => {
  editProfilePopup.open();
  formValidatorEditProfile.resetValidation();
  const infoInput = userInfo.getUserInfo();
  userNameInput.value = infoInput.name;
  userInfoInput.value = infoInput.info;
};

//открываем форму добавления карточки
const handleAddNewCardForm = () => {
  popupAddNewCardPlace.open();
  formValidatorAddCard.resetValidation();
};

//кнопки открытия попапов
popupEditOpen.addEventListener('click', handleEditProfileForm);
addNewPlaceButton.addEventListener('click', handleAddNewCardForm);

//слушатели
popupWithImage.setEventListeners();
editProfilePopup.setEventListeners();
popupAddNewCardPlace.setEventListeners();

//валидация форм
const formValidatorEditProfile = new FormValidator(config, formEditProfile);
formValidatorEditProfile.enableValidation();
const formValidatorAddCard = new FormValidator(config, formAddNewCard);
formValidatorAddCard.enableValidation();