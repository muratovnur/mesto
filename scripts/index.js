import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards, validationConfig } from "./data.js";


const cardElements = document.querySelector('.elements');

const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddCard = document.querySelector('.profile__add-btn');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupInspectImage = document.querySelector('.popup_type_inspect-image');

const popupImage = popupInspectImage.querySelector('.popup__image');
const popupSubtitle = popupInspectImage.querySelector('.popup__subtitle');

const formEditProfile = document.querySelector('.form_type_edit-profile');
const formAddCard = document.querySelector('.form_type_add-card');

const profileNameInput = document.querySelector('.form__input_field_profile-name');
const profileAboutSelfInput = document.querySelector('.form__input_field_profile-about-self');
const cardNameInput = document.querySelector('.form__input_field_card-name');
const cardLinkInput = document.querySelector('.form__input_field_card-link');

const profileName = document.querySelector('.profile__name');
const profileAboutSelf = document.querySelector('.profile__about-self');

const popupElements = Array.from(document.querySelectorAll('.popup'));
const buttonCloseElements = Array.from(document.querySelectorAll('.popup__close-btn'));

const formAddCardValidator = new FormValidator(validationConfig, formAddCard);
const formEditProfileValidator = new FormValidator(validationConfig, formEditProfile);


function createCard(cardName, cardLink) {
  const card = new Card(cardName, cardLink, '#card');

  return card.generateCard();
}

function loadCards() {
  initialCards.forEach((cardItem) => cardElements.append(createCard(cardItem.name, cardItem.link)));
}

function addCard(cardName, cardLink) {
  cardElements.prepend(createCard(cardName, cardLink));
}


function validateForms() {
  formAddCardValidator.enableValidation();
  formEditProfileValidator.enableValidation();
}


function addPopupEscapeListener(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', addPopupEscapeListener);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', addPopupEscapeListener);
}


function openEditProfilePopup() {  
  profileNameInput.value = profileName.textContent;
  profileAboutSelfInput.value = profileAboutSelf.textContent;
  
  formEditProfileValidator.resetFormValidation();
  
  openPopup(popupEditProfile);
}

function openAddCardPopup() {
  formAddCard.reset();
  formAddCardValidator.resetFormValidation();

  openPopup(popupAddCard);
}


function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileAboutSelf.textContent = profileAboutSelfInput.value;

  closePopup(popupEditProfile);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  
  addCard(cardNameInput.value, cardLinkInput.value);
  
  evt.target.reset();

  closePopup(popupAddCard);
}


export function inspectImage(cardName, cardImageLink) {
  openPopup(popupInspectImage);

  popupSubtitle.textContent = cardName;
  popupImage.src = cardImageLink;
  popupImage.alt = `Изображение ${cardName}`;
}


formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
formAddCard.addEventListener('submit', handleAddCardFormSubmit);

buttonEditProfile.addEventListener('click', openEditProfilePopup);
buttonAddCard.addEventListener('click', openAddCardPopup);

buttonCloseElements.forEach(function (buttonClose) {
  buttonClose.addEventListener('click', function () {
    closePopup(buttonClose.closest('.popup'));
  })
})

popupElements.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target === popup) {
      closePopup(popup);  
    }
  })
})


loadCards();
validateForms();