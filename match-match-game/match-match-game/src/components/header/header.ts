import './header.css';
import BaseComponent from '../base-component';

export default class Header extends BaseComponent {
  constructor(private regPopup: HTMLElement) {
    super('header', ['header']);

    this.element.innerHTML = `
    <article class="header__container">
    <section class="header__logo">
    <p class="header__title">Match</p>
    <p class="header__title header__title_second">Match</p>
    <h1>Match-match game</h1>
  </section>

  <nav class="nav">
    <div class="nav__item nav__description nav__item_activ">
      <img
        class="nav__img"
        src="../public/question.svg"
        alt="about game"
      />
      <p class="nav__text">About Game</p>
    </div>
    <div class="nav__item nav__score">
      <img class="nav__img" src="../public/star.svg" alt="best score" />
      <p class="nav__text">Best Score</p>
    </div>
    <div class="nav__item nav__settings">
      <img class="nav__img" src="../public/settings.svg" alt="settings" />
      <p class="nav__text">Game Settings</p>
    </div>
  </nav>

  <section class="registr">
    <button class="registr__btn registr__player">
      register new player
    </button>
    <button class="registr__btn register__hidden log-out__btn">
    Log out
    </button>
    <button class="registr__btn register__hidden start__btn">
      start game
    </button>
    <button class="registr__btn register__hidden stop__btn">
      stop game
    </button>
    <div class="reg-form__ava registr__ava-wrapper">
    <img class="registr__avatar register__hidden" src="../public/avatar.svg" alt="avatar">
    </div>
  </section>
  </article>`;

    this.element.appendChild(this.regPopup);
  }
}
