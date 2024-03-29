import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit, formSelector) {
    super(popupSelector);
    
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(formSelector);
  }

  open(item) {
    super.open();
    this._item = item;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._item);
    });
  }
}