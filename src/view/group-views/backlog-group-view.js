import AbstractView from '../../framework/view/abstract-view';

const createBacklogGroupTemplate = () => (`
  <article class="taskboard__group taskboard__group--backlog">
    <h3 class="taskboard__group-heading taskboard__group-heading--backlog">Бэклог</h3>
  </article>
`);

export default class BacklogGroupView extends AbstractView {
  get template() {
    return createBacklogGroupTemplate();
  }
}
