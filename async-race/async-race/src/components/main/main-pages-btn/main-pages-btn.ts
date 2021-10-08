import BaseComponent from '../../base-component';
import './main-pages-btn.css';

export default class MainPagesBtn extends BaseComponent {
  constructor() {
    super('div', ['main__pages-btn']);
    this.element.innerHTML = `
    <button class="main__prev page-btns btn unactiv">prev</button>
    <button class="main__next page-btns btn unactiv">next</button>
    `;
  }
}
