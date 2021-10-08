import BaseComponent from '../base-component';

export default class SettingsValue extends BaseComponent {
  constructor(private settings: HTMLElement) {
    super();
  }

  settingsType = this.settings.querySelector('.type') as HTMLInputElement;

  settingsDifficult = this.settings.querySelector('.difficult') as HTMLInputElement;
}
