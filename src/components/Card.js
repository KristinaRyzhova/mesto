export class Card {
  constructor(data, templateSelector, handleCardClick, userId, handlePopupDeliteOpen, handleElementLike) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handlePopupDeliteOpen = handlePopupDeliteOpen;
    this._handleElementLike = handleElementLike;
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
    this._elementLikeCounter = this._element.querySelector('.element__like-counter');
    this.setLikesData(this._data);
    this._elementDelite = this._element.querySelector('.element__delite');
    this._showDelete();
    this._elementName = this._element.querySelector('.element__name');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementImage.alt = this._name;
    this._elementName.textContent = this._name;
    this._elementImage.src = this._link;
    this._setEventListeners();
    return this._element;
  };

  isLiked() {
    return this._data.likes.some((item) => {
      return item._id === this._userId;
    })
  };

  _updateLike() {
    this._elementLikeCounter.textContent = this._data.likes.length;
    
    if (this.isLiked()) {
      this._elementLike.classList.add('element__like_active')
    } else {
      this._elementLike.classList.remove('element__like_active')
    }
  };

  getId() {
    return this._data._id;
  };

  setLikesData(data) {
    this._data.likes = data.likes;
    this._updateLike();
  };
  
  //открытие большого фото
  _handleFullImageOpen() {
    this._handleCardClick(this._name, this._link);
 }

  //открытие попапа с удалением
  _handlePopupDeliteOpen() {
    this._handlePopupDeliteOpen();
  }

  _showDelete() {
    if (this._userId !== this._data.owner._id) {
       this._elementDelite.style.display = "none"
    }
  };

  remove() {
    this._element.remove();
    this._element = null;
  };

  //слушатели
  _setEventListeners() {
    this._elementLike.addEventListener('click', () => { this._handleElementLike(this) });
    this._elementImage.addEventListener("click", () => { this._handleFullImageOpen(); });
    if (this._userId === this._data.owner._id) {
      this._elementDelite.addEventListener('click', () => this._handlePopupDeliteOpen(this));
    };
  };
};