import imports from '../imports';
import BaseComponent from './base-component';

export default class AppContainer extends BaseComponent {
  constructor() {
    super('div', ['app-container']);
    this.element.appendChild(imports.header.element);
    this.element.appendChild(imports.rotateSprite.element);
    this.element.appendChild(imports.main.element);
    this.element.appendChild(imports.sidebar.element);
    this.element.appendChild(imports.footer.element);
  }
}
