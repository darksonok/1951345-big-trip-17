import dayjs from 'dayjs';
import { humanazieOptions } from './data.js';
import { FilterType } from './data.js';

const humanazieTripDate = (date, option) => {
  switch(true) {
    case (option === humanazieOptions.FOR_TRIP_POINT_DATE):
      return dayjs(date).format('D MMM');
    case (option === humanazieOptions.FOR_TRIP_POINT_TIME):
      return dayjs(date).format('hh:mm');
    case (option === humanazieOptions.FOR_EDIT_FORM):
      return dayjs(date).format('DD/MM/YY HH:mm');
  }
};

const dateDifference = (dateFrom, dateTo) => {
  const timeDifference = dayjs(dateTo).diff(dayjs(dateFrom));
  switch(true) {
    case (timeDifference < 3600000) :
      return `${Math.floor(timeDifference/60000)  }M`;
    case (timeDifference > 3600000 && timeDifference < 86400000) :
      return `${Math.floor(timeDifference/3600000)  }H ${Math.floor((timeDifference-Math.floor(timeDifference/3600000)*3600000)/60000)}M`;
    case (timeDifference > 86400000):
      return `${Math.floor(timeDifference/86400000)}D 
              ${Math.floor((timeDifference - Math.floor(timeDifference/86400000)*86400000)/3600000)  }H 
              ${Math.floor((timeDifference - Math.floor(timeDifference/3600000)*3600000)/60000)}M`;
  }
};

const getChosenFilter = () => {
  const allFiltersInputs = document.querySelectorAll('.trip-filters__filter-input');
  for (let i = 0; i < allFiltersInputs.length; i++) {
    if(allFiltersInputs[i].checked) {
      return allFiltersInputs[i].id;
    }
  }
};

const filter = {
  [FilterType.EVERYTHING]: (trips) => trips.filter((trip) => (trip)),
  [FilterType.FUTURE]: (trips) => trips.filter((trip) => dayjs(trip.dateFrom) > dayjs()),
  [FilterType.PAST]: (trips) => trips.filter((trip) => dayjs(trip.dateFrom) < dayjs())
};

const sortTripsByDate = (tripA, tripB) => dayjs(tripA.dateFrom).diff(dayjs(tripB.dateFrom));

const sortTripsByTime = (tripA, tripB) => dayjs(tripA.dateTo).diff(dayjs(tripA.dateFrom)) - dayjs(tripB.dateTo).diff(dayjs(tripB.dateFrom));

const sortTripsByPrice = (tripA, tripB) =>  tripA.totalPrice - tripB.totalPrice;

const isDateEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

export {
  filter,
  isDateEqual,
  humanazieTripDate,
  dateDifference,
  getChosenFilter,
  sortTripsByDate,
  sortTripsByTime,
  sortTripsByPrice
};

