import AbstractView from '../framework/view/abstract-view.js';
import { EmptyListMessages, FilterType } from '../data.js';

const createEmptyListTemplate = (filter) => {
  const getMessage = (filterType) => {
    switch(true){
      case (filterType === FilterType.EVERYTHING):
        return EmptyListMessages.EVERYTHING;
      case (filterType === FilterType.FUTURE):
        return EmptyListMessages.FUTURE;
      case (filterType === FilterType.PAST):
        return EmptyListMessages.PAST;
    }
  };
  return `<p class="trip-events__msg">${getMessage(filter)}</p>`;};

export default class NewEmptyListView extends AbstractView{
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType =filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}

