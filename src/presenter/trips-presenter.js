import NewRoutePointEditFormView from '../view/edit-form.js';
import NewRoutePointView from '../view/route-point.js';
import NewSorterView from '../view/sorter.js';
import { render } from '../framework/render.js';
import NewTripEventsView from '../view/trip-events-view.js';
import NewEmptyListView from '../view/empty-list.js';
import { getChosenFilter } from '../utils.js';
import { emptyListMessages } from '../data.js';
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
    switch(true){
      case (this.#trips.length === 0 && getChosenFilter() === 'filter-everything'):
        render(new NewEmptyListView(emptyListMessages.EVERYTHING), this.#tripContainer);
        break;
      case (this.#trips.length === 0 && getChosenFilter() === 'filter-future'):
        render(new NewEmptyListView(emptyListMessages.FUTURE), this.#tripContainer);
        break;
      case (this.#trips.length === 0 && getChosenFilter() === 'filter-past'):
        render(new NewEmptyListView(emptyListMessages.PAST), this.#tripContainer);
        break;
      default:
        for (let i = 0; i < this.#trips.length; i++) {
          this.#renderTrip(this.#trips[i], this.#destinations, this.#offers);
        }
        break;
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

    oneTripComponent.setClickHandler(() => {
      openTripEditForm();
      document.addEventListener('keyup', onEscKeyUp);
    });

    tripEditComponent.setFormSubmitHandler(() => {
      closeTripEditForm();
      document.removeEventListener('keyup', onEscKeyUp);
    });

    tripEditComponent.setClickHandler(() => {
      closeTripEditForm();
      document.removeEventListener('keyup', onEscKeyUp);
    });

    render(oneTripComponent, this.#tripComponent.element);
  };
}

