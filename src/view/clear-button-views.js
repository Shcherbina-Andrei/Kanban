import AbstractView from '../framework/view/abstract-view';

const createClearButtonTemplate = (isDisabled) => (`
  <button class="taskboard__button button button--clear" type="button" ${isDisabled ? 'disabled' : ''}>
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15.5374" y="5.16638" width="1.83333" height="14.6667" transform="rotate(45 15.5374 5.16638)"
        fill="white" />
      <rect x="16.8337" y="15.5372" width="1.83333" height="14.6667" transform="rotate(135 16.8337 15.5372)"
        fill="white" />
    </svg>
    <span>Очистить</span>
  </button>
`);

export default class ClearButtonView extends AbstractView {
  #isDisabled = null;

  constructor(isDisabled) {
    super();
    this.#isDisabled = isDisabled;
  }

  get template() {
    return createClearButtonTemplate(this.#isDisabled);
  }

  setClearBoardClickHandler = (callback) => {
    this._callback.clearBoard = callback;
    this.element.addEventListener('click', this.#clearBoardClickHandler);
  };

  #clearBoardClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.clearBoard();
  };
}
