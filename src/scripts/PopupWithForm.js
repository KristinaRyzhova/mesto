import Popup from "../scripts/Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { callbackSubmitForm = null }) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
  };

  _getInputValues() {    
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._inputValue = {};    
    [...this._inputList].forEach(input => {
        this._inputValue[input.name] = input.value;
      });
      return this._inputValue;
    };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
      //console.log('2');
      this.close();
    });
  };

  close() {
    super.close();
    this._popupForm.reset();
  };
};