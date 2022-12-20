import {createElement} from '../render';

const createEmptyGroupTemplate = () => (`
  <div class="taskboard__item task task--empty">
    <p>Перетащите карточку</p>
  </div>
`);

export default class EmptyGroupView {
  getTemplate() {
    return createEmptyGroupTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
