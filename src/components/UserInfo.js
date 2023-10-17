export class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  };

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userInfo.textContent
    };
  };

  setUserInfo(username, userinfo) {
    this._userName.textContent = username;
    this._userInfo.textContent = userinfo;
  };

  setUserAvatar(avatar) {
    this._userAvatar.src = avatar;
  };
};