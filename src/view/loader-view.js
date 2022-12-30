import AbstractView from '../framework/view/abstract-view';

const createLoaderTemplate = () => (`
  <div class="spinner-box">
    <div class="leo-border-1">
      <div class="leo-core-1"></div>
    </div>
    <div class="leo-border-2">
      <div class="leo-core-2"></div>
    </div>
  </div>
`);

export default class LoaderView extends AbstractView {
  get template() {
    return createLoaderTemplate();
  }
}

