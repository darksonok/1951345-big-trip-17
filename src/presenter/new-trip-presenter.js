import {remove, render, RenderPosition} from '../framework/render.js';
import NewRoutePointCreatorView from '../view/new-route-point-creator-view.js';
import {UserAction, UpdateType} from '../data.js';

export default class NewTripPresenter {
  #tripListContainer = null;
  #newTripAddComponent = null;
  #changeData = null;
  #destroyCallback = null;
  #destinations = null;
  #offers = null;

  constructor(tripListContainer, changeData, tripsModel) {
    this.#tripListContainer = tripListContainer;
    this.#changeData = changeData;
    this.#destinations = tripsModel.destinations;
    this.#offers = tripsModel.offers;
  }

  init = (callback) => {
    this.#destroyCallback = callback;
    this.#newTripAddComponent = new NewRoutePointCreatorView(this.#destinations, this.#offers);
    render(this.#newTripAddComponent, this.#tripListContainer, RenderPosition.BEFOREBEGIN);
    this.#newTripAddComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#newTripAddComponent.setDeleteClickHandler(this.#handleDeleteClick);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  setSaving = () => {
    this.#newTripAddComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#newTripAddComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#newTripAddComponent.shake(resetFormState);
  };

  destroy = () => {
    if (this.#newTripAddComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#newTripAddComponent);
    this.#newTripAddComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = (trip) => {
    this.#changeData(
      UserAction.ADD_TRIP,
      UpdateType.MINOR,
      trip,
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  
}
