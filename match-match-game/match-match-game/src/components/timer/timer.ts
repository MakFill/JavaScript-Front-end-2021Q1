import BaseComponent from '../base-component';
import './timer.css';

export default class Timer extends BaseComponent {
  constructor() {
    super('section', ['cards-area__timer', 'timer']);
    this.element.innerHTML = `
    <p class="timer__score">
      <span class="timer__minute-decades">0</span>
      <span class="timer__minutes">0</span>
      :
      <span class="timer__second-decades">0</span>
      <span class="timer__seconds">0</span>
    </p>
    <section class="timer__wrapper timer-wrapper">
      <div class="timer-wrapper__popup">
        <p class="timer-wrapper__message">
        </p>
        <button class="timer-wrapper__btn">ok</button>
      </div>
    </section>
    `;
  }
}
