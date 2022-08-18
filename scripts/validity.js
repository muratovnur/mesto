const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  buttonSubmitSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}


function enableValidation(validationConfig) {  
  const formList = Array.from(document.querySelectorAll(`${validationConfig.formSelector}`));
  
  formList.forEach(function (form) {
    setEventListeners(form, validationConfig);
  })
}


function setEventListeners(form, validationConfig) {
  const formInputList = Array.from(form.querySelectorAll(`${validationConfig.inputSelector}`));
  const buttonSubmitElement = form.querySelector(`${validationConfig.buttonSubmitSelector}`);

  buttonSubmitToggle(formInputList, buttonSubmitElement, validationConfig.inactiveButtonClass);

  formInputList.forEach(function (formInputElement) {
    formInputElement.addEventListener('input', function () {
      checkInputValidity(form, formInputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
      buttonSubmitToggle(formInputList, buttonSubmitElement, validationConfig.inactiveButtonClass);
    })
  })
}


function buttonSubmitToggle (formInputList, buttonSubmitElement, inactiveButtonClass) {
  if(hasInvalidInput(formInputList)) {
    buttonSubmitElement.classList.add(`${inactiveButtonClass}`);
    buttonSubmitElement.setAttribute('disabled', 'disabled');
  }
  else {
    buttonSubmitElement.classList.remove(`${inactiveButtonClass}`);
    buttonSubmitElement.removeAttribute('disabled', 'disabled');
  }
}

function hasInvalidInput(formInputList) {
  return formInputList.some(function (formInputElement) {
    return !formInputElement.validity.valid;
  })
}


function checkInputValidity(form, formInputElement, inputErrorClass, errorClass) {
  if (!formInputElement.validity.valid) {
    showErrorMessage(form, formInputElement, inputErrorClass, errorClass,formInputElement.validationMessage);
  } else {
    hideErrorMessage(form, formInputElement, inputErrorClass, errorClass);
  }
}

function showErrorMessage(form, formInputElement, inputErrorClass, errorClass, errorMessage) {
  const errorMessageElement = form.querySelector(`.${formInputElement.id}-error`);

  errorMessageElement.classList.add(`${errorClass}`);
  errorMessageElement.textContent = errorMessage;
  formInputElement.classList.add(`${inputErrorClass}`);
}

function hideErrorMessage(form, formInputElement, inputErrorClass, errorClass) {
  const errorMessageElement = form.querySelector(`.${formInputElement.id}-error`);

  errorMessageElement.classList.remove(`${errorClass}`);
  errorMessageElement.textContent = "";
  formInputElement.classList.remove(`${inputErrorClass}`);
}


function resetFormValidation(form, validationConfig) {
  const formInputList = Array.from(form.querySelectorAll(`${validationConfig.inputSelector}`));
  const buttonSubmitElement = form.querySelector(`${validationConfig.buttonSubmitSelector}`);

  formInputList.forEach(function (formInputElement) {
    hideErrorMessage(form, formInputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
  })
  buttonSubmitToggle(formInputList, buttonSubmitElement, validationConfig.inactiveButtonClass);
}


enableValidation(validationConfig);