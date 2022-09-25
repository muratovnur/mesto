import Popup  from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, formSelector, formInputSelector) {
    super(popupSelector);
    
    this._handleFormSubmit = handleFormSubmit;
    this._formInputSelector = formInputSelector;
    this._form = this._popup.querySelector(formSelector);
    this._formInputList = this._form.querySelectorAll(this._formInputSelector);
  }


  _getInputValues() {
    this._formValues = {};
  
    this._formInputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
  
    return this._formValues;
  }

  setInputValues(data) {
    this._formInputList.forEach(input => {
      input.value = data[input.name];
    })
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues())
    });
  }


  close() {
    super.close();
    this._form.reset();
  }
}