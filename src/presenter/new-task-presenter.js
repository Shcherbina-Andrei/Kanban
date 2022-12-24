import NewTaskView from '../view/new-task-view';
import {render} from '../framework/render';

export default class NewTaskPresenter {
  #container = null;
  #newTaskComponent = null;

  constructor(container) {
    this.#container = container;
  }

  init = () => {
    this.#renderNewTaskPresenter();
  };

  #renderNewTaskPresenter = () => {
    this.#newTaskComponent = new NewTaskView();
    render(this.#newTaskComponent, this.#container);
  };
}
