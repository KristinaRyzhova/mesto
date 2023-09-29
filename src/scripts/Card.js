export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._elementName = this._element.querySelector('.element__name');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementImage.alt = this._name;
    this._elementName.textContent = this._name;
    this._elementImage.src = this._link;
    this._setEventListeners();
    return this._element;
  };

  //функция лайка
  _handleElementLike = () => {
    this._elementLike.classList.toggle('element__like_active');
  };
  
  //удаление фото из галереи
  _handleElementDelete = () => {
    this._element.remove();
    this._element = null;
  };

  _handleFullImageOpen() {
    this._handleCardClick(this._name, this._link);
 }

  //слушатели
  _setEventListeners() {
    this._elementLike.addEventListener('click', () => { this._handleElementLike() });
    this._elementDelite.addEventListener('click', () => { this._handleElementDelete() });
    this._elementImage.addEventListener("click", () => { this._handleFullImageOpen(); });
  };
};