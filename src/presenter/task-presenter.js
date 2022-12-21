import TaskView from '../view/task-view';
import {render} from '../render';

export default class TaskPresenter {
  #task = null;

  #container = null;
  #taskComponent = null;

  constructor(task) {
    this.#task = task;
  }

  init = (container) => {
    this.#container = container;
    this.#taskComponent = new TaskView(this.#task);
    this.#taskComponent.element.addEventListener('click', this.#editTaskHandler);
    this.#taskComponent.element.addEventListener('keydown', this.#saveEditTaskHandler);
    this.#taskComponent.element.addEventListener('keydown', this.#closeTaskHandler);

    render(this.#taskComponent, this.#container);
  };

  #editTaskHandler = (evt) => {
    evt.preventDefault();
    this.#taskComponent.element.classList.add('task--active');
  };

  #saveEditTaskHandler = (evt) => {
    if (evt.code === 'Enter') {
      this.#taskComponent.element.classList.remove('task--active');
    }
  };

  #closeTaskHandler = (evt) => {
    if (evt.code === 'Escape') {
      this.#taskComponent.element.classList.remove('task--active');
    }
  };
}
