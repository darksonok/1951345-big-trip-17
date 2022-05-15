import {createElement} from '../render.js';
import { humanazieTripDate, dateDifference } from '../utils.js';

const createNewRoutePointTemplate = (trip, destination, offer) => {
  const createOffers = (tripData, offerData) => {
    const offersList = [];
    for (let i = 0; i < tripData.offers.length; i++) {
      const findById = (element) =>{
        if (element.id === tripData.offers[i]){
          return true;
        }
        return false;
      };
      offersList.push(offerData.offers.find(findById));

    }
    return offersList;
  };
  const createOffersTemplate = (allOffers) => {
    let offerTempltae = '';
    for (let i = 0; i < allOffers.length; i++){
      offerTempltae += `<li class="event__offer">
            <span class="event__offer-title">${allOffers[i].title}</span>
            +€&nbsp;
            <span class="event__offer-price">${allOffers[i].price}</span>
            </li>`;
    }
    return offerTempltae;
  };
  const actualOffersList = createOffers(trip, offer);
  const offerPrice = trip.basePrice + actualOffersList.reduce((prevValue, currValue) => prevValue + currValue.price, 0);
  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${trip.dateFrom}">${humanazieTripDate(trip.dateFrom, 1)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${trip.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">Taxi ${trip.destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${trip.dateFrom}">${humanazieTripDate(trip.dateFrom, 2)}</time>
          —
          <time class="event__end-time" datetime="${trip.dateTo}">${humanazieTripDate(trip.dateTo, 2)}</time>
        </p>
        <p class="event__duration">${dateDifference(trip.dateFrom, trip.dateTo)}</p>
      </div>
      <p class="event__price">
        €&nbsp;<span class="event__price-value">${offerPrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${createOffersTemplate(actualOffersList)}
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
export default class NewRoutePointView {
  constructor(trip, destination, offer) {
    this.trip = trip;
    this.destination = destination;
    this.offer = offer;
  }

  getTemplate() {
    return createNewRoutePointTemplate(this.trip, this.destination, this.offer);
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
