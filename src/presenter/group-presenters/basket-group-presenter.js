import BasketGroupView from '../../view/group-views/basket-group-view';
import TaskBoardList from '../../view/task-board-list';
import ClearButtonView from '../../view/clear-button-views';
import EmptyBasketView from '../../view/empty-basket-view';
import {render} from '../../framework/render';
import {TASK_STATUS, UpdateType, UserAction} from '../../const';
import AbstractGroupPresenter from './abstract-group-presenter';

export default class BasketGroupPresenter extends AbstractGroupPresenter {
  #clearButtonComponent = null;
  #isDisabled = false;

  constructor(container, changeMode, changeData, changePosition) {
    super();
    this._container = container;
    this._handleModeChange = changeMode;
    this._handleChangeData = changeData;
    this._handleChangePosition = changePosition;
    this._taskBoardListComponent = new TaskBoardList(TASK_STATUS.Basket);
    this._groupComponent = new BasketGroupView();
    this._emptyComponent = new EmptyBasketView();
  }

  _clearBasketHandler = () => {
    this._taskPresenters.forEach((taskPresenter) => taskPresenter.destroy());
    this._taskPresenters.clear();
    this.#isDisabled = true;
    this._handleChangeData(UserAction.DELETE_TASK, UpdateType.MINOR, this._tasks);
  };

  _renderClearButton = () => {
    this.#clearButtonComponent = new ClearButtonView(this.#isDisabled);
    this.#clearButtonComponent.setClearBoardClickHandler(this._clearBasketHandler);
    render(this.#clearButtonComponent, this._groupComponent.element);
  };

  _renderTasksGroup = () => {
    render(this._groupComponent, this._container);
    render(this._taskBoardListComponent, this._groupComponent.element);

    if (this._tasks.length === 0) {
      this._renderNoTasks();
      this.#isDisabled = true;
    } else {
      this._renderTasks();
      this.#isDisabled = false;
    }

    this._renderClearButton();
  };
}
