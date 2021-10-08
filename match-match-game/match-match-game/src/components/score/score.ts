import BaseComponent from '../base-component';
import './score.css';

export default class Score extends BaseComponent {
  constructor() {
    super('article', ['score']);
    this.element.innerHTML = '<h2 class="score__header">Best players:</h2>';
  }
}
