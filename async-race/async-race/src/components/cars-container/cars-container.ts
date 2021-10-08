import BaseComponent from '../base-component';
import './cars-container.css';
// import CarsItem from './cars-item/cars-item';

export default class CarsContainer extends BaseComponent {
  constructor() {
    super('section', ['main__cars', 'cars']);
  }
}
