import BaseComponent from '../base-component';

export default class HeaderInit extends BaseComponent {
  constructor(private header: HTMLElement) {
    super();
  }

  private logo = this.header.querySelector('.header__logo') as HTMLElement;

  private btnStart = this.header.querySelector('.start__btn') as HTMLElement;

  private btnStop = this.header.querySelector('.stop__btn') as HTMLElement;

  private navSettings = this.header.querySelector('.nav__settings') as HTMLElement;

  private navAbout = this.header.querySelector('.nav__description') as HTMLElement;

  private navScore = this.header.querySelector('.nav__score') as HTMLElement;

  private navItems = this.header.querySelectorAll('.nav__item');

  gameStyle(): void {
    this.removeNavigationActive();
    this.btnStart.style.display = 'none';
    this.btnStop.style.display = 'block';
  }

  aboutStyle(): void {
    this.removeNavigationActive();
    this.addActiveStyle(this.navAbout);
  }

  settingsStyle(): void {
    this.removeNavigationActive();
    this.addActiveStyle(this.navSettings);
  }

  scoreStyle(): void {
    this.removeNavigationActive();
    this.addActiveStyle(this.navScore);
  }

  btnsInit(): void {
    this.logo.onclick = () => {
      window.location.hash = '#/';
      this.aboutStyle();
    };

    this.btnStart.onclick = () => {
      window.location.hash = '#/game/';
      this.gameStyle();
    };

    this.btnStop.onclick = () => {
      window.location.hash = '#/';
      this.aboutStyle();
    };

    this.navSettings.onclick = () => {
      window.location.hash = '#/settings/';
      this.settingsStyle();
    };

    this.navAbout.onclick = () => {
      window.location.hash = '#/';
      this.aboutStyle();
    };

    this.navScore.onclick = () => {
      window.location.hash = '#/score/';
      this.scoreStyle();
    };
  }

  private removeNavigationActive() {
    this.navItems.forEach((item) => {
      item.classList.remove('nav__item_activ');
    });
    this.btnStop.style.display = 'none';
    this.btnStart.style.display = 'block';
  }

  private addActiveStyle = (item: HTMLElement) => {
    item.classList.add('nav__item_activ');
  };
}
