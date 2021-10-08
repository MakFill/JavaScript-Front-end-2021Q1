import BaseComponent from '../../base-component';

export default class StatType extends BaseComponent {
  constructor(item: string) {
    super('div', ['stat__type']);
    this.element.innerHTML = `<h3 class="stat__type-header">${item}</h3>`;
  }
}
