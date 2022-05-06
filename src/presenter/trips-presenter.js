import NewRoutePointCreatorView from '../view/creating-form.js';
import NewRoutePointEditFormView from '../view/edit-form.js';
import NewRoutePointView from '../view/route-point.js';
import NewSorterView from '../view/sorter.js';
import {render} from '../render.js';
import NewTripEventsView from '../view/trip-events-view.js';

export default class BoardPresenter {
  boardComponent = new NewTripEventsView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(new NewSorterView(), this.boardContainer);
    render(new NewRoutePointCreatorView, this.boardComponent.getElement());
    render(new NewRoutePointEditFormView, this.boardComponent.getElement());
    render(this.boardComponent, this.boardContainer);
    for (let i = 0; i < 3; i++) {
      render(new NewRoutePointView(), this.boardComponent.getElement());
    }
  };
}

