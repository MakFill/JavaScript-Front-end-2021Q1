import BaseComponent from '../base-component';
import './sidebar.css';

export default class Sidebar extends BaseComponent {
  constructor() {
    super('aside', ['sidebar']);
    this.element.innerHTML = `
    <section class="sidebar__wrapper">
      <a class="sidebar__item sidebar__main sidebar-choosen" href="#/">Main page
      <img class="sidebar__main-img" src="../public/home.png"></a>
      <a class="sidebar__item" href="#/action-a/">Action (set A)
      <img class="sidebar__img"></a>
      <a class="sidebar__item" href="#/action-b/">Action (set B)
      <img class="sidebar__img"></a>
      <a class="sidebar__item" href="#/action-c/">Action (set C)
      <img class="sidebar__img"></a>
      <a class="sidebar__item" href="#/adjectives/">Adjectives
      <img class="sidebar__img"></a>
      <a class="sidebar__item" href="#/animal-a/">Animal (set A)
      <img class="sidebar__img"></a>
      <a class="sidebar__item" href="#/animal-b/">Animal (set B)
      <img class="sidebar__img"></a>
      <a class="sidebar__item" href="#/clothes/">Clothes
      <img class="sidebar__img"></a>
      <a class="sidebar__item" href="#/emotions/">Emotions
      <img class="sidebar__img"></a>
      <a class="sidebar__item" href="#/statistic/">Statistic
      <img class="sidebar__stat-img" src="../public/settings.jpg"></a>
    </section>
    `;
  }
}
