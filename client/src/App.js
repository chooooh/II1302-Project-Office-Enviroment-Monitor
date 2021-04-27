import React from 'react';
//import logo from './logo.svg';

import './App.css';

import { CurrentQualityPage } from "./components/currentQuality"


function App() {
    const [val, setVal] = React.useState(0);
    React.useEffect(() => {
        fetch('/api/sensor')
        .then(res => res.json())
        .then(json => {
            setVal(json.data);
        })
    }, [])

    return (
        <div className="App">
        <header className="App-header">
                <CurrentQualityPage/>
        
                   {val}
               
        </header>
        </div>
    );
}

export default App;
