import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export default class TripsApiService extends ApiService {
  get trips() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  updateTrip = async (trip, destinations) => {
    const response = await this._load({
      url: `points/${trip.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(trip, destinations)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  addTrip = async (trip, destinations) => {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(trip, destinations)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  deleteTrip = async (trip) => {
    const response = await this._load({
      url: `points/${trip.id}`,
      method: Method.DELETE,
    });

    return response;
  };

  #adaptToServer = (trip, destinations) => {
    const adaptedTrip = {...trip,
      'is_favorite': trip.isFavorite,
      'base_price': parseInt(trip.basePrice, 10),
      'date_from': trip.dateFrom instanceof Date ? trip.dateFrom.toISOString() : trip.dateFrom,
      'date_to': trip.dateTo instanceof Date ? trip.dateTo.toISOString() : trip.dateTo,
      'destination': destinations.find((destination) => destination.name === trip.destination)

    };

    delete adaptedTrip.isFavorite;
    delete adaptedTrip.basePrice;
    delete adaptedTrip.dateFrom;
    delete adaptedTrip.dateTo;
    delete adaptedTrip.totalPrice;

    return adaptedTrip;
  };
}
