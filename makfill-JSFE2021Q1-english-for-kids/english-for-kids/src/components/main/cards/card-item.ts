import BaseComponent from '../../base-component';
import './card-item.css';

export default class CardItem extends BaseComponent {
  constructor(word: string, image: string, translation: string) {
    super('div', ['card-container']);
    this.element.innerHTML = `
    <div class="card">
    <div class="card__front">
      <div class="picture ${word}" style="background-image: 
      url(../../../../public/${image})">
      </div>
      <div class="bottom">
        <div class="name eng-name">${word}</div>
          <svg class="rotate-svg">
            <use href="#rotate-svg"></use>
          </svg>
      </div>
    </div>
    <div class="card__back">
      <div class="picture"style="background-image: url(../../../../public/${image})">
      </div>
      <div class="bottom">
        <div class="name">${translation}</div>
      </div>
    </div>
    </div>`;
  }
}
