import { updateMethod } from './modules/ajax.js';
import { populateFields, validateUpdate, extractForm, errHandler, resetErrors } from './modules/account-util';

const profileForm = document.querySelector('.account-profile-form');
// const securityForm = document.querySelector('.account-security-form');

if (profileForm) {
  const profileFields = profileForm.querySelectorAll('input');
  populateFields(profileFields);

  profileForm.addEventListener('submit', () => {
    let formData = new FormData(profileForm);
    let validationResult = validateUpdate(formData);
    resetErrors(profileFields);

    if (validationResult.isValid) {
      let updateInfo = extractForm(validationResult.form);

      updateMethod('/account/profile/edit', JSON.stringify(updateInfo)).then(serverResponse => {
        if (serverResponse.success) {
          populateFields(profileFields);
        }
      }).catch(err => errHandler(err, profileForm, profileFields));
    } else {
      errHandler(validationResult, profileForm, profileFields);
    }
  }, false);
}
