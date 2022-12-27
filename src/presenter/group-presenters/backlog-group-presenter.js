import BacklogGroupView from '../../view/group-views/backlog-group-view';
import TaskBoardList from '../../view/task-board-list';
import EmptyBacklogView from '../../view/empty-backlog-view';
import {TASK_STATUS} from '../../const';
import AbstractGroupPresenter from './abstract-group-presenter';

export default class BacklogGroupPresenter extends AbstractGroupPresenter {

  constructor(container, changeMode, changeData, changePosition) {
    super();
    this._container = container;
    this._handleModeChange = changeMode;
    this._handleChangeData = changeData;
    this._handleChangePosition = changePosition;
    this._taskBoardListComponent = new TaskBoardList(TASK_STATUS.Backlog);
    this._groupComponent = new BacklogGroupView();
    this._emptyComponent = new EmptyBacklogView();
  }
}
