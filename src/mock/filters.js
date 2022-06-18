import dayjs from 'dayjs';
import { FilterType } from '../data.js';

export const gerenateFilters = (trips) => ([{
  name: FilterType.EVERYTHING,
  count: trips.length
},
{
  name: FilterType.FUTURE,
  count: trips.filter((trip) => dayjs(trip.dateFrom) > dayjs()).length
},
{
  name: FilterType.PAST,
  count: trips.filter((trip) => dayjs(trip.dateFrom) < dayjs()).length
}
]);
