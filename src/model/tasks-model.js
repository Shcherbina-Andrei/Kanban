import {createTask} from '../mock/task';
import {filterTasks} from '../utils/filter';
import {TASK_STATUS} from '../const';

export default class TasksModel {
  tasks = Array.from({length: 12}, createTask);

  getTasks = () => this.tasks;

  getBacklogTasks = () => filterTasks[TASK_STATUS.Backlog](this.getTasks());

  getProcessingTasks = () => filterTasks[TASK_STATUS.Processing](this.getTasks());

  getDoneTasks = () => filterTasks[TASK_STATUS.Done](this.getTasks());

  getBasketTasks = () => filterTasks[TASK_STATUS.Basket](this.getTasks());
}
