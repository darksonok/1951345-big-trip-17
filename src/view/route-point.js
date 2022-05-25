import AbstractView from '../framework/view/abstract-view.js';
import { humanazieTripDate, dateDifference } from '../utils.js';

const createNewRoutePointTemplate = (trip, destinations, offers) => {
  const pointTypeOffer = offers.find((offer) => offer.type === trip.type);

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${trip.dateFrom}">${humanazieTripDate(trip.dateFrom, 'tripPointDate')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${trip.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">Taxi ${trip.destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${trip.dateFrom}">${humanazieTripDate(trip.dateFrom, 'tripPointTime')}</time>
          —
          <time class="event__end-time" datetime="${trip.dateTo}">${humanazieTripDate(trip.dateTo, 'tripPointTime')}</time>
        </p>
        <p class="event__duration">${dateDifference(trip.dateFrom, trip.dateTo)}</p>
      </div>
      <p class="event__price">
        €&nbsp;<span class="event__price-value">${trip.basePrice + pointTypeOffer.offers.filter((offer) => trip.offers.includes(offer.id)).map((offer) => offer.price).reduce((val1, val2) => val1 + val2)}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${pointTypeOffer.offers.filter((offer) => trip.offers.includes(offer.id)).map((offer) => `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      +€&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`).join('')}
      </ul>
      <button class="event__favorite-btn event__favorite-btn--active" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};
export default class NewRoutePointView extends AbstractView {
  #trip = null;
  #destinations = null;
  #offers = null;

  constructor(trip, destinations, offers) {
    super();
    this.#trip = trip;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createNewRoutePointTemplate(this.#trip, this.#destinations, this.#offers);
  }

  setClickHandler = (cb) => {
    this._callback.click = cb;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
