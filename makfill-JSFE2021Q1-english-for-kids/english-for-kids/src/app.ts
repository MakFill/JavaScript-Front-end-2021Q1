import imports, { cards, cardType, store } from './imports';
import CardItem from './components/main/cards/card-item';
import DefaultCards from './components/main/cards/default-cards';
import { CardItemData, hashs } from './interfaces';
import Star from './components/header/star';
import FinalImg from './components/main/final-img/final-img';
import { setValueToStorage } from './components/main/statistic/stat-fill';
import { disablePlayStatus, enablePlayStatus } from './redux/actions';

const repeatedElements: CardItemData[] = [];

const addImgsToSidebar = () => {
  const sidebarItems = imports.sidebar.element.querySelectorAll(
    '.sidebar__img'
  ) as NodeListOf<HTMLImageElement>;
  sidebarItems.forEach((item, index) => {
    const sidebarItem = item;
    sidebarItem.src = `../public/${cards[index][3].image}`;
  });
};

addImgsToSidebar();

const removeSidebar = () => {
  document.onclick = (e) => {
    if (!(e.target as HTMLElement).classList.contains('sidebar')) {
      imports.sidebar.element.classList.remove('show-sidebar');
      imports.headerInit.burger.classList.remove('burger-close-transition');
      imports.headerInit.burgerCheckbox.checked = false;
      document.onclick = null;
    }
  };
};

const playAudio = (src: string) => {
  const audio = new Audio();
  audio.src = `../public/${src}`;
  audio.currentTime = 0;
  audio.play();
};

const findCardType = () => {
  let hash = window.location.hash.slice(2, -1);
  switch (hash) {
    case 'action-a':
      hash = 'Action (set A)';
      return hash;
    case 'action-b':
      hash = 'Action (set B)';
      return hash;
    case 'action-c':
      hash = 'Action (set С)';
      return hash;
    case 'animal-a':
      hash = 'Animal (set A)';
      return hash;
    case 'animal-b':
      hash = 'Animal (set B)';
      return hash;
    case 'repeat':
      hash = '#/repeat/';
      return hash;

    default:
      hash = hash[0].toUpperCase() + hash.slice(1);
      return hash;
  }
};

const addRepeatDelay = (str: string) => {
  imports.startBtn.element.onclick = () => {
    playAudio(str);

    imports.startBtn.element.onclick = null;

    setTimeout(() => {
      addRepeatDelay(str);
    }, 1000);
  };
};

const addGameClickMechanic = (
  cardElement: HTMLElement,
  cardsArray: CardItemData[],
  wordsCount: number
) => {
  const star = new Star().element as HTMLImageElement;

  if (cardElement.classList.contains(cardsArray[wordsCount].word)) {
    cardElement.classList.add('right-card');
    cardElement.classList.add('pointer-none');
    playAudio('../public/audio/correct.mp3');
    star.src = `../public/star-win.svg`;
  } else {
    cardsArray.push(cardsArray[wordsCount]);
    playAudio('../public/audio/error.mp3');
    star.src = `../public/star.svg`;
    setValueToStorage(cardsArray[wordsCount].word, 'fails');
  }
  setValueToStorage(cardsArray[wordsCount].word, 'guessed');
  imports.header.starsContainer.element.appendChild(star);
};

const addFinalImage = (tag: HTMLElement) => {
  imports.main.cardsContainer.element.appendChild(tag);
  imports.footer.element.classList.add('display-none');
  setTimeout(() => {
    imports.header.starsContainer.element.innerHTML = '';
    tag.remove();
    window.location.hash = '/';
    imports.main.cardsContainer.element.onclick = null;
  }, 2000);
};

const addGameFinal = (wordsCount: number, cardsArray: CardItemData[]) => {
  imports.main.cardsContainer.element.innerHTML = '';
  let result = '';
  let errors = 0;
  if (wordsCount === cardsArray.length) {
    result = 'success';
    errors = 0;
    playAudio('../public/audio/success.mp3');
  } else {
    result = 'failure';
    errors = wordsCount - cardsArray.length;
    playAudio('../public/audio/failure.mp3');
  }
  const tag = new FinalImg(result, errors).element;

  if (errors > 0) {
    (tag.querySelector('.img-errors') as HTMLElement).classList.add('show-errors');
  }

  addFinalImage(tag);
};

export const addGameMechanic = (): void => {
  let wordsCount = 0;
  const hash = findCardType();
  let cardsArray: CardItemData[];
  let exampleArray: CardItemData[];
  if (hash === '#/repeat/') {
    cardsArray = repeatedElements.sort(() => Math.random() - 0.5).slice();
    exampleArray = cardsArray.slice();
  } else {
    const cardsIndex = cardType.indexOf(hash);
    cardsArray = cards[cardsIndex].sort(() => Math.random() - 0.5).slice();
    exampleArray = cardsArray.slice();
  }
  (function startGameStep() {
    if (store.getState().isPlay) {
      playAudio(cardsArray[wordsCount].audioSrc);
      addRepeatDelay(cardsArray[wordsCount].audioSrc);
      imports.main.cardsContainer.element.onclick = (e) => {
        const cardElement = e.target as HTMLElement;
        if (
          cardElement.classList.contains('picture') &&
          !cardElement.classList.contains('right-card')
        ) {
          if (store.getState().isPlay) addGameClickMechanic(cardElement, cardsArray, wordsCount);
          const starsOnDesktop: NodeListOf<HTMLElement> =
            imports.header.starsContainer.element.querySelectorAll('.star-item');
          if (starsOnDesktop.length > 12) starsOnDesktop[0].remove();
          wordsCount += 1;

          if (cardsArray.length > wordsCount) {
            imports.main.cardsContainer.element.onclick = null;
            setTimeout(startGameStep, 1000);
          } else {
            addGameFinal(wordsCount, exampleArray);
          }
        }
      };
    }
  })();
};

const switchToPlay = (): void => {
  imports.main.element.appendChild(imports.startBtn.element);
  imports.startBtn.element.onclick = (e) => {
    (e.target as HTMLElement).classList.add('repeat-btn');
    addGameMechanic();
  };
};

export const changePlayTrain = (): void => {
  const defaultCards = imports.main.cardsContainer.element.querySelectorAll(
    '.default__top'
  ) as NodeListOf<HTMLElement>;
  const cardImages = imports.main.cardsContainer.element.querySelectorAll(
    '.picture'
  ) as NodeListOf<HTMLElement>;
  const cardsBottom = imports.main.cardsContainer.element.querySelectorAll(
    '.bottom'
  ) as NodeListOf<HTMLElement>;

  if (store.getState().isPlay) {
    defaultCards.forEach((item) => {
      item.classList.add('default__top_active');
    });

    cardImages.forEach((item, index) => {
      item.classList.add('picture-high');
      cardsBottom[index].classList.add('display-none');
    });

    const cardItems = document.querySelectorAll('.card-container') as NodeListOf<HTMLElement>;
    if (cardItems.length !== 0) {
      switchToPlay();
    }
  } else {
    defaultCards.forEach((item) => {
      item.classList.remove('default__top_active');
    });

    cardImages.forEach((item, index) => {
      item.classList.remove('picture-high', 'right-card', 'pointer-none');
      cardsBottom[index].classList.remove('display-none');
    });

    imports.header.starsContainer.element.innerHTML = '';
    imports.startBtn.element.classList.remove('repeat-btn');
    imports.startBtn.element.remove();
  }
};

export const headerCheckboxesInit = (): void => {
  imports.headerInit.burger.onclick = () => {
    if (imports.headerInit.burgerCheckbox.checked === true) {
      imports.headerInit.burgerCheckbox.checked = false;
    } else {
      imports.headerInit.burgerCheckbox.checked = true;
      setTimeout(removeSidebar, 0);
    }

    imports.sidebar.element.classList.toggle('show-sidebar');
    imports.headerInit.burger.classList.toggle('burger-close-transition');
  };

  imports.headerInit.switchToggle.onclick = () => {
    if (imports.headerInit.switchCheckbox.checked === true) {
      imports.headerInit.switchCheckbox.checked = false;
      store.dispatch(disablePlayStatus());
    } else {
      imports.headerInit.switchCheckbox.checked = true;
      store.dispatch(enablePlayStatus());
    }

    setTimeout(() => {
      imports.headerInit.switchPlay.classList.toggle('toggle-active');
      imports.headerInit.switchTrain.classList.toggle('toggle-active');
    }, 200);

    changePlayTrain();
  };
};

export const addDefaultCards = (): void => {
  cards.forEach((item, index) => {
    const defaultCard = new DefaultCards(cardType[index]);
    defaultCard.element.onclick = () => {
      defaultCard.element.setAttribute('href', `${hashs[index]}`);
    };
    (
      defaultCard.element.querySelector('.default__picture') as HTMLElement
    ).style.backgroundImage = `url(../public/${item[3].image})`;
    imports.main.cardsContainer.element.appendChild(defaultCard.element);
  });

  imports.startBtn.element.remove();
};

const addClickOnCardDelay = (element: HTMLElement, item: CardItemData) => {
  const rotateElem = element.querySelector('.rotate-svg') as HTMLElement;
  element.addEventListener(
    'click',
    () => {
      if (!store.getState().isPlay && !rotateElem.classList.contains('display-none'))
        playAudio(item.audioSrc);
      setTimeout(() => {
        addClickOnCardDelay(element, item);
      }, 1000);
    },
    { once: true }
  );
};

const addOneCard = (item: CardItemData) => {
  const cardItem = new CardItem(item.word, item.image, item.translation);
  imports.main.cardsContainer.element.appendChild(cardItem.element);
  const btnRotate = cardItem.element.querySelector('.rotate-svg') as HTMLElement;
  btnRotate.onclick = (e) => {
    e.stopPropagation();
    cardItem.element.classList.add('rotate');
    setTimeout(() => btnRotate.classList.add('display-none'), 50);
  };

  cardItem.element.onmouseleave = () => {
    cardItem.element.classList.remove('rotate');
    setTimeout(() => btnRotate.classList.remove('display-none'), 200);
  };

  cardItem.element.addEventListener('click', () => {
    if (!cardItem.element.classList.contains('rotate') && !store.getState().isPlay) {
      setValueToStorage(item.word, 'trainClicks');
    }
  });

  addClickOnCardDelay(cardItem.element, item);
};

export const addRepeatedCards = (): void => {
  const currentArray: HTMLElement[] = [];
  (
    imports.statisticPage.element.querySelectorAll('.stat__word') as NodeListOf<HTMLElement>
  ).forEach((item) => {
    const failsAmount = +(
      item.querySelector('.stat-item__fails') as HTMLParagraphElement
    ).innerText.replace(/[^\d]/g, '');
    if (failsAmount > 0) currentArray.push(item);
  });
  currentArray.sort((a, b) => {
    const firstWord: number = +(
      a.querySelector('.stat-item__rate') as HTMLParagraphElement
    ).innerText.replace(/[^\d]/g, '');
    const secondWord: number = +(
      b.querySelector('.stat-item__rate') as HTMLParagraphElement
    ).innerText.replace(/[^\d]/g, '');
    return firstWord - secondWord;
  });
  const repeatedArray: string[] = [];
  const repeatedItems = currentArray
    .slice(0, 8)
    .map((item) => (item.querySelector('.stat-item__word') as HTMLElement).innerText.slice(0, -1));
  repeatedItems.forEach((item) => repeatedArray.push(item));

  repeatedElements.length = 0;
  cards.forEach((item) => {
    item.forEach((word) => {
      if (repeatedArray.includes(word.word)) {
        addOneCard(word);
        repeatedElements.push(word);
      }
    });
  });
};

export const addChoosenCards = (type: number): void => {
  cards[type].forEach((item) => {
    addOneCard(item);
  });
};

export const addSidebarItemUnderline = (hash: string): void => {
  const sidebarItems = imports.sidebar.element.querySelectorAll(
    '.sidebar__item'
  ) as NodeListOf<HTMLLinkElement>;

  const newHash = hash.split('');
  newHash.splice(hash.indexOf('#'), 1);
  const finalHash = newHash.join('');

  sidebarItems.forEach((item) => {
    item.classList.remove('sidebar-choosen');
    if (finalHash === '/') {
      if (item.classList.contains('sidebar__main')) {
        item.classList.add('sidebar-choosen');
      }
    } else if (item.href.includes(finalHash)) {
      item.classList.add('sidebar-choosen');
    } else {
      item.classList.remove('sidebar-choosen');
    }
  });
};
