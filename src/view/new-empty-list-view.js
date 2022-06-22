import AbstractView from '../framework/view/abstract-view.js';
import { EmptyListMessage, FilterType } from '../data.js';

const createEmptyListTemplate = (filter) => {
  const getMessage = (filterType) => {
    switch(true){
      case (filterType === FilterType.EVERYTHING):
        return EmptyListMessage.EVERYTHING;
      case (filterType === FilterType.FUTURE):
        return EmptyListMessage.FUTURE;
      case (filterType === FilterType.PAST):
        return EmptyListMessage.PAST;
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

