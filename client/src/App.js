import React from 'react';
import logo from './logo.svg';
import './App.css';

import { HomePage } from "./presenters/homePage.js";


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
            <p>
                <HomePage />
                {val}
            </p>
        </header>
        </div>
    );
}

export default App;
