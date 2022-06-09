import dayjs from 'dayjs';

export const gerenateFilters = (trips) => ([{
  name: 'EVERYTHING',
  count: trips.length
},
{
  name: 'FUTURE',
  count: trips.filter((trip) => dayjs(trip.dateFrom) > dayjs()).length
},
{
  name: 'PAST',
  count: trips.filter((trip) => dayjs(trip.dateFrom) < dayjs()).length
}
]);
