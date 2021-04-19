
import React from 'react';


function useModelProp(model, prop) {
    const [propValue, setPropValue] = React.useState(model[prop]);
    
    React.useEffect(() => {
        const obs = () => setPropValue(model[prop]);
        model.addObserver(obs);
        // return model.addObserver(obs); Optimization, se s.49 optional
        return () => model.removeObserver(obs);
    }, [model, prop]);  //unused
    return propValue;
}