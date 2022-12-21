import DoneGroupView from '../../view/group-views/done-group-view';
import TaskPresenter from '../task-presenter';
import TaskBoardList from '../../view/task-board-list';
import EmptyGroupView from '../../view/empty-group-view';
import {render} from '../../render';
import {TASK_STATUS} from '../../const';

export default class DoneGroupPresenter {
  #container = null;
  #tasks = null;

  #doneGroupComponent = new DoneGroupView();
  #taskBoardListComponent = new TaskBoardList(TASK_STATUS.Done);
  #emptyGroupComponent = new EmptyGroupView();

  init = (container, tasks) => {
    this.#container = container;
    this.#tasks = tasks;
    render(this.#doneGroupComponent, this.#container);
    render(this.#taskBoardListComponent, this.#doneGroupComponent.element);

    if (this.#tasks.length === 0) {
      render(this.#emptyGroupComponent, this.#taskBoardListComponent.element);
      return;
    }

    for (let i = 0; i < this.#tasks.length; i++) {
      this.#renderTask(this.#tasks[i]);
    }
  };

  #renderTask = (task) => {
    const taskPresenter = new TaskPresenter(task);
    taskPresenter.init(this.#taskBoardListComponent.element);
  };
}
