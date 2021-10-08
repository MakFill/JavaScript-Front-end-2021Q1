import './default-cards.css';
import BaseComponent from '../../base-component';

export default class DefaultCards extends BaseComponent {
  constructor(word: string) {
    super('a', ['default', 'default-card']);
    this.element.innerHTML = `
    <div class="default__top">
    <div class="default__picture"></div>
    </div>
    <div class="default__bottom">
        <div class="default__name">${word}</div>
    </div>`;
  }
}
