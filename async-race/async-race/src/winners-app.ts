import WinnersItem from './components/winners/winners-item';
import imports from './imports';
import { CarObject, WinnerItem } from './shared/interfaces';

let allWinnersAmount = 0;
let winnersPageAmount = 1;
let ORDER = false;
let SORTED_TYPE = '';

async function getCar(id: number): Promise<CarObject> {
  const response = await fetch(`http://127.0.0.1:3000/garage/${id}`);
  const result: CarObject = await response.json();
  return result;
}

export const getWinners = async (): Promise<WinnerItem[]> => {
  const responce = await fetch(`http://127.0.0.1:3000/winners`);
  const result: WinnerItem[] = await responce.json();
  allWinnersAmount = result.length;
  return result;
};

const postWinner = async (item: WinnerItem) => {
  SORTED_TYPE = '';
  await fetch('http://127.0.0.1:3000/winners', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  allWinnersAmount += 1;
  imports.mainInit.winnersAmount.textContent = allWinnersAmount.toString();
};

const patchWinner = async (id: number, time: number) => {
  const responce = await fetch(`http://127.0.0.1:3000/winners/${id}`);
  const result: WinnerItem = await responce.json();
  const carWins = result.wins + 1;
  let patchedTime = result.time;
  if (patchedTime > time) patchedTime = time;
  await fetch(`http://127.0.0.1:3000/winners/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      wins: carWins,
      time: patchedTime,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  });
};

const changeWinnersBtnsStyle = (page: number, amount: number, pagination = 10) => {
  if (page === 1) {
    imports.mainInit.winnersPrev.classList.add('unactiv');
  } else {
    imports.mainInit.winnersPrev.classList.remove('unactiv');
  }
  if (Math.ceil(amount / pagination) === page || Math.ceil(amount / pagination) === 0) {
    imports.mainInit.winnersNext.classList.add('unactiv');
  } else {
    imports.mainInit.winnersNext.classList.remove('unactiv');
  }
};

const showWinnersArrows = (type: string, order: string) => {
  imports.mainInit.allArrows.forEach((item) => {
    item.classList.remove('arrowBlock');
  });
  if (order === 'ASC') {
    if (type === 'wins') {
      imports.mainInit.winsArrowDown.classList.add('arrowBlock');
    } else {
      imports.mainInit.timeArrowDown.classList.add('arrowBlock');
    }
  } else if (type === 'wins') {
    imports.mainInit.winsArrowUp.classList.add('arrowBlock');
  } else {
    imports.mainInit.timeArrowUp.classList.add('arrowBlock');
  }
};

const getOrder = (curentOrder: boolean) => {
  if (curentOrder) {
    return 'DESC';
  }
  return 'ASC';
};

const sortWinners = async (type: string, clickOnPageBtn = false) => {
  if (type) {
    // Check if table needs to sort
    let order: string;
    if (!clickOnPageBtn) {
      if ((type === 'time' && ORDER) || (type === 'wins' && ORDER)) {
        order = 'DESC';
        ORDER = false;
      } else {
        order = 'ASC';
        ORDER = true;
      }
    }
    showWinnersArrows(type, (order = getOrder(ORDER)));

    const responce = await fetch(
      `http://127.0.0.1:3000/winners?_page=${winnersPageAmount}&_limit=10&_sort=${type}&_order=${order}`
    );

    const winnersTable: WinnerItem[] = await responce.json();
    const winnerCar: CarObject[] = [];
    const promise = winnersTable.map(async (item) => {
      winnerCar.push(await getCar(item.id));
    });

    Promise.all(promise).then(() => {
      const winnersElements =
        imports.mainInit.winnersContainer.querySelectorAll('.winners__item-car');
      winnersElements.forEach((el, index) => {
        const color = el.querySelector('.winners__model') as HTMLElement;
        const name = el.querySelector('.winners__name') as HTMLElement;
        const wins = el.querySelector('.winners__wins') as HTMLElement;
        const time = el.querySelector('.winners__time') as HTMLElement;
        color.style.fill = winnerCar[index].color;
        name.textContent = winnerCar[index].name;
        wins.textContent = winnersTable[index].wins.toString();
        time.textContent = winnersTable[index].time.toString();
      });
    });
  }
};

export const getTenWinners = async (page: number, sort = ''): Promise<void> => {
  const responce = await fetch(`http://127.0.0.1:3000/winners?_page=${page}&_limit=10${sort}`);

  const result: WinnerItem[] = await responce.json();

  imports.mainInit.winnersContainer.innerHTML = '';
  const winnersArray: CarObject[] = [];
  const promises = result.map(async (item) => {
    winnersArray.push(await getCar(item.id));
  });

  await Promise.all(promises).then(() => {
    result.sort((a, b) => a.id - b.id);
    winnersArray.sort((a, b) => a.id - b.id);
    result.forEach((item, index) => {
      const winnerExample = new WinnersItem(
        winnersArray[index].color,
        winnersArray[index].name,
        item.time,
        item.wins,
        index + 1 + (page - 1) * 10 // cars number
      );
      imports.mainInit.winnersContainer.appendChild(winnerExample.element);
    });
  });

  imports.mainInit.winnersAmount.textContent = allWinnersAmount.toString();
  changeWinnersBtnsStyle(winnersPageAmount, allWinnersAmount);
};

imports.mainInit.winnersBtns.forEach((btn) => {
  btn.addEventListener('click', async () => {
    if (btn.classList.contains('winners__next')) {
      winnersPageAmount += 1;
    }
    if (btn.classList.contains('winners__prev')) {
      winnersPageAmount -= 1;
    }
    changeWinnersBtnsStyle(winnersPageAmount, allWinnersAmount);
    imports.mainInit.winnersSelectedPage.textContent = winnersPageAmount.toString();
    await getTenWinners(winnersPageAmount);
    await sortWinners(SORTED_TYPE, true);
  });
});

export const appendWinner = async (id: number, time: number, wins = 1): Promise<void> => {
  const item = {
    id,
    wins,
    time,
  };

  imports.mainInit.allArrows.forEach((itemArrow) => {
    itemArrow.classList.remove('arrowBlock');
  });

  const allWinners: WinnerItem[] = await getWinners();

  let winnersConsistId = false;
  allWinners.forEach((win): void => {
    if (win.id === id) winnersConsistId = true;
  });
  if (winnersConsistId) {
    await patchWinner(id, time);
  } else {
    await postWinner(item);
  }
  await getTenWinners(winnersPageAmount);
};

export const deleteWinner = async (id: number): Promise<void> => {
  await fetch(`http://127.0.0.1:3000/winners/${id}`, {
    method: 'DELETE',
  });

  await getWinners();

  if (
    Math.ceil(allWinnersAmount / 10) < winnersPageAmount &&
    allWinnersAmount !== 0 &&
    winnersPageAmount > 1
  ) {
    winnersPageAmount -= 1;
  }

  imports.mainInit.winnersSelectedPage.textContent = winnersPageAmount.toString();

  getTenWinners(winnersPageAmount);
  changeWinnersBtnsStyle(winnersPageAmount, allWinnersAmount);
};

imports.mainInit.winnersTimeBtn.onclick = async () => {
  SORTED_TYPE = 'time';
  await sortWinners(SORTED_TYPE);
};

imports.mainInit.winnersWinsBtn.onclick = async () => {
  SORTED_TYPE = 'wins';
  await sortWinners(SORTED_TYPE);
};
