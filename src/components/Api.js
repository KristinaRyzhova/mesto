export class Api {
  constructor(config) {
    this._url = config.urlCohort;
    this._headers = config.headers;
  };

  _onResponse(res) {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
  };

  getUserApi() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._onResponse)
  };

  getCardsApi() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._onResponse)
  };

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.username,
        about: data.userinfo,
      }),
    })
      .then(this._onResponse)
  };

  editUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._onResponse)
  };

  addNewCardPlace(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.placename,
        link: data.placelink
      })
    })
      .then(this._onResponse)
  };

  /* removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._onResponse)
  } */





};