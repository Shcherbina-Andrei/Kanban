import NewTaskPresenter from './presenter/new-task-presenter';
import TaskBoardPresenter from './presenter/task-board-presenter';
import TasksModel from './model/tasks-model';


const mainBoard = document.querySelector('.board-app__main');
const mainBoardWrapper = mainBoard.querySelector('.board-app__inner');

const tasksModel = new TasksModel();
const newTaskPresenter = new NewTaskPresenter();
const taskBoardPresenter = new TaskBoardPresenter();

newTaskPresenter.init(mainBoardWrapper);
taskBoardPresenter.init(mainBoardWrapper, tasksModel);
