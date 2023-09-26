import Popup from "../scripts/Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    this._inputValue = {};
    console.log('1');
    this._inputList.forEach((input) => {
        this._inputValue[input.name] = input.value;
      });
      return this._inputValue;
    };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
      console.log('2');
      this.close();
    });
  };

  close() {
    super.close();
    this._popupForm.reset();
  };
};