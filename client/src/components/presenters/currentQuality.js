import React from "react";
import {CurrentQualityView} from '../views/currentQualityView';


/**
 * The functions parses the data it is given to a simple object
 * 
 * @param {*} data the data to be parsed
 * @returns an object which contains the parsed data
 */
function parser(data){
    return {
        date: data["docs"][0]["_id"],
        data: data["docs"][0]["data"],
    }
}

export const CurrentQualityPage = () => {

    const [data, setData] = React.useState(null);
    const [fetching, setShouldFetch] = React.useState(true);


    function toggle(){
        setShouldFetch(!fetching)
    }
   
    //React hook which will run every 5 seconds
    //The hook will fetch data from the datbase and set the state variabel data to the data which was fetched
    React.useEffect(() => {

        fetch('/api/sensor/airquality')
        .then((res) => res.json())
        .then((json) => parser(json))
        .then((parsed) => setData(parsed))

        const intervalId = setInterval(() => {
          toggle()
        }, 5000);

        return () => clearInterval(intervalId)

    }, [fetching])


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

