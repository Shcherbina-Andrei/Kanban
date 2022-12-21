import ProcessingGroupView from '../../view/group-views/processing-group-view';
import TaskPresenter from '../task-presenter';
import TaskBoardList from '../../view/task-board-list';
import EmptyGroupView from '../../view/empty-group-view';
import {render} from '../../render';
import {TASK_STATUS} from '../../const';

export default class ProcessingGroupPresenter {
  #container = null;
  #tasks = null;

  #processingGroupComponent = new ProcessingGroupView();
  #taskBoardListComponent = new TaskBoardList(TASK_STATUS.Processing);
  #emptyGroupComponent = new EmptyGroupView();

  init = (container, tasks) => {
    this.#container = container;
    this.#tasks = tasks;
    render(this.#processingGroupComponent, this.#container);
    render(this.#taskBoardListComponent, this.#processingGroupComponent.element);

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
