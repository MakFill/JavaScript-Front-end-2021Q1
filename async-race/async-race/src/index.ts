import './style.css';
import './components/svg-sprite/svg-sprite';

import { getCars } from './app';
import imports from './imports';
import { getTenWinners, getWinners } from './winners-app';

const body = document.querySelector('body') as HTMLElement;
body.appendChild(imports.header.element);
body.appendChild(imports.main.element);

getCars();
getWinners();
getTenWinners(1);
