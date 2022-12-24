import TaskBoardView from '../view/task-board-view';
import {render} from '../framework/render';
import BacklogGroupPresenter from './group-presenters/backlog-group-presenter';
import ProcessingGroupPresenter from './group-presenters/processing-group-presenter';
import DoneGroupPresenter from './group-presenters/done-group-presenter';
import BasketGroupPresenter from './group-presenters/basket-group-presenter';

export default class TaskBoardPresenter {
  #container = null;
  #tasksModel = null;

  #taskBoardComponent = new TaskBoardView();
  #backlogGroupPresenter = null;
  #processingGroupPresenter = null;
  #doneGroupPresenter = null;
  #basketGroupPresenter = null;

  constructor(container, tasksModel) {
    this.#container = container;
    this.#tasksModel = tasksModel;
  }


  init = () => {
    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#backlogGroupPresenter.resetGroupView();
    this.#processingGroupPresenter.resetGroupView();
    this.#doneGroupPresenter.resetGroupView();
    this.#basketGroupPresenter.resetGroupView();
  };

  #renderBoard = () => {
    this.#backlogGroupPresenter = new BacklogGroupPresenter(this.#taskBoardComponent.element, this.#handleModeChange);
    this.#processingGroupPresenter = new ProcessingGroupPresenter(this.#taskBoardComponent.element, this.#handleModeChange);
    this.#doneGroupPresenter = new DoneGroupPresenter(this.#taskBoardComponent.element, this.#handleModeChange);
    this.#basketGroupPresenter = new BasketGroupPresenter(this.#taskBoardComponent.element, this.#handleModeChange);

    this.#backlogGroupPresenter.init(this.#tasksModel.getBacklogTasks());
    this.#processingGroupPresenter.init(this.#tasksModel.getProcessingTasks());
    this.#doneGroupPresenter.init(this.#tasksModel.getDoneTasks());
    this.#basketGroupPresenter.init(this.#tasksModel.getBasketTasks());
    render(this.#taskBoardComponent, this.#container);
  };
}
