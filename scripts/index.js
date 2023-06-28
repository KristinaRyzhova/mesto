const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupEditOpen = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__subtitle');

const userNameInput = popupEditProfile.querySelector('.popup__input_type_name');
const userStatusInput = popupEditProfile.querySelector('.popup__input_type_status');
const formElement = popupEditProfile.querySelector('.popup__form');
const popupEditClose = popupEditProfile.querySelector('.popup__close-button');

//открываем попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//закрываем попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

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

addNewPlaceButton.addEventListener('click', function() {
  openPopup(popupAddNewPlace);
});

closeAddPlaceCard.addEventListener('click', function() {
  closePopup(popupAddNewPlace);
});

//использование template
const element = document.querySelector('.element');
const elementsList = document.querySelector('.elements__list');
const templateElement = document.querySelector('#element-place-cards').content.querySelector('.element');

const popupFullImages = document.querySelector('#popup-open-full-image');
const fullImageClose = popupFullImages.querySelector('.popup__close-button');
const fullImageText = popupFullImages.querySelector('.popup__full-image-name');
const fullImage = popupFullImages.querySelector('.popup__full-image');

function createPlaceCards({name, link}) {
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
    fullImage.src = link;
    fullImage.alt = name;
    fullImageText.textContent = name;
  });
  
  return placeCard;
}

fullImageClose.addEventListener('click', function() {
  closePopup(popupFullImages);
});

//подгружаем массив
function renderCard(data, container) {
  container.prepend(createPlaceCards(data));
}

initialCards.forEach(function(item) {
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