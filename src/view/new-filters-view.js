import AbstractView from '../framework/view/abstract-view.js';

const createNewFiltersTemplate = (filters, currentFilterType) => (
  `<form class="trip-filters" action="#" method="get">
  ${filters.map((filter) => `<div class="trip-filters__filter">
  <input id="filter-${filter.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.type}" ${filter.type === currentFilterType ? 'checked' : ''}>
  <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.name} (${filter.count})</label>
</div>`).join('')}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`
);

export default class NewFiltersView extends AbstractView {

  #filters = null;
  #currentFilter = null;

  constructor (filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createNewFiltersTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (cb) => {
    this._callback.filterTypeChange = cb;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}
