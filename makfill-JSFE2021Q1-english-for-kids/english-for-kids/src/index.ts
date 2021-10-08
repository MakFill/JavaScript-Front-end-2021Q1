import { addDefaultCards, headerCheckboxesInit } from './app';
import AppContainer from './components/app-container';
import './style.css';
import locationResolver from './router';
import { store } from './imports';
import { disablePlayStatus } from './redux/actions';

const body = document.querySelector('body') as HTMLElement;
const appContainer = new AppContainer();
body.appendChild(appContainer.element);
store.dispatch(disablePlayStatus());
headerCheckboxesInit();
addDefaultCards();

window.location.hash = '#/';
window.onhashchange = () => {
  locationResolver(window.location.hash);
};
