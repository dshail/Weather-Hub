import React, { useEffect, useState } from 'react';
import "./Section4.css";
import { getForecastData } from '../data/forecast.js';

const Section4 = (props) => {
  const [Location, setLocation] = useState("");
  const [Forecast, setForecast] = useState([]);

  const getDays = () => {
    const date = new Date();
    return date.getDay();
  }

  const setDays = (n) => {
    if (n > 6) {
      n = n - 7;
    }
    if (n === 0) {
      return `Sunday`;
    } else if (n === 1) {
      return `Monday`;
    } else if (n === 2) {
      return `Tuesday`;
    } else if (n === 3) {
      return `Wednesday`;
    } else if (n === 4) {
      return `Thursday`;
    } else if (n === 5) {
      return `Friday`;
    } else if (n === 6) {
      return `Saturday`;
    }
  }

  const getData = async () => {
    if (Location && Location !== "--") {
      let data;
      if (Location === "Bhopal") {
        data = await getForecastData("Bhopal", 7);
      } else {
        data = await getForecastData(Location, 7);
      }
      if (data) {
        let forecastArr = data.forecast.forecastday;
        setForecast(forecastArr);
      }
    }
  }

  const handleCard = (index) => {
    if (Forecast && Forecast.length > index) {
      let forecastDay = Forecast[index].day;
      let cond = forecastDay.condition;
      return (
        <>
          <div className='d-card-day'>{setDays(getDays() + index)}</div>
          <div className="d-wCondition">Weather Condition: {cond.text}</div>
          <div className="d-wCondition">Max-Temperature: {forecastDay.maxtemp_c}°C</div>
          <div className="d-wCondition">Min-Temperature: {forecastDay.mintemp_c}°C</div>
          <div className="d-wCondition">Avg-Humidity: {forecastDay.avghumidity}%</div>
          <div className="d-wCondition">Max-Winds: {forecastDay.maxwind_kph}kph</div>
        </>
      );
    }
    return null;
  }

  useEffect(() => {
    if (props.passLocData && props.passLocData !== "--") {
      setLocation(props.passLocData);
    }
  }, [props.passLocData]);

  useEffect(() => {
    getDays();
  }, []);

  useEffect(() => {
    getData();
  }, [Location]);

  return (
    <>
      <section id='section4'>
        <h1>Weekly Forecast</h1>
        <div className="day-cards">
          {[1, 2, 3, 4, 5, 6].map(index => (
            <div key={index} className="day-card">
              {handleCard(index)}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Section4;
