import {createElement} from '../../render';

const createDoneGroupTemplate = () => (`
  <article class="taskboard__group taskboard__group--done">
    <h3 class="taskboard__group-heading taskboard__group-heading--done">Готово</h3>
  </article>
`);

export default class DoneGroupView {
  #element = null;

  get template() {
    return createDoneGroupTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }
}
