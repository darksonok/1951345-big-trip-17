import NewRoutePointCreatorView from '../view/creating-form.js';
import NewRoutePointEditFormView from '../view/edit-form.js';
import NewRoutePointView from '../view/route-point.js';
import NewSorterView from '../view/sorter.js';
import {render} from '../render.js';
import NewTripEventsView from '../view/trip-events-view.js';
export default class TripsPresenter {
  tripComponent = new NewTripEventsView();

  init = (tripContainer, tripsModel) => {
    this.tripContainer = tripContainer;
    this.trips = tripsModel.getTrips();
    this.destionations = tripsModel.getDestionation();
    this.offers = tripsModel.getOffer();

    render(new NewSorterView(), this.tripContainer);
    render(new NewRoutePointCreatorView, this.tripComponent.getElement());
    render(new NewRoutePointEditFormView(this.trips[0], this.destionations, this.offers), this.tripComponent.getElement());
    render(this.tripComponent, this.tripContainer);
    for (let i = 0; i < this.trips.length; i++) {
      render(new NewRoutePointView(this.trips[i], this.destionations, this.offers), this.tripComponent.getElement());
    }
  };
}

