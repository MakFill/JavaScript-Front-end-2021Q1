import CarsItem from './components/cars-container/cars-item/cars-item';
import {
  auto,
  car,
  CarObject,
  CarStarted,
  getRandomColor,
  getRandomValue,
} from './shared/interfaces';
import CarsItemInit from './components/cars-container/cars-item/cars-item-init';
import imports from './imports';
import { appendWinner, deleteWinner } from './winners-app';
import {
  chageItemBtnsState,
  changePageBtnsStyle,
  checkStoppedCars,
  hideWinnerMessage,
  singleCarRemovedStyle,
  startedCarStyle,
  stoppedCarStyle,
} from './support-functions';

let allCarsAmount = 0;
let selectPage = 1;
let FIRST_CAR_TIME = 0;
let recId: number;
let brokenCars = 0;
let CARS_ON_PAGE = 0;

const deletCar = async (id: number): Promise<void> => {
  await fetch(`http://127.0.0.1:3000/garage/${id}`, {
    method: 'DELETE',
  });
  allCarsAmount -= 1;
  imports.mainInit.carsAmount.textContent = `${allCarsAmount}`;
  if (Math.ceil(allCarsAmount / 7) < selectPage && allCarsAmount !== 0) {
    selectPage -= 1;
    imports.mainInit.pagesAmount.textContent = selectPage.toString();
  }
  deleteWinner(id);
};

const patchCar = async (elem: HTMLElement, item: CarObject) => {
  const carsItemInit = new CarsItemInit(elem);
  imports.mainInit.carUpdateName.style.background = '#fff';
  imports.mainInit.carUpdateName.value = item.name;
  imports.mainInit.carUpdateColor.value = item.color;
  imports.mainInit.carUpdate.onclick = async (e) => {
    e.preventDefault();
    const itemModel = item;
    itemModel.name = imports.mainInit.carUpdateName.value;
    carsItemInit.itemName.textContent = itemModel.name;
    itemModel.color = imports.mainInit.carUpdateColor.value;
    carsItemInit.itemColor.style.fill = item.color;
    imports.mainInit.carUpdate.onclick = null;
    await fetch(`http://127.0.0.1:3000/garage/${item.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: imports.mainInit.carUpdateName.value,
        color: imports.mainInit.carUpdateColor.value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    imports.mainInit.carUpdateName.style.background = 'grey';
    imports.mainInit.carUpdateName.value = '';
    imports.mainInit.carUpdateColor.value = '#eeeeee';
  };
};

const showWinnerMessage = (elem: HTMLElement, startTime: number, race = '') => {
  imports.mainInit.carReset.classList.remove('unactiv');
  const finishTime = new Date().getTime();
  imports.mainInit.winnerName.textContent = (
    elem.querySelector('.cars__name') as HTMLElement
  ).textContent;
  FIRST_CAR_TIME = (finishTime - startTime) / 1000;
  imports.mainInit.winnerTime.textContent = FIRST_CAR_TIME.toString();
  if (race) imports.mainInit.winnerMessage.style.display = 'block';
  brokenCars = 0;
};

const checkBrokenCars = () => {
  if (brokenCars === CARS_ON_PAGE) {
    imports.mainInit.carReset.classList.remove('unactiv');
  }
};

export const getCarEngine = async (
  id: number,
  status: string,
  elem: HTMLElement,
  race = ''
): Promise<void> => {
  const carsItemInit = new CarsItemInit(elem);
  const carTrackWidth = carsItemInit.carContainer.offsetWidth - 90; // 90 - car model width
  const responsStatus = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=${status}`);
  const result: CarStarted = await responsStatus.json();
  let carBroken = false;
  if (status === 'started') {
    startedCarStyle(carsItemInit);
    const startTime = new Date().getTime();
    (function setCarMovement() {
      const currTime = new Date().getTime();
      const newCarShift =
        ((currTime - startTime) / 1000) *
        (carTrackWidth / (result.distance / result.velocity / 1000));
      carsItemInit.carModelContainer.style.left = `${newCarShift}px`;
      const carModelShift = carsItemInit.carModelContainer.offsetLeft;
      if (newCarShift <= carTrackWidth && !carBroken) {
        recId = window.requestAnimationFrame(setCarMovement);
      }
      if (
        newCarShift >= carTrackWidth &&
        FIRST_CAR_TIME === 0 &&
        !carBroken &&
        race &&
        carModelShift !== 0
      ) {
        showWinnerMessage(elem, startTime, race);
        appendWinner(id, FIRST_CAR_TIME);
      }
    })();
    const responseDrive = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`);
    if (responseDrive.status === 500) {
      carBroken = true;
      brokenCars += 1;
      checkBrokenCars();
    }
  } else if (status === 'stopped') {
    stoppedCarStyle(carsItemInit, recId);
  }
};

const carItemBtnsInit = (elem: HTMLElement, item: CarObject) => {
  const carsItemInit = new CarsItemInit(elem);
  carsItemInit.carSelect.onclick = () => {
    imports.mainInit.carUpdateName.focus();
    patchCar(elem, item);
  };
  carsItemInit.carStart.onclick = async () => {
    brokenCars = 0;
    imports.mainInit.carRace.classList.add('unactiv');
    imports.mainInit.carCreate.classList.add('unactiv');
    imports.mainInit.generateCars.classList.add('unactiv');
    carsItemInit.carStart.classList.add('car__start_pending');
    await getCarEngine(item.id, 'started', elem);
  };
  carsItemInit.carStop.onclick = async () => {
    await getCarEngine(item.id, 'stopped', elem);
    checkStoppedCars();
  };
};

const getSevenCars = async (page: number) => {
  const respSeven = await fetch(`http://127.0.0.1:3000/garage?_page=${page}&_limit=7`);
  const resultSeven: CarObject[] = await respSeven.json();
  CARS_ON_PAGE = resultSeven.length;
  imports.main.carsContainer.element.innerHTML = '';
  const carsArray: HTMLElement[] = [];
  resultSeven.forEach((item) => {
    const carsItem = new CarsItem(item.name, item.color);
    imports.main.carsContainer.element.appendChild(carsItem.element);
    carItemBtnsInit(carsItem.element, item);
    const carsItemInit = new CarsItemInit(carsItem.element);
    carsItemInit.carRemove.onclick = async () => {
      await deletCar(item.id);
      await getSevenCars(selectPage);
      changePageBtnsStyle(selectPage, allCarsAmount);
      singleCarRemovedStyle();
    };
    carsArray.push(carsItem.element);
  });
  imports.mainInit.carRace.onclick = async () => {
    imports.disableBtns();
    chageItemBtnsState('disable');
    carsArray.forEach(async (autoItem, index) => {
      (autoItem.querySelector('.cars__start') as HTMLElement).classList.add('car__start_pending');
      await getCarEngine(resultSeven[index].id, 'started', autoItem, 'race');
    });
  };
  imports.mainInit.carReset.onclick = async () => {
    imports.mainInit.carReset.classList.add('unactiv');
    hideWinnerMessage();
    const promises = carsArray.map(async (autoItem, index) => {
      await getCarEngine(resultSeven[index].id, 'stopped', autoItem, 'race');
    });
    Promise.all(promises).then(() => {
      checkStoppedCars();
      changePageBtnsStyle(selectPage, allCarsAmount);
      FIRST_CAR_TIME = 0;
      brokenCars = 0;
    });
  };
};

export async function getCars(): Promise<void> {
  const response = await fetch('http://127.0.0.1:3000/garage');
  const result: CarObject[] = await response.json();

  allCarsAmount = result.length;
  changePageBtnsStyle(selectPage, allCarsAmount);

  await getSevenCars(1);
  imports.mainInit.carsAmount.textContent = `${allCarsAmount}`;
}

export async function postCar(type = false): Promise<void> {
  if (type) {
    car.name = `${auto.mark[getRandomValue()]} ${auto.model[getRandomValue()]}`;
    car.color = getRandomColor();
  } else {
    imports.mainInit.createCar();
    if (car.color === '') car.color = imports.mainInit.carColor.value;
  }

  await fetch('http://127.0.0.1:3000/garage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(car),
  });

  if (!type) {
    allCarsAmount += 1;
    imports.mainInit.carsAmount.textContent = `${allCarsAmount}`;
  }
  changePageBtnsStyle(selectPage, allCarsAmount);
}

imports.mainInit.carCreate.onclick = async () => {
  await postCar();
  await getSevenCars(selectPage);
  imports.mainInit.carColor.value = '#ffffff';
  imports.mainInit.carName.value = '';
};

imports.mainInit.generateCars.onclick = async () => {
  allCarsAmount += 100;
  imports.mainInit.carsAmount.textContent = `${allCarsAmount}`;
  let amount = 0;
  while (amount < 100) {
    postCar(true);
    if (amount < 6) getSevenCars(selectPage);
    amount += 1;
  }
};

imports.mainInit.pageBtns.forEach((btn) =>
  btn.addEventListener('click', async () => {
    if (btn.classList.contains('main__next')) selectPage += 1;
    if (btn.classList.contains('main__prev')) selectPage -= 1;
    changePageBtnsStyle(selectPage, allCarsAmount);
    hideWinnerMessage();
    singleCarRemovedStyle();
    imports.mainInit.pagesAmount.textContent = selectPage.toString();
    await getSevenCars(selectPage);
  })
);
