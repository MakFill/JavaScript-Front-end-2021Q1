import BaseComponent from '../base-component';
import './about-game.css';

export default class AboutGame extends BaseComponent {
  constructor() {
    super('article', ['about']);
    this.element.insertAdjacentHTML(
      'afterbegin',
      `
    <section class="about__instructions instructions">
      <h2 class="about__header">How to play?</h2>
      <div class="instructions__item instructions__item_first">
        <p><span>1</span>Register new player in game</p>
        <img src="../public/form-example.png" alt="Form example" />
      </div>
      <div class="instructions__item instructions__item_second">
        <p><span>2</span>Configure your game settings</p>
        <img src="../public/settings-example.png" alt="Settings example" />
      </div>
      <div class="instructions__item instructions__item_third">
        <p>
          <span>3</span>Start you new game! Remember card positions and
          match it before times up.
        </p>
        <img src="../public/game-example.png" alt="Game example" />
      </div>
    </section>
    `
    );
  }
}
