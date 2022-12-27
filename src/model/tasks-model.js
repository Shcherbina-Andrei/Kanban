import {createTask} from '../mock/task';
import {filterTasks} from '../utils/filter';
import {TASK_STATUS} from '../const';
import Observable from '../framework/view/observable';

export default class TasksModel extends Observable {
  #tasks = Array.from({length: 16}, createTask);

  get tasks() {
    return this.#tasks;
  }

  updateTask = (update) => {
    const index = this.#tasks.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexciting task');
    }

    this.#tasks = [...this.#tasks.slice(0, index), update, ...this.#tasks.slice(index + 1)];

    this._notify();
  };

  addTask = (update) => {
    this.#tasks = [...this.#tasks, update];
    this._notify();
  };

  removeTasks = (updates) => {
    updates.forEach((update) => {
      const index = this.#tasks.findIndex((task) => task.id === update.id);

      if (index === -1) {
        throw new Error('Can\'t delete unexciting task');
      }

      this.#tasks = [...this.#tasks.slice(0, index), ...this.#tasks.slice(index + 1)];
    });

    this._notify();
  };

  changePositionTask = (updateTask, nextTaskId) => {
    const activeTaskIndex = this.#tasks.findIndex((task) => updateTask.id === task.id);
    this.#tasks = [...this.#tasks.slice(0, activeTaskIndex), ...this.#tasks.slice(activeTaskIndex + 1)];
    if(!nextTaskId) {
      this.#tasks = [...this.#tasks, updateTask];
    } else {
      const nextTaskIndex = this.#tasks.findIndex((task) => nextTaskId === task.id);
      this.#tasks = [...this.#tasks.slice(0, nextTaskIndex), updateTask, ...this.#tasks.slice(nextTaskIndex)];
    }
  };

  getBacklogTasks = () => filterTasks[TASK_STATUS.Backlog](this.tasks);

  getProcessingTasks = () => filterTasks[TASK_STATUS.Processing](this.tasks);

  getDoneTasks = () => filterTasks[TASK_STATUS.Done](this.tasks);

  getBasketTasks = () => filterTasks[TASK_STATUS.Basket](this.tasks);
}
