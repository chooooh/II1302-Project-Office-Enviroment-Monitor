import  React from 'react';
import  ReactDOM from 'react-dom';
import {CurrentQualityPage} from '../currentQuality';

import "@testing-library/jest-dom";
import {render} from '@testing-library/react';

it("renders without crashing", () => {
    //create standard div
    const div = document.createElement("div");
    //try to render the div, attach our component to that div
    ReactDOM.render( <CurrentQualityPage />, div)
})

it("renders text correctly", () => {
    const {getByTestId} = render(<CurrentQualityPage />)
    expect(getByTestId("currentAirQualityText")).toHaveTextContent("Current air quality:")
    
})