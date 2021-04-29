
import React from 'react';
import logo from './logo.svg';
import './App.css';

import { HomePage } from "./presenters/homePage.js";


function App() {
    const [val, setVal] = React.useState(0);
    React.useEffect(() => {
        fetch('/api/sensor/airquality')
        .then(res => res.json())
        .then(json => {
            console.log(json);
        })
    }, [])

    return (
        <div className="App">
        <header className="App-header">
            <p>
                <HomePage />
                {val}
            </p>
        </header>
        </div>
    );
}

export default App;
