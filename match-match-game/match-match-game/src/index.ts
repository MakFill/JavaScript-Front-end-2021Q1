import './style.css';
import './components/indexedDB/indexedDB';
import imports from './imports';
import locationResolver from './router';
import avaInit from './components/avatar/avatar';

class Index {
  private appElement = document.querySelector('body') as HTMLElement;

  indexInit() {
    this.appElement.appendChild(imports.headerLayout.element);
    imports.header.btnsInit();
    imports.validate.validateBtnsInit();
    avaInit();

    this.appElement.appendChild(imports.main.element);

    imports.main.element.appendChild(imports.aboutGame.element);
    window.location.hash = '#/';
    window.onhashchange = () => {
      locationResolver(window.location.hash);
    };
  }
}

const index = new Index();
index.indexInit();
