import './card.css';
import BaseComponent from '../base-component';

export default class Card extends BaseComponent {
  isRotate = false;

  constructor(readonly image: string) {
    super('section', ['card-container']);

    this.element.innerHTML = `
      <div class="card">
          <div class="card__front" style="background-image: url('../public/images/${image}')"></div>
          <div class="card__back"></div>
      </div>
      `;
  }

  rotateToBack(): Promise<void> {
    this.isRotate = true;
    return this.rotate(true);
  }

  rotateToFront(): Promise<void> {
    this.isRotate = false;
    return this.rotate();
  }

  private rotate(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle('rotate', isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
