import './index.css';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from "../components/Api.js";

import { validationConfig, requestInfo} from "../utils/data.js";


const profileAvatar = document.querySelector('.profile__avatar');
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddCard = document.querySelector('.profile__add-btn');

const formEditProfile = document.querySelector('.form_type_edit-profile');
const formAddCard = document.querySelector('.form_type_add-card');
const formUpdateAvatar = document.querySelector('.form_type_update-avatar');

let userId;


function createCard(cardData) {
  const cardInstance = new Card(cardData, { 
    handleCardClick: () => popupInspectImage.open(cardData.name, cardData.link),
    handleRemoveCard: (card) => popupRemoveCard.open(card),
    handleCardLike: (card) => {
      api.updateCardLike(card, card.isLiked())
      .then(res => {
        card.likes = res.likes;
        card.cardLike.classList.toggle('element__like_active');
        card.cardLikeNumber.textContent = res.likes.length;
      })
      .catch(err => {
        console.log(err);
      })
    }
  }, '#card', userId);

  return cardInstance.generateCard();
}


const formEditProfileValidator = new FormValidator(validationConfig, formEditProfile);
const formAddCardValidator = new FormValidator(validationConfig, formAddCard);
const formUpdateAvatarValidator = new FormValidator(validationConfig, formUpdateAvatar);


const userInfo = new UserInfo({ profileNameSelector: '.profile__name', profileInfoSelector: '.profile__about-self', profileAvatarSelector: '.profile__avatar'})


const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/${requestInfo.cohortId}`,
  headers: {
    authorization: requestInfo.token,
    'Content-Type': 'application/json'
  }
}); 


const cardsList = new Section({
  /*параметр creating используется для разделения способа вставки карты на страницу.
  Так при дефолтном значений false вставка будет выполняться через append, а в случае
  true, то есть при созданий пользователем карточки через prepend*/
    renderer: (cardData, creating = false) => {
      const cardElement = createCard(cardData)
      cardsList.addItem(cardElement, creating);
    }
  }, '.elements');


const promiseGetInitialCards = new Promise((resolve, reject) => {
  api.getInitialCards()
  .then((cardsData) => {
    resolve(cardsData);
  })
  .catch((err) => {
    console.log(err);
    reject("Возникли проблемы с получением данных карточек :(")
  })
})


const promiseGetUserInfo = new Promise((resolve, reject) => {
  api.getUserInfo()
  .then((userData) => {
    resolve(userData);
  })
  .catch((err) => {
    console.log(err);
    reject("Возникли проблемы с получением данных пользователя :(")
  })
})


Promise.all([promiseGetUserInfo, promiseGetInitialCards])
.then(([userData, cardsData]) => {
  userId = userData._id
  userInfo.setUserInfo(userData.name, userData.about)
  userInfo.updateUserAvatar(userData.avatar)

  cardsList.renderItems(cardsData)
  })
.catch((err) => {
  console.log(err);
})


const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', (formData) => {
    popupEditProfile.formSubmitButton.value = "Сохранение...";
    api.updateUserInfo(formData["input-profile-name"], formData["input-profile-info"])
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about)
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.close();
      popupEditProfile.formSubmitButton.value = "Сохранить";
    })
  }, '.form_type_edit-profile', '.form__input', '.form__submit');


const popupAddCard = new PopupWithForm('.popup_type_add-card', (formData) => {
    popupAddCard.formSubmitButton.value = "Сохранение...";
    api.addCard(formData["input-card-name"], formData["input-card-link"])
    .then((data) => {
      cardsList.renderNewItem(data, true);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.close();
      popupAddCard.formSubmitButton.value = "Создать";
    })
  }, '.form_type_add-card', '.form__input', '.form__submit');


const popupUpdateAvatar = new PopupWithForm('.popup_type_update-avatar', (formData) => {
    popupUpdateAvatar.formSubmitButton.value = "Сохранение...";
    api.updateUserAvatar(formData["input-avatar-link"])
    .then((data) => {
      userInfo.updateUserAvatar(data.avatar)
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupUpdateAvatar.close();
      popupUpdateAvatar.formSubmitButton.value = "Сохранить";
    })
  }, '.form_type_update-avatar', '.form__input', '.form__submit')


const popupInspectImage = new PopupWithImage('.popup_type_inspect-image', '.popup__image', '.popup__subtitle');


const popupRemoveCard = new PopupWithConfirmation('.popup_type_remove-card', (card) => {
      api.removeCard(card)
      .then(() => {
        card.removeCard();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        popupRemoveCard.close();
      })
  }, '.form_type_remove-card');


buttonEditProfile.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  
  popupEditProfile.setInputValues(currentUserInfo);

  formEditProfileValidator.resetFormValidation();
  popupEditProfile.open();
});


buttonAddCard.addEventListener('click', () => {
  formAddCardValidator.resetFormValidation();
  popupAddCard.open();
});


profileAvatar.addEventListener('click', () => {
  formUpdateAvatarValidator.resetFormValidation();
  popupUpdateAvatar.open();
})


popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupUpdateAvatar.setEventListeners();
popupInspectImage.setEventListeners();
popupRemoveCard.setEventListeners();

formAddCardValidator.enableValidation();
formEditProfileValidator.enableValidation();
formUpdateAvatarValidator.enableValidation();