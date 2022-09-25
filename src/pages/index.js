import './index.css';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

import { initialCards, validationConfig } from "../utils/data.js";


const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddCard = document.querySelector('.profile__add-btn');

const formEditProfile = document.querySelector('.form_type_edit-profile');
const formAddCard = document.querySelector('.form_type_add-card');


function createCard(cardName, cardLink) {
  const cardInstance = new Card(cardName, cardLink, { 
    handleCardClick: () => popupInspectImage.open(cardName, cardLink)
  },'#card');
  return cardInstance.generateCard();
}


const formEditProfileValidator = new FormValidator(validationConfig, formEditProfile);
const formAddCardValidator = new FormValidator(validationConfig, formAddCard);


const userInfo = new UserInfo({ profileNameSelector: '.profile__name', profileInfoSelector: '.profile__about-self'})


const cardsList = new Section({ 
    items: initialCards, 
    renderer: ({ name, link }) => {
      const cardElement = createCard(name, link)
      cardsList.addItem(cardElement);
    }
  }, '.elements');


const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', (formData) => {
    userInfo.setUserInfo(formData["input-profile-name"], formData["input-profile-info"])

    popupEditProfile.close();
  }, '.form_type_edit-profile', '.form__input');


const popupAddCard = new PopupWithForm('.popup_type_add-card', (formData) => {
    cardsList.renderItem({ name: formData["input-card-name"], link: formData["input-card-link"] })
    
    popupAddCard.close();
  }, '.form_type_add-card', '.form__input');


const popupInspectImage = new PopupWithImage('.popup_type_inspect-image', '.popup__image', '.popup__subtitle');


buttonEditProfile.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  
  popupEditProfile.setInputValues(currentUserInfo);

  formEditProfileValidator.resetFormValidation();
  popupEditProfile.open()
});


buttonAddCard.addEventListener('click', () => {
  formAddCardValidator.resetFormValidation();
  popupAddCard.open()
});


popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupInspectImage.setEventListeners();

formAddCardValidator.enableValidation();
formEditProfileValidator.enableValidation();

cardsList.renderItems();