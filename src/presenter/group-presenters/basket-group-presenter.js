import BasketGroupView from '../../view/group-views/basket-group-view';
import TaskBoardList from '../../view/task-board-list';
import ClearButtonView from '../../view/clear-button-views';
import EmptyBasketView from '../../view/empty-basket-view';
import TaskPresenter from '../task-presenter';
import {render} from '../../render';
import {TASK_STATUS} from '../../const';

export default class BasketGroupPresenter {
  #container = null;
  #tasks = null;
  #basketGroupComponent = new BasketGroupView();
  #taskBoardListComponent = new TaskBoardList(TASK_STATUS.Basket);
  #emptyBasketComponent = new EmptyBasketView();
  #isDisabled = false;

  init = (container, tasks) => {
    this.#container = container;
    this.#tasks = tasks;
    render(this.#basketGroupComponent, this.#container);
    render(this.#taskBoardListComponent, this.#basketGroupComponent.element);

    if (this.#tasks.length === 0) {
      render(this.#emptyBasketComponent, this.#taskBoardListComponent.element);
      this.#isDisabled = true;
    } else {
      for (let i = 0; i < this.#tasks.length; i++) {
        this.#renderTask(this.#tasks[i]);
      }
    }

    render(new ClearButtonView(this.#isDisabled), this.#basketGroupComponent.element);
  };

  #renderTask = (task) => {
    const taskPresenter = new TaskPresenter(task);
    taskPresenter.init(this.#taskBoardListComponent.element);
  };
}
