import BaseComponent from '../base-component';
import './main-title.css';

export default class MainTitle extends BaseComponent {
  constructor() {
    super('section', ['main__header']);
    this.element.innerHTML = `
    <h2 class="main__title">Garage (<span class="main__auto-value">0</span>)</h2>
    <p class="main__page">Page #<span class="main__page-value">1</span></p>
    `;
  }
}
