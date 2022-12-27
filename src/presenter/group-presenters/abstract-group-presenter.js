import TaskPresenter from '../task-presenter';
import {updateItem} from '../../utils/common';
import {render, remove} from '../../framework/render';

export default class AbstractGroupPresenter {
  _container = null;
  _tasks = null;

  _taskPresenters = new Map();

  _handleModeChange = null;
  _handleChangeData = null;
  _handleChangePosition = null;

  _taskBoardListComponent = null;
  _groupComponent = null;
  _emptyComponent = null;

  init = (tasks) => {
    this._tasks = tasks;
    this._renderTasksGroup();
    this._taskBoardListComponent.setDragOverMoveHandler();
  };

  resetGroupView = () => {
    this._taskPresenters.forEach((presenter) => presenter.resetView());
  };

  _handleTaskChange = (updatedTask) => {
    this._tasks = updateItem(this._tasks, updatedTask);
    this._taskPresenters.get(updatedTask.id).init(updatedTask);
  };

  _renderTask = (task) => {
    const taskPresenter = new TaskPresenter(this._taskBoardListComponent.element, this._handleTaskChange, this._handleModeChange, this._handleChangePosition);
    taskPresenter.init(task);
    this._taskPresenters.set(task.id, taskPresenter);
  };

  _renderTasks = () => (
    this._tasks.forEach((task) => this._renderTask(task))
  );

  _renderNoTasks = () => {
    render(this._emptyComponent, this._taskBoardListComponent.element);
  };

  _clearGroupHandler = () => {
    this._taskPresenters.forEach((taskPresenter) => taskPresenter.destroy());
    this._taskPresenters.clear();
  };

  _renderTasksGroup = () => {
    render(this._groupComponent, this._container);
    render(this._taskBoardListComponent, this._groupComponent.element);

    if (this._tasks.length === 0) {
      this._renderNoTasks();
      return;
    }

    this._renderTasks();
  };

  destroy = () => {
    remove(this._groupComponent);
    remove(this._taskBoardListComponent);
    this._clearGroupHandler();
  };
}
