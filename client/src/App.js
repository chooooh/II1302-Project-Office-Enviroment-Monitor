import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { CurrentQualityPage } from "./components/presenters/currentQuality"


function App() {
    /*
    const [val, setVal] = React.useState(0);
    React.useEffect(() => {
        fetch('/api/sensor/airquality')
        .then(res => res.json())
        .then(json => {
            console.log(json);
        })
    }, [])*/

    return (
        <div className="App">
        <header className="App-header">
                <CurrentQualityPage/>
        
                   {/*val*/}
               
        </header>
        </div>
    );
}

export default App;
