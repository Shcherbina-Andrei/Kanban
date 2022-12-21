import ProcessingGroupView from '../../view/group-views/processing-group-view';
import TaskPresenter from '../task-presenter';
import TaskBoardList from '../../view/task-board-list';
import EmptyGroupView from '../../view/empty-group-view';
import {render} from '../../render';
import {TASK_STATUS} from '../../const';

export default class ProcessingGroupPresenter {
  processingGroupComponent = new ProcessingGroupView();
  taskBoardListComponent = new TaskBoardList(TASK_STATUS.Processing);
  emptyGroupComponent = new EmptyGroupView();

  init = (container, tasks) => {
    this.container = container;
    this.tasks = tasks;
    render(this.processingGroupComponent, container);
    render(this.taskBoardListComponent, this.processingGroupComponent.getElement());

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
