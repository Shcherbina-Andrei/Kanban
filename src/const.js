const TASK_STATUS = {
  Backlog: 'backlog',
  Processing: 'processing',
  Done: 'done',
  Basket: 'basket'
};

const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
  CHANGE_POSITION: 'CHANGE_POSITION'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

export {TASK_STATUS, UserAction, UpdateType};
