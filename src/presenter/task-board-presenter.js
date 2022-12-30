import TaskBoardView from '../view/task-board-view';
import {remove, render, RenderPosition} from '../framework/render';
import NewTaskPresenter from './new-task-presenter';
import BacklogGroupPresenter from './group-presenters/backlog-group-presenter';
import ProcessingGroupPresenter from './group-presenters/processing-group-presenter';
import DoneGroupPresenter from './group-presenters/done-group-presenter';
import BasketGroupPresenter from './group-presenters/basket-group-presenter';
import {filterTasks} from '../utils/filter';
import {TASK_STATUS, UserAction} from '../const';
import LoaderView from '../view/loader-view';

export default class TaskBoardPresenter {
  #container = null;
  #tasksModel = null;

  #taskBoardComponent = new TaskBoardView();
  #loadingComponent = new LoaderView();
  #newTaskPresenter = null;
  #backlogGroupPresenter = null;
  #processingGroupPresenter = null;
  #doneGroupPresenter = null;
  #basketGroupPresenter = null;

  #isLoading = true;

  constructor(container, tasksModel) {
    this.#container = container;
    this.#tasksModel = tasksModel;

    this.#newTaskPresenter = new NewTaskPresenter(container, this.#handleViewAction);

    this.#backlogGroupPresenter = new BacklogGroupPresenter(this.#taskBoardComponent.element, this.#handleModeChange, this.#handleViewAction, this.#handleChangePositionTask);
    this.#processingGroupPresenter = new ProcessingGroupPresenter(this.#taskBoardComponent.element, this.#handleModeChange, this.#handleViewAction, this.#handleChangePositionTask);
    this.#doneGroupPresenter = new DoneGroupPresenter(this.#taskBoardComponent.element, this.#handleModeChange, this.#handleViewAction, this.#handleChangePositionTask);
    this.#basketGroupPresenter = new BasketGroupPresenter(this.#taskBoardComponent.element, this.#handleModeChange, this.#handleViewAction, this.#handleChangePositionTask);

    this.#tasksModel.addObserver(this.#handleModelEvent);
  }


  init = () => {
    this.#newTaskPresenter.init();
    this.#renderBoard();
  };

  get tasks() {
    return this.#tasksModel.tasks;
  }

  #handleModeChange = () => {
    this.#backlogGroupPresenter.resetGroupView();
    this.#processingGroupPresenter.resetGroupView();
    this.#doneGroupPresenter.resetGroupView();
    this.#basketGroupPresenter.resetGroupView();
  };

  #handleViewAction = (actionType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#tasksModel.updateTask(update);
        break;
      case UserAction.ADD_TASK:
        this.#tasksModel.addTask(update);
        break;
      case UserAction.DELETE_TASK:
        this.#tasksModel.removeTasks(update);
        break;
    }
  };

  #handleChangePositionTask = (activeTaskId, nextTaskId, newType) => {
    const activeTaskOld = this.tasks.find((task) => activeTaskId === task.id);
    const activeTaskNew = {...activeTaskOld, group: newType};
    this.#tasksModel.changePositionTask(activeTaskNew, nextTaskId);
    if (activeTaskOld.group !== newType) {
      this.#handleViewAction(UserAction.UPDATE_TASK, activeTaskNew);
    }
  };


  #handleModelEvent = () => {
    this.#isLoading = false;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#taskBoardComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderBoard = () => {
    render(this.#taskBoardComponent, this.#container);
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    this.#backlogGroupPresenter.init(filterTasks[TASK_STATUS.Backlog](this.tasks));
    this.#processingGroupPresenter.init(filterTasks[TASK_STATUS.Processing](this.tasks));
    this.#doneGroupPresenter.init(filterTasks[TASK_STATUS.Done](this.tasks));
    this.#basketGroupPresenter.init(filterTasks[TASK_STATUS.Basket](this.tasks));
  };

  #clearBoard = () => {
    remove(this.#loadingComponent);
    this.#backlogGroupPresenter.destroy();
    this.#processingGroupPresenter.destroy();
    this.#doneGroupPresenter.destroy();
    this.#basketGroupPresenter.destroy();
  };
}
