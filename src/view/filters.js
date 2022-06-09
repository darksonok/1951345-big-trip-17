import AbstractView from '../framework/view/abstract-view.js';

const createNewFiltersTemplate = (filters) => (
  `<form class="trip-filters" action="#" method="get">
  ${filters.map((filter) => `<div class="trip-filters__filter">
  <input id="filter-${filter.name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.name}" checked="">
  <label class="trip-filters__filter-label" for="filter-${filter.name}">${filter.name} (${filter.count})</label>
</div>`).join('')}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`
);

export default class NewFiltersView extends AbstractView {

  #filters = null;

  constructor (filters) {
    super();
    this.#filters = filters;

  }

  get template() {
    return createNewFiltersTemplate(this.#filters);
  }

}
