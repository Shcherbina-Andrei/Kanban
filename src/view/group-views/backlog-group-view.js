import {createElement} from '../../render';

const createBacklogGroupTemplate = () => (`
  <article class="taskboard__group taskboard__group--backlog">
    <h3 class="taskboard__group-heading taskboard__group-heading--backlog">Бэклог</h3>
  </article>
`);

export default class BacklogGroupView {
  getTemplate() {
    return createBacklogGroupTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
