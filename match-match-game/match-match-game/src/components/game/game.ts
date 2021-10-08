import BaseComponent from '../base-component';
import Card from '../card/card';
import CardsArea from '../cards-area/cards-area';
import delay from '../../shared/delay';
import { player, rotateDelay } from '../../shared/constants';
import { addThisPlayerScore, getScore } from '../indexedDB/indexedDB';

export default class Game extends BaseComponent {
  private readonly cardsArea = new CardsArea();

  private activeCard?: Card;

  private isAnimation = false;

  private cardCounter = 0;

  private cardLength = 0;

  private matchCount = 0;

  private wrongMatchCount = 0;

  constructor() {
    super();
    this.cardsArea = new CardsArea();
    this.element.appendChild(this.cardsArea.element);
  }

  async newGame(images: string[]): Promise<void> {
    this.cardsArea.clear();

    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach(async (card) => {
      card.element.addEventListener('click', () => {
        this.cardHandler(card);
      });
      this.cardLength += 1;
    });

    this.cardsArea.addCards(cards);
    this.cardsArea.timerInterval.startTimer();
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isRotate) return;

    this.isAnimation = true;
    await card.rotateToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard.image !== card.image) {
      this.activeCard.element.classList.add('card-wrong');
      card.element.classList.add('card-wrong');
      await delay(rotateDelay);
      await Promise.all([this.activeCard.rotateToBack(), card.rotateToBack()]);
      this.activeCard.element.classList.remove('card-wrong');
      card.element.classList.remove('card-wrong');
      this.wrongMatchCount += 1;
    } else {
      this.activeCard.element.classList.add('card-right');
      card.element.classList.add('card-right');
      this.cardCounter += 1;
    }
    this.activeCard = undefined;
    this.isAnimation = false;
    this.matchCount += 1;
    if (this.cardCounter === this.cardLength / 2) {
      const count = this.matchCount;
      const wrongCount = this.wrongMatchCount;
      const timerCount = this.cardsArea.timerInterval.timerCounter;
      const finalScore = (count - wrongCount) * 100 - timerCount * 10;
      player.score = finalScore;
      addThisPlayerScore();
      getScore();
      setTimeout(() => this.cardsArea.timerInterval.showFinalPopup(), 500);
      this.matchCount = 0;
      this.wrongMatchCount = 0;
    }
  }
}
