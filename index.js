let editButton = document.querySelector('.profile__edit-btn');
let closeButton = document.querySelector('.form__close-btn');
let popupElement = document.querySelector('.popup');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__input_field_name');
let jobInput = document.querySelector('.form__input_field_about-self');

editButton.addEventListener('click', function () {
  popupElement.classList.add('popup_opened');

  let name = document.querySelector('.profile__name');
  let job = document.querySelector('.profile__about-self');

  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
});

closeButton.addEventListener('click', function () {
  popupElement.classList.remove('popup_opened');
});

function formSubmitHandler(evt) {
  evt.preventDefault();

  let nameFieldValue = nameInput.value;
  let jobFieldValue = jobInput.value;

  let name = document.querySelector('.profile__name');
  let job = document.querySelector('.profile__about-self');

  name.textContent = nameFieldValue;
  job.textContent = jobFieldValue;

  popupElement.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

