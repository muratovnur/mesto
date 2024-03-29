export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }


  _handleResponseData(res) {
    if (res.ok) {
      return res.json();    
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me` , {
      headers: this.headers
      })
      .then(res => this._handleResponseData(res))
  }


  getInitialCards() {
    return fetch(`${this.baseUrl}/cards` , {
        headers: this.headers
      })
      .then(res => this._handleResponseData(res))
  }


  addCard(name, link) {
    return fetch(`${this.baseUrl}/cards` , {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(res => this._handleResponseData(res))
  }


  removeCard(card) {
    return fetch(`${this.baseUrl}/cards/${card.cardId}`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then(res => this._handleResponseData(res))
  }

  
  updateUserInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me` , {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then(res => this._handleResponseData(res))
  }


  updateUserAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar` , {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: avatar
        })
      })
      .then(res => this._handleResponseData(res))
  }
  

  updateCardLike(card, isLiked) {
    return fetch(`${this.baseUrl}/cards/${card.cardId}/likes`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: this.headers
      })
      .then(res => this._handleResponseData(res))
  }
}