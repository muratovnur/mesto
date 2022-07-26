let editButton = document.querySelector('.profile__edit-btn');
let closeButton = document.querySelector('.popup__close-btn');
let popupElement = document.querySelector('.popup');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__input_field_name');
let jobInput = document.querySelector('.form__input_field_about-self');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__about-self');

function togglePopUp() {
  popupElement.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  togglePopUp();
}

editButton.addEventListener('click', function () {
  togglePopUp();

  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
});

closeButton.addEventListener('click', togglePopUp);

formElement.addEventListener('submit', formSubmitHandler);

