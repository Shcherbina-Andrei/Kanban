import NewTaskView from '../view/new-task-view';
import {render} from '../render';

export default class NewTaskPresenter {
  newTaskComponent = new NewTaskView();

  init = (container) => {
    this.container = container;
    render(this.newTaskComponent, this.container);
  };
}
