import BaseComponent from '../../base-component';

export default class StatResetRepeatBtns extends BaseComponent {
  constructor() {
    super('div', ['stat__reset-repeat']);
    this.element.innerHTML = `
    <button class="stat__btn repeat">Repeat difficult words</button>
    <button class="stat__btn reset">Reset</button>
    `;
  }
}
