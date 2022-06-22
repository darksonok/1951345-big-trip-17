const HumanazieOption = {
  FOR_EDIT_FORM: 'editOption',
  FOR_TRIP_POINT_DATE: 'tripPointDate',
  FOR_TRIP_POINT_TIME: 'tripPointTime'
};

const FilterType = {
  EVERYTHING: 'everyting',
  PAST: 'past',
  FUTURE: 'future'
};

const EmptyListMessage = {
  EVERYTHING:'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PAST: 'There are no past events now'
};

const SORT_TYPES = [
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

const SortName = {
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

const DIGITS_REG_EXP = /[0-9]/;
const LETTERS_REG_EXP = /[a-zA-Z]/;

export {
  UserAction,
  UpdateType,
  SortName,
  SORT_TYPES,
  HumanazieOption,
  EmptyListMessage,
  FilterType,
  DIGITS_REG_EXP,
  LETTERS_REG_EXP
};
