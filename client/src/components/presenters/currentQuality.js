import React from "react";
import {CurrentQualityView} from '../views/currentQualityView';


export const CurrentQualityPage = () => {

    const [data, setData] = React.useState(null);

    function fetchStatus() {
        fetch('api/sensors/airquality')
        .then((res) => res.json())
        .then((res) => setData([res]))
        .catch((e) => console.error(e));
      }
    
    return (
    React.createElement(CurrentQualityView, 
        {
            callback: () => {
                fetchStatus()
            },
            carbon: 10,
            soundLevel: 50, 
            people: 10,
            temperature: 22,
            humidity: 5,
            date: 'hello'
            
        }) 
    );
}

