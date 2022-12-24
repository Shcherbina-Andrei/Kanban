import AbstractView from '../framework/view/abstract-view';

const createTaskBoardTemplate = () => (`
  <section class="taskboard">
    <h2 class="visually-hidden">Ваши задачи:</h2>
  </section>
`);

export default class TaskBoardView extends AbstractView {
  get template() {
    return createTaskBoardTemplate();
  }
}
