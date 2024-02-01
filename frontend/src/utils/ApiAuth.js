class ApiAuth {
  constructor(apiAddress) {
    this._authUrl = apiAddress;
  }
  _processServerResponse (res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }
  tokenVerification (token) {
    return fetch(`${this._authUrl}users/me`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
      .then(this._processServerResponse)
  }
  userAuthorization (password, email) {
    return fetch(`${this._authUrl}signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email })
    })
      .then(this._processServerResponse)
  }
  userRegistration (password, email) {
    return fetch(`${this._authUrl}signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email })
    })
      .then(this._processServerResponse)
  }
}

const apiAuth = new ApiAuth('https://api.reflection.mesto.nomoredomainsmonster.ru/');

export default apiAuth;