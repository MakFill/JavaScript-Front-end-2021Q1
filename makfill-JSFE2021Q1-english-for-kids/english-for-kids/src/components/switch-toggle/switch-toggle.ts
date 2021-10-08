import BaseComponent from '../base-component';
import './switch-toggle.css';

export default class SwitchToggle extends BaseComponent {
  constructor() {
    super('div', ['toggle-container']);
    this.element.innerHTML = `
    <! -- Author Katherine Kato -->
    <div class="toggle">
    <div class="toggle-train toggle-active">Train</div>
    <div class="toggle-play">Play</div>
    <input type="checkbox" name="toggle" class="check-checkbox" id="mytoggle">
    <label class="check-label" for="mytoggle">
      <div id="background"></div>
      <span class="face">
        <span class="face-container">
          <span class="eye left"></span>
          <span class="eye right"></span>
          <span class="mouth"></span>
        </span>
      </span>
    </label>
  </div>
    `;
  }
}
