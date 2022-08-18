const cardTemplate = document.querySelector('#card').content;
const cardElements = document.querySelector('.elements');

const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddCard = document.querySelector('.profile__add-btn');

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

const popupElements = Array.from(document.querySelectorAll('.popup'));
const buttonCloseElements = Array.from(document.querySelectorAll('.popup__close-btn'));


function createCard(cardName, cardLink) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');

  cardElement.querySelector('.element__title').textContent = cardName;
  cardImage.src = cardLink;
  cardImage.alt = `Изображение ${cardName}`;

  return cardElement;
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


function addPopupEscapeListener(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    togglePopUp(popupOpened);
  }
}

function togglePopUp(popup) {
  popup.classList.toggle('popup_opened');

  if (popup.classList.contains('popup_opened')) {
    document.addEventListener('keydown', addPopupEscapeListener);
  }
  else {
    document.removeEventListener('keydown', addPopupEscapeListener);

    if (popup.classList.contains('popup_type_add-card')) {
      const popupForm = popup.querySelector('.form')
      popupForm.reset();
      resetFormValidation(popupForm, validationConfig);
    }
    else if (popup.classList.contains('popup_type_edit-profile')) {
      const popupForm = popup.querySelector('.form')
      loadEditProfileForm();
      resetFormValidation(popupForm, validationConfig);
    }
  }
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
  
  evt.target.reset();

  togglePopUp(popupAddCard);
}


function inspectImage(cardName, cardImageLink) {
  togglePopUp(popupInspectImage);

  const popupImage = popupInspectImage.querySelector('.popup__image')

  popupInspectImage.querySelector('.popup__subtitle').textContent = cardName;
  popupImage.src = cardImageLink;
  popupImage.alt = `Изображение ${cardName}`;
}


function loadEditProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileAboutSelfInput.value = profileAboutSelf.textContent;
}


function loadPage() {
  loadCards();
  loadEditProfileForm();
}


cardElements.addEventListener('click', function (evt) {
  const targetElement = evt.target;

  if (targetElement.classList.contains('element__image')) {
    const cardName = targetElement.closest('.element').querySelector('.element__title').textContent;
    const cardImageLink = targetElement.src;

    inspectImage(cardName, cardImageLink);
  }
  else if (targetElement.classList.contains('element__like')) {
    targetElement.classList.toggle('element__like_active');
  }
  else if (targetElement.classList.contains('element__trash')) {
    targetElement.closest('.element').remove();
  }
})

formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
formAddCard.addEventListener('submit', formAddCardSubmitHandler);

buttonEditProfile.addEventListener('click', function () {
  togglePopUp(popupEditProfile);
  loadEditProfileForm();
});

buttonAddCard.addEventListener('click', function () {
  togglePopUp(popupAddCard);
})

buttonCloseElements.forEach(function (buttonClose) {
  buttonClose.addEventListener('click', function () {
    togglePopUp(buttonClose.closest('.popup'));
  })
})

popupElements.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target === popup) {
      togglePopUp(popup);  
    }
  })
})


loadPage();