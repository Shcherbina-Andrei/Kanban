import {createElement} from '../render';

const createEmptyBasketTemplate = () => (`
  <div class="task--empty task task--empty-trash">
    <p>Корзина пуста</p>
  </div>
`);

export default class EmptyBasketView {
  #element = null;

  get template() {
    return createEmptyBasketTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }
}
