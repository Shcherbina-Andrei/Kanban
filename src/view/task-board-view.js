import {createElement} from '../render';

const createTaskBoardTemplate = () => (`
  <section class="taskboard">
    <h2 class="visually-hidden">Ваши задачи:</h2>
  </section>
`);

export default class TaskBoardView {
  getTemplate() {
    return createTaskBoardTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
