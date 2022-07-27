let editButton = document.querySelector('.profile__edit-btn');
let closeButton = document.querySelector('.popup__close-btn');
let popupElement = document.querySelector('.popup');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__input_field_name');
let jobInput = document.querySelector('.form__input_field_about-self');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about-self');

function togglePopUp() {
  popupElement.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  togglePopUp();
}

editButton.addEventListener('click', function () {
  togglePopUp();

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

closeButton.addEventListener('click', togglePopUp);

formElement.addEventListener('submit', formSubmitHandler);

