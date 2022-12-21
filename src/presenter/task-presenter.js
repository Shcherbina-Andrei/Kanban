import TaskView from '../view/task-view';
import {render} from '../render';

export default class TaskPresenter {
  constructor(task) {
    this.task = task;
  }

  init = (container) => {
    this.container = container;
    this.taskComponent = new TaskView(this.task);
    render(this.taskComponent, this.container);
  };
}
