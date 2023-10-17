import Popup from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setEventListeners() {
    super.setEventListeners();
  };

};

/*handleConfirmDelite(handleCardDelete) {
    this._handleCardDelete = handleCardDelete;
  } 
  
  this._popup.addEventListener('submit', (evt) => {
    evt.preventDefault();
    this._handleCardDelete()
    this.open()
  }); */