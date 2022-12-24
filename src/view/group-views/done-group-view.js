import AbstractView from '../../framework/view/abstract-view';

const createDoneGroupTemplate = () => (`
  <article class="taskboard__group taskboard__group--done">
    <h3 class="taskboard__group-heading taskboard__group-heading--done">Готово</h3>
  </article>
`);

export default class DoneGroupView extends AbstractView {
  get template() {
    return createDoneGroupTemplate();
  }
}
