import DoneGroupView from '../../view/group-views/done-group-view';
import TaskPresenter from '../task-presenter';
import TaskBoardList from '../../view/task-board-list';
import {render} from '../../render';

export default class DoneGroupPresenter {
  doneGroupComponent = new DoneGroupView();
  taskBoardListComponent = new TaskBoardList();

  init = (container) => {
    this.container = container;
    render(this.doneGroupComponent, container);
    render(this.taskBoardListComponent, this.doneGroupComponent.getElement());

    for (let i = 0; i < 5; i++) {
      const taskPresenter = new TaskPresenter();
      taskPresenter.init(this.taskBoardListComponent.getElement());
    }
  };
}
