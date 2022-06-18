import AbstractView from '../framework/view/abstract-view.js';

const createNewTripPointButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewTripPointButton extends AbstractView {
  get template() {
    return createNewTripPointButtonTemplate();
  }

  setClickHandler = (cb) => {
    this._callback.click = cb;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
