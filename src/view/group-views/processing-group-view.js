import {createElement} from '../../render';

const createProcessingGroupTemplate = () => (`
  <article class="taskboard__group taskboard__group--processing">
    <h3 class="taskboard__group-heading taskboard__group-heading--processing">В процессе</h3>
  </article>
`);

export default class ProcessingGroupView {
  getTemplate() {
    return createProcessingGroupTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
