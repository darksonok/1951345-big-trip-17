import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanazieTripDate } from '../utils.js';
import flatpickr from 'flatpickr';
import he from 'he';

import 'flatpickr/dist/flatpickr.min.css';


const createNewRoutePointEditFormTemplate = (trip, destinations, offers) => {
  const pointTypeOffer = offers.find((offer) => offer.type === trip.type);
  const destinationInfo = destinations.find((destination) => destination.name === trip.destination);
  const isOffersChecked = pointTypeOffer.offers
    .filter((offer) => trip.offers
      .includes(offer.id))
    .map((offer) => offer.price).length !== 0;

  const calculateOffersPrice = () => isOffersChecked ? pointTypeOffer.offers
    .filter((offer) => trip.offers
      .includes(offer.id))
    .map((offer) => offer.price)
    .reduce((val1, val2) => val1 + val2): 0;
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

  ${offers.map((availOffer) => {
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
        <select class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(trip.destination)}" >
        ${destinations.map((destination) => `<option ${destination.name === destinationInfo.name ? 'selected' : ''} value="${he.encode(destination.name)}">${he.encode(destination.name)}</option>`).join('')}
        </select>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanazieTripDate(trip.dateFrom, 'editOption')}">
        —
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanazieTripDate(trip.dateTo, 'editOption')}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          €
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${trip.basePrice}">
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
        ${pointTypeOffer.offers.map((offer) => {
    const checked = trip.offers.includes(offer.id) ? 'checked' : '';
    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${offer.id}" type="checkbox" name="event-offer-comfort" ${checked}>
              <label class="event__offer-label" for="event-offer-comfort-${offer.id}">
                <span class="event__offer-title">${offer.title}</span>
                +€&nbsp;
                <span class="event__offer-price">${offer.price}</span>
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
  </form>
  </li>`;
};

export default class NewRoutePointEditFormView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #dateToPicker = null;
  #dateFromPicker = null;

  constructor(trip, destinations, offers) {
    super();
    this._state = NewRoutePointEditFormView.parseTripToState(trip);
    this.#destinations = destinations;
    this.#offers = offers;
    this.#setInnerHandlers();
    this.#setDateTopicker();
    this.#setDateFromPicker();
  }

  removeElement = () => {
    super.removeElement();

    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }

    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }

  };

  get template() {
    return createNewRoutePointEditFormTemplate(this._state, this.#destinations, this.#offers);
  }

  setClickHandler = (cb) => {
    this._callback.click = cb;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  static parseTripToState = (trip) => ({...trip
  });

  static parseStateToTrip = (state) => ({...state
  });

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setFormSubmitHandler = (cb) => {
    this._callback.formSubmit = cb;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#checkPointOffers();
    this._callback.formSubmit(NewRoutePointEditFormView.parseStateToTrip(this._state));
  };

  setDeleteClickHandler = (cb) => {
    this._callback.deleteClick = cb;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(NewRoutePointEditFormView.parseStateToTrip(this._state));
  };

  #changePoint = (evt) => {
    this.updateElement({
      destination: evt.target.value,
    });
  };

  #changePointType = (evt) => {
    this.updateElement({
      type: evt.target.value,
    });
  };

  #changePointPrice = (evt) => {
    this.updateElement({
      basePrice: evt.target.value,
    });
  };

  #checkPointOffers = () => {
    const AllOffers = this.element.querySelectorAll('.event__offer-checkbox');
    const offersArray = [];
    AllOffers.forEach((offer) => offer.checked ? offersArray.push(parseInt(offer.id.split('-')[3], 10)): '');
    this.updateElement({
      offers: offersArray,
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('#event-destination-1').addEventListener('change', this.#changePoint);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changePointType);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#checkPrice);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#changePointPrice);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDateTopicker();
    this.#setDateFromPicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  #checkPrice = (evt) => {
    const submitButton = this.element.querySelector('.event__save-btn');
    if(!/[0-9]/.test(evt.target.value)) {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #setDateTopicker = () => {
    this.#dateToPicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'j F H:i',
        enableTime: true,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
      },
    );
  };

  #setDateFromPicker = () => {
    this.#dateFromPicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'j F H:i',
        enableTime: true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );
  };

}
