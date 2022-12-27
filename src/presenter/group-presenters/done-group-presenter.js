import DoneGroupView from '../../view/group-views/done-group-view';
import TaskBoardList from '../../view/task-board-list';
import EmptyGroupView from '../../view/empty-group-view';
import {TASK_STATUS} from '../../const';
import AbstractGroupPresenter from './abstract-group-presenter';

export default class DoneGroupPresenter extends AbstractGroupPresenter {

  constructor(container, changeMode, changeData, changePosition) {
    super();
    this._container = container;
    this._handleModeChange = changeMode;
    this._handleChangeData = changeData;
    this._handleChangePosition = changePosition;
    this._taskBoardListComponent = new TaskBoardList(TASK_STATUS.Done);
    this._groupComponent = new DoneGroupView();
    this._emptyComponent = new EmptyGroupView();
  }
}
