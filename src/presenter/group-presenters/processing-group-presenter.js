import ProcessingGroupView from '../../view/group-views/processing-group-view';
import TaskBoardList from '../../view/task-board-list';
import EmptyGroupView from '../../view/empty-group-view';
import {TASK_STATUS} from '../../const';
import AbstractGroupPresenter from './abstract-group-presenter';

export default class ProcessingGroupPresenter extends AbstractGroupPresenter {

  constructor(container, changeMode, changeData, changePosition) {
    super();
    this._container = container;
    this._handleModeChange = changeMode;
    this._handleChangeData = changeData;
    this._handleChangePosition = changePosition;
    this._taskBoardListComponent = new TaskBoardList(TASK_STATUS.Processing);
    this._groupComponent = new ProcessingGroupView();
    this._emptyComponent = new EmptyGroupView();
  }
}
