import AbstractView from '../framework/view/abstract-view.js';

const createTripEventsTemplate = () => '<ul class="trip-events__list"></ul>';

export default class NewTripEventsView extends AbstractView {

  get template() {
    return createTripEventsTemplate();
  }

}
