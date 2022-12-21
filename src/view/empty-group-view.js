import {createElement} from '../render';

const createEmptyGroupTemplate = () => (`
  <div class="taskboard__item task task--empty">
    <p>Перетащите карточку</p>
  </div>
`);

export default class EmptyGroupView {
  #element = null;

  get template() {
    return createEmptyGroupTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }
}
