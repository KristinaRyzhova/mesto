import '../pages/index.css';
import { initialCards, config } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js'

const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupEditOpen = document.querySelector('.profile__edit-button');
const userNameInput = popupEditProfile.querySelector('.popup__input_type_name');
const userInfoInput = popupEditProfile.querySelector('.popup__input_type_info');
const formEditProfile = document.forms["popupEditProfileForm"];
const addNewPlaceButton = document.querySelector('.profile__add-button');
const formAddNewCard = document.forms["popupAddForm"];


//информация в профиле пользователя
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
function getCard(data) {
  const card = new Card(data, '#element-place-cards', handleCardClick).createCardElement();
  return card;
};

const createCard = (data) => {
  const cardElement = getCard(data)
  cardList.addItem(cardElement);
};

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