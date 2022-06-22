import AbstractView from '../framework/view/abstract-view.js';
import { SORT_TYPES } from '../data.js';
const createNewSorterTemplate = (currentSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
     ${SORT_TYPES.map((sorter) => `<div class="trip-sort__item  trip-sort__item--${sorter.NAME}">
     <input id="sort-${sorter.NAME}" class="trip-sort__input  visually-hidden" data-sort-type=${sorter.NAME} type="radio" name="trip-sort" value="sort-${sorter.NAME}" ${sorter.OPTION} ${currentSortType === sorter.NAME ? 'checked' : ''}>
     <label class="trip-sort__btn" for="sort-${sorter.NAME}">${sorter.NAME}</label>
     </div>`).join('')}
   </form>`
);

export default class NewSorterView extends AbstractView {
  #currentSorterType = null;

  constructor(currentSortType) {
    super();
    this.#currentSorterType = currentSortType;
  }

  get template() {
    return createNewSorterTemplate(this.#currentSorterType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
