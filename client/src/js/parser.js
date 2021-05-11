/**
 * The functions parses the data which is fetched from four different routes
 * into one object which will contain all data related to Air Quality.
 * This parsed object is later sent down from the presenter to the view. 
 * 
 * 
 * @param {Object} data the data to be parsed contains aqData, humidityData, peopleData and tempData
 * data = {
 *      aqData,
 *      humidityData,
 *      peopleData,
 *      tempData,
 * }
 * @returns an object which contains all data related to Air Quality.
 */
export const parser = (data) => {
    console.log("IN PARSER:" , data["docs"]);

    const temperature = data.tempData;
    const people = data.peopleData;
    const humidity = data.humidityData;
    const aqData = data.aqData;

    return  {
        airQualityDate:     aqData["docs"][0]["date"],
        carbon:             aqData["docs"][0]["data"].carbon,
        volatile:           aqData["docs"][0]["data"].volatile,
        temperatureDate:    temperature["docs"][0]["date"],
        temperature:        temperature["docs"][0]["data"].temperature,
        humidityDate:       humidity["docs"][0]["date"],
        humidity:           humidity["docs"][0]["data"].humidity,       
    }
    
};
