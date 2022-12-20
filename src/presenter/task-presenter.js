import TaskView from '../view/task-view';
import {render} from '../render';

export default class TaskPresenter {
  taskComponent = new TaskView();

  init = (container) => {
    this.container = container;
    render(this.taskComponent, this.container);
  };
}
