import BaseComponent from '../base-component';
import './footer.css';

export default class Footer extends BaseComponent {
  constructor() {
    super('footer', ['footer']);
    this.element.innerHTML = `
    <div class="footer__container container">
      <a class="footer__git" href="https://github.com/MakFill">
        <img src="../public/github-icon.png" alt="Github"/>
      </a>
      <p class="footer__year">2021</p>
      <a class="footer__logo" href="https://rs.school/js/">
        <img src="../public/logo.svg" alt="RSSchool logo"/>
      </a>
    </div> 
    `;
  }
}
