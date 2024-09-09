import * as React from 'react';
import { useState } from 'react'; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import './SearchBox.css'

export default function SearchBox(){
    let [city, setCity] = useState("");

    const API_URL = "http://api.openweathermap.org/geo/1.0/direct"
    const API_KEY = "445af78c6e6ba389fa11681f637c6968"
    const limit = 15

    let getWeatherInfo = async() =>{
        let response = await fetch (`${API_URL}?q=${city}&limit=${limit}&appid=${API_KEY}`);
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        let result = {
            temp : jsonResponse.current.temp
            // tempMin : jsonResponse.main.temp_min,
            // tempMax : jsonResponse.main.temp_max,
            // humidity : jsonResponse.main.humidity,
            // feelsLike : jsonResponse.main.feelsLike,
            // weather : jsonResponse.weather[0].description,
        };
        console.log(result);
    }

    let handelChange = (event) => {
        setCity(event.target.value);
    };

    let handelSubmit = (event) => {
        event.preventDefault();
        console.log(city);
        setCity("");
        getWeatherInfo();
    };

    return(
        <div className='searchBox'>
            <h2>Search for weather</h2>
            <form onSubmit={handelSubmit}>
            <TextField 
                id="city" 
                label="city name" 
                variant="outlined" 
                value={city} 
                onChange={handelChange} 
                required
            />
            <br /><br />
            <Button variant="contained" endIcon={<SendIcon />} type='submit'>Search</Button>
            </form>
        </div>
    )
}