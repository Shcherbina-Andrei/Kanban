import AbstractView from '../framework/view/abstract-view';

const createEmptyBacklogTemplate = () => (`
  <div class="taskboard__item task task--empty">
    <p>Добавьте задачу</p>
  </div>
`);

export default class EmptyBacklogView extends AbstractView {

  get template() {
    return createEmptyBacklogTemplate();
  }
}
