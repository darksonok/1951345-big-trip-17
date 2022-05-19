import NewRoutePointEditFormView from '../view/edit-form.js';
import NewRoutePointView from '../view/route-point.js';
import NewSorterView from '../view/sorter.js';
import {render} from '../render.js';
import NewTripEventsView from '../view/trip-events-view.js';
export default class TripsPresenter {
  #tripContainer = null;
  #tripComponent = new NewTripEventsView();
  #trips = null;
  #destinations = null;
  #offers = null;
  init = (tripContainer, tripsModel) => {
    this.#tripContainer = tripContainer;
    this.#trips = tripsModel.trips;
    this.#destinations = tripsModel.destinations;
    this.#offers = tripsModel.offers;

    render(new NewSorterView(), this.#tripContainer);
    render(this.#tripComponent, this.#tripContainer);
    for (let i = 0; i < this.#trips.length; i++) {
      this.#renderTrip(this.#trips[i], this.#destinations, this.#offers);
    }
  };

  #renderTrip = (trip, destinations, offers) => {
    const oneTripComponent = new NewRoutePointView(trip, destinations, offers);
    const tripEditComponent = new NewRoutePointEditFormView(trip, destinations, offers);

    const openTripEditForm = () => {
      this.#tripComponent.element.replaceChild(tripEditComponent.element, oneTripComponent.element);
    };

    const closeTripEditForm = () => {
      this.#tripComponent.element.replaceChild(oneTripComponent.element, tripEditComponent.element);
    };

    const onEscKeyUp = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closeTripEditForm();
        document.removeEventListener('keyup', onEscKeyUp);
      }
    };

    oneTripComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      openTripEditForm();
      document.addEventListener('keyup', onEscKeyUp);
    });

    tripEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      closeTripEditForm();
      document.removeEventListener('keyup', onEscKeyUp);
    });

    tripEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      closeTripEditForm();
      document.removeEventListener('keyup', onEscKeyUp);
    });

    render(oneTripComponent, this.#tripComponent.element);
  };
}

