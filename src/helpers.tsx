//rounds the number to 2 decimals
function roundNumber(value:number):number{
return Number(value.toFixed(2))
}

//calculates the surcharge; if the carts value is less than 10, 
//otherwise there will no surcharge
function calculateSurcharge(cartValue: number):number{
 const surchargeLimit = 10
 
 if (cartValue >= surchargeLimit){
    return 0
 }
 return roundNumber(Math.abs(surchargeLimit - cartValue))
 
}

//calculates the distance fee; the deliveryfee for the first 1000m is 2e, 
//looping through every 500m on top of that is 1e more
function calculateDistanceFee(distance:number):number{
 let fee = 2
 distance -= 1000
 
 while(distance > 0){
    distance -= 500 
    fee += 1
 }
  return fee
}
// calculates the items quantity surcharge;
 //if the items quantity is 12 or more there will be a 1.2e bulk fee
 //if the items are more than 4, every item over that will add 0.5e extra fee
function calculateQuantitySurcharge(quantity:number):number{
  let fee = 0
  
  if (quantity >= 12 ){
    fee += 1.2
  }
   
  quantity -= 4
   
  while(quantity > 0){
    quantity -= 1
    fee += 0.5
  }
 
  return fee
}

//calculates if it's rush hour (fri 3-7pm) and the extra surcharge
//first checks if the date includes friday, then it gets the hours and defines the rush hours beginning and end
// after that it checks if the delivery time is between hours 15-19
function calculateRushSurcharge(time: Date, fee:number ):number{
   const isFriday = time.toUTCString().includes("Fri")
   if(!isFriday){
    return fee
   }
   const hours = time.getUTCHours()
   const rushHourStart = 15
   const rushHourEnd = 19
   if (rushHourStart <= hours && hours < rushHourEnd){
    return roundNumber(fee * 1.2)
   }

    return fee 

}
  

export {calculateSurcharge, calculateDistanceFee, calculateQuantitySurcharge,calculateRushSurcharge, roundNumber}