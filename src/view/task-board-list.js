import {TASK_STATUS} from '../const';
import AbstractView from '../framework/view/abstract-view';

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
  <div class="taskboard__list ${taskboardListClass}" data-type=${type}></div>
  `);};

export default class TaskBoardList extends AbstractView {
  #type = null;

  constructor(type) {
    super();
    this.#type = type;
  }

  get template() {
    return createTaskBoardListTemplate(this.#type);
  }
}
