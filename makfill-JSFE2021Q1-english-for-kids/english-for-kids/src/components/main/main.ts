import BaseComponent from '../base-component';
import CardsContainer from './cards/cards-container';
import './main.css';

export default class Main extends BaseComponent {
  cardsContainer = new CardsContainer();

  constructor() {
    super('main', ['main']);
    this.element.appendChild(this.cardsContainer.element);
  }
}
