
/**
 * Function that fetches data from the api at the specified route '/api/sensor/...'
 * 
 * @param {String} route, the final keyword of the route address. 
 * @returns an object which contains the data fetched from the specified route
 */
const fetchData = async (route) => {
   console.log("HERE", route)
   const res    = await fetch('/api/sensor/' + route);
   const json   = await res.json();
   return json;
};

/**
 * Function which utilises the fetchData function to fetch four
 * types of data. Temperature, Humidity, Carbon And Volatile
 * @returns an object which contains all data
 */
export const fetchAllData = async () => {

    const aqData         = await fetchData('airquality');
    console.log("data", aqData)
    const tempData     = await fetchData("temperature");
    console.log("TEMPERATURE", tempData);
    
    const peopleData   = await fetchData("people");
    console.log("peopleData", peopleData);
    const humidityData = await fetchData("humidity");
    console.log("TEMPERATURE", humidityData);
    return ({
        aqData,
        tempData,
        peopleData,
        humidityData
    })

    //return parseAll(airData)
    //return parseAll(airData, tempData, peopleData, humidityData);
};

