import {createElement} from '../render.js';
import { humanazieTripDate } from '../utils.js';

const createNewRoutePointEditFormTemplate = (trip, destination, offer) => {
  const pointTypeOffer = offer.find((offers) => offers.type === trip.type);
  const destinationInfo = destination.find((destinationOne) => destinationOne.name === trip.destination);
  console.log(destinationInfo.pictures);
  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${trip.type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

  ${offer.map((availOffer) => {
    const checked = trip.type.includes(availOffer.type) ? 'checked' : '';
    return `<div class="event__type-item">
              <input id="event-type-${availOffer.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${availOffer.type}" ${checked}>
              <label class="event__type-label  event__type-label--${availOffer.type}" for="event-type-${availOffer.type}-1">${availOffer.type}</label>
            </div>`;}).join('')}

            
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${trip.type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanazieTripDate(trip.dateFrom, 3)}">
        —
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanazieTripDate(trip.dateTo, 3)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          €
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${trip.basePrice + pointTypeOffer.offers.filter((offerTest) => trip.offers.includes(offerTest.id)).map((offerTest) => offerTest.price).reduce((val1, val2) => val1 + val2)}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${pointTypeOffer.offers.map((offerOne) => {
    const checked = trip.offers.includes(offerOne.id) ? 'checked' : '';
    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" ${checked}>
              <label class="event__offer-label" for="event-offer-comfort-1">
                <span class="event__offer-title">${offerOne.title}</span>
                +€&nbsp;
                <span class="event__offer-price">${offerOne.price}</span>
               </label>
            </div>`;}).join('')}
          </div>
        </div>
      </section>

      <section class="event__details">
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinationInfo.description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${destinationInfo.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
                      </div>
                    </div>
                  </section>
                </section>
    </section>
  </form>
  </li>`;
};

export default class NewRoutePointEditFormView {
  constructor(trip, destination, offer) {
    this.trip = trip;
    this.destination = destination;
    this.offer = offer;
  }

  getTemplate() {
    return createNewRoutePointEditFormTemplate(this.trip, this.destination, this.offer);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
