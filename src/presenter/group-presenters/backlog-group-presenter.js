import BacklogGroupView from '../../view/group-views/backlog-group-view';
import TaskBoardList from '../../view/task-board-list';
import TaskPresenter from '../task-presenter';
import {render} from '../../render';

export default class BacklogGroupPresenter {
  backlogGroupComponent = new BacklogGroupView();
  taskBoardListComponent = new TaskBoardList();

  init = (container) => {
    this.container = container;
    render(this.backlogGroupComponent, this.container);
    render(this.taskBoardListComponent, this.backlogGroupComponent.getElement());

    for (let i = 0; i < 4; i++) {
      const taskPresenter = new TaskPresenter();
      taskPresenter.init(this.taskBoardListComponent.getElement());
    }
  };
}
