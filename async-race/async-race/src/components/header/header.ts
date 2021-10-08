import BaseComponent from '../base-component';
import './header.css';

export default class Header extends BaseComponent {
  constructor() {
    super('header', ['header']);
    this.element.innerHTML = `
    <button class="header__btn btn to-garage">to garage</button>
    <button class="header__btn btn to-winners">to winners</button>
    `;
  }
}
