import Popup  from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, formSelector, formInputSelector) {
    super(popupSelector);
    
    this._handleFormSubmit = handleFormSubmit;
    this._formInputSelector = formInputSelector;
    this._form = this._popup.querySelector(formSelector);
  }


  _getInputValues() {
    this._formInputList = Array.from(this._form.querySelectorAll(this._formInputSelector));
    return this._formInputList.map((input) => { return input.value });
  }


  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit()
    });
  }


  close() {
    super.close();
    this._form.reset();
  }
}