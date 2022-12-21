import {createElement} from '../../render';

const createBacklogGroupTemplate = () => (`
  <article class="taskboard__group taskboard__group--backlog">
    <h3 class="taskboard__group-heading taskboard__group-heading--backlog">Бэклог</h3>
  </article>
`);

export default class BacklogGroupView {
  #element = null;

  get template() {
    return createBacklogGroupTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }
}
