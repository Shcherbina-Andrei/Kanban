import TaskBoardView from '../view/task-board-view';
import {render} from '../render';
import BacklogGroupPresenter from './group-presenters/backlog-group-presenter';
import ProcessingGroupPresenter from './group-presenters/processing-group-presenter';
import DoneGroupPresenter from './group-presenters/done-group-presenter';
import BasketGroupPresenter from './group-presenters/basket-group-presenter';

export default class TaskBoardPresenter {
  taskBoardComponent = new TaskBoardView();
  backlogGroupPresenter = new BacklogGroupPresenter();
  processingGroupPresenter = new ProcessingGroupPresenter();
  doneGroupPresenter = new DoneGroupPresenter();
  basketGroupPresenter = new BasketGroupPresenter();


  init = (container, tasksModel) => {
    this.container = container;
    this.tasksModel = tasksModel;

    this.backlogGroupPresenter.init(this.taskBoardComponent.getElement(), this.tasksModel.getBacklogTasks());
    this.processingGroupPresenter.init(this.taskBoardComponent.getElement(), this.tasksModel.getProcessingTasks());
    this.doneGroupPresenter.init(this.taskBoardComponent.getElement(), this.tasksModel.getDoneTasks());
    this.basketGroupPresenter.init(this.taskBoardComponent.getElement(), this.tasksModel.getBasketTasks());
    render(this.taskBoardComponent, this.container);
  };
}
