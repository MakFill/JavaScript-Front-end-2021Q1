import BaseComponent from '../base-component';
import './main-forms.css';

export default class MainForms extends BaseComponent {
  constructor() {
    super('section', ['main__forms']);
    this.element.innerHTML = `
      <form class="main__form form-create" action="#">
          <input class="main__input-txt input-txt_create" type="text" />
          <input
            class="main__input-color input-color_create"
            type="color"
            id="head"
            value="#eeeeee"
          />
          <button class="main__btn_create btn">Create</button>
        </form>
        <form class="main__form form-update" action="#">
          <input class="main__input-txt input-txt_update" type="text" />
          <input
            class="main__input-color input-color_update"
            type="color"
            id="head"
            value="#eeeeee"
          />
          <button class="main__btn_update btn">Update</button>
        </form>
        <div class="main__btns-group">
          <button class="main__btn btn btn-race">Race</button>
          <button class="main__btn btn btn-reset unactiv">Reset</button>
          <button class="main__btn btn btn-generate">Generate cars</button>
        </div>
      `;
  }
}
