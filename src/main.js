import { render } from './render.js';
import BoardPresenter from './presenter/trips-presenter.js';
import NewFiltersView from './view/filters.js';

const siteMainElement = document.querySelector('main');
const tripEvents = siteMainElement.querySelector('.trip-events');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
render(new NewFiltersView, tripFiltersContainer);
const boardPresenter = new BoardPresenter;

boardPresenter.init(tripEvents);
