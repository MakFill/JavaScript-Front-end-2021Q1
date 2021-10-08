import {
  changeSortedStyleToFalse,
  changeSortedStyleToTrue,
  getStatistic,
  incrementStatistic,
} from '../../../redux/actions';
import imports, { cards, cardType, store } from '../../../imports';
import { CardItemData, StatisticItem } from '../../../interfaces';
import StatType from './stat-type';
import StatWord from './stat-word';

const returnStataIndex = (stata: StatisticItem[], word: CardItemData) => {
  let stataIndex = 0;
  stata.forEach((item, index) => {
    if (item.word === word.word) {
      stataIndex = index;
    }
  });
  return stataIndex;
};

const addSortFunc = (itemClass: string) => {
  const currentArray: HTMLElement[] = [];
  (
    imports.statisticPage.element.querySelectorAll('.stat__word') as NodeListOf<HTMLElement>
  ).forEach((item) => {
    currentArray.push(item);
  });

  currentArray.sort((a, b) => {
    if (itemClass !== '.stat-item__word') {
      const firstWord: number = +(
        a.querySelector(itemClass) as HTMLParagraphElement
      ).innerText.replace(/[^\d]/g, '');
      const secondWord: number = +(
        b.querySelector(itemClass) as HTMLParagraphElement
      ).innerText.replace(/[^\d]/g, '');

      return firstWord - secondWord;
    }
    const firstWord: string = (a.querySelector('.stat-item__word') as HTMLParagraphElement)
      .innerText;
    const secondWord: string = (b.querySelector('.stat-item__word') as HTMLParagraphElement)
      .innerText;

    return firstWord.localeCompare(secondWord);
  });

  if (store.getState().sorted) {
    store.dispatch(changeSortedStyleToFalse());
  } else {
    store.dispatch(changeSortedStyleToTrue());
    currentArray.reverse();
  }
  if (itemClass !== '.stat-item__word') currentArray.reverse();
  imports.statisticPage.statContainer.element.innerHTML = '';
  currentArray.forEach((item) => {
    item.classList.add('sorted-item');
    imports.statisticPage.statContainer.element.appendChild(item);
  });
};

const statBtnsInit = () => {
  const alphabetSort = imports.statSortBtns.element.querySelector('.alphabet') as HTMLButtonElement;
  const trainClicksSort = imports.statSortBtns.element.querySelector(
    '.train-clicks'
  ) as HTMLButtonElement;
  const timesGuessedSort = imports.statSortBtns.element.querySelector(
    '.times-guessed'
  ) as HTMLButtonElement;
  const failsSort = imports.statSortBtns.element.querySelector('.fails') as HTMLButtonElement;
  const successRateSort = imports.statSortBtns.element.querySelector(
    '.success-rate'
  ) as HTMLButtonElement;
  const repeat = imports.statResetRepeatBtns.element.querySelector('.repeat') as HTMLButtonElement;

  alphabetSort.onclick = () => addSortFunc('.stat-item__word');

  trainClicksSort.onclick = () => addSortFunc('.stat-item__train-clicks');

  timesGuessedSort.onclick = () => addSortFunc('.stat-item__times-guessed');

  failsSort.onclick = () => addSortFunc('.stat-item__fails');

  successRateSort.onclick = () => addSortFunc('.stat-item__rate');

  repeat.onclick = () => {
    window.location.hash = '#/repeat/';
  };
};

export const fillStatistic = (): void => {
  const stata: StatisticItem[] = JSON.parse(localStorage.statCards);
  imports.statisticPage.statContainer.element.innerHTML = '';
  cardType.forEach((type, index) => {
    const wordType = new StatType(type);

    cards[index].forEach((word) => {
      const stataIndex = returnStataIndex(stata, word);
      const rate = 100 - +(stata[stataIndex].fails / stata[stataIndex].guessed).toFixed(2) * 100;
      const statWord = new StatWord(
        word.word,
        type,
        word.translation,
        stata[stataIndex].trainClicks,
        stata[stataIndex].guessed,
        stata[stataIndex].fails,
        rate || 0
      );
      wordType.element.appendChild(statWord.element);
    });
    imports.statisticPage.element.appendChild(imports.statSortBtns.element);
    imports.statisticPage.element.appendChild(imports.statResetRepeatBtns.element);
    imports.statisticPage.statContainer.element.appendChild(wordType.element);
    statBtnsInit();
    const reset = imports.statResetRepeatBtns.element.querySelector('.reset') as HTMLButtonElement;
    reset.onclick = () => {
      localStorage.clear();
      store.dispatch(getStatistic());
      fillStatistic();
    };
  });
};

export const setValueToStorage = (word: string, actionType: string): void => {
  const stata: StatisticItem[] = JSON.parse(localStorage.statCards);
  if (actionType === 'trainClicks' || actionType === 'guessed' || actionType === 'fails') {
    stata.forEach((el) => {
      const itemElement = el;
      if (itemElement.word === word) itemElement[actionType] += 1;
    });
    localStorage.setItem('statCards', JSON.stringify(stata));
  }
  store.dispatch(incrementStatistic());
};
