import { rotateTime } from '../../shared/constants';
import BaseComponent from '../base-component';

export default class TimerInteractiv extends BaseComponent {
  constructor(private timer: HTMLElement) {
    super();
  }

  private seconds = this.timer.querySelector('.timer__seconds') as HTMLParagraphElement;

  private secondDecades = this.timer.querySelector('.timer__second-decades') as HTMLElement;

  private minutes = this.timer.querySelector('.timer__minutes') as HTMLElement;

  private minuteDecades = this.timer.querySelector('.timer__minute-decades') as HTMLElement;

  timerCounter = 0;

  private sec = 0;

  private secDec = 0;

  private min = 0;

  private minDec = 0;

  private intervalFunc = () => {
    if (this.sec !== 9) {
      this.sec += 1;
    } else {
      this.sec = 0;
      if (this.secDec !== 5) {
        this.secDec += 1;
      } else {
        this.secDec = 0;
        if (this.min !== 9) {
          this.min += 1;
        } else {
          this.min = 0;
          if (this.minDec !== 5) {
            this.minDec += 1;
          } else {
            this.minDec = 0;
          }
        }
      }
    }
    this.timerCounter += 1;
    this.seconds.textContent = this.sec.toString();
    this.secondDecades.textContent = this.secDec.toString();
    this.minutes.textContent = this.min.toString();
    this.minuteDecades.textContent = this.minDec.toString();
  };

  private intervalID = setInterval(this.intervalFunc, 1000);

  private popup = this.timer.querySelector('.timer-wrapper') as HTMLElement;

  private popupMessage = this.timer.querySelector('.timer-wrapper__message') as HTMLElement;

  private popupBtn = this.timer.querySelector('.timer-wrapper__btn') as HTMLElement;

  startTimer(): void {
    clearInterval(this.intervalID);
    setTimeout(() => {
      this.intervalID = setInterval(this.intervalFunc, 1000);
    }, rotateTime * 1000);
  }

  showFinalPopup = (): void => {
    const minutes = Math.trunc(this.timerCounter / 60);
    const seconds = this.timerCounter % 60;
    this.popupMessage.textContent = `Congratulations! You successfully found all matches on ${minutes} minutes and ${seconds} seconds.`;
    clearInterval(this.intervalID);
    this.popup.style.display = 'block';
    this.popupBtn.onclick = () => {
      window.location.hash = '#/score/';
      window.scroll(0, 0);
    };
  };
}
