export const hashs: string[] = [
  '#/action-a/',
  '#/action-b/',
  '#/action-c/',
  '#/adjectives/',
  '#/animal-a/',
  '#/animal-b/',
  '#/clothes/',
  '#/emotions/',
];

export interface CardItemData {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
}

export interface StatisticItem {
  word: string;
  trainClicks: number;
  guessed: number;
  fails: number;
}

export interface ActionType {
  type: string;
}

export class StatisticItemClass {
  readonly word;

  trainClicks = 0;

  guessed = 0;

  fails = 0;

  constructor(word: string) {
    this.word = word;
  }
}
