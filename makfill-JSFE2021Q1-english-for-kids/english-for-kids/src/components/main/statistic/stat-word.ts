import BaseComponent from '../../base-component';

export default class StatWord extends BaseComponent {
  constructor(
    item: string,
    type: string,
    translate: string,
    trainClicks: number,
    guessed: number,
    fails: number,
    rate: number
  ) {
    super('div', ['stat__word']);
    this.element.innerHTML = `
    <p class="stat-item__word">${item}:</p>
    <p class="separate-word__type">(${type})</p>
    <p class="stat-item__translate">${translate}</p>
    <p class="stat-item__train-clicks">Train clicks:${trainClicks}</p>
    <p class="stat-item__times-guessed">Times guessed:${guessed}</p>
    <p class="stat-item__fails">Fails:${fails}</p>
    <p class="stat-item__rate">Success rate:${rate}%</p>
    `;
  }
}
