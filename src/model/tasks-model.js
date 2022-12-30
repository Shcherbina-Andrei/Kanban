import {filterTasks} from '../utils/filter';
import {TASK_STATUS} from '../const';
import Observable from '../framework/view/observable';

export default class TasksModel extends Observable {
  #tasks = [];
  #apiTasksService = null;
  #order = localStorage.order;

  constructor(apiTasksService) {
    super();
    this.#apiTasksService = apiTasksService;
  }

  init = async () => {
    try {
      const tasks = await this.#apiTasksService.tasks;
      if (this.#order) {
        this.#tasks = this.#order.split(',').map((id) => tasks.find((task) => task.id === id));
      } else {
        this.#tasks = [...tasks];
      }
    } catch(err) {
      this.#tasks = [];
    }

    this._notify();
  };

  get tasks() {
    return this.#tasks;
  }

  updateTask = async (update) => {
    const index = this.#tasks.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexciting task');
    }

    try {
      const response = await this.#apiTasksService.updateTask(update);

      const updatedTask = response;

      this.#tasks = [...this.#tasks.slice(0, index), updatedTask, ...this.#tasks.slice(index + 1)];
      this._notify();
    } catch(err) {
      throw new Error('Can\'t update task');
    }
  };

  addTask = async (update) => {
    try {
      const response = await this.#apiTasksService.addTask(update);
      const newTask = response;
      this.#tasks = [...this.#tasks, newTask];
      localStorage.order = [...this.#tasks.map((task) => task.id)];
      this._notify();
    } catch(err) {
      throw new Error('Can\'t add task');
    }
  };

  removeTasks = (updates) => {
    updates.forEach( (update) => {
      const index = this.#tasks.findIndex((task) => task.id === update.id);
      if (index === -1) {
        throw new Error('Can\'t delete unexciting task');
      }
      (async () => {
        await this.#apiTasksService.deleteTask(update);
      })();
      this.#tasks = [...this.#tasks.slice(0, index), ...this.#tasks.slice(index + 1)];
      localStorage.order = [...this.#tasks.map((task) => task.id)];
    });

    this._notify();
  };

  changePositionTask = async (updateTask, nextTaskId) => {
    const activeTaskIndex = this.#tasks.findIndex((task) => updateTask.id === task.id);
    this.#tasks = [...this.#tasks.slice(0, activeTaskIndex), ...this.#tasks.slice(activeTaskIndex + 1)];
    if(!nextTaskId) {
      this.#tasks = [...this.#tasks, updateTask];
      localStorage.order = [...this.#tasks.map((task) => task.id)];
    } else {
      const nextTaskIndex = this.#tasks.findIndex((task) => nextTaskId === task.id);
      this.#tasks = [...this.#tasks.slice(0, nextTaskIndex), updateTask, ...this.#tasks.slice(nextTaskIndex)];
      localStorage.order = [...this.#tasks.map((task) => task.id)];
    }
  };

  getBacklogTasks = () => filterTasks[TASK_STATUS.Backlog](this.tasks);

  getProcessingTasks = () => filterTasks[TASK_STATUS.Processing](this.tasks);

  getDoneTasks = () => filterTasks[TASK_STATUS.Done](this.tasks);

  getBasketTasks = () => filterTasks[TASK_STATUS.Basket](this.tasks);
}
