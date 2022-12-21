import {createTask} from '../mock/task';
import {filterTasks} from '../utils/filter';
import {TASK_STATUS} from '../const';

export default class TasksModel {
  #tasks = Array.from({length: 12}, createTask);

  get tasks() {
    return this.#tasks;
  }

  getBacklogTasks = () => filterTasks[TASK_STATUS.Backlog](this.tasks);

  getProcessingTasks = () => filterTasks[TASK_STATUS.Processing](this.tasks);

  getDoneTasks = () => filterTasks[TASK_STATUS.Done](this.tasks);

  getBasketTasks = () => filterTasks[TASK_STATUS.Basket](this.tasks);
}
