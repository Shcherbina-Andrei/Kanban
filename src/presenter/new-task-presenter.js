import NewTaskView from '../view/new-task-view';
import {render} from '../framework/render';
import { nanoid } from 'nanoid';
import { TASK_STATUS, UpdateType, UserAction } from '../const';

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
      id: nanoid(),
      group: TASK_STATUS.Backlog,
      description: descriptionTask
    };

    this.#changeData(UserAction.ADD_TASK, UpdateType.MINOR, newTask);
  };

  #renderNewTaskPresenter = () => {
    this.#newTaskComponent = new NewTaskView();
    render(this.#newTaskComponent, this.#container);
  };
}
