import Header from './components/header/header';
import HeaderInit from './components/header/header-init';
import Main from './components/main/main';
import MainInit from './components/main/main-init';

class Imports {
  header = new Header();

  main = new Main();

  mainInit = new MainInit(this.main.element);

  headerInit = new HeaderInit(this.header.element);

  constructor() {
    this.headerInit.garageBtn.onclick = () => {
      this.mainInit.winnersPage.style.display = 'none';
    };

    this.headerInit.winnersBtn.onclick = () => {
      this.mainInit.winnersPage.style.display = 'block';
    };
  }

  disableBtns = () => {
    this.mainInit.generateCars.classList.add('unactiv');
    this.mainInit.carCreate.classList.add('unactiv');
    this.mainInit.carUpdate.classList.add('unactiv');
    this.mainInit.carRace.classList.add('unactiv');
    this.mainInit.nextBtn.classList.add('unactiv');
    this.mainInit.prevBtn.classList.add('unactiv');
  };

  enableBtns = () => {
    this.mainInit.generateCars.classList.remove('unactiv');
    this.mainInit.carCreate.classList.remove('unactiv');
    this.mainInit.carUpdate.classList.remove('unactiv');
    this.mainInit.carRace.classList.remove('unactiv');
  };
}

const imports = new Imports();
export default imports;
