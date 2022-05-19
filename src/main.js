import { render } from './render.js';
import BoardPresenter from './presenter/trips-presenter.js';
import NewFiltersView from './view/filters.js';
import TripsModel from './model/trips-model.js';

const siteMainElement = document.querySelector('main');
const tripEvents = siteMainElement.querySelector('.trip-events');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripsModel = new TripsModel();
render(new NewFiltersView, tripFiltersContainer);
const boardPresenter = new BoardPresenter();

boardPresenter.init(tripEvents, tripsModel);
