
/**
 * The functions parses the data it is given to a simple object
 * 
 * 
 * @param {*} data the data to be parsed contains aqData, humidityData, peopleData and tempData
 * @returns an object which contains the parsed data
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

export const parseAll = (airQuality, tempData, peopleData, humidityData) => {
    
       return  {
            airQualityDate: airQuality.date,
            carbon: airQuality.data 
        }
    
};

/*
export const parseAll = (airQuality, tempData, peopleData, humidityData) => {
    (
        data = {
            airQualityDate: airQuality.date,
            volatile: airQuality.data.volatile,
            carbon: airQuality.data.carbon,
            temperatureDate: tempData.date,
            temperature: tempData.data,
            peopleDate: peopleData.date,
            people: peopleData.data,
            humidityDate: humidityData.date,
            humidity: humidityData.data
        }
    )
};
*/