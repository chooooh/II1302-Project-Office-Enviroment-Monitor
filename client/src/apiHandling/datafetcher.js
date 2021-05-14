
/**
 * Function that fetches data from the api at the specified route '/api/sensor/...'
 * of no data is found return null
 * @param {String} route, the final keyword of the route address. 
 * @returns an object which contains the data fetched from the specified route
 */
const fetchData = async (route) => {
    try{
        const res    = await fetch('/api/sensor/' + route);
        const json   = await res.json();
        return json;
    }catch(exception){
        console.log("Error", exception.message)
        return null
    }
};

/**
 * Function which utilises the fetchData function to fetch four
 * types of data. Temperature, Humidity, Carbon And Volatile
 * @returns an object which contains all data
 */
export const fetchAllData = async () => {
    const tempData       = await fetchData("temperature"); 
    const peopleData     = await fetchData("people");
    const humidityData   = await fetchData("humidity");
    const gases          = await fetchData('gases');

    return ({
        gases,
        tempData,
        peopleData,
        humidityData
    })
};

