import './cards-area.css';
import BaseComponent from '../base-component';
import Card from '../card/card';
import TimerInteractiv from '../timer/timerInteractiv';
import Timer from '../timer/timer';
import { rotateTime } from '../../shared/constants';
import imports from '../../imports';

export default class CardsArea extends BaseComponent {
  private cards: Card[] = [];

  private timer: Timer = new Timer();

  timerInterval: TimerInteractiv = new TimerInteractiv(this.timer.element);

  constructor() {
    super('article', ['cards-area']);
    this.element.innerHTML = `
    <div class="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>`;
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
    this.timer = new Timer();
    this.timerInterval = new TimerInteractiv(this.timer.element);
    this.element.appendChild(this.timer.element);
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach((card) => {
      this.element.appendChild(card.element);
      if (+imports.settingsInit.settingsDifficult.value === 18) {
        card.element.classList.add('card-container_sixOnSix');
        this.element.classList.add('cards-area_sixOnSix');
      }
    });
    setTimeout(() => {
      this.cards.forEach((card) => card.rotateToBack());
    }, rotateTime * 1000);
  }
}
