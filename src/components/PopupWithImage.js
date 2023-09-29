import Popup from "../components/Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__full-image");
    this._popupImageName = this._popup.querySelector(".popup__full-image-name");
  };

  open(name, link) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageName.textContent = name;
    };
};