import {createElement} from '../../render';

const createDoneGroupTemplate = () => (`
  <article class="taskboard__group taskboard__group--done">
    <h3 class="taskboard__group-heading taskboard__group-heading--done">Готово</h3>
  </article>
`);

export default class DoneGroupView {
  getTemplate() {
    return createDoneGroupTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
