import BaseComponent from '../base-component';

export default class WinnersBtn extends BaseComponent {
  constructor() {
    super('div', ['main__pages-btn']);
    this.element.innerHTML = `
    <button class="winners__prev winners-btns btn unactiv">prev</button>
    <button class="winners__next winners-btns btn unactiv">next</button>
    `;
  }
}
