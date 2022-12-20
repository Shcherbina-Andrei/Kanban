import {createElement} from '../render';

const createTaskTemplate = () => (`
  <div class="taskboard__item task">
    <div class="task__body">
      <p class="task__view">Название первой задачи</p>
      <input class="task__input" type="text" value="Название первой задачи">
    </div>
    <button class="task__edit" type="button" aria-label="Изменить"></button>
  </div>
`);

export default class TaskView {
  getTemplate() {
    return createTaskTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
