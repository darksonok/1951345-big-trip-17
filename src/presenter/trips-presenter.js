import NewSorterView from '../view/sorter.js';
import { remove, render } from '../framework/render.js';
import NewTripEventsView from '../view/trip-events-view.js';
import NewEmptyListView from '../view/empty-list.js';
import TripPresenter from './trip-presenter.js';
import { SortType, SortNames, UpdateType, UserAction, FilterType } from '../data.js';
import { sortTripsByDate, sortTripsByTime, sortTripsByPrice } from '../utils.js';
import { filter } from '../utils.js';
import NewTripPresenter from './new-trip-presenter.js';

export default class TripsPresenter {

  #tripContainer = null;
  #tripComponent = new NewTripEventsView();
  #emptyListComponent = null;
  #sorterComponent = null;
  #tripsModel = null;
  #filterModel = null;
  #tripPresenter = new Map();
  #newTripPresenter = null;
  #currentSortType = SortType[SortNames.DAY].NAME;
  #filterType = FilterType.EVERYTHING;

  constructor(tripContainer, tripsModel, filterModel) {
    this.#tripContainer = tripContainer;
    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;

    this.#newTripPresenter = new NewTripPresenter(this.#tripComponent.element, this.#handleViewAction, this.#tripsModel);

    this.#tripsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get trips() {
    this.#filterType = this.#filterModel.filter;
    const trips = this.#tripsModel.trips;
    const filteredTrips = filter[this.#filterType](trips);

    switch (this.#currentSortType) {
      case SortType[SortNames.DAY].NAME:
        return filteredTrips.sort(sortTripsByDate);
      case SortType[SortNames.TIME].NAME:
        return filteredTrips.sort(sortTripsByTime);
      case SortType[SortNames.PRICE].NAME:
        return filteredTrips.sort(sortTripsByPrice);
    }
    return filteredTrips;
  }

  get destinations() {
    return this.#tripsModel.destinations;
  }

  get offers() {
    return this.#tripsModel.offers;
  }

  init = () => {
    this.#renderSorter();
    this.#renderTripComponent();
    this.#renderTrips();
  };

  createTripPoint = (cb) => {
    this.#currentSortType = SortType.EVERYTHING;
    this.#filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
    this.#newTripPresenter.init(cb);
  };

  #handleModeChange = () => {
    this.#newTripPresenter.destroy();
    this.#tripPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderTrip = (trip, destinations, offers) => {
    const tripPresenter = new TripPresenter(this.#tripComponent.element, this.#handleViewAction, this.#handleModeChange);
    tripPresenter.init(trip, destinations, offers);
    this.#tripPresenter.set(trip.id, tripPresenter);
  };

  #renderTrips = () => {
    this.trips.forEach((trip) => this.#renderTrip(trip, this.destinations, this.offers));
    if(this.trips.length === 0){
      this.#renderEmptyList();
    }
  };

  #renderSorter = () => {
    this.#sorterComponent = new NewSorterView(this.#currentSortType);
    render(this.#sorterComponent, this.#tripContainer);
    this.#sorterComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderTripComponent = () => {
    render(this.#tripComponent, this.#tripContainer);
  };

  #renderEmptyList = () => {
    this.#emptyListComponent = new NewEmptyListView(this.#filterType);
    render(this.#emptyListComponent, this.#tripContainer);
  };

  #clearTripList = ({resetSortType = false} = {}) => {
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#newTripPresenter.destroy();
    this.#tripPresenter.clear();

    if (resetSortType) {
      this.#currentSortType = SortType[SortNames.DAY].NAME;
    }
    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this.#tripsModel.updateTrip(updateType, update);
        break;
      case UserAction.ADD_TRIP:
        this.#tripsModel.addTrip(updateType, update);
        break;
      case UserAction.DELETE_TRIP:
        this.#tripsModel.deleteTrip(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripList();
        this.#renderTrips();
        break;
      case UpdateType.MAJOR:
        this.#clearTripList({resetSortType: true});
        this.#renderTrips();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTripList();
    this.#renderTrips();
  };
}
