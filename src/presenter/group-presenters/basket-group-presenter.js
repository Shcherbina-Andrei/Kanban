import BasketGroupView from '../../view/group-views/basket-group-view';
import TaskBoardList from '../../view/task-board-list';
import ClearButtonView from '../../view/clear-button-views';
import EmptyBasketView from '../../view/empty-basket-view';
import TaskPresenter from '../task-presenter';
import {render} from '../../framework/render';
import {TASK_STATUS} from '../../const';
import {updateItem} from '../../utils/common';

export default class BasketGroupPresenter {
  #container = null;
  #tasks = null;

  #taskPresenters = new Map();

  #handleModeChange = null;

  #basketGroupComponent = new BasketGroupView();
  #taskBoardListComponent = new TaskBoardList(TASK_STATUS.Basket);

  #clearButtonComponent = null;

  #emptyBasketComponent = new EmptyBasketView();
  #isDisabled = false;

  constructor(container, changeMode) {
    this.#container = container;
    this.#handleModeChange = changeMode;
  }

  init = (tasks) => {
    this.#tasks = tasks;
    this.#renderTasksGroup();
  };

  resetGroupView = () => {
    this.#taskPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleTaskChange = (updatedTask) => {
    this.#tasks = updateItem(this.#tasks, updatedTask);
    this.#taskPresenters.get(updatedTask.id).init(updatedTask);
  };

  #handleTaskMove = (activeTaskId, nextTaskId, newType) => {
    console.log(newType);
    const activeTask = this.#tasks.find((task) => activeTaskId === task.id);
    const activeTaskIndex = this.#tasks.findIndex((task) => activeTask.id === task.id);
    this.#tasks = [...this.#tasks.slice(0, activeTaskIndex), ...this.#tasks.slice(activeTaskIndex + 1)];
    if(!nextTaskId) {
      this.#tasks = [...this.#tasks, activeTask];
      return;
    }
    const nextTaskIndex = this.#tasks.findIndex((task) => nextTaskId === task.id);
    this.#tasks = [...this.#tasks.slice(0, nextTaskIndex), activeTask, ...this.#tasks.slice(nextTaskIndex)];
  };

  #renderTask = (task) => {
    const taskPresenter = new TaskPresenter(this.#taskBoardListComponent.element, this.#handleTaskChange, this.#handleModeChange, this.#handleTaskMove);
    taskPresenter.init(task);
    this.#taskPresenters.set(task.id, taskPresenter);
  };

  #renderTasks = () => (
    this.#tasks.forEach((task) => this.#renderTask(task))
  );

  #clearBasketHandler = () => {
    this.#taskPresenters.forEach((taskPresenter) => taskPresenter.destroy());
    this.#taskPresenters.clear();
    this.#isDisabled = true;
  };

  #renderClearButton = () => {
    this.#clearButtonComponent = new ClearButtonView(this.#isDisabled);
    this.#clearButtonComponent.setClearBoardClickHandler(this.#clearBasketHandler);
    render(this.#clearButtonComponent, this.#basketGroupComponent.element);
  };

  #renderNoTasks = () => {
    render(this.#emptyBasketComponent, this.#taskBoardListComponent.element);
  };

  #renderTasksGroup = () => {
    render(this.#basketGroupComponent, this.#container);
    render(this.#taskBoardListComponent, this.#basketGroupComponent.element);

    if (this.#tasks.length === 0) {
      this.#renderNoTasks();
      this.#isDisabled = true;
    } else {
      this.#renderTasks();
    }

    this.#renderClearButton();
  };
}
