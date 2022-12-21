import {createElement} from '../render';

const createTaskBoardTemplate = () => (`
  <section class="taskboard">
    <h2 class="visually-hidden">Ваши задачи:</h2>
  </section>
`);

export default class TaskBoardView {
  #element = null;

  get template() {
    return createTaskBoardTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }
}
