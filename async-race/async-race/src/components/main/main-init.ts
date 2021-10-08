import { car } from '../../shared/interfaces';

export default class MainInit {
  constructor(private main: HTMLElement) {}

  carName = this.main.querySelector('.input-txt_create') as HTMLInputElement;

  carColor = this.main.querySelector('.input-color_create') as HTMLInputElement;

  carUpdateName = this.main.querySelector('.input-txt_update') as HTMLInputElement;

  carUpdateColor = this.main.querySelector('.input-color_update') as HTMLInputElement;

  carCreate = this.main.querySelector('.main__btn_create') as HTMLElement;

  carUpdate = this.main.querySelector('.main__btn_update') as HTMLElement;

  carRace = this.main.querySelector('.btn-race') as HTMLElement;

  carReset = this.main.querySelector('.btn-reset') as HTMLElement;

  generateCars = this.main.querySelector('.btn-generate') as HTMLElement;

  carsAmount = this.main.querySelector('.main__auto-value') as HTMLElement;

  pagesAmount = this.main.querySelector('.main__page-value') as HTMLElement;

  pageBtns = this.main.querySelectorAll('.page-btns') as NodeListOf<HTMLElement>;

  prevBtn = this.main.querySelector('.main__prev') as HTMLElement;

  nextBtn = this.main.querySelector('.main__next') as HTMLElement;

  winnerMessage = this.main.querySelector('.main__winner-message') as HTMLElement;

  winnerName = this.main.querySelector('.winner__name') as HTMLElement;

  winnerTime = this.main.querySelector('.winner__time') as HTMLElement;

  winnersPage = this.main.querySelector('.main__winners') as HTMLElement;

  winnersContainer = this.main.querySelector('.winners__container') as HTMLElement;

  winnersAmount = this.main.querySelector('.main__winners-value') as HTMLElement;

  winnersSelectedPage = this.main.querySelector('.main__winners-page-value') as HTMLElement;

  winnersWinsBtn = this.main.querySelector('.table-wins') as HTMLElement;

  winnersTimeBtn = this.main.querySelector('.table-time') as HTMLElement;

  winnersPrev = this.main.querySelector('.winners__prev') as HTMLElement;

  winnersNext = this.main.querySelector('.winners__next') as HTMLElement;

  winnersBtns = this.main.querySelectorAll('.winners-btns') as NodeListOf<HTMLElement>;

  winsArrowDown = this.main.querySelector('.wins-arrow-down') as HTMLElement;

  winsArrowUp = this.main.querySelector('.wins-arrow-up') as HTMLElement;

  timeArrowDown = this.main.querySelector('.time-arrow-down') as HTMLElement;

  timeArrowUp = this.main.querySelector('.time-arrow-up') as HTMLElement;

  allArrows = this.main.querySelectorAll('.arrow') as NodeListOf<HTMLElement>;

  createCar(): void {
    if (this.carName.value && this.carColor.value) {
      car.name = this.carName.value;
      car.color = this.carColor.value;
    }
  }
}
