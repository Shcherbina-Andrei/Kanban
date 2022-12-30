import NewTaskView from '../view/new-task-view';
import {render} from '../framework/render';
import {TASK_STATUS, UserAction} from '../const';

export default class NewTaskPresenter {
  #container = null;
  #newTaskComponent = null;

  #changeData = null;

  constructor(container, changeData) {
    this.#container = container;
    this.#changeData = changeData;
  }

  init = () => {
    this.#renderNewTaskPresenter();
    this.#newTaskComponent.setAddTaskHandler(this.#handleAddTask);
  };

  #handleAddTask = (descriptionTask) => {
    const newTask = {
      group: TASK_STATUS.Backlog,
      description: descriptionTask
    };

    this.#changeData(UserAction.ADD_TASK, newTask);
  };

  #renderNewTaskPresenter = () => {
    this.#newTaskComponent = new NewTaskView();
    render(this.#newTaskComponent, this.#container);
  };
}
