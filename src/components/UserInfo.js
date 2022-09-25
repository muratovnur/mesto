export default class UserInfo {
  constructor({ profileNameSelector, profileInfoSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileInfo = document.querySelector(profileInfoSelector);
  }
  

  getUserInfo() {
    return { "input-profile-name": this._profileName.textContent, 
             "input-profile-info": this._profileInfo.textContent};
  }


  setUserInfo(profileName, profileInfo) {
    this._profileName.textContent = profileName;
    this._profileInfo.textContent = profileInfo;
  }
}