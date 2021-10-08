import CarsItemInit from './components/cars-container/cars-item/cars-item-init';
import imports from './imports';

export const hideWinnerMessage = (): void => {
  imports.mainInit.winnerMessage.style.display = 'none';
};

export const chageItemBtnsState = (state: string): void => {
  const allItemsSelect = imports.main.element.querySelectorAll(
    '.btn-select'
  ) as NodeListOf<HTMLElement>;
  const allItemsRemove = imports.main.element.querySelectorAll(
    '.btn-remove'
  ) as NodeListOf<HTMLElement>;
  if (state === 'disable') {
    allItemsSelect.forEach((item) => {
      item.classList.add('unactiv');
    });
    allItemsRemove.forEach((item) => {
      item.classList.add('unactiv');
    });
  } else if (state === 'enable') {
    allItemsSelect.forEach((item) => {
      item.classList.remove('unactiv');
    });
    allItemsRemove.forEach((item) => {
      item.classList.remove('unactiv');
    });
  }
};

export const checkStoppedCars = (): void => {
  const allCarsStartBtn = imports.main.element.querySelectorAll(
    '.cars__start'
  ) as NodeListOf<HTMLElement>;
  let stoppedCars = 0;
  allCarsStartBtn.forEach((item) => {
    if (!item.classList.contains('car__start_unactiv')) {
      stoppedCars += 1;
    }
  });
  if (stoppedCars === allCarsStartBtn.length) {
    imports.enableBtns();
    chageItemBtnsState('enable');
  }
};

export const changePageBtnsStyle = (page: number, amount: number, pagination = 7): void => {
  if (page === 1) {
    imports.mainInit.prevBtn.classList.add('unactiv');
  } else {
    imports.mainInit.prevBtn.classList.remove('unactiv');
  }
  if (Math.ceil(amount / pagination) === page || Math.ceil(amount / pagination) === 0) {
    imports.mainInit.nextBtn.classList.add('unactiv');
  } else {
    imports.mainInit.nextBtn.classList.remove('unactiv');
  }
};

export const startedCarStyle = (carsItemInit: CarsItemInit): void => {
  const carItemModel = carsItemInit;
  carItemModel.carModelContainer.style.left = '0px';
  carItemModel.carModelContainer.style.position = 'relative';
  carsItemInit.carStart.classList.remove('car__start_pending');
  carsItemInit.carStart.classList.add('car__start_unactiv');
  carsItemInit.carStop.classList.add('car__stop_activ');
};

export const stoppedCarStyle = (carsItemInit: CarsItemInit, recId: number): void => {
  carsItemInit.carStart.classList.remove('car__start_unactiv');
  carsItemInit.carStop.classList.remove('car__stop_activ');
  const carItemModel = carsItemInit;
  cancelAnimationFrame(recId);
  carItemModel.carModelContainer.style.position = 'initial';
  carItemModel.carModelContainer.style.left = '0px';
};

export const singleCarRemovedStyle = (): void => {
  imports.mainInit.carRace.classList.remove('unactiv');
  imports.mainInit.carCreate.classList.remove('unactiv');
  imports.mainInit.generateCars.classList.remove('unactiv');
};
