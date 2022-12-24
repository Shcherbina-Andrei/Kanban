import TaskBoardList from '../../view/task-board-list';
import TaskPresenter from '../task-presenter';

export default class AbstractGroupPresenter {
  _container = null;
  _tasks = null;
  #taskBoardListComponent = null;

  constructor(container, groupType) {
    this._container = container;
    this.#taskBoardListComponent = new TaskBoardList(groupType);
  }

  _renderTask = (task) => {
    const taskPresenter = new TaskPresenter(task);
    taskPresenter.init(this.#taskBoardListComponent.element);
  };
}
