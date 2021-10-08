import imports from '../../imports';
import { ObjectsArray, player } from '../../shared/constants';
import PlayerScore from '../score/playerScore';

let db: IDBDatabase;

const openRequest: IDBOpenDBRequest = indexedDB.open('MakFill', 1);

openRequest.onerror = function errorFunc() {
  db = this.result;
};

openRequest.onsuccess = function successFunc() {
  db = this.result;
};

openRequest.onupgradeneeded = function upgradeFunc() {
  db = openRequest.result;

  if (!db.objectStoreNames.contains('players')) {
    db.createObjectStore('players', { keyPath: 'id', autoIncrement: true });
  }
};

export const addThisPlayerScore = (): void => {
  const transaction = db.transaction('players', 'readwrite');
  const players = transaction.objectStore('players');

  players.add(player);
};

export async function getScore(): Promise<void> {
  const objectStore = db.transaction('players').objectStore('players');
  objectStore.getAll().onsuccess = function fillScore() {
    const playersArr: ObjectsArray[] = this.result;
    const playersScoreArr: ObjectsArray[] = [];
    playersScoreArr.push(playersArr[playersArr.length - 1]);
    playersArr
      .sort((a, b) => a.id - b.id)
      .reverse()
      .forEach((el) => {
        let counter = 0;
        playersScoreArr.forEach((item) => {
          if (el.email === item.email && el.name === item.name) {
            counter += 1;
          }
        });
        if (counter === 0) {
          playersScoreArr.push(el);
        }
      });

    const sort = playersScoreArr
      .filter((a) => a.score > 0)
      .sort((a, b) => a.score - b.score)
      .reverse()
      .slice(0, 10);
    while (imports.score.element.firstChild) {
      imports.score.element.removeChild(imports.score.element.firstChild);
    }
    imports.score.element.innerHTML = '<h2 class="score__header">Best players:</h2>';
    sort.forEach((item) => {
      const playerScore: PlayerScore = new PlayerScore(item);
      imports.score.element.appendChild(playerScore.element);
    });
  };
}
