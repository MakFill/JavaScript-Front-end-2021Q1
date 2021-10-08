import './winners.css';
import BaseComponent from '../base-component';
import WinnersContainer from './winners-container';
import WinnersBtn from './winners-pages-btn';

export default class Winners extends BaseComponent {
  winnersContainer = new WinnersContainer();

  winnersPagesBtn = new WinnersBtn();

  constructor() {
    super('section', ['main__winners', 'winners']);
    this.element.innerHTML = `
    <h2 class="main__title">Winners (<span class="main__winners-value">0</span>)</h2>
    <p class="main__page">Page #<span class="main__winners-page-value">1</span></p>
    <div class="table-header">
    <p class="table-header__word table-number">Number</p>
    <p class="table-header__word table-car">Car</p>
    <p class="table-header__word table-name">Name</p>
    <p class="table-header__word table-wins">Wins
      <span class="wins-arrow-up arrow">&#8657;</span>
      <span class="wins-arrow-down arrow">&#8659;</span>
    </p>
    <p class="table-header__word table-time">Best time(seconds)    <span class="time-arrow-up arrow">&#8657;</span>
    <span class="time-arrow-down arrow">&#8659;</span>
    </p>
    </div>
    `;

    this.element.appendChild(this.winnersContainer.element);
    this.element.appendChild(this.winnersPagesBtn.element);
  }
}
