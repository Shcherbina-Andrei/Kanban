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

  setDragOverMoveHandler = () => {
    this.element.addEventListener('dragover', (evt) => {
      evt.preventDefault();
      const activeElement = document.querySelector('.task--dragged');
      let parentElement = activeElement.parentElement;
      const currentElement = evt.target;
      const isMoveable = activeElement !== currentElement && currentElement.classList.contains('task');

      if (!isMoveable) {
        return;
      }

      if (currentElement.parentElement !== parentElement) {
        parentElement = currentElement.parentElement;
      }
      const nextElement = (currentElement === activeElement.nextElementSibling) ? currentElement.nextElementSibling : currentElement;
      parentElement.insertBefore(activeElement, nextElement);
    });
  };
}
