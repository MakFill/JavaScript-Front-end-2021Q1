import BaseComponent from '../base-component';

export default class WinnersItem extends BaseComponent {
  constructor(color: string, name: string, time: number, wins: number, index: number) {
    super('div', ['winners__item-car']);
    this.element.innerHTML = `
    <p class="winners__item winners__number">${index}</p>
    <p class="winners__item winners__car">
      <svg class="winners__model" style="fill: ${color}">
        <use href="#car-model"></use>
      </svg>
    </p>
    <p class="winners__item winners__name">${name}</p>
    <p class="winners__item winners__wins">${wins}</p>
    <p class="winners__item winners__time">${time}</p>
    `;
  }
}
