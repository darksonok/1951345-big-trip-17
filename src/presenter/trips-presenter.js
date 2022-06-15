import NewSorterView from '../view/sorter.js';
import { render } from '../framework/render.js';
import NewTripEventsView from '../view/trip-events-view.js';
import NewEmptyListView from '../view/empty-list.js';
import { getChosenFilter } from '../utils.js';
import { emptyListMessages } from '../data.js';
import TripPresenter from './trip-presenter.js';
import { updateItem } from '../utils.js';
import { SortType, SortNames } from '../data.js';
import { sortTripsByDate, sortTripsByTime, sortTripsByPrice } from '../utils.js';

export default class TripsPresenter {

  #tripContainer = null;
  #tripComponent = new NewTripEventsView();
  #sorterComponent = new NewSorterView();
  #trips = null;
  #destinations = null;
  #offers = null;
  #tripPresenter = new Map();
  #currentSortType = SortType[SortNames.DAY].NAME;
  #sourcedBoardTrips = [];

  constructor(tripContainer, tripsModel) {
    this.#tripContainer = tripContainer;
    this.#trips = tripsModel.trips;
    this.#destinations = tripsModel.destinations;
    this.#offers = tripsModel.offers;
  }

  init = () => {
    this.#sourcedBoardTrips = [...this.#trips];
    this.#renderSorter();
    this.#renderTripComponent();
    this.#renderEmptyList(this.#trips);
    this.#renderTrips(this.#sourcedBoardTrips, this.#destinations, this.#offers);
  };

  #handleModeChange = () => {
    this.#tripPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderTrip = (trip, destinations, offers) => {
    const tripPresenter = new TripPresenter(this.#tripComponent.element, this.#handleTripUpdate, this.#handleModeChange);
    tripPresenter.init(trip, destinations, offers);
    this.#tripPresenter.set(trip.id, tripPresenter);
  };

  #renderTrips = (trips, destinations, offers) => {
    trips.forEach((trip) => this.#renderTrip(trip, destinations, offers));
  };

  #renderSorter = () => {
    render(this.#sorterComponent, this.#tripContainer);
    this.#sorterComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderTripComponent = () => {
    render(this.#tripComponent, this.#tripContainer);
  };

  #renderEmptyList = (trips) => {
    if(trips.length === 0){
      switch(true){
        case (getChosenFilter() === 'filter-everything'):
          render(new NewEmptyListView(emptyListMessages.EVERYTHING), this.#tripContainer);
          break;
        case (getChosenFilter() === 'filter-future'):
          render(new NewEmptyListView(emptyListMessages.FUTURE), this.#tripContainer);
          break;
        case (getChosenFilter() === 'filter-past'):
          render(new NewEmptyListView(emptyListMessages.PAST), this.#tripContainer);
          break;
      }
    }

  };

  #clearTripList = () => {
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPresenter.clear();
  };

  #handleTripUpdate = (updatedTrip) => {
    this.#trips = updateItem(this.#trips, updatedTrip);
    this.#tripPresenter.get(updatedTrip.id).init(updatedTrip, this.#destinations, this.#offers);
  };

  #sortTasks = (sortType) => {
    switch (sortType) {
      case SortType[SortNames.DAY].NAME:
        this.#sourcedBoardTrips.sort(sortTripsByDate);
        break;
      case SortType[SortNames.TIME].NAME:
        this.#sourcedBoardTrips.sort(sortTripsByTime);
        break;
      case SortType[SortNames.PRICE].NAME:
        this.#sourcedBoardTrips.sort(sortTripsByPrice);
        break;
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTasks(sortType);
    this.#clearTripList();
    this.#renderTrips(this.#sourcedBoardTrips, this.#destinations, this.#offers);
  };
}
