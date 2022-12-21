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

  constructor(type) {
    this.type = type;
  }

  getTemplate() {
    return createTaskBoardListTemplate(this.type);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
