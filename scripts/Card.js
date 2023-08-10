import { popupFullImages, fullImageText, fullImage, openPopup } from '../scripts/index.js'

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  };

  _getTemplate = () => { //находим темплейт
    const cardTemplateElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardTemplateElement;
  };

  createCardElement = () => {  //создаем образец карточки
    this._element = this._getTemplate();
    this._elementLike = this._element.querySelector('.element__like');
    this._elementDelite = this._element.querySelector('.element__delite');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementDescription = this._element.querySelector('.element__description');
    this._setEventListeners();
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementDescription.textContent = this._name;

    return this._element;
  };

  _handleElementLike = () => { //функция лайка
    this._elementLike.classList.toggle('element__like_active');
  };

  _handleElementDelete = () => { //удаление фото из галереи
    this._element.remove();
    this._element = null;
  };

  //открытие попапа с большой фотографией
  _handleOpenFullImage = () => {
    openPopup(popupFullImages);
    fullImage.src = this._link;
    fullImage.alt = this._name;
    fullImageText.textContent = this._name;
  };

  _setEventListeners = () => {
    this._elementLike.addEventListener('click', () => { this._handleElementLike() });
    this._elementDelite.addEventListener('click', () => { this._handleElementDelete() });
    this._elementImage.addEventListener('click', () => { this._handleOpenFullImage() });
  };
};