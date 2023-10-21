export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const popupEditOpen = document.querySelector('.profile__edit-button');
export const userNameInput = document.querySelector('.popup__input_type_name');
export const userInfoInput = document.querySelector('.popup__input_type_info');
export const formEditProfile = document.forms["popupEditProfileForm"];
export const addNewPlaceButton = document.querySelector('.profile__add-button');
export const formAddNewCard = document.forms["popupAddForm"];
export const formAvatar = document.forms["newAvatar"];
export const changeAvatarButton = document.querySelector('.profile__new-avatar');

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const configApi = {
  urlCohort: 'https://mesto.nomoreparties.co/v1/cohort-77',
  headers: {
    "content-type": 'application/json',
    "authorization": 'd6bcfb7e-77e2-4e80-b2d2-ebeac0ceacf7'
  }
};