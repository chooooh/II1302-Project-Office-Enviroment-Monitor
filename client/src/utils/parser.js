/**
 * The functions parses the data which is fetched from four different routes
 * into one object which will contain all data related to Air Quality.
 * This parsed object is later sent down from the presenter to the view. 
 * 
 * @param {Object} data the data to be parsed contains all data related to the current air quality
 * @param {Object} data.gases, the object which contains the most recent reading on carbon and volatile gases as well as when it was measured.
 * @param {Object} data.gases["date"], the date and time of when volatile gases and carbon was measured.
 * @param {Object} data.gases["data"].carbon, the current carbon value in the room measured in ppm.
 * @param {Object} data.gases["data"].volatile, the current number of volatile gases in the room, measured in ppb.
 * @param {Object} data.tempData, contains the most recent temperature reading and when it was measured.
 * @param {Object} data.tempData["date"], the date and time of when temperature was measured.
 * @param {Object} data.tempData["data"].temperature, the current temperature in the room. 
 * @param {Object} data.humidityData, contains the most recent humidity reading and when it was measured. 
 * @param {Object} data.humidityData["date"], the date and time of when the humidity was measured.
 * @param {Object} data.humidityData["data"].humidity, the most recent humidity reading
 * @returns {Object} an object which contains all data related to Air Quality.
 */
export const parser = (data) => {
    let temperature = null;
    let humidity = null;
    let people = null;
    let volatile = null;
    let carbon = null;
    let gasesDate = null;
    let humidityDate = null;
    let temperatureDate = null;

    if(!data.tempData) {
        temperature = "N/A";
        temperatureDate = "N/A";
    }else{
        temperature = data.tempData["data"].temperature;
        temperatureDate = data.tempData["date"];
    }
    if(!data.peopleData){
        people = "N/A"
    }
    else{
        people = data.peopleData["data"].people;
    }
    if(!data.humidityData){
        humidity = "N/A";
        humidityDate = "N/A";
    }else{
        humidity = data.humidityData["data"].humidity;
        humidityDate = data.humidityData["date"];
    }
    if(!data.gases){
        carbon = "N/A";
        volatile = "N/A";
        gasesDate = "N/A";
    }else{
        carbon = data.gases["data"].carbon;
        volatile = data.gases["data"].volatile;
        gasesDate = data.gases["date"];
    }
    console.log("In Parser arg", data)

    return  {
        people,
        gasesDate,          
        carbon,           
        volatile,           
        temperatureDate,    
        temperature,        
        humidityDate,       
        humidity               
    }
};
