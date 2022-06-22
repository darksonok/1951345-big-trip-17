import TripsPresenter from './presenter/trips-presenter.js';
import TripsModel from './model/trips-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model';
import NewTripPointButton from './view/new-trip-point-button.js';
import { render } from './framework/render.js';
import TripsApiService from './trips-api-service.js';


const AUTHORIZATION = 'Basic FA22180B05B179C0154C394F137B2415';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const siteMainElement = document.querySelector('main');
const tripEvents = siteMainElement.querySelector('.trip-events');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const siteHeaderContainer = document.querySelector('.trip-main');
const tripsModel = new TripsModel(new TripsApiService(END_POINT, AUTHORIZATION));
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

tripsModel.init()
  .finally(() => {
    render(newTripButtonComponent, siteHeaderContainer);
    newTripButtonComponent.setClickHandler(handleNewTripFormClick);
  });
boardPresenter.init();
filterPresenter.init();

