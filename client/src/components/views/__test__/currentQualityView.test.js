import  React from 'react';
import  ReactDOM from 'react-dom';
import {CurrentQualityView} from '../currentQualityView';

import "@testing-library/jest-dom";
import {render, cleanup} from '@testing-library/react';

import renderer from "react-test-renderer";

import {within} from "@testing-library/dom";
import "@babel/plugin-syntax-jsx";
import "@babel/preset-react";
//after each test cleanup (prevents rendering the same components multiple times)
afterEach(cleanup);
//Try to render the current quality view without crashing
it("render CurrentQualityView without crashing", () => {
    //create standard div
    const div = document.createElement("div");
    //try to render the div, attach our view component to that div
    ReactDOM.render( <CurrentQualityView />, div);
})

//Snapshot of the entire view component
it("matches snapshot", () => {
    const currentQualityView = renderer.create(<CurrentQualityView/>).toJSON();
    expect(currentQualityView).toMatchSnapshot();
})

//This test ensures that the submit button displays the correct text
it("renders button text correctly", () => {
    const {getByTestId} = render(<CurrentQualityView />);
    expect(getByTestId("submit-button")).toHaveTextContent("Submit");
})


//This test ensures that all date columns in each table displays the value they have been given.
describe("Ensuring that date is rendered correctly on all places", () => {
    //Object to be passed as prop when rendering the entire CurrentQualityViewComponent
    //the different dates are used as a timestamp to show when the different reading were done.
    const data = {
        airQualityDate:  "2021-04-28",
        humidityDate:    "2022-04-28",
        temperatureDate: "2023-04-28" 
    }

    it("Renders the air quality date correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("date-air-quality")).toHaveTextContent("2021-04-28");
    })
    it("Renders the humidity date correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("date-humidity")).toHaveTextContent("2022-04-28");
    })
    it("Renders the temperature date correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("date-temperature")).toHaveTextContent("2023-04-28");
    })
})

//This test ensures that all the values which resides in the data object which is sent from the presenter to the view
//are correctly handled and presented in the view.
describe("Testing the carbon, people, volatile gases, humidity and temperature props are correctly displayed", () => {
    const data = {
        carbon: "10",
        volatile: 12,
        humidity: 30,
        temperature: 24
    }

    it("Renders the given carbon correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("actual-carbon")).toHaveTextContent("Carbon: 10 ppm");
    })
    it("Renders the given volatile gases correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("actual-volatile-gases")).toHaveTextContent("Volatile gases: 12 ppb");
    })
    it("Renders the given temperature correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("actual-temperature")).toHaveTextContent("24 C");
    })
    it("Renders the given humidity correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("actual-humidity")).toHaveTextContent("30 %");
    })
})

//This test ensures that the spinner (a loading indicator) is rendered when waiting for actual data 
test('Spinner is rendered instead of the main Card component', () => {
    const data = null;
    const {getAllByTestId, getByTestId } = render(<CurrentQualityView data = {data}/>);
    const date = getByTestId('air-quality-content')
    const spinnerInDate = within(date).getAllByTestId('Spinner')
    expect(spinnerInDate.length).toBe(1);
});
//Similar to the previous test this test ensures that a spinner is rendered when waiting for the data.people prop to be fetched
test('Spinner is rendered instead of the Form component', () => {
    const data = null;
    const {getAllByTestId, getByTestId } = render(<CurrentQualityView data = {data}/>);
    const form = getByTestId('form-component')
    const spinnerInDate = within(form).getAllByTestId('Spinner')
    expect(spinnerInDate.length).toBe(1);
});






