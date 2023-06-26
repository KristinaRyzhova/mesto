const initialCards = [
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

const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupEditOpen = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__subtitle');
let userNameInput = document.querySelector('.popup__input_type_name');
let userStatusInput = document.querySelector('.popup__input_type_status');
const formElement = document.querySelector('.popup__form');
const popupEditClose = document.querySelector('.popup__close-button');

//открываем попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//закрываем попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//вводим в инпуты начальную информацию
function setPopupInputValue() {
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
  setPopupInputValue();
});

//закрываем форму
popupEditClose.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  setNodeEditProfileTextValue();
  closePopup(popupEditProfile);
};

formElement.addEventListener('submit', handleFormSubmit);

//форма добавления нового места
const popupAddNewPlace = document.querySelector('#popup-add-place');
const addNewPlaceButton = document.querySelector('.profile__add-button')
const addName = document.querySelector('.place__name');
const placeDescription = document.querySelector('.place__description');
let addNameInput = document.querySelector('.popup__input_type__add-place');
let placeDescriptionInput = document.querySelector('.popup__input_type_place-description');
const closeAddPlaceCard = document.querySelector('.popup__close-add-place');

addNewPlaceButton.addEventListener('click', function() {
  openPopup(popupAddNewPlace);
});

closeAddPlaceCard.addEventListener('click', function() {
  closePopup(popupAddNewPlace);
});

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  closePopup(popupAddNewPlace);
};

formElement.addEventListener('submit', handleAddFormSubmit);

//использование template

const element = document.querySelector('.element');
const elementsList = document.querySelector('.elements__list');
const templateElement = document.querySelector('#element-place-cards').content.querySelector('.element');

const popupFullImages = document.querySelector('#popup-open-full-image');
const fullImageClose = document.querySelector('popup__close-full-image');
const fullImageText = document.querySelector('popup__full-image-name');
const fullImage = document.querySelector('popup__full-image');

function createPlaceCards(name, link) {
  const placeCard = templateElement.cloneNode(true);  
  const elementImage = placeCard.querySelector('.element__image');
  const elementDescription = placeCard.querySelector('.element__description');
  const elementLike = placeCard.querySelector('.element__like');
  const elementDelite = placeCard.querySelector('.element__delite');
 
  elementImage.src = link;
  elementImage.alt = name;
  elementDescription.textContent = name;

  elementLike.addEventListener('click', function() {
    elementLike.classList.toggle('element__like_active');
  })
  elementDelite.addEventListener('click', function() {
    placeCard.remove();
  })

  //открытие попапа с большой фотографией
  elementImage.addEventListener('click', function () {
    openPopup(popupFullImages);
    fullImage.src = elementImage.src
    fullImage.alt = elementDescription.textContent
    fullImageText.textContent = elementDescription.textContent
  });
  //



  return placeCard;
}

//подгружаем массив
initialCards.forEach(function(item) {
  const newElement = createPlaceCards(item.name, item.link);
  elementsList.append(newElement);
});