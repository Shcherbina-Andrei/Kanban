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

  constructor(task) {
    super();
    this._state = this.parseTaskToState(task);
  }

  get template() {
    return createTaskTemplate(this._state);
  }

  setDragStartMoveHandler = () => {
    this.element.addEventListener('dragstart', (evt) => {
      const currentElement = evt.target;
      if (currentElement.classList.contains('task')) {
        currentElement.classList.add('task--dragged');
      }
    });
  };

  setDragEndMoveHandler = (callback) => {
    this._callback.moveTask = callback;
    this.element.addEventListener('dragend', this.#dragMoveEndHandler);
  };

  #dragMoveEndHandler = (evt) => {
    const activeElement = document.querySelector('.task--dragged');
    const activeElementId = activeElement.dataset.id;
    const nextElementId = activeElement.nextElementSibling ? activeElement.nextElementSibling.dataset.id : 0;
    if (activeElement.parentElement.classList.contains('taskboard__list')) {
      const type = activeElement.parentElement.dataset.type;
      this._callback.moveTask(activeElementId, nextElementId, type);
      evt.target.classList.remove('task--dragged');
    }
  };

  setEditTaskClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.task__edit').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.element.draggable = false;
    this._callback.editClick();
  };

  setSaveEditingTaskHandler = (callback) => {
    this._callback.saveTask = callback;
    this.element.addEventListener('keydown', this.#saveEditingTaskHandler);
  };

  #saveEditingTaskHandler = (evt) => {
    const inputValue = this.element.querySelector('.task__input').value;
    if (evt.code === 'Enter') {
      if (inputValue.length < 3) {
        return;
      }
      this._state.description = inputValue;
      this.element.draggable = true;
      this._callback.saveTask(this.parseTaskToState(this._state));
    }
  };

  parseTaskToState = (task) => ({...task});

  parseStateToTask = (state) => ({...state});

  reset = (task) => {
    this.updateElement(
      this.parseStateToTask(task)
    );
  };

  _restoreHandlers = () => {
    this.setEditTaskClickHandler(this._callback.editClick);
    this.setSaveEditingTaskHandler(this._callback.saveTask);
    this.setDragStartMoveHandler();
    this.setDragEndMoveHandler(this._callback.moveTask);
  };
}
