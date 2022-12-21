import BacklogGroupView from '../../view/group-views/backlog-group-view';
import TaskBoardList from '../../view/task-board-list';
import TaskPresenter from '../task-presenter';
import {render} from '../../render';
import {TASK_STATUS} from '../../const';

export default class BacklogGroupPresenter {
  #container = null;
  #tasks = null;

  #backlogGroupComponent = new BacklogGroupView();
  #taskBoardListComponent = new TaskBoardList(TASK_STATUS.Backlog);

  init = (container, tasks) => {
    this.#container = container;
    this.#tasks = tasks;
    render(this.#backlogGroupComponent, this.#container);
    render(this.#taskBoardListComponent, this.#backlogGroupComponent.element);

    for (let i = 0; i < this.#tasks.length; i++) {
      this.#renderTask(this.#tasks[i]);
    }
  };

  #renderTask = (task) => {
    const taskPresenter = new TaskPresenter(task);
    taskPresenter.init(this.#taskBoardListComponent.element);
  };
}
