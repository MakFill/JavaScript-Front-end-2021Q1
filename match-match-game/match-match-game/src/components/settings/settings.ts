import BaseComponent from '../base-component';
import './settings.css';

export default class Settings extends BaseComponent {
  constructor() {
    super('article', ['settings']);
    this.element.innerHTML = `
    <p class="settings__name">Game cards</p>
      <select class="settings__select type">
        <option value="0" selected disabled>select game cards type</option>
        <option value="0">Animals</option>
        <option value="1">Football logos</option>
      </select>
      <p class="settings__name">Difficulty</p>
      <select class="settings__select difficult">
        <option value="4" selected disabled>select game type</option>
        <option value="4">4х2</option>
        <option value="8">4х4</option>
        <option value="18">6х6</option>
      </select>
      `;
  }
}
