import { nanoid } from 'nanoid';

export const generateTrips = () => ({
  basePrice: 1100,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: 'LowerVasuki',
  id: nanoid(),
  isFavorite: false,
  offers: [2, 3,6],
  type: 'taxi'
});
