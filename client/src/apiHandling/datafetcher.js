

const fetchData = async (route) => {
   const res    = await fetch('/api/sensor/' + route);
   const json   = await res.json();
   return json;
};

export const fetchAllData = async () => {
    const data = await fetchData('airquality');
    return data;
    
    //console.log("AirDATA", airData)
    //const tempDataPromise       =  fetchData("temperature");
    //const tempData     = await fetchData("temperature");
    //const peopleData   = await fetchData("people");
    //const humidityData = await fetchData("humidity");

    //return parseAll(airData)
    //return parseAll(airData, tempData, peopleData, humidityData);
};

