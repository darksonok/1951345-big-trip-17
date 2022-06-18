import { render, replace, remove } from '../framework/render.js';
import NewRoutePointEditFormView from '../view/edit-form.js';
import NewRoutePointView from '../view/route-point.js';
import { UserAction, UpdateType } from '../data.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITTING: 'EDITTING'
};
export default class TripPresenter {
  #tripContainer = null;
  #tripComponent = null;
  #tripEditComponent = null;
  #trip = null;
  #changeData = null;
  #changeMode = null;

  #mode = Mode.DEFAULT;
  constructor(tripContainer, changeData, changeMode) {
    this.#tripContainer = tripContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (trip, destinations, offers) => {
    this.#trip = trip;
    const prevTripComponent = this.#tripComponent;
    const prevTripEditComponent = this.#tripEditComponent;
    this.#tripComponent = new NewRoutePointView(trip, destinations, offers);
    this.#tripEditComponent = new NewRoutePointEditFormView(trip, destinations, offers);

    this.#tripComponent.setClickHandler(this.#handleEditClick);
    this.#tripEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#tripEditComponent.setClickHandler(this.#closeTripEditForm);
    this.#tripComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#tripEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevTripComponent === null || prevTripEditComponent === null) {
      render(this.#tripComponent, this.#tripContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripComponent, prevTripComponent);
    }

    if (this.#mode === Mode.EDITTING) {
      replace(this.#tripEditComponent, prevTripEditComponent);
    }

    remove(prevTripComponent);
    remove(prevTripEditComponent);

  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closeTripEditForm();
    }
  };

  destroy = () => {
    remove(this.#tripComponent);
    remove(this.#tripEditComponent);
  };

  #openTripEditForm = () => {
    replace(this.#tripEditComponent, this.#tripComponent);
    document.addEventListener('keyup', this.#escKeyUpHandler);
    this.#changeMode();
    this.#mode = Mode.EDITTING;
  };

  #closeTripEditForm = () => {
    replace(this.#tripComponent, this.#tripEditComponent);
    document.removeEventListener('keyup', this.#escKeyUpHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyUpHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closeTripEditForm();
    }
  };

  #handleEditClick = () => {
    this.#openTripEditForm();
  };

  #handleFormSubmit = (update) => {
    this.#changeData(
      UserAction.UPDATE_TRIP,
      UpdateType.MINOR,
      update);

    this.#closeTripEditForm();
  };

  #handleDeleteClick = (trip) => {
    this.#changeData(
      UserAction.DELETE_TRIP,
      UpdateType.MINOR,
      trip
    );
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_TRIP,
      UpdateType.MINOR,
      {...this.#trip, isFavorite: !this.#trip.isFavorite});
  };
}
