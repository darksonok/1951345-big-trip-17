import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { validatePriceCorrectness } from '../utils.js';
import flatpickr from 'flatpickr';
import he from 'he';

const createNewRoutePointCreatorTemplate = (blankTrip, destinations, offers, isDisabled, isSaving) => {
  const pointTypeOffer = offers.find((offer) => offer.type === blankTrip.type);
  const destinationInfo = destinations.find((destination) => destination.name === blankTrip.destination);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${blankTrip.type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>
  
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
  
            ${offers.map((availOffer) => `<div class="event__type-item">
                        <input id="event-type-${availOffer.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${availOffer.type}">
                        <label class="event__type-label  event__type-label--${availOffer.type}" for="event-type-${availOffer.type}-1">${availOffer.type}</label>
                      </div>`).join('')}

          </fieldset>
        </div>
      </div>
  
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${blankTrip.type}
        </label>
        <select class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(blankTrip.destination)}" ${isDisabled ? 'disabled' : ''}>
        ${destinations.map((destination) => `<option ${destination.name === destinationInfo.name ? 'selected' : ''} value="${he.encode(destination.name)}">${he.encode(destination.name)}</option>`).join('')}
        </select>
      </div>
  
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${blankTrip.dateFrom}" ${isDisabled ? 'disabled' : ''}>
        —
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${blankTrip.dateTo}" ${isDisabled ? 'disabled' : ''}>
      </div>
  
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          €
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${blankTrip.basePrice}" ${isDisabled ? 'disabled' : ''}>
      </div>
  
      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled || blankTrip.saveButtonDisabled ? 'disabled' : ''}>${isSaving ? 'isSaving...' : 'Save'}</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  
        <div class="event__available-offers">
          ${offers.length !== 0 ? pointTypeOffer.offers.map((offer) => `<div class="event__offer-selector">
                      <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${offer.id}" type="checkbox" name="event-offer-comfort" ${isDisabled ? 'disabled' : ''}>
                      <label class="event__offer-label" for="event-offer-comfort-${offer.id}">
                        <span class="event__offer-title">${offer.title}</span>
                        +€&nbsp;
                        <span class="event__offer-price">${offer.price}</span>
                       </label>
                    </div>`).join('') : ''}
        </div>
      </section>
  
      <section class="event__details">
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinations.length !== 0 ? destinationInfo.description : ''}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${destinations.length !==0 ? destinationInfo.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join(''): ''}
                      </div>
                    </div>
                  </section>
                </section>
  </form>
  </li>`;
};

export default class NewRoutePointCreatorView extends AbstractStatefulView {

  #destinations = null;
  #offers = null;
  #dateToPicker = null;
  #dateFromPicker = null;

  blankTrip = {
    basePrice: '1100',
    dateFrom: new Date(),
    dateTo: new Date(),
    destination: 'Chamonix',
    isFavorite: false,
    id: '',
    offers: [],
    type: 'taxi',
  };

  constructor(destinations, offers) {
    super();
    this._state = NewRoutePointCreatorView.parseTripToState(this.blankTrip);
    this.#destinations = destinations;
    this.#offers = offers;
    this.#setInnerHandlers();
    this.#setDateTopicker();
    this.#setDateFromPicker();
  }

  get template() {
    return createNewRoutePointCreatorTemplate(this._state, this.#destinations, this.#offers);
  }

  setClickHandler = (cb) => {
    this._callback.click = cb;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };


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

  setFormSubmitHandler = (cb) => {
    this._callback.formSubmit = cb;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setDeleteClickHandler = (cb) => {
    this._callback.deleteClick = cb;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  #setInnerHandlers = () => {
    this.element.querySelector('#event-destination-1').addEventListener('change', this.#updatePointDestination);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#updatePointType);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#checkPriceCorrectnessValue);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#updatePointPrice);
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

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#checkPointOffers();
    this._callback.formSubmit(NewRoutePointCreatorView.parseStateToTrip(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(NewRoutePointCreatorView.parseStateToTrip(this._state));
  };

  #updatePointDestination = (evt) => {
    this.updateElement({
      destination: evt.target.value,
    });
  };

  #updatePointType = (evt) => {
    this.updateElement({
      type: evt.target.value,
    });
  };

  #updatePointPrice = (evt) => {
    this.updateElement({
      basePrice: evt.target.value,
    });
  };

  #checkPointOffers = () => {
    const AllOffers = this.element.querySelectorAll('.event__offer-checkbox');
    const offers = [];
    AllOffers.forEach((offer) => offer.checked ? offers.push(parseInt(offer.id.split('-')[3], 10)): '');
    this.updateElement({
      offers: offers,
    });
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDateTopicker();
    this.#setDateFromPicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  #checkPriceCorrectnessValue = (evt) => {
    this._state.saveButtonDisabled = !validatePriceCorrectness(evt.target.value);
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

  static parseTripToState = (trip) => ({...trip,
    isDisabled: false,
    isDeleting: false,
    isSaving: false
  });

  static parseStateToTrip = (state) => {
    const trip = {...state};
    delete trip.isDeleting;
    delete trip.isDisabled;
    delete trip.isSaving;
    delete this.saveButtonDisabled;

    return trip;
  };
}
