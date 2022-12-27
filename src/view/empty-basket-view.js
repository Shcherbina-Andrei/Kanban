import AbstractView from '../framework/view/abstract-view';

const createEmptyBasketTemplate = () => (`
  <div class="task--empty task task--empty-trash">
    <p>Корзина пуста</p>
  </div>
`);

export default class EmptyBasketView extends AbstractView {

  get template() {
    return createEmptyBasketTemplate();
  }
}
