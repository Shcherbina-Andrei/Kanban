import TaskBoardPresenter from './presenter/task-board-presenter';
import TasksModel from './model/tasks-model';


const mainBoard = document.querySelector('.board-app__main');
const mainBoardWrapper = mainBoard.querySelector('.board-app__inner');

const tasksModel = new TasksModel();
const taskBoardPresenter = new TaskBoardPresenter(mainBoardWrapper, tasksModel);

taskBoardPresenter.init();
