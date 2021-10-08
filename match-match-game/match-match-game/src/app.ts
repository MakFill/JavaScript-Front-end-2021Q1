import Game from './components/game/game';
import preloadImages from './components/game/preload-images';
import imports from './imports';
import ImageCategory from './models/image-category-models';

export default class App {
  game: Game;

  constructor() {
    this.game = new Game();
  }

  async start(): Promise<void> {
    this.game = new Game();
    imports.main.element.innerHTML = '';
    imports.main.element.appendChild(this.game.element);
    const res = await fetch('./public/images.json');
    const categories: ImageCategory[] = await res.json();
    const imagesType = +imports.settingsInit.settingsType.value;
    const imagesAmount = +imports.settingsInit.settingsDifficult.value;
    const cat = categories[imagesType || 0];
    const images = cat.images
      .sort(() => Math.random() - 0.5)
      .slice(0, imagesAmount || 3)
      .map((name) => `${cat.category}/${name}`);
    await preloadImages(images, this.game);
  }
}
