import React from "react";
import {CurrentQualityView} from '../views/currentQualityView';
import { fetchAllData } from "../../apiHandling/datafetcher";
import {parser} from "../../utils/parser"
import {currentDateTime} from '../../utils/utils.js'  //import function which returns current date and time from utils
/**
 * This is the presenter of current quality view component. 
 * It is responsible for creating the view and providing it with the props it needs to render.
 * It also reacts to events which occur in the view. 
 * This component also fetches data from the database on a timer using react hooks. The data is parsed
 * by the parser.js. The parsed object is sent down to the view and rendered by the view. 
 * @returns {React.element}, the created currentQualityView. 
 */
export const CurrentQualityPage = () => {
    //State variabel which holds the data fetched from the database
    const [data, setData] = React.useState(null);
    //state variabel which is used to trigger a fetch of data
    const [fetching, setShouldFetch] = React.useState(false);
    //state variabel keeping track of the number of people in the room
    const [numberOfPeople, setPeople] = React.useState(false);
    //state variabel which keeps track of the current date and time and the last fetch of data
    const [fetchTime, setFetchTime] = React.useState(null);

    /**
     * A toggle funciton, this function toggles the value of the state variabel fetching
     * The purpose of the function is to trigger a new fetch of data from the database
     */
    function toggle(){
        setShouldFetch(!fetching)
    }
    //React hook which will run every 5 seconds
    //Is ran at intial render and each time the state of fetching changes
    //The hook fetches the latest data regarding carbon dioxide levels and when the reading was done
    React.useEffect(() => {
        (async () => {
           let temp = await fetchAllData();
           console.log("TEMP", temp)
           if(temp != null){
               //set the data received
               setData(parser(temp))
               //set the date and time of this fetch
               setFetchTime(currentDateTime())
           }
        })();
     
        const intervalId = setInterval(() => {
          toggle()
        },  120000);
        
        return () => clearInterval(intervalId)

    }, [fetching])

    return (
    React.createElement(CurrentQualityView, 
        {
            data,
            fetchTime,
            numberOfPeople, 
            onSubmit: (amount) => {
                console.log("Amount", amount);
                setPeople(amount)
            }
        }) 
    );
}

