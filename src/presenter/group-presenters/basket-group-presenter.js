import BasketGroupView from '../../view/group-views/basket-group-view';
import TaskBoardList from '../../view/task-board-list';
import ClearButtonView from '../../view/clear-button-views';
import TaskPresenter from '../task-presenter';
import {render} from '../../render';

export default class BasketGroupPresenter {
  basketGroupComponent = new BasketGroupView();
  taskBoardListComponent = new TaskBoardList();

  init = (container) => {
    this.container = container;
    render(this.basketGroupComponent, this.container);
    render(this.taskBoardListComponent, this.basketGroupComponent.getElement());

    for (let i = 0; i < 4; i++) {
      const taskPresenter = new TaskPresenter();
      taskPresenter.init(this.taskBoardListComponent.getElement());
    }

    render(new ClearButtonView(), this.basketGroupComponent.getElement());
  };
}
