import Game from './game';

async function preloadImages(type: string[], game: Game): Promise<void> {
  let counter = 0;
  type.forEach((t, i) => {
    const img = new Image();
    img.src = `../public/images/${type[i]}`;
    img.onload = function imageCount() {
      counter += 1;
      if (counter === type.length) {
        game.newGame(type);
      }
    };
  });
}
export default preloadImages;
