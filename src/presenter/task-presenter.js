import TaskView from '../view/task-view';
import {remove, render, replace} from '../framework/render';

const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing'
};

export default class TaskPresenter {
  #task = null;
  #mode = Mode.DEFAULT;

  #container = null;
  #taskComponent = null;
  #changeData = null;
  #changeMode = null;
  #moveTask = null;

  constructor(container, changeData, changeMode, moveTask) {
    this.#container = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#moveTask = moveTask;
  }

  init = (task) => {
    this.#task = task;

    const prevTaskComponent = this.#taskComponent;

    this.#taskComponent = new TaskView(this.#task);

    this.#taskComponent.setEditTaskClickHandler(this.#editTaskHandler);
    this.#taskComponent.setSaveEditingTaskHandler(this.#saveEditTaskHandler);
    this.#taskComponent.setDragStartMoveHandler();
    this.#taskComponent.setDragEndMoveHandler(this.#moveTask);
    window.addEventListener('keydown', this.#closeTaskHandler);

    if (prevTaskComponent === null) {
      render(this.#taskComponent, this.#container);
      return;
    }

    replace(this.#taskComponent, prevTaskComponent);

    remove(prevTaskComponent);
  };

  #replaceTaskToDefault = () => {
    this.#taskComponent.element.classList.remove('task--active');
    this.#mode = Mode.DEFAULT;
  };

  #editTaskHandler = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#taskComponent.element.classList.add('task--active');
      this.#changeMode();
      this.#mode = Mode.EDITING;
    }
  };

  #saveEditTaskHandler = (task) => {
    this.#changeData(task);
    this.#replaceTaskToDefault();
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceTaskToDefault();
    }
  };

  destroy = () => {
    remove(this.#taskComponent);
  };

  #closeTaskHandler = (evt) => {
    if (evt.code === 'Escape') {
      this.#taskComponent.reset(this.#task);
      this.#replaceTaskToDefault();
    }
  };
}
