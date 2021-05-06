
/**
 * The functions parses the data it is given to a simple object
 * 
 * @param {*} data the data to be parsed
 * @returns an object which contains the parsed data
 */
export const parser = (data) => {
    console.log("IN PARSER:" , data["docs"]);
    return  {
        date: data["docs"][0]["_id"].substring(11),
        data: data["docs"][0]["data"],
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