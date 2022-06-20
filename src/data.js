const NUMBER_OF_TRIP_POINTS = 3;
const NUMBER_OF_TRIPS = 15;
const humanazieOptions = {
  FOR_EDIT_FORM: 'editOption',
  FOR_TRIP_POINT_DATE: 'tripPointDate',
  FOR_TRIP_POINT_TIME: 'tripPointTime'
};

const FilterType = {
  EVERYTHING: 'everyting',
  PAST: 'past',
  FUTURE: 'future'
};

const EmptyListMessages = {
  EVERYTHING:'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PAST: 'There are no past events now'
};
const SortType = [
  {
    NAME: 'day',
    OPTION: ''
  },
  {
    NAME: 'event',
    OPTION: 'disabled'
  },
  {
    NAME: 'time',
    OPTION: ''
  },
  {
    NAME: 'price',
    OPTION: ''
  },
  {
    NAME: 'offers',
    OPTION: 'disabled'
  }
];

const SortNames = {
  DAY: '0',
  EVENT: '1',
  TIME: '2',
  PRICE: '3',
  OFFERS: '4'
};

const UserAction = {
  UPDATE_TRIP: 'UPDATE_TRIP',
  ADD_TRIP: 'ADD_TRIP',
  DELETE_TRIP: 'DELETE_TRIP',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

export {
  UserAction,
  UpdateType,
  SortNames,
  SortType,
  NUMBER_OF_TRIP_POINTS,
  NUMBER_OF_TRIPS,
  humanazieOptions,
  EmptyListMessages,
  FilterType
};
