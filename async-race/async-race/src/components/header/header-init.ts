export default class HeaderInit {
  constructor(private header: HTMLElement) {}

  garageBtn = this.header.querySelector('.to-garage') as HTMLElement;

  winnersBtn = this.header.querySelector('.to-winners') as HTMLElement;
}
