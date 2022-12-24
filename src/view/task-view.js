import {TASK_STATUS} from '../const';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createTaskTemplate = (task) => {
  let taskClass;
  switch(task.group) {
    case TASK_STATUS.Processing:
      taskClass = 'task--processing';
      break;
    case TASK_STATUS.Done:
      taskClass = 'task--done';
      break;
    case TASK_STATUS.Basket:
      taskClass = 'task--basket';
      break;
    default:
      taskClass = '';
      break;
  }
  return (`
  <div class="taskboard__item task ${taskClass}" draggable='true' data-id=${task.id}>
    <div class="task__body">
      <p class="task__view">${task.description}</p>
      <input class="task__input" type="text" value='${task.description}'>
    </div>
    <button class="task__edit" type="button" aria-label="Изменить"></button>
  </div>
`);};

export default class TaskView extends AbstractStatefulView {
  #task = null;

  constructor(task) {
    super();
    this.#task = task;
  }

  get template() {
    return createTaskTemplate(this.#task);
  }

  setDragStartMoveHandler = () => {
    this.element.addEventListener('dragstart', (evt) => {
      evt.target.classList.add('task--dragged');
    });
  };

  setDragEndMoveHandler = (callback) => {
    this.element.addEventListener('dragend', (evt) => {
      const activeElement = document.querySelector('.task--dragged');
      const activeElementId = activeElement.dataset.id;
      const nextElementId = activeElement.nextElementSibling ? activeElement.nextElementSibling.dataset.id : 0;
      const type = activeElement.parentElement.dataset.type;
      callback(activeElementId, nextElementId, type);
      evt.target.classList.remove('task--dragged');
    });
  };

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

  setEditTaskClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.task__edit').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  setSaveEditingTaskHandler = (callback) => {
    this._callback.saveTask = callback;
    this.element.addEventListener('keydown', this.#saveEditingTaskHandler);
  };

  #saveEditingTaskHandler = (evt) => {
    if (evt.code === 'Enter') {
      const description = this.element.querySelector('.task__input').value;
      this._callback.saveTask(description);
    }
  };
}
