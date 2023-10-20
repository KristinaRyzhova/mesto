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
const formEditProfile = document.forms["popupEditProfileForm"];
const addNewPlaceButton = document.querySelector('.profile__add-button');
const formAddNewCard = document.forms["popupAddForm"];
const formAvatar = document.forms["newAvatar"];
const changeAvatarButton = document.querySelector('.profile__new-avatar');
//const elementDelite = document.querySelector('.element__delite');

const api = new Api(configApi);
console.log(api);

let userId = null;

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

//экземпляр класса Card
function getCard(data) {
  const card = new Card(data, '#element-place-cards', handleCardClick, handlePopupDeliteOpen, userId, handleElementLike).createCardElement();
  return card;
};

const createCard = (data) => {
  const cardElement = getCard(data)
  cardList.addItem(cardElement);
};

//экземпляр класса Section
const cardList = new Section(
  {
    renderer: (data) => {
      createCard(data);
    }
  }, '.elements__list'
);

//подгружаем данные пользователя и карточки с сервера
Promise.all([api.getUserApi(), api.getCardsApi()])
  .then(([user, cards]) => {
    console.log(cards[2]);
    userId = user._id;
    userInfo.setUserInfo(user.name, user.about);
    userInfo.setUserAvatar(user.avatar);
    cardList.renderer(cards.reverse());
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
  userInfoInput.value = infoInput.about;
};

//создаем экземпляр попапа редактирования профиля
const editProfilePopup = new PopupWithForm('#popup-edit-profile', {
  callbackSubmitForm: (info) => {
    editProfilePopup.renderLoad(true);
    api.editUserInfo(info)
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        editProfilePopup.renderLoad(false);
      })
  }
});

//попап изменения аватарки
const editAvatarPopup = new PopupWithForm('#popup-new-avatar', {
  callbackSubmitForm: (info) => {
    editAvatarPopup.renderLoad(true);
    api.editUserAvatar(info)
      .then((data) => {
        userInfo.setUserAvatar(data.avatar);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        editAvatarPopup.renderLoad(false);
      })
  }
});

//открываем форму изменения аватарки
const handleChangeAvatar = () => {
  editAvatarPopup.open();
  formValidatorAvatar.resetValidation();
};

//создаем экземпляр попапа добавления нового места
const popupAddNewCardPlace = new PopupWithForm('#popup-add-place', {
  callbackSubmitForm: (info) => {
    popupAddNewCardPlace.renderLoad(true);
    api.addNewCardPlace(info)
      .then((data) => {
        const dataCard = {
          name: data.name,
          link: data.link,
        };
        createCard(dataCard);
        console.log(dataCard);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupAddNewCardPlace.renderLoad(false);
      })
  }
});

//открываем форму добавления карточки
const handleAddNewCardForm = () => {
  popupAddNewCardPlace.open();
  formValidatorAddCard.resetValidation();
};

//попап подтверждения удаления карточки
const popupDelitImage = new PopupWithConfirmation('#popup-delete');

function handlePopupDeliteOpen() {
  popupDelitImage.open();
};

//функция изменения состояния лайка
function handleElementLike(instance) {
  api.changeLike(instance.getId(), instance.isLiked())
    .then((res) => {
      instance.setLikesData(res);
    })
    .catch(err => console.log(err));
};

//кнопки открытия попапов
popupEditOpen.addEventListener('click', handleEditProfileForm);
changeAvatarButton.addEventListener('click', handleChangeAvatar);
addNewPlaceButton.addEventListener('click', handleAddNewCardForm);

//слушатели
popupWithImage.setEventListeners();
editProfilePopup.setEventListeners();
editAvatarPopup.setEventListeners();
popupAddNewCardPlace.setEventListeners();
popupDelitImage.setEventListeners();

//валидация форм
const formValidatorEditProfile = new FormValidator(config, formEditProfile);
formValidatorEditProfile.enableValidation();
const formValidatorAvatar = new FormValidator(config, formAvatar);
formValidatorAvatar.enableValidation();
const formValidatorAddCard = new FormValidator(config, formAddNewCard);
formValidatorAddCard.enableValidation();