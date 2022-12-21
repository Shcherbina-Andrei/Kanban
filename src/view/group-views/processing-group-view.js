import {createElement} from '../../render';

const createProcessingGroupTemplate = () => (`
  <article class="taskboard__group taskboard__group--processing">
    <h3 class="taskboard__group-heading taskboard__group-heading--processing">В процессе</h3>
  </article>
`);

export default class ProcessingGroupView {
  #element = null;

  get template() {
    return createProcessingGroupTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }
}
