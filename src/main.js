import { render } from './render.js';
import NewRoutePointCreatorView from './view/creating-form.js';
import BoardPresenter from './presenter/trips-presenter.js';
import NewFiltersView from './view/filters.js';

const siteMainElement = document.querySelector('main');
const tripEvents = siteMainElement.querySelector('.trip-events');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
//render(new NewRoutePointCreatorView(), body);
render(new NewFiltersView, tripFiltersContainer);
const boardPresenter = new BoardPresenter;

boardPresenter.init(tripEvents);
