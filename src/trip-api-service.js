import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class TasksApiService extends ApiService {
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

  #adaptToServer = (trip, destinations) => {
    const adaptedTrip = {...trip,
      'is_favorite': trip.isFavorite,
      'base_price': trip.basePrice,
      'date_from': trip.dateFrom,
      'date_to': trip.dateTo,
      'destination': destinations.find((destination) => destination.name === trip.destination)

    };

    delete adaptedTrip.isFavorite;
    delete adaptedTrip.basePrice;
    delete adaptedTrip.dateFrom;
    delete adaptedTrip.dateTo;

    return adaptedTrip;
  };
}
