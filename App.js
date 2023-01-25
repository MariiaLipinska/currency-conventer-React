import React, { useEffect, useState } from 'react';
import { Block } from './component/Block';
import './index.css';

function App() {
  // вибираємо першу валюту і зберігаємо у змінній
  const [fromCurrency, setFromCurrency] = useState("UAH")
  // вибираємо другу валюту і зберігаємо у змінній
  const[toCurrency, setToCurrency]=useState("USD")
  // зберігаємо значення валюти у змінній
  const [rates, setRates] = useState({});
  // вибираємо ціну валюти
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);
  useEffect(() => {
    fetch('https://api.exchangerate.host/latest')
      .then(res => res.json()
      )
      .then(json => {
        setRates(json.rates);
        console.log(json.rates)
      }).catch(err => {
        console.log(err);
        alert("Не вдалося завантажити інформацію ")
    })
  }, [])
  
  // пишемо функцію для вирахування ціни першої валюти 
  const onChangeFromPrice = (value) => {
    // вираховуємо вартість одиниці введеної нами валюти
    const price = value / rates[fromCurrency];
    // вираховуємо результат другої валюти
    const result = price * rates[toCurrency];
    // зберігаємо нові значення
    setFromPrice(value);
    setToPrice(result.toFixed(4));
  }
  const onChangeToPrice = (value) => {
    // вираховуємо результат другої валюти
    const result = (rates[fromCurrency]/rates[toCurrency]) * value;
    // зберігаємо нові значення
    setFromPrice(result.toFixed(4));
    setToPrice(value);
  }
  // робимо useEffect, яка відслідковує зміну валюти у першому блоці
  useEffect(()=> {
    onChangeFromPrice(fromPrice)
  },[fromCurrency])
  // робимо useEffect, яка відслідковує зміну валюти у другому блоці
  useEffect(()=> {
    onChangeToPrice(toPrice)
  },[toCurrency])

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice} />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice} />
    </div>
  );
}

export default App;
