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
        carbon: data["docs"][0]["data"],
    }
}
/**
 * This function is responsible for creating a react component and providing it
 * with the data it needs to render. It sends props down to the view and event up to the model.
 * 
 * @returns A React funtional component, specifically the currentQuality component
 */
export const CurrentQualityPage = () => {
    
    //State variabel which holds the data fetched from the database
    const [data, setData] = React.useState(null);
    //State variabel which is used for fetching data
    const [fetching, setShouldFetch] = React.useState(true);
    //State variabel which holds the number of people currently in the room, set by a user.
    const [people, setPeople] = React.useState(null);

    /**
     * A toggle funciton, this function toggles the value of the state variabel fetching
     * The purpose of the function is to trigger a new fetch of data from the database
     */
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
        }, 60000);

        return () => clearInterval(intervalId)

    }, [fetching, people])


    return (
    React.createElement(CurrentQualityView, 
        {
            data, 
            people: 10,
            onSubmit: (amount) => {
                console.log("Amount", amount);
                //Send amount to database
            }
        }) 
    );
}

