import BaseComponent from '../../base-component';
import './winner-message.css';

export default class WinnerMessage extends BaseComponent {
  constructor() {
    super('p', ['main__winner-message']);
    this.element.innerHTML = `<span class="winner__name">aaa</span> went first (<span class="winner__time">0</span>s)!`;
  }

  winnerName = this.element.querySelector('.winner__name') as HTMLElement;

  winnerTime = this.element.querySelector('.winner__time') as HTMLElement;
}
