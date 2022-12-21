import DoneGroupView from '../../view/group-views/done-group-view';
import TaskPresenter from '../task-presenter';
import TaskBoardList from '../../view/task-board-list';
import EmptyGroupView from '../../view/empty-group-view';
import {render} from '../../render';
import {TASK_STATUS} from '../../const';

export default class DoneGroupPresenter {
  doneGroupComponent = new DoneGroupView();
  taskBoardListComponent = new TaskBoardList(TASK_STATUS.Done);
  emptyGroupComponent = new EmptyGroupView();

  init = (container, tasks) => {
    this.container = container;
    this.tasks = tasks;
    render(this.doneGroupComponent, container);
    render(this.taskBoardListComponent, this.doneGroupComponent.getElement());

    if (this.tasks.length === 0) {
      render(this.emptyGroupComponent, this.taskBoardListComponent.getElement());
      return;
    }

    for (let i = 0; i < this.tasks.length; i++) {
      const taskPresenter = new TaskPresenter(this.tasks[i]);
      taskPresenter.init(this.taskBoardListComponent.getElement());
    }
  };
}
