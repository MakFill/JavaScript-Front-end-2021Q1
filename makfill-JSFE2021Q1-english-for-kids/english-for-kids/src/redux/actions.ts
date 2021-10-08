import { ActionType, StatisticItem, StatisticItemClass } from '../interfaces';
import cards from '../cards';

import {
  GET_STAT,
  INCREMENT_STAT,
  PLAY_FALSE,
  PLAY_TRUE,
  SORTED_FALSE,
  SORTED_TRUE,
} from './types';

export const enablePlayStatus = (): ActionType => {
  return { type: PLAY_TRUE };
};

export const disablePlayStatus = (): ActionType => {
  return { type: PLAY_FALSE };
};

export const changeSortedStyleToTrue = (): ActionType => {
  return { type: SORTED_TRUE };
};

export const changeSortedStyleToFalse = (): ActionType => {
  return { type: SORTED_FALSE };
};

export const incrementStatistic = (): ActionType => {
  return { type: INCREMENT_STAT };
};

export const getStatistic = (): ActionType => {
  return { type: GET_STAT };
};

export const addStatisticData = (): StatisticItem[] => {
  const storage = localStorage.getItem('statCards');

  if (!storage) {
    const allStatistic: StatisticItem[] = [];
    cards.forEach((item) => {
      item.forEach((wordItem) => {
        const statObj = new StatisticItemClass(wordItem.word);
        allStatistic.push(statObj);
      });
    });

    localStorage.setItem('statCards', JSON.stringify(allStatistic));

    return allStatistic;
  }

  return JSON.parse(storage);
};
