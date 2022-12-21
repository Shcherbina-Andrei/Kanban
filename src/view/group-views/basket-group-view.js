import {createElement} from '../../render';

const createBasketGroupView = () => (`
  <article class="taskboard__group taskboard__group--basket">
    <h3 class="taskboard__group-heading taskboard__group-heading--basket">Корзина</h3>
  </article>
`);

export default class BasketGroupView {
  #element = null;

  get template() {
    return createBasketGroupView();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }
}

