import NewRoutePointCreatorView from '../view/creating-form.js';
import NewRoutePointEditFormView from '../view/edit-form.js';
import NewRoutePointView from '../view/route-point.js';
import NewSorterView from '../view/sorter.js';
import {render} from '../render.js';
import NewTripEventsView from '../view/trip-events-view.js';
import { NUMBER_OF_TRIP_POINTS } from '../data.js';
export default class TripsPresenter {
  tripComponent = new NewTripEventsView();

  init = (tripContainer) => {
    this.tripContainer = tripContainer;

    render(new NewSorterView(), this.tripContainer);
    render(new NewRoutePointCreatorView, this.tripComponent.getElement());
    render(new NewRoutePointEditFormView, this.tripComponent.getElement());
    render(this.tripComponent, this.tripContainer);
    for (let i = 0; i < NUMBER_OF_TRIP_POINTS; i++) {
      render(new NewRoutePointView(), this.tripComponent.getElement());
    }
  };
}

