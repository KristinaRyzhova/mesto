import Popup from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, callbackSubmitForm = null) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._popupForm = this._popup.querySelector(".popup__form");
  };

  setDeleteSubmit(callback) {
    this._callbackSubmitForm = callback;
  };

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm();
    });
  };
};