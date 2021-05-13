/**
 * The functions parses the data which is fetched from four different routes
 * into one object which will contain all data related to Air Quality.
 * This parsed object is later sent down from the presenter to the view. 
 * 
 * @param {Object} data the data to be parsed contains all data related to the current air quality
 * @param {Object} data.aqData, the object which contains the most recent reading on carbon and volatile gases as well as when it was measured.
 * @param {Object} data.aqData["docs"][0]["date"], the date and time of when volatile gases and carbon was measured.
 * @param {Object} data.aqData["docs"][0]["data"].carbon, the current carbon value in the room measured in ppm.
 * @param {Object} data.aqData["docs"][0]["data"].volatile, the current number of volatile gases in the room, measured in ppb.
 * @param {Object} data.tempData, contains the most recent temperature reading and when it was measured.
 * @param {Object} data.tempData["docs"][0]["date"], the date and time of when temperature was measured.
 * @param {Object} data.tempData["docs"][0]["data"].temperature, the current temperature in the room. 
 * @param {Object} data.humidityData, contains the most recent humidity reading and when it was measured. 
 * @param {Object} data.humidityData["docs"][0]["date"], the date and time of when the humidity was measured.
 * @param {Object} data.humidityData["docs"][0]["data"].humidity, the most recent humidity reading
 * @returns {Object} an object which contains all data related to Air Quality.
 */
export const parser = (data) => {
    const temperature = data.tempData;
    const people = data.peopleData;
    const humidity = data.humidityData;
    const aqData = data.aqData;

    console.log("In Parser arg", data)

    return  {
        airQualityDate:     aqData["docs"][0]["date"],
        carbon:             Number.parseFloat(aqData["docs"][0]["data"].carbon).toFixed(0),
        volatile:           Number.parseFloat(aqData["docs"][0]["data"].volatile).toFixed(0),
        temperatureDate:    temperature["docs"][0]["date"],
        temperature:        Number.parseFloat(temperature["docs"][0]["data"].temperature).toFixed(2),
        humidityDate:       humidity["docs"][0]["date"],
        humidity:           Number.parseFloat(humidity["docs"][0]["data"].humidity).toFixed(2),       
    }
};
