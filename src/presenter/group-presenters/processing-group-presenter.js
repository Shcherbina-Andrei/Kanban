import ProcessingGroupView from '../../view/group-views/processing-group-view';
import TaskPresenter from '../task-presenter';
import TaskBoardList from '../../view/task-board-list';
import {render} from '../../render';

export default class ProcessingGroupPresenter {
  processingGroupComponent = new ProcessingGroupView();
  taskBoardListComponent = new TaskBoardList();

  init = (container) => {
    this.container = container;
    render(this.processingGroupComponent, container);
    render(this.taskBoardListComponent, this.processingGroupComponent.getElement());

    for (let i = 0; i < 2; i++) {
      const taskPresenter = new TaskPresenter();
      taskPresenter.init(this.taskBoardListComponent.getElement());
    }
  };
}
