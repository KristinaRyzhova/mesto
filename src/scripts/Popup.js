export class Popup {
  
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  };

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscKey);
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscKey);
  };

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    };
  };

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains('popup') 
      || evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  };
};