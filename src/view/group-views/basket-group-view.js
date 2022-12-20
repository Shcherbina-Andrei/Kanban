import {createElement} from '../../render';

const createBasketGroupView = () => (`
  <article class="taskboard__group taskboard__group--basket">
    <h3 class="taskboard__group-heading taskboard__group-heading--basket">Корзина</h3>
  </article>
`);

export default class BasketGroupView {
  getTemplate() {
    return createBasketGroupView();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}

