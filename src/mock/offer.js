export const generateOffer = () => ({
  type: 'taxi',
  offers: [
    {
      id: 1,
      title: 'Upgrade to a business class',
      price: 120
    },
    {
      id: 2,
      title: 'Choose the radio station',
      price: 60
    },
    {
      id: 3,
      title: 'Be kicked from the car by driver',
      price: 999
    }]
});
