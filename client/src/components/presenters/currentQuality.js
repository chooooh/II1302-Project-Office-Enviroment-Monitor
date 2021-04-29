import React from "react";
import {CurrentQualityView} from '../views/currentQualityView';



function parser(data){
 
    return {
        date: data["docs"][0]["_id"],
        data: data["docs"][0]["data"],
    }
}

export const CurrentQualityPage = () => {

    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch('/api/sensor/airquality')
        .then((res) => res.json())
        .then((json) => parser(json))
        .then((parsed) => setData(parsed))
    }, [])

    return (
    React.createElement(CurrentQualityView, 
        {
            data,
            soundLevel: 50, 
            people: 10,
            temperature: 22,
            humidity: 5,
            date: "not the actual date"
            
            
        }) 
    );
}

