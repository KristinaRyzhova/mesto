import Popup from "../scripts/Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input')); //собирает данные всех полей формы
  };

  _getInputValues() {
    this._inpValue = {}; //создаем пустой объект
    this._inputs.forEach((input) => {  //Добавляем в пустой объект все значения name из инпутов
      this._inputValues[input.name] = input.value;
    });
    return this._inpValue;
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
    });
  };

  close() {
    super.close();
    this._popupForm.reset();
  };
};