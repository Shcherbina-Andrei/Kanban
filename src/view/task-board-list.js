import {createElement} from '../render';
import {TASK_STATUS} from '../const';

const createTaskBoardListTemplate = (type) => {
  let taskboardListClass;
  switch(type) {
    case TASK_STATUS.Processing:
      taskboardListClass = 'taskboard__list--sorted';
      break;
    case TASK_STATUS.Done:
      taskboardListClass = 'taskboard__list--sorted';
      break;
    case TASK_STATUS.Basket:
      taskboardListClass = 'taskboard__list--trash';
      break;
    default:
      taskboardListClass = '';
      break;
  }

  return (`
  <div class="taskboard__list ${taskboardListClass}"></div>
  `);};

export default class TaskBoardList {
  #type = null;
  #element = null;

  constructor(type) {
    this.#type = type;
  }

  get template() {
    return createTaskBoardListTemplate(this.#type);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }
}
