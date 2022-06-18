import Observasble from '../framework/observable.js';
import { UpdateType } from '../data.js';


export default class TripsModel extends Observasble {
  #trips = [];
  #destinations = [];
  #offers = [];
  #tripsApiService = null;


  constructor(tripsApiService) {
    super();
    this.#tripsApiService = tripsApiService;
  }

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

  init = async () => {
    try {

      const trips = await this.#tripsApiService.trips;
      const destinations = await this.#tripsApiService.destinations;
      const offers = await this.#tripsApiService.offers;
      this.#trips = trips.map(this.#adaptToClient);
      this.#destinations = destinations;
      this.#offers = offers;
    }
    catch(err) {
      this.#trips = [];
    }

    this._notify(UpdateType.INIT);
  };

  updateTrip = async (updateType, update) => {
    const index = this.#trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting trip');
    }

    try {
      const response = await this.#tripsApiService.updateTrip(update, this.#destinations);
      const updatedTrip = this.#adaptToClient(response);
      this.#trips = [
        ...this.#trips.slice(0, index),
        updatedTrip,
        ...this.#trips.slice(index + 1),
      ];
      this._notify(updateType, updatedTrip);
    } catch(err) {
      throw new Error('Can\'t update task');
    }
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

  #adaptToClient = (trip) => {
    const adaptedTrip = {...trip,
      isFavorite: trip['is_favorite'],
      basePrice: trip['base_price'],
      dateFrom: trip['date_from'],
      dateTo: trip['date_to'],
      destination: trip['destination'].name
    };

    delete adaptedTrip['is_favorite'];
    delete adaptedTrip['base_price'];
    delete adaptedTrip['date_from'];
    delete adaptedTrip['date_to'];


    return adaptedTrip;
  };

}

