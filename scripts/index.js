const cardTemplate = document.querySelector('#card').content;
const cardElements = document.querySelector('.elements');

const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddCard = document.querySelector('.profile__add-btn');
const buttonCloseEditProfile = document.querySelector('.popup__close-btn_form_edit-profile');
const buttonCloseAddCard = document.querySelector('.popup__close-btn_form_add-card');
const buttonCloseInspectImage = document.querySelector('.popup__close-btn_inspect-image');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupInspectImage = document.querySelector('.popup_type_inspect-image');

const formEditProfile = document.querySelector('.form_type_edit-profile');
const formAddCard = document.querySelector('.form_type_add-card');

const profileNameInput = document.querySelector('.form__input_field_profile-name');
const profileAboutSelfInput = document.querySelector('.form__input_field_profile-about-self');
const cardNameInput = document.querySelector('.form__input_field_card-name');
const cardLinkInput = document.querySelector('.form__input_field_card-link');

const profileName = document.querySelector('.profile__name');
const profileAboutSelf = document.querySelector('.profile__about-self');


function createCard(cardName, cardLink) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__image').src = cardLink;
  cardElement.querySelector('.element__image').alt = `Изображение ${cardName}`;
  cardElement.querySelector('.element__title').textContent = cardName;


  cardElement.querySelector('.element__image').addEventListener('click', function(evt) {
    const cardName = evt.target.closest('.element').querySelector('.element__title').textContent;
    const cardImageLink = evt.target.src;

    inspectImage(cardName, cardImageLink);
  })

  cardElement.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });

  cardElement.querySelector('.element__trash').addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
  });

  return cardElement;
}


function inspectImage(cardName, cardImageLink) {
  togglePopUp(popupInspectImage);

  popupInspectImage.querySelector('.popup__subtitle').textContent = cardName;
  popupInspectImage.querySelector('.popup__image').src = cardImageLink;
  popupInspectImage.querySelector('.popup__image').alt = `Изображение ${cardName}`;
}

function loadCards() {
  initialCards.forEach(function (card) {
    const cardElement = createCard(card.name, card.link);

    cardElements.appendChild(cardElement);
  })
}


function addCard(cardName, cardLink) {
  const cardElement = createCard(cardName, cardLink);

  cardElements.prepend(cardElement);
}


function togglePopUp(popup) {
  popup.classList.toggle('popup_opened');
}


function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileAboutSelf.textContent = profileAboutSelfInput.value;

  togglePopUp(popupEditProfile);
}


function formAddCardSubmitHandler(evt) {
  evt.preventDefault();

  addCard(cardNameInput.value, cardLinkInput.value);
  cardNameInput.value = "";
  cardLinkInput.value = "";

  togglePopUp(popupAddCard);
}


buttonEditProfile.addEventListener('click', function () {
  togglePopUp(popupEditProfile);

  profileNameInput.value = profileName.textContent;
  profileAboutSelfInput.value = profileAboutSelf.textContent;
});

buttonAddCard.addEventListener('click', function () {
  togglePopUp(popupAddCard);
})


buttonCloseEditProfile.addEventListener('click', function() {
  togglePopUp(popupEditProfile);
});

buttonCloseAddCard.addEventListener('click', function() {
  togglePopUp(popupAddCard);
});

buttonCloseInspectImage.addEventListener('click', function() {
  togglePopUp(popupInspectImage);
})


formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
formAddCard.addEventListener('submit', formAddCardSubmitHandler);


loadCards();