export const getLocalTasks = () => {
  const tasksString = localStorage.getItem('tasks');
  if (tasksString) {
    return JSON.parse(tasksString);
  } else {
    return [];
  }
};

export const updateTasksLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
