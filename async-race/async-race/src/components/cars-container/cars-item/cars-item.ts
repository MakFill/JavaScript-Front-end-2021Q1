import BaseComponent from '../../base-component';

export default class CarsItem extends BaseComponent {
  constructor(name: string, color: string) {
    super('div', ['cars__item']);
    this.element.innerHTML = `
    <div class="cars__select">
    <button class="cars__btn btn btn-select">Select</button>
    <button class="cars__btn btn btn-remove">Remove</button>
    <p class="cars__name">${name}</p>
  </div>
  <div class="cars__interactiv">
    <button class="btn-interactiv cars__start">A</button>
    <button class="btn-interactiv cars__stop">B</button>
    <div class="cars__container">
      <div class="cars__model-container">
        <svg class="cars__model" style="fill: ${color}">
          <use href="#car-model"></use>
        </svg>
      </div>
    </div>
    <img class="cars__flag" src="../../../../public/flag.svg">
  </div>
  <p class="cars__track"></p>
    `;
  }
}
