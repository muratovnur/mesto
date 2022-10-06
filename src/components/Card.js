export default class Card {
  _cardElement
  cardTitle
  cardImage
  cardLike
  cardLikeNumber
  cardRemove
  constructor(cardData, { handleCardClick, handleRemoveCard, handleCardLike}, cardTemplate, userId) {
    this._cardTemplate = cardTemplate;
    this._cardName = cardData.name;
    this._cardLink = cardData.link;
    this._cardOwnerId = cardData.owner._id;
    this._userId = userId;
    this.cardId = cardData._id;
    this.likes = cardData.likes;
    this._likesNumber = cardData.likes.length;
    this._handleCardClick = handleCardClick;
    this._handleRemoveCard = handleRemoveCard;
    this._handleCardLike = handleCardLike;
    
  }


  isLiked() {
    return Boolean(this.likes.find(({ _id }) => _id === this._userId))
  }


  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  
  updateLike(res) {
    this.likes = res.likes;
    this.cardLike.classList.toggle('element__like_active');
    this.cardLikeNumber.textContent = res.likes.length;
  }


  _createElementByTemplate() {
    this._cardElement = document.querySelector(this._cardTemplate).content
    .querySelector('.element')
    .cloneNode(true);
  }


  _setComponents() {
    this.cardTitle = this._cardElement.querySelector('.element__title');
    this.cardImage = this._cardElement.querySelector('.element__image');
    this.cardLike = this._cardElement.querySelector('.element__like');
    this.cardLikeNumber = this._cardElement.querySelector('.element__like-number');
    this.cardRemove = this._cardElement.querySelector('.element__remove');
    
    if (this._cardOwnerId === this._userId) {
      this.cardRemove.classList.add('element__remove_active');
    }

    if (this.isLiked()) {
      this.cardLike.classList.add('element__like_active');
    }
  }


  _setEventListeners() {
    this.cardLike.addEventListener('click', () => this._handleCardLike(this));
    this.cardRemove.addEventListener('click', (evt) => this._handleRemoveCard(this));
    this.cardImage.addEventListener('click', (evt) => this._handleCardClick());
  }

  
  generateCard() {
    this._createElementByTemplate();
    this._setComponents();
    
    this.cardTitle.textContent = this._cardName;
    this.cardImage.src = this._cardLink;
    this.cardImage.alt = `Изображение ${this._cardName}`;

    this.cardLikeNumber.textContent = this._likesNumber;

    this._setEventListeners();

    return this._cardElement;
  }
}