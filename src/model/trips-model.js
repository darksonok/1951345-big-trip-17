import { generateOffers } from '../mock/offer.js';
import { generateTrips } from '../mock/trip.js';
import { gerenateDestionations } from '../mock/destination.js';
import { NUMBER_OF_TRIPS } from '../data.js';

export default class TripsModel {
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
}

