import { createStore } from 'redux';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import HeaderInit from './components/header/header-init';
import Main from './components/main/main';
import StatResetRepeatBtns from './components/main/statistic/stat-reset-repeat-btns';
import StatSortBtns from './components/main/statistic/stat-sort-btns';
import StatisticPage from './components/main/statistic/statistic-page';
import RotateSprite from './components/rotate-sprite';
import Sidebar from './components/sidebar/sidebar';
import StartBtn from './components/start-btn/start-btn';
import rootReducer from './redux/rootReducer';

class Imports {
  header = new Header();

  headerInit = new HeaderInit(this.header.element);

  rotateSprite = new RotateSprite();

  main = new Main();

  startBtn = new StartBtn();

  sidebar = new Sidebar();

  footer = new Footer();

  statisticPage = new StatisticPage();

  statSortBtns = new StatSortBtns();

  statResetRepeatBtns = new StatResetRepeatBtns();
}

export const store = createStore(rootReducer);
export const { cards } = store.getState();
export const { cardType } = store.getState();

const imports = new Imports();
export default imports;
