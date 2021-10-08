import BaseComponent from '../base-component';
import './headerRegPopup.css';

export default class RegistrPopup extends BaseComponent {
  constructor() {
    super('section', ['about__wrapper']);
    this.element.innerHTML = `
    <section class="about__registr">
      <h2 class="reg-form__header">Registr new player</h2>
      <form class="about__reg-form reg-form" action="#">
        <div class="reg-form__areas">
          <div class="reg-form__area">
            <div class="reg-form__title">First Name</div>
            <input
              id="name"
              class="reg-form__value form__name"
              type="text"
              placeholder="Name"
              required
            />
            <label for="name" class="reg-form__message"
              >The name can't contains only numbers or symbols (~ ! @ # $ % * () _ — + = | : ; &#34; ' &#96; &#60; > , . ? / ^).</label>
          </div>
          <div class="reg-form__area">
            <div class="reg-form__title">Last Name</div>
            <input
              id="lastName"
              class="reg-form__value form__last-name"
              type="text"
              placeholder="Last name"
              required
            />
            <label for="lastName" class="reg-form__message"
              >The last name can't contains only numbers or symbols (~ ! @ # $ % * () _ — + = | : ; &#34; ' &#96; &#60; > , . ? / ^).</label>
          </div>
          <div class="reg-form__area">
            <div class="reg-form__title">E-mail</div>
            <input
              id="email"
              class="reg-form__value form__email"
              type="text"
              placeholder="E-mail"
              required
            />
            <label for="email" class="reg-form__message">
              Uppercase and lowercase Latin letters A to Z and a to z
              digits 0 to 9 printable characters !#$%&'*+-/=?^_&#96;{|}~ dot
              ., provided that it is not the first or last character and
              provided also that it does not appear consecutively.
            </label>
          </div>
        </div>

        <div class="reg-form__wrapper">
          <div class="reg-form__ava">
            <div class="reg-form__img-wrapper">
            <img class="reg-form__img" src="../public/avatar.svg" alt="avatar" />
          </div>

          <div class="reg-form__upload-file">
            <div class="reg-form__group">
              <input type="file" name="file" id="file" class="reg-form__img-btn input-file" />
              <label for="file" class="reg-form__labelFile">
                <span class="reg-form__filename">Add avatar</span>
              </label>
            </div>
          </div>

          <div class="reg-form__buttons">
            <button class="reg-form__btn reg-form__btn_submit">
              Add user
            </button>
            <button
              class="reg-form__btn reg-form__btn_cancel"
              type="button"
            >
              cancel
            </button>
          </div>
        </div>
      </form>

      <section class="reg-form__popup-warrep">
      <div class="reg-form__popup">
        <p class="reg-form__popup-message">
        Maximum length of the form is 30 characters including spaces.
        </p>
        <button class="reg-form__popup-btn" type="button">ok</button>
      </div>
    </section>

    </section>
  `;
  }
}
