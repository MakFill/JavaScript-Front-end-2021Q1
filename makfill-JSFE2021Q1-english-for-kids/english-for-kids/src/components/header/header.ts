import BaseComponent from '../base-component';
import BurgerClose from '../burger-close/burger-close';
import SwitchToggle from '../switch-toggle/switch-toggle';
import './header.css';
import StarsContainer from './stars-container';

export default class Header extends BaseComponent {
  burgerClose = new BurgerClose();

  switcnToggle = new SwitchToggle();

  starsContainer = new StarsContainer();

  constructor() {
    super('header', ['header', 'container']);
    this.element.appendChild(this.burgerClose.element);
    this.element.appendChild(this.starsContainer.element);
    this.element.appendChild(this.switcnToggle.element);
  }
}
