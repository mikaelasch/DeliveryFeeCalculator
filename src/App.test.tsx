import { calculateDistanceFee, calculateSurcharge, calculateQuantitySurcharge,calculateRushSurcharge, roundNumber} from './helpers';
import dayjs from 'dayjs'

test('adds surcharge', () => {
  expect(calculateSurcharge(5)).toEqual(5);
  expect(calculateSurcharge(10)).toEqual(0);
  expect(calculateSurcharge(25)).toEqual(0);
  expect(calculateSurcharge(2.5)).toEqual(7.5);
  expect(calculateSurcharge(8.9)).toEqual(1.1);
});

test('adds distance fee', () => {
  expect(calculateDistanceFee(499)).toEqual(2)
  expect(calculateDistanceFee(1499)).toEqual(3);
  expect(calculateDistanceFee(1500)).toEqual(3);
  expect(calculateDistanceFee(1501)).toEqual(4);
 ;
});

test('adds quantity fee', () => {
  expect(calculateQuantitySurcharge(4)).toEqual(0)
  expect(calculateQuantitySurcharge(5)).toEqual(0.5);
  expect(calculateQuantitySurcharge(10)).toEqual(3);
  expect(calculateQuantitySurcharge(13)).toEqual(5.7);
 ;
});

test('adds rushhour fee', () => {
  expect(calculateRushSurcharge(dayjs().day(5).set("hour", 18).set("minute", 39).toDate(),2)).toEqual(roundNumber(2*1.2))
  expect(calculateRushSurcharge(dayjs().day(5).set("hour", 20).set("minute", 59).toDate(), 5)).toEqual(roundNumber(5*1.2));
  expect(calculateRushSurcharge(dayjs().day(5).set("hour", 21).set("minute", 2).toDate(),7)).toEqual(7);
  expect(calculateRushSurcharge(dayjs().day(4).set("hour", 21).set("minute", 2).toDate(),9)).toEqual(9);
 ;
});


