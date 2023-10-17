export class Api {
  constructor(config) {
    this._url = config.urlCohort;
    this._headers = config.headers;
  };

  _onResponse(res) {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
  }

  getUserApi() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._onResponse)
  }

  getCardsApi() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._onResponse)
  }

  editUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._onResponse)
  }

};