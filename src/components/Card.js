export default class Card {
  _cardElement
  _cardTitle
  _cardImage
  _cardLike
  _cardRemove
  constructor(cardName, cardLink, { handleCardClick }, cardTemplate) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._handleCardClick = handleCardClick;
    this._cardTemplate = cardTemplate;
  }


  _createElementByTemplate() {
    this._cardElement = document.querySelector(this._cardTemplate).content
    .querySelector('.element')
    .cloneNode(true);
  }


  _setComponents() {
    this._cardTitle = this._cardElement.querySelector('.element__title');
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._cardLike = this._cardElement.querySelector('.element__like');
    this._cardRemove = this._cardElement.querySelector('.element__remove');
  }


  _setEventListeners() {
    this._cardLike.addEventListener('click', () => this._toggleLikeButton());
    this._cardRemove.addEventListener('click', (evt) => this._removeCard());
    this._cardImage.addEventListener('click', (evt) => this._handleCardClick());
  }


  _toggleLikeButton() {
    this._cardLike.classList.toggle('element__like_active');
  }


  _removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  
  generateCard() {
    this._createElementByTemplate();
    this._setComponents();
    
    this._cardTitle.textContent = this._cardName;
    this._cardImage.src = this._cardLink;
    this._cardImage.alt = `Изображение ${this._cardName}`;

    this._setEventListeners();

    return this._cardElement;
  }
}