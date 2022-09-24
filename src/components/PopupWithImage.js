import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector, popupImageSelector, popupSubtitleSelector) {
    super(popupSelector);

    this._popupImage = this._popup.querySelector(popupImageSelector);
    this._popupSubtitle = this._popup.querySelector(popupSubtitleSelector);
  }

  
  open(cardName, cardImageLink) {
    this._popupSubtitle.textContent = cardName;
    this._popupImage.src = cardImageLink;
    this._popupImage.alt = `Изображение ${cardName}`;

    super.open();
  }
}