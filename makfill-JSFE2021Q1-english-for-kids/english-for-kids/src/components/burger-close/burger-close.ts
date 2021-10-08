import './burger-close.css';
import BaseComponent from '../base-component';

export default class BurgerClose extends BaseComponent {
  constructor() {
    super('div', ['burger-close']);
    this.element.innerHTML = `
    <input type="checkbox" id="toggle" />
    <label for="toggle"></label>
    `;
  }
}

// (document.querySelector('.burger-close') as HTMLElement).onclick = () => {
//   if ((document.querySelector('#toggle') as HTMLInputElement).checked === true) {
//     (document.querySelector('#toggle') as HTMLInputElement).checked = false;
//   } else {
//     (document.querySelector('#toggle') as HTMLInputElement).checked = true;
//   }
// };
