import { useState } from "react";
import "./App.css";
import axios, * as others from 'axios';


const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [carCoast, setCarCoast] = useState({
    max: 6000000, 
    min: 1000000, 
    value: 1000000
  });
  const [initailPaymentPercent, setInitialPayment] = useState({
    max: 60, 
    min: 10, 
    value: 10 
  });
  const [leaseTerm, setLeaseTerm] = useState({
    max: 60, 
    min: 1, 
    value: 1 
  });
  
  let initail_payment = Math.round(carCoast.value * (initailPaymentPercent.value / 100));

  let monthly_payment_from = Math.round((carCoast.value - initail_payment) * (((initailPaymentPercent.value / 100) * Math.pow((1 +(initailPaymentPercent.value / 100)), leaseTerm.value))/(Math.pow((1 +(initailPaymentPercent.value / 100)), leaseTerm.value) - 1))) ;

  let total_sum = initail_payment + (leaseTerm.value * monthly_payment_from);

  const handleChange = (event) => {
    setCarCoast({...carCoast, value: event.target.value});
  };
  const handleChange2 = (event) => {
    setInitialPayment({...initailPaymentPercent, value: event.target.value});
  };
  const handleChange3 = (event) => {
    setLeaseTerm({...leaseTerm, value: event.target.value});
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  }
  const fetchData = async () => {
    setIsLoading(true);
    
    await axios({
      method: 'post',
      url: 'https://hookb.in/eK160jgYJ6UlaRPldJ1P',
      data: JSON.stringify(formData, null, 2)})
    .then((response) => {
    console.log("resp", response.data);})
    .catch(function (error) {
      console.log(error);
    });

    setIsLoading(false);
  };

  let formData = {
    car_coast: carCoast.value ,
    initail_payment, 
    initail_payment_percent: initailPaymentPercent.value, 
    lease_term: leaseTerm.value,
    total_sum, 
    monthly_payment_from
  }
  
  return (
    <div className="App">
      <h1>
        Рассчитайте стоимость <br/> автомобиля в лизинг
      </h1>
      
      <form >
      <div className="calc">
        <div className="calcBlock">
          <label htmlFor="car_coast" className="label-1">Стоимость автомобиля</label>
          <input disabled={isLoading? "disabled" : ''} type='number' id="car_coast" name="car_coast" className="inputs" value={carCoast.value} onChange={handleChange} min={carCoast.min} max={carCoast.max}/>
          <input disabled={isLoading? "disabled" : ''} id="car_coast_rng" name="car_coast_rng" type="range" value={carCoast.value} min={carCoast.min} max={carCoast.max} step={100} onChange={handleChange}/>
        </div>

        <div className="calcBlock">
          <label htmlFor="initail_payment_percent" className="label-1">Первоначальный взнос</label>
          <div  className={isLoading? "inputs payment dis" : "inputs payment"}>{initail_payment} ₽ <input type='number' id="initail_payment_percent" 
            name="initail_payment_percent" className="input-percents"
            value={initailPaymentPercent.value}
            max={initailPaymentPercent.max}
            min={initailPaymentPercent.min}
            onChange={handleChange2}
            disabled={isLoading? "disabled" : ''}/>
          </div>
          
          <input type="range" value={initailPaymentPercent.value}  disabled={isLoading? "disabled" : ''}
          max={initailPaymentPercent.max}
          min={initailPaymentPercent.min} onChange={handleChange2}/>
        </div>

        <div className="calcBlock">
          <label htmlFor="lease_term" className="label-1">Срок лизинга</label>
          <input disabled={isLoading? "disabled" : ''} className="inputs" type='number' id="lease_term" name="lease_term" min={leaseTerm.min} max={leaseTerm.max} value={leaseTerm.value} onChange={handleChange3}/>
          <input disabled={isLoading? "disabled" : ''} type="range" min={leaseTerm.min} max={leaseTerm.max} value={leaseTerm.value} onChange={handleChange3}/>
        </div>
      </div>

      <div className="calc v2">
        <div className="calcBlock">
          <label className="label-2">Сумма договора лизинга</label>
          <h1 className="gray">{total_sum} ₽</h1>
        </div>

        <div className="calcBlock">
          <label className="label-2">Ежемесячный платеж от</label>
          <h1 className="gray">{monthly_payment_from} ₽</h1>
        </div>

        <div className="calcBlock buttonSubmit">
          <button disabled={isLoading? "disabled" : ''} onClick={handleSubmit}>Оставить заявку</button>
        </div>
        
      </div>
      </form>
    </div>
  );
};


export default App;