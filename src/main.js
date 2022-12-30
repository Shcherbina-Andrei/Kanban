import TaskBoardPresenter from './presenter/task-board-presenter';
import TasksModel from './model/tasks-model';
import TasksApiService from './tasks-api-service';

const END_POINT = 'https://63ab271ffdc006ba6057af23.mockapi.io/kanban-board';


const mainBoard = document.querySelector('.board-app__main');
const mainBoardWrapper = mainBoard.querySelector('.board-app__inner');

const tasksModel = new TasksModel(new TasksApiService(END_POINT));
tasksModel.init();
const taskBoardPresenter = new TaskBoardPresenter(mainBoardWrapper, tasksModel);

taskBoardPresenter.init();
