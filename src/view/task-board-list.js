import {createElement} from '../render';

const createTaskBoardListTemplate = () => (`
  <div class="taskboard__list"></div>
`);

export default class TaskBoardList {
  getTemplate() {
    return createTaskBoardListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
