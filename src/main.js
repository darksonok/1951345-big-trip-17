import TripsPresenter from './presenter/trips-presenter.js';
import TripsModel from './model/trips-model.js';
import FilterPresenter from './presenter/filter-presenter';
import FilterModel from './model/filter-model';
import NewTripPointButton from './view/new-point- button.js';
import { render } from './framework/render.js';
const siteMainElement = document.querySelector('main');
const tripEvents = siteMainElement.querySelector('.trip-events');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const siteHeaderContainer = document.querySelector('.trip-main');
const tripsModel = new TripsModel();
const filterModel = new FilterModel();
const boardPresenter = new TripsPresenter(tripEvents, tripsModel, filterModel);
const filterPresenter = new FilterPresenter(tripFiltersContainer, filterModel, tripsModel);
const newTripButtonComponent = new NewTripPointButton();


const handleNewTripFormClose = () => {
  newTripButtonComponent.element.disabled = false;
};

const handleNewTripFormClick = () => {
  boardPresenter.createTripPoint(handleNewTripFormClose);
  newTripButtonComponent.element.disabled = true;
};

render(newTripButtonComponent, siteHeaderContainer);
newTripButtonComponent.setClickHandler(handleNewTripFormClick);


boardPresenter.init();
filterPresenter.init();
