import BaseComponent from '../../base-component';
import StatContainer from './stat-container';
import './statistic-page.css';

export default class StatisticPage extends BaseComponent {
  statContainer = new StatContainer();

  constructor() {
    super('section', ['stat']);
    this.element.appendChild(this.statContainer.element);
  }
}
