import {remove, render, RenderPosition} from '../framework/render.js';
import NewRoutePointCreatorView from '../view/creating-form.js';
import {nanoid} from 'nanoid';
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
      // Пока у нас нет сервера, который бы после сохранения
      // выдывал честный id задачи, нам нужно позаботиться об этом самим
      {id: nanoid(), ...trip},
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
