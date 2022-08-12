const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.querySelector('#card').content;
const cardElements = document.querySelector('.elements');

const editProfileButton = document.querySelector('.profile__edit-btn');
const addCardButton = document.querySelector('.profile__add-btn');
const closeEditProfileButton = document.querySelector('.popup__close-btn_form_edit-profile');
const closeAddCardButton = document.querySelector('.popup__close-btn_form_add-card');
const closeInspectImageButton = document.querySelector('.popup__close-btn_inspect-image');

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
    inspectImage(evt.target);
  })

  cardElement.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });
  cardElement.querySelector('.element__trash').addEventListener('click', function(evt) {
    evt.target.parentElement.remove();
  });

  return cardElement;
}

function inspectImage(target) {
  togglePopUp(popupInspectImage);

  popupInspectImage.querySelector('.popup__image').src = target.src;
  popupInspectImage.querySelector('.popup__image').alt = target.alt;
  popupInspectImage.querySelector('.popup__subtitle').textContent = target.parentElement.querySelector('.element__title').textContent;
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

editProfileButton.addEventListener('click', function () {
  togglePopUp(popupEditProfile);

  profileNameInput.value = profileName.textContent;
  profileAboutSelfInput.value = profileAboutSelf.textContent;
});

addCardButton.addEventListener('click', function () {
  togglePopUp(popupAddCard);
})

closeEditProfileButton.addEventListener('click', function() {
  togglePopUp(popupEditProfile);
});

closeAddCardButton.addEventListener('click', function() {
  togglePopUp(popupAddCard);
});

closeInspectImageButton.addEventListener('click', function() {
  togglePopUp(popupInspectImage);
})

formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
formAddCard.addEventListener('submit', formAddCardSubmitHandler);

loadCards();