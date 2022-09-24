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

const profileNameInput = document.querySelector('.form__input_field_profile-name');
const profileInfoInput = document.querySelector('.form__input_field_profile-about-self');

const formEditProfile = document.querySelector('.form_type_edit-profile');
const formAddCard = document.querySelector('.form_type_add-card');


const formAddCardValidator = new FormValidator(validationConfig, formAddCard);
const formEditProfileValidator = new FormValidator(validationConfig, formEditProfile);


const userInfo = new UserInfo({ profileNameSelector: '.profile__name', profileInfoSelector: '.profile__about-self'})


const cardsList = new Section({ 
    items: initialCards, 
    renderer: ({ name, link }) => {
      const cardInstance = new Card(name, link, { 
        handleCardClick: () => popupInspectImage.open(name, link)
      },'#card');
      const cardElement = cardInstance.generateCard();
      
      cardsList.addItem(cardElement);
    }
  }, '.elements');


const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', () => {
    const [profileName, profileInfo] = popupEditProfile._getInputValues();
    
    userInfo.setUserInfo(profileName, profileInfo)

    popupEditProfile.close();
  }, '.form_type_edit-profile', '.form__input');


const popupAddCard = new PopupWithForm('.popup_type_add-card', () => {
    const [cardName, cardLink] = popupAddCard._getInputValues();
    
    cardsList.renderItem({ name: cardName, link: cardLink })
    
    popupAddCard.close();
  }, '.form_type_add-card', '.form__input');


const popupInspectImage = new PopupWithImage('.popup_type_inspect-image', '.popup__image', '.popup__subtitle');


buttonEditProfile.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();

  profileNameInput.value = currentUserInfo.profileName;
  profileInfoInput.value = currentUserInfo.profileInfo;

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