import '../pages/index.css';
import { config, configApi } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupEditOpen = document.querySelector('.profile__edit-button');
const userNameInput = popupEditProfile.querySelector('.popup__input_type_name');
const userInfoInput = popupEditProfile.querySelector('.popup__input_type_info');
const userAvatarInput = popupEditProfile.querySelector('.popup__input_type_linkavatar');
const formEditProfile = document.forms["popupEditProfileForm"];
const addNewPlaceButton = document.querySelector('.profile__add-button');
const formAddNewCard = document.forms["popupAddForm"];
const formAvatar = document.forms["newAvatar"];
const changeAvatarButton = document.querySelector('.profile__new-avatar');
const popupDeliteCard = document.querySelector('#popup-delete');
const elementDelite = document.querySelector('.element__delite');

const api = new Api(configApi);
console.log(api);

fetch('https://mesto.nomoreparties.co/v1/cohort-77/users/me', {
  headers: {
    authorization: 'd6bcfb7e-77e2-4e80-b2d2-ebeac0ceacf7'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); 

//информация в профиле пользователя
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar'
});

let userId = null;

api.getUserApi()
  .then((data) => {
    userId = data._id;
    userInfo.setUserInfo(data.name, data.about);
    userInfo.setUserAvatar(data.avatar);    
  })
  .catch((err) => console.log(err));

// подгружаем карточки с сервера
api.getCardsApi()
  .then((dataCards) => {
    function getCard(data) {
      const card = new Card(data, '#element-place-cards', handleCardClick).createCardElement();
      return card;
    };
    
    const createCard = (data) => {
      const cardElement = getCard(data)
      cardList.addItem(cardElement);
    };

    const cardList = new Section(
      {
        items: dataCards,
        renderer: (data) => {
          createCard(data);
        }
      }, '.elements__list'
    );
    cardList.renderer();
  })
  .catch((err) => console.log(err));

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

//создаем экземпляр попапа редактирования профиля
const editProfilePopup = new PopupWithForm('#popup-edit-profile', { 
  callbackSubmitForm: () => {
    api.editUserInfo()
      .then(() => {
        userInfo.setUserInfo();/////???????
      })
      .catch((err) => console.log(err));
    
    
    
    
    
  }
});













//создаем экземпляр попапа добавления нового места
/* const popupAddNewCardPlace = new PopupWithForm('#popup-add-place', { 
  callbackSubmitForm: (data) => {
    console.log(data);
    const dataCard = {
      name: data.placename,
      link: data.placelink,
    };
    createCard(dataCard);
  }
});

//открываем форму добавления карточки
const handleAddNewCardForm = () => {
  popupAddNewCardPlace.open();
  formValidatorAddCard.resetValidation();
}; */









//попап изменения аватарки
/* const editAvatarPopup = new PopupWithForm('#popup-new-avatar', { 
  callbackSubmitForm: (data) => {
    console.log(data);
    userInfo.setUserAvatar();

    //userAvatarInput.src = data.linkavatar;????????????????????????
    editAvatarPopup.close()    
  }
}); */

//открываем форму изменения аватарки
/* const handleChangeAvatar = () => {
  editAvatarPopup.open();
  formValidatorAvatar.resetValidation();
}; */




//попап удаления карточки
/* const popupDelitImage = new PopupWithConfirmation('#popup-delete');
const handlePopupDeliteOpen = () => {
  popupDelitImage.open();
}; */



//кнопки открытия попапов
popupEditOpen.addEventListener('click', handleEditProfileForm);
//addNewPlaceButton.addEventListener('click', handleAddNewCardForm);
//changeAvatarButton.addEventListener('click', handleChangeAvatar);
//elementDelite.addEventListener('click', handlePopupDeliteOpen);

//слушатели
popupWithImage.setEventListeners();
editProfilePopup.setEventListeners();
//popupAddNewCardPlace.setEventListeners();
//editAvatarPopup.setEventListeners();
//popupDelitImage.setEventListeners();

//валидация форм
const formValidatorEditProfile = new FormValidator(config, formEditProfile);
formValidatorEditProfile.enableValidation();
/* const formValidatorAddCard = new FormValidator(config, formAddNewCard);
formValidatorAddCard.enableValidation(); */
/* const formValidatorAvatar = new FormValidator(config, formAvatar);
formValidatorAvatar.enableValidation();
 */



















/* 
 */
//
//