import {TASK_STATUS} from '../const';

const filterTasks = {
  [TASK_STATUS.Backlog]: (tasks) => tasks.filter((task) => task.group === TASK_STATUS.Backlog),
  [TASK_STATUS.Processing]: (tasks) => tasks.filter((task) => task.group === TASK_STATUS.Processing),
  [TASK_STATUS.Done]: (tasks) => tasks.filter((task) => task.group === TASK_STATUS.Done),
  [TASK_STATUS.Basket]: (tasks) => tasks.filter((task) => task.group === TASK_STATUS.Basket)
};

export {filterTasks};
