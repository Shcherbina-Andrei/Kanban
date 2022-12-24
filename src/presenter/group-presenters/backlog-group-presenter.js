import BacklogGroupView from '../../view/group-views/backlog-group-view';
import TaskBoardList from '../../view/task-board-list';
import TaskPresenter from '../task-presenter';
import {render} from '../../framework/render';
import {TASK_STATUS} from '../../const';
import { updateItem } from '../../utils/common';

export default class BacklogGroupPresenter {
  #container = null;
  #tasks = null;

  #taskPresenters = new Map();

  #handleModeChange = null;

  #backlogGroupComponent = new BacklogGroupView();
  #taskBoardListComponent = new TaskBoardList(TASK_STATUS.Backlog);

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

  #clearGroupHandler = () => {
    this.#taskPresenters.forEach((taskPresenter) => taskPresenter.destroy());
    this.#taskPresenters.clear();
  };

  #renderTasksGroup = () => {
    render(this.#backlogGroupComponent, this.#container);
    render(this.#taskBoardListComponent, this.#backlogGroupComponent.element);
    this.#renderTasks();
  };
}
