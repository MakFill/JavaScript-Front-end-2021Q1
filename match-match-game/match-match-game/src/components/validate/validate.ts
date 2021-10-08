import { player } from '../../shared/constants';

export default class Validate {
  constructor(private header: HTMLElement) {}

  private formItem = this.header.querySelectorAll(
    '.reg-form__value'
  ) as NodeListOf<HTMLInputElement>;

  private formSubmit = this.header.querySelector('.reg-form__btn_submit') as HTMLFormElement;

  private formCancel = this.header.querySelector('.reg-form__btn_cancel');

  private registrBtn = this.header.querySelector('.registr__player') as HTMLElement;

  private btnLogOut = this.header.querySelector('.log-out__btn') as HTMLElement;

  private registrBtnsAndAvatar = this.header.querySelectorAll(
    '.register__hidden'
  ) as NodeListOf<HTMLElement>;

  private registrFormWrapper = this.header.querySelector('.about__wrapper') as HTMLElement;

  avaImg = <HTMLImageElement>this.header.querySelector('.reg-form__img');

  headerAva = <HTMLImageElement>this.header.querySelector('.registr__avatar');

  avatarSelectBtn = this.header.querySelector('.reg-form__img-btn') as HTMLInputElement;

  private playerName = this.header.querySelector('#name') as HTMLInputElement;

  private playerLastName = this.header.querySelector('#lastName') as HTMLInputElement;

  private playerEmail = this.header.querySelector('#email') as HTMLInputElement;

  private alertPopupBtn = this.header.querySelector('.reg-form__popup-btn') as HTMLElement;

  private alertPopupWrapper = this.header.querySelector('.reg-form__popup-warrep') as HTMLElement;

  private findSumLength = (items: NodeListOf<HTMLInputElement>) => {
    let length = 0;
    items.forEach((item) => {
      length += item.value.length;
    });
    return length;
  };

  private inputValidate = (input: HTMLInputElement) => {
    const val = input.value;

    if (
      ((input.classList.contains('form__last-name') || input.classList.contains('form__name')) &&
        (/^[0-9]+$/.test(val) || /[-/()*+?.^$|`"<~!@#%_=:;';>,]/.test(val))) ||
      (input.classList.contains('form__email') &&
        !val.match(
          /^(\(.+\))?([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+(\(.+\))?@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]+$/
        ))
    ) {
      input.classList.remove('reg-form_valid');
      input.classList.add('reg-form_invalid');
      input.labels?.forEach((label) => {
        label.classList.add('message-show');
      });
      return false;
    }
    input.classList.add('reg-form_valid');
    input.classList.remove('reg-form_invalid');
    input.labels?.forEach((label) => {
      label.classList.remove('message-show');
    });
    return true;
  };

  cleanForm(): void {
    this.formItem.forEach((item) => {
      const i = item as HTMLInputElement;
      item.classList.remove('reg-form_invalid', 'reg-form_valid');
      item.labels?.forEach((label) => {
        label.classList.remove('message-show');
      });
      i.value = '';
    });
    this.avaImg.src = '../public/avatar.svg';
    this.registrFormWrapper.style.display = 'none';
  }

  validateBtnsInit = (): void => {
    this.formItem.forEach((input) => {
      input.addEventListener('input', () => {
        this.inputValidate(input);
      });
    });

    this.registrBtn?.addEventListener('click', () => {
      this.registrFormWrapper.style.display = 'block';
    });

    this.btnLogOut.onclick = () => {
      this.cleanForm();
      this.registrBtn.style.display = 'block';
      this.registrBtnsAndAvatar.forEach((item) => {
        const i = item as HTMLElement;
        i.style.display = 'none';
      });
      window.location.hash = '#/';
    };

    this.formSubmit?.addEventListener('click', (e) => {
      e.preventDefault();

      if (
        this.inputValidate(this.playerName) &&
        this.inputValidate(this.playerLastName) &&
        this.inputValidate(this.playerEmail) &&
        this.findSumLength(this.formItem) < 31
      ) {
        this.registrBtnsAndAvatar.forEach((elem) => {
          if (!elem.classList.contains('stop__btn')) {
            const el = elem as HTMLElement;
            el.style.display = 'block';
          }
        });
        this.registrBtn.style.display = 'none';
        this.registrFormWrapper.style.display = 'none';
        player.name = `${this.playerName.value} ${this.playerLastName.value}`;
        player.email = `${this.playerEmail.value}`;
      } else {
        if (this.findSumLength(this.formItem) > 30) {
          this.alertPopupWrapper.style.display = 'block';
        }
        this.formItem.forEach((item) => {
          this.inputValidate(item);
        });
      }
    });

    this.formCancel?.addEventListener('click', () => {
      this.cleanForm();
    });

    this.alertPopupBtn?.addEventListener('click', () => {
      this.alertPopupWrapper.style.display = 'none';
    });
  };
}
