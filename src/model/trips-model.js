import { generateOffers } from '../mock/offer.js';
import { generateTrips } from '../mock/trip.js';
import { gerenateDestionations } from '../mock/destination.js';
import { NUMBER_OF_TRIPS } from '../data.js';
import Observasble from '../framework/observable.js';

export default class TripsModel extends Observasble {
  #trips = Array.from({length: NUMBER_OF_TRIPS}, generateTrips);
  #destinations = gerenateDestionations();
  #offers = generateOffers();

  get trips() {
    return this.#trips;
  }

  // eslint-disable-next-line no-dupe-class-members
  get destinations() {
    return this.#destinations;
  }

  // eslint-disable-next-line no-dupe-class-members
  get offers() {
    return this.#offers;
  }

  updateTrip = (updateType, update) => {
    const index = this.#trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting trip');
    }

    this.#trips = [
      ...this.#trips.slice(0, index),
      update,
      ...this.#trips.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addTrip = (updateType, update) => {
    this.#trips = [
      update,
      ...this.#trips,
    ];

    this._notify(updateType, update);
  };

  deleteTrip = (updateType, update) => {
    const index = this.#trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting trip');
    }

    this.#trips = [
      ...this.#trips.slice(0, index),
      ...this.#trips.slice(index + 1),
    ];

    this._notify(updateType);
  };
}

