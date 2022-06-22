import dayjs from 'dayjs';
import { FilterType, HumanazieOption, DIGITS_REG_EXP, LETTERS_REG_EXP  } from './data.js';

const humanazieTripDate = (date, option) => {
  switch(true) {
    case (option === HumanazieOption.FOR_TRIP_POINT_DATE):
      return dayjs(date).format('D MMM');
    case (option === HumanazieOption.FOR_TRIP_POINT_TIME):
      return dayjs(date).format('hh:mm');
    case (option === HumanazieOption.FOR_EDIT_FORM):
      return dayjs(date).format('DD/MM/YY HH:mm');
  }
};

const calculateDateDifference = (dateFrom, dateTo) => {
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

const filter = {
  [FilterType.EVERYTHING]: (trips) => trips.filter((trip) => (trip)),
  [FilterType.FUTURE]: (trips) => trips.filter((trip) => dayjs(trip.dateFrom) > dayjs()),
  [FilterType.PAST]: (trips) => trips.filter((trip) => dayjs(trip.dateFrom) < dayjs())
};

const sortTripsByDate = (tripA, tripB) => dayjs(tripA.dateFrom).diff(dayjs(tripB.dateFrom));

const sortTripsByTime = (tripA, tripB) => dayjs(tripB.dateTo).diff(dayjs(tripB.dateFrom)) - dayjs(tripA.dateTo).diff(dayjs(tripA.dateFrom));

const sortTripsByPrice = (tripA, tripB) =>  tripB.totalPrice - tripA.totalPrice;

const validatePriceCorrectness = (priceValue) => DIGITS_REG_EXP.test(priceValue)&&!(LETTERS_REG_EXP.test(priceValue));

export {
  filter,
  humanazieTripDate,
  calculateDateDifference,
  sortTripsByDate,
  sortTripsByTime,
  sortTripsByPrice,
  validatePriceCorrectness
};

