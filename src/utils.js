import dayjs from 'dayjs';

const humanazieTripDate = (date, option) => {
  if (option === 1){
    return dayjs(date).format('D MMM');
  }
  if (option === 2){
    return dayjs(date).format('hh:mm');
  }
  if (option === 3){
    return dayjs(date).format('DD/MM/YY HH:mm');
  }
};

const dateDifference = (dateFrom, dateTo) => {
  const timeDifference = dayjs(dateTo).diff(dayjs(dateFrom));
  if (timeDifference < 3600000) {
    return `${Math.floor(timeDifference/60000)  }M`;
  }
  if (timeDifference > 3600000 && timeDifference < 86400000) {
    return `${Math.floor(timeDifference/3600000)  }H ${Math.floor((timeDifference-Math.floor(timeDifference/3600000)*3600000)/60000)}M`;
  }
  if (timeDifference > 86400000){
    return `${Math.floor(timeDifference/86400000)}D 
    ${Math.floor(timeDifference - Math.floor(timeDifference/86400000)*86400000/3600000)  }H 
    ${Math.floor((timeDifference-Math.floor(timeDifference/3600000)*3600000)/60000)}M`;
  }
};


export {
  humanazieTripDate,
  dateDifference
};

