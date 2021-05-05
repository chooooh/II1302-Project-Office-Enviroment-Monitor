import { parser, parseAll } from '../js/parser'

const fetchData = async (route) => {
    const res = await fetch('/api/sensor/' + route)
    const json = await res.json()
    const parsed = parser(json)

    return parsed;

};

export const fetchAllData = () => {
    const airData        =  fetchData("airquality");
    console.log("BARE EN LOG", airData);
    //const tempData     = await fetchData("temperature");
    //const peopleData   = await fetchData("people");
    //const humidityData = await fetchData("humidity");

    return parseAll(airData)
    //return parseAll(airData, tempData, peopleData, humidityData);
};

