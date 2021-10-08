export default class HeaderInit {
  constructor(private item: HTMLElement) {}

  burger = this.item.querySelector('.burger-close') as HTMLElement;

  burgerCheckbox = this.burger.querySelector('#toggle') as HTMLInputElement;

  switchToggle = this.item.querySelector('.toggle-container') as HTMLElement;

  switchCheckbox = this.switchToggle.querySelector('#mytoggle') as HTMLInputElement;

  switchTrain = this.switchToggle.querySelector('.toggle-train') as HTMLElement;

  switchPlay = this.switchToggle.querySelector('.toggle-play') as HTMLElement;
}
