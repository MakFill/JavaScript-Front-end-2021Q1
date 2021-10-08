import AboutGame from './components/about-game/about-game';
import Header from './components/header/header';
import HeaderInit from './components/header/headerInit';
import RegistrPopup from './components/header/headerRegPopup';
import Main from './components/main/main';
import Score from './components/score/score';
import Settings from './components/settings/settings';
import SettingsValue from './components/settings/settingsValue';
import Validate from './components/validate/validate';

class Imports {
  main = new Main();

  headerRegPopup: RegistrPopup = new RegistrPopup();

  headerLayout = new Header(this.headerRegPopup.element);

  header: HeaderInit = new HeaderInit(this.headerLayout.element);

  validate: Validate = new Validate(this.headerLayout.element);

  aboutGame: AboutGame = new AboutGame();

  settings: Settings = new Settings();

  settingsInit: SettingsValue = new SettingsValue(this.settings.element);

  score: Score = new Score();
}

const imports = new Imports();
export default imports;
