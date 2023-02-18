import React, { useState } from 'react';
import './App.css';
import { calculateDistanceFee, calculateSurcharge, calculateQuantitySurcharge,calculateRushSurcharge, roundNumber} from './helpers';
import {TextField} from '@mui/material' 
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';



function App() {

  // states the cart object
  const [cart, setCart] = useState({
    cartValue: 0,
    distance: 0,
    quantity: 0,
    orderTime: new Date('')
  });

 

  const [deliveryFee, setFee] = useState(0);
// calculates if the cart value is over 100e and sets fee to 0
    function calculateFee(): void {
      if (cart.cartValue > 100) {
        return setFee(0);
      }
      let fee = 0;
      fee += calculateSurcharge(cart.cartValue);
      fee += calculateDistanceFee(cart.distance);
      fee += calculateQuantitySurcharge(cart.quantity);
      calculateRushSurcharge(cart.orderTime, fee);

      setFee(roundNumber(Math.min(fee, 15)));
    }

    const inputChanged=(event:any)=>{
      setCart({...cart,[event.target.name]:event.target.value})
  }
 
    return (
   <div>
    <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Delivery Fee Calculator</Typography>
        </Toolbar>
      </AppBar>
    <Stack 
      alignItems="center"
      justifyContent="center"
      spacing={2}>
    <TextField 
    name="cartValue"
    label="Cart value (€)"
    variant="standard"
    value={cart.cartValue} 
    onChange={inputChanged}/>
    <TextField 
    name="distance"
    label="Delivery distance (m)"
    variant="standard"
    value={cart.distance}
    onChange={inputChanged}/>
    <TextField 
    name="quantity"
    label="Cart item quantity"
    variant="standard"
    value={cart.quantity}
    onChange={inputChanged}/> 

   {/*DateTimePicker not changing the value  */}
   <LocalizationProvider dateAdapter={AdapterDayjs}>
     <DateTimePicker
      renderInput={(params) => <TextField variant='standard' {...params} />}
      label="Order time"
      value={cart.orderTime}
      onChange={value=> setCart({...cart,orderTime:new Date()})}
  />
</LocalizationProvider>
   
    <Button
     variant="outlined"
     
     onClick={calculateFee}> Calculate fee</Button>
    
    Delivery fee: {deliveryFee} €
    </Stack>
   </div> 
  );

}

export default App;
