import React from "react";
import {CurrentQualityView} from '../views/currentQualityView';
import { fetchAllData } from "../../apiHandling/datafetcher";

/**
 * This function is responsible for creating a react component and providing it
 * with the data it needs to render. It sends props down to the view and event up to the model.
 * 
 * @returns A React funtional component, specifically the currentQuality component
 */
export const CurrentQualityPage = () => {
    //State variabel which holds the data fetched from the database
    const [data, setData] = React.useState(null);
    //
    const [fetching, setShouldFetch] = React.useState(false);
    //
    const [numberOfPeople, setPeople] = React.useState(false);
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
        setData(fetchAllData());
        const intervalId = setInterval(() => {
          toggle()
        }, 60000);

        return () => clearInterval(intervalId)

    }, [fetching])

    return (
    React.createElement(CurrentQualityView, 
        {
            data,
            numberOfPeople, 
            onSubmit: (amount) => {
                console.log("Amount", amount);
                setPeople(amount)
            }
        }) 
    );
}

