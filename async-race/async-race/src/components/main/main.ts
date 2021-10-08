import BaseComponent from '../base-component';
import CarsContainer from '../cars-container/cars-container';
import MainForms from '../main-forms/main-forms';
import MainTitle from '../main-title/main-title';
import CarSprite from '../svg-sprite/svg-sprite';
import Winners from '../winners/winners';
import MainPagesBtn from './main-pages-btn/main-pages-btn';
import './main.css';
import WinnerMessage from './winner-message/winner-message';

export default class Main extends BaseComponent {
  private mainForms = new MainForms();

  private mainTitle = new MainTitle();

  carsContainer = new CarsContainer();

  mainPagesBtn = new MainPagesBtn();

  private carSprite = new CarSprite();

  winnerMessage = new WinnerMessage();

  winnersPage = new Winners();

  constructor() {
    super('main', ['main']);
    this.element.appendChild(this.carSprite.element);
    this.element.appendChild(this.winnersPage.element);
    this.element.appendChild(this.mainForms.element);
    this.element.appendChild(this.mainTitle.element);
    this.element.appendChild(this.carsContainer.element);
    this.element.appendChild(this.mainPagesBtn.element);
    this.element.appendChild(this.winnerMessage.element);
  }
}
