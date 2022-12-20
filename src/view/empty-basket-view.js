import {createElement} from '../render';

const createEmptyBasketTemplate = () => (`
  <div class="task--empty task task--empty-trash">
    <p>Корзина пуста</p>
  </div>
`);

export default class EmptyBasketView {
  getTemplate() {
    return createEmptyBasketTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
