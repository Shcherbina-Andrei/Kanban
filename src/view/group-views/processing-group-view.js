import AbstractView from '../../framework/view/abstract-view';

const createProcessingGroupTemplate = () => (`
  <article class="taskboard__group taskboard__group--processing">
    <h3 class="taskboard__group-heading taskboard__group-heading--processing">В процессе</h3>
  </article>
`);

export default class ProcessingGroupView extends AbstractView {
  get template() {
    return createProcessingGroupTemplate();
  }
}
