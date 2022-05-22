import {createElement} from '../render.js';

const createEmptyListTemplate = (message) => `<p class="trip-events__msg">${message}</p>`;

export default class NewEmptyListView {
  #element = null;
  #message = null;


  constructor(message) {
    this.#message = message;
  }

  get template() {
    return createEmptyListTemplate(this.#message);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}


/*
  Значение отображаемого текста зависит от выбранного фильтра:
    * Everthing – 'Click New Event to create your first point'
    * Past — 'There are no past events now';
    * Future — 'There are no future events now'.
*/
