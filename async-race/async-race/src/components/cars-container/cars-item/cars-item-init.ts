export default class CarsItemInit {
  constructor(private carsItem: HTMLElement) {}

  carModel = this.carsItem.querySelector('.cars__model') as HTMLElement;

  carContainer = this.carsItem.querySelector('.cars__container') as HTMLElement;

  carModelContainer = this.carsItem.querySelector('.cars__model-container') as HTMLElement;

  carStart = this.carsItem.querySelector('.cars__start') as HTMLElement;

  carStop = this.carsItem.querySelector('.cars__stop') as HTMLElement;

  carSelect = this.carsItem.querySelector('.btn-select') as HTMLElement;

  carRemove = this.carsItem.querySelector('.btn-remove') as HTMLElement;

  itemName = this.carsItem.querySelector('.cars__name') as HTMLElement;

  itemColor = this.carsItem.querySelector('.cars__model') as HTMLElement;
}
