import { ObjectsArray } from '../../shared/constants';
import BaseComponent from '../base-component';

export default class PlayerScore extends BaseComponent {
  constructor(private player: ObjectsArray) {
    super('div', ['score__item']);
    this.element.innerHTML = `
    <img class="score__img" src="${player.avatar || '../public/avatar.svg'}" alt="" />
        <div class="score__player">
          <p class="score__name">${player.name}</p>
          <p class="score__mail">${player.email}</p>
        </div>
        <p class="score__value">Score:<span class="score__number">${player.score}</span></p>
        <hr />
    `;
  }
}
