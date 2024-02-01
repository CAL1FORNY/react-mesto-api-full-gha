class Api {
  constructor(apiAddress) {
    this._link = apiAddress;
  }
  _processServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  getInitialCards() {
    return fetch(`${this._link}cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`
      },
    }).then(this._processServerResponse);
  }
  addNewCard(name, link) {
    return fetch(`${this._link}cards`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`
      },
      body: JSON.stringify({ name, link }),
    }).then(this._processServerResponse)
  }
  deleteCard(cardId) {
    return fetch(`${this._link}cards/${cardId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`
      },
    }).then(this._processServerResponse)
  }
  getUserData() {
    return fetch(`${this._link}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`
      },
    }).then(this._processServerResponse)
  }
  sendUserData(userName, userAbout) {
    return fetch(`${this._link}users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`
      },
      body: JSON.stringify({
        name: userName,
        about: userAbout,
      }),
    }).then(this._processServerResponse)
  }
  sendAvatarData(avatarLink) {
    return fetch(`${this._link}users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`
      },
      body: JSON.stringify({ avatar: avatarLink.avatar }),
    }).then(this._processServerResponse)
  }
  changeLikeCardStatus(cardId, isLiked) {
    const methodUsed = isLiked ? 'PUT' : 'DELETE';
    return fetch(`${this._link}cards/${cardId}/likes`, {
        method: methodUsed,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${ localStorage.getItem('token') }`,
        },
      }).then(this._processServerResponse)
  }
}

const api = new Api('https://api.reflection.mesto.nomoredomainsmonster.ru/');

export default api;
