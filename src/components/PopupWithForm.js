import Popup from "../components/Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { callbackSubmitForm = null }) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    this._submitButton = this._popupForm.querySelectorAll(".popup__button");
  };

  _getInputValues() {
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
      this.close();
    });
  };

  close() {
    super.close();
    this._popupForm.reset();
  };

  renderLoad(text) {
    this._submitButton.textContent = text;
  };
};