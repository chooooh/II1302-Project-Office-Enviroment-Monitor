
/**
 * Function that fetches data from the api at the specified route '/api/sensor/...'
 * 
 * @param {String} route, the final keyword of the route address. 
 * @returns an object which contains the data fetched from the specified route
 */
const fetchData = async (route) => {
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
    const tempData       = await fetchData("temperature"); 
    const peopleData     = await fetchData("people");
    const humidityData   = await fetchData("humidity");

    return ({
        aqData,
        tempData,
        peopleData,
        humidityData
    })
};

