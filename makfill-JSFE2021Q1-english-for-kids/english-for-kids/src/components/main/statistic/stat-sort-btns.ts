import BaseComponent from '../../base-component';

export default class StatSortBtns extends BaseComponent {
  constructor() {
    super('div', ['stat__btns']);
    this.element.innerHTML = `
    <h2 class="stat__header">Sort by:</h2>
    <button class="stat__btn alphabet">Alphabet</button>
    <button class="stat__btn train-clicks">Train clicks</button>
    <button class="stat__btn times-guessed">Times guessed</button>
    <button class="stat__btn fails">Fails</button>
    <button class="stat__btn success-rate">Success rate</button>
    `;
  }
}
