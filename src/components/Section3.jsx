import React, { useEffect, useState } from 'react';
import "./Section3.css";
import { getForecastData } from '../data/forecast.js';

const Section3 = (props) => {
    const [Date, setDate] = useState("");
    const [Location, setLocation] = useState("");
    const [CurrTime, setCurrTime] = useState("");
    const [forecast, setForecast] = useState([]);

    const getData = async () => {
        try {
            if (Location && Location !== "Nashik" && Location !== "--") {
                let data = await getForecastData(Location, 1);
                let forecastData = data.forecast.forecastday[0];
                setForecast(forecastData.hour);
                setDate(forecastData.date);
                let lastUpdatedTime = data.current.last_updated;
                let time = lastUpdatedTime.split(' ')[1].slice(0, 5);
                setCurrTime(time);
            }
        } catch (error) {
            console.error("Error fetching forecast data:", error);
            // Handle error state or display error message to user
        }
    }

    const handleCard = (t) => {
        let time = t < 10 ? `0${t}:00` : `${t}:00`;
        let timeArr = `${Date} ${time}`;
        let hrArr = forecast.find(hr => hr.time === timeArr);

        if (hrArr) {
            return (
                <>
                    <h1>Weather from {time} to {t + 3}:00</h1>
                    <div className="weather-data">Weather Condition: {hrArr.condition.text}</div>
                    <div className="weather-data">Temperature: {hrArr.temp_c}°C</div>
                    <div className="weather-data">Humidity: {hrArr.humidity}%</div>
                    <div className="weather-data">Winds: {hrArr.wind_kph} kph</div>
                </>
            );
        }
    }

    useEffect(() => {
        setLocation(props.passLocData);
    }, [props.passLocData]);

    useEffect(() => {
        if (Location && Location !== "" && Location !== " ") {
            if (Location === "Bhopal") {
                setLocation("Bhopal");
            }
            getData();
        }
    }, [Location]);

    return (
        <section id="section3">
            <h1>Hourly Forecast For {Location}</h1>
            <h2>Date: {Date}</h2>
            <div className="sec3-cont">
                {[0, 3, 6, 9, 12, 15, 18, 21].map(hour => (
                    <div key={hour} className="card">
                        {handleCard(hour)}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Section3;
