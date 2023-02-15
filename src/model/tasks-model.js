import {filterTasks} from '../utils/filter';
import {TASK_STATUS} from '../const';
import Observable from '../framework/view/observable';
import {getLocalTasks, updateTasksLocalStorage} from '../tasks-localstorage-service';
import {nanoid} from 'nanoid';

export default class TasksModel extends Observable {
  #tasks = [];

  constructor() {
    super();
  }

  init = () => {
    this.#tasks = getLocalTasks();

    this._notify();
  };

  get tasks() {
    return this.#tasks;
  }

  updateTask = (update) => {
    const index = this.#tasks.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexciting task');
    }

    this.#tasks = [...this.#tasks.slice(0, index), update, ...this.#tasks.slice(index + 1)];
    updateTasksLocalStorage(this.#tasks);
    this._notify();
  };

  addTask = (update) => {
    const newTask = {...update, id: nanoid()};
    this.#tasks = [...this.#tasks, newTask];
    updateTasksLocalStorage(this.#tasks);
    this._notify();

  };

  removeTasks = (updates) => {
    updates.forEach( (update) => {
      const index = this.#tasks.findIndex((task) => task.id === update.id);
      if (index === -1) {
        throw new Error('Can\'t delete unexciting task');
      }
      this.#tasks = [...this.#tasks.slice(0, index), ...this.#tasks.slice(index + 1)];
    });
    updateTasksLocalStorage(this.#tasks);

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
    updateTasksLocalStorage(this.#tasks);

    this._notify();
  };

  getBacklogTasks = () => filterTasks[TASK_STATUS.Backlog](this.tasks);

  getProcessingTasks = () => filterTasks[TASK_STATUS.Processing](this.tasks);

  getDoneTasks = () => filterTasks[TASK_STATUS.Done](this.tasks);

  getBasketTasks = () => filterTasks[TASK_STATUS.Basket](this.tasks);
}
