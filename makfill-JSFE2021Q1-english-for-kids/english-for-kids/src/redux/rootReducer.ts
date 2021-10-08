import { combineReducers } from 'redux';
import cards, { cardTypes } from '../cards';

import { ActionType } from '../interfaces';
import {
  GET_STAT,
  INCREMENT_STAT,
  PLAY_FALSE,
  PLAY_TRUE,
  SORTED_TRUE,
  SORTED_FALSE,
} from './types';
import { addStatisticData } from './actions';

const isPlayReducer = (state = true, action: ActionType) => {
  if (action.type === PLAY_TRUE) {
    return true;
  }
  if (action.type === PLAY_FALSE) {
    return false;
  }

  return state;
};

const cardReducer = (state = cards) => {
  return state;
};

const cardTypesReducer = (state = cardTypes) => {
  return state;
};

const statisticReducer = (state = addStatisticData(), action: ActionType) => {
  if (action.type === INCREMENT_STAT || action.type === GET_STAT) {
    return addStatisticData();
  }
  return state;
};

const statisticSortedReducer = (state = false, action: ActionType) => {
  if (action.type === SORTED_TRUE) {
    return true;
  }
  if (action.type === SORTED_FALSE) {
    return false;
  }
  return state;
};

const rootReducer = combineReducers({
  cards: cardReducer,
  isPlay: isPlayReducer,
  cardType: cardTypesReducer,
  statistic: statisticReducer,
  sorted: statisticSortedReducer,
});

export default rootReducer;
