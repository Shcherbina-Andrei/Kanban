import AbstractView from '../framework/view/abstract-view';

const createEmptyGroupTemplate = () => (`
  <div class="taskboard__item task task--empty">
    <p>Перетащите карточку</p>
  </div>
`);

export default class EmptyGroupView extends AbstractView {
  get template() {
    return createEmptyGroupTemplate();
  }
}
