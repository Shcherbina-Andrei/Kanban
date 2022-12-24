import AbstractView from '../../framework/view/abstract-view';

const createBasketGroupView = () => (`
  <article class="taskboard__group taskboard__group--basket">
    <h3 class="taskboard__group-heading taskboard__group-heading--basket">Корзина</h3>
  </article>
`);

export default class BasketGroupView extends AbstractView {
  get template() {
    return createBasketGroupView();
  }
}

