import dayjs from 'dayjs';
import { humanazieOptions } from './data.js';

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
              ${Math.floor(timeDifference - Math.floor(timeDifference/86400000)*86400000/3600000)  }H 
              ${Math.floor((timeDifference-Math.floor(timeDifference/3600000)*3600000)/60000)}M`;
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

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0,index),
    update,
    ...items.slice(index+1),
  ];
};

const sortTripsByDate = (tripA, tripB) => dayjs(tripA.dateFrom).diff(dayjs(tripB.dateFrom));

const sortTripsByTime = (tripA, tripB) => dayjs(tripA.dateTo).diff(dayjs(tripA.dateFrom)) - dayjs(tripB.dateTo).diff(dayjs(tripB.dateFrom));

const sortTripsByPrice = (tripA, tripB) =>  tripA.price - tripB.price;

export {
  humanazieTripDate,
  dateDifference,
  getChosenFilter,
  updateItem,
  sortTripsByDate,
  sortTripsByTime,
  sortTripsByPrice
};

