import App from './app';
import { getScore } from './components/indexedDB/indexedDB';
import imports from './imports';

const locationResolver = async (location: string): Promise<void> => {
  switch (location) {
    case '#/':
      imports.main.element.innerHTML = '';
      imports.main.element.appendChild(imports.aboutGame.element);
      imports.header.aboutStyle();
      break;
    case '#/game/':
      imports.main.element.innerHTML = '';
      await new App().start();
      imports.header.gameStyle();
      break;
    case '#/settings/':
      imports.main.element.innerHTML = '';
      imports.main.element.appendChild(imports.settings.element);
      imports.header.settingsStyle();
      break;
    case '#/score/':
      getScore();
      imports.main.element.innerHTML = '';
      imports.main.element.appendChild(imports.score.element);
      imports.header.scoreStyle();
      break;
    default:
      imports.main.element.innerHTML = '';
      break;
  }
};

export default locationResolver;
