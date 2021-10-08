import BaseComponent from '../../base-component';
import './final-img.css';

export default class FinalImg extends BaseComponent {
  constructor(item: string, errors = 0) {
    super('div', ['final-img-wrapper']);
    this.element.innerHTML = `
      <img class="final-img" src="../public/img/${item}.jpg">
      <div class="img-errors">Errors: ${errors}</div>
    `;
  }
}
