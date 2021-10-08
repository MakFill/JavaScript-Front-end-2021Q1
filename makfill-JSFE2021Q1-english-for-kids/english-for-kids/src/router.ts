import {
  addChoosenCards,
  addDefaultCards,
  addRepeatedCards,
  addSidebarItemUnderline,
  changePlayTrain,
} from './app';
import { fillStatistic } from './components/main/statistic/stat-fill';
import imports from './imports';
import { hashs } from './interfaces';

const locationResolver = async (location: string): Promise<void> => {
  imports.main.cardsContainer.element.innerHTML = '';
  imports.main.cardsContainer.element.classList.remove('statistic-container');
  if (location.includes('#/statistic/')) {
    imports.main.element.querySelector('.start-btn')?.remove();
    imports.main.cardsContainer.element.classList.add('statistic-container');
    fillStatistic();
    imports.main.cardsContainer.element.appendChild(imports.statisticPage.element);
  } else if (location.includes('#/repeat/')) {
    addRepeatedCards();
    imports.startBtn.element.classList.remove('repeat-btn');
  } else if (hashs.includes(location)) {
    const type = hashs.indexOf(location);
    addChoosenCards(type);
    imports.startBtn.element.classList.remove('repeat-btn');
  } else {
    addDefaultCards();
    imports.footer.element.classList.remove('display-none');
  }
  changePlayTrain();
  imports.header.starsContainer.element.innerHTML = '';
  addSidebarItemUnderline(location);
};

export default locationResolver;
