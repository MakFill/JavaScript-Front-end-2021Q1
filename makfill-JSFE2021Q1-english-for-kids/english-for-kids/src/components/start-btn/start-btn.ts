import BaseComponent from '../base-component';
import './start-btn.css';

export default class StartBtn extends BaseComponent {
  constructor() {
    super('button', ['start-btn']);
    this.element.textContent = 'Start game';
  }
}
