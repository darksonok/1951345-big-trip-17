import { generateOffer } from '../mock/offer.js';
import { generateTrip } from '../mock/trip.js';
import { gerenateDestionation } from '../mock/destination.js';

export default class TripsModel {
  trips = Array.from({length: 5}, generateTrip);
  destination = gerenateDestionation();
  offer = generateOffer();

  getTrips = () => this.trips;
  getDestionation = () => this.destination;
  getOffer = () => this.offer;
}

