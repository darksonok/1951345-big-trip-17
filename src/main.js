import { render } from './framework/render';
import BoardPresenter from './presenter/trips-presenter.js';
import NewFiltersView from './view/filters.js';
import TripsModel from './model/trips-model.js';
import { gerenateFilters } from './mock/filters.js';

const siteMainElement = document.querySelector('main');
const tripEvents = siteMainElement.querySelector('.trip-events');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripsModel = new TripsModel();
render(new NewFiltersView(gerenateFilters(tripsModel.trips)), tripFiltersContainer);
const boardPresenter = new BoardPresenter(tripEvents, tripsModel);
//console.log(gerenateFilters(tripsModel.trips));

boardPresenter.init();
