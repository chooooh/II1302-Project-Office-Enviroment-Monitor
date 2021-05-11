import  React from 'react';
import  ReactDOM from 'react-dom';
import {CurrentQualityView} from '../currentQualityView';

import "@testing-library/jest-dom";
import {render, cleanup} from '@testing-library/react';

import renderer from "react-test-renderer";

import {within} from "@testing-library/dom";
import "@babel/plugin-syntax-jsx";
import "@babel/preset-react";

/**
 * After eacht test perform cleanup. 
 * (Prevents rendering the same components multiple times)
 */
afterEach(cleanup);

/**
 * Attempt to render the current quality view component without crashing
 */
it("render CurrentQualityView without crashing", () => {
    //create standard div
    const div = document.createElement("div");
    //try to render the div, attach our view component to that div
    ReactDOM.render( <CurrentQualityView />, div);
})

/**
 * Takes a snapshot of the entire CurrentQualityView component
 */
it("matches snapshot", () => {
    const currentQualityView = renderer.create(<CurrentQualityView/>).toJSON();
    expect(currentQualityView).toMatchSnapshot();
})

/**
 * This test ensures that the submit button displays the correct text
 */
it("renders submit button text correctly", () => {
    const {getByTestId} = render(<CurrentQualityView />);
    expect(getByTestId("submit-button")).toHaveTextContent("Submit");
})
/**
 * This test ensures that the history button displays the correct text
 */
it("renders history button text correctly", () => {
    //Creating a data object to passed to the view component
    //else the cards wont be rendered and a Spinner will be rendered instead.
    //and so this prop must be passed down or else the test wont find the button.
    const data = {
        airQualityDate:  "2021-04-28",
        humidityDate:    "2022-04-28",
        temperatureDate: "2023-04-28",
        carbon: "10",
        volatile: 12,
        humidity: 30,
        temperature: 24 
    }
    const {getByTestId} = render(<CurrentQualityView data = {data}/>);
    expect(getByTestId("history-button")).toHaveTextContent("History");
})

/**
 * This test ensures that when the data prop is sent down to the view containing all the different dates
 * of each measurment. All dates are correctly rendered on the correct places.
 */
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

/**
 * This test ensures that all measured values, such as carbon, volatile, temperature and humidity 
 * which are fetched from the database are correctly rendered in the view and on the correct places.
 */
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

/**
 * This test ensures that if the data prop, which is passed down from the presenter to the view, is null
 * then a bootstrap spinner component is rendered instead.
 */
test('Spinner is rendered instead of the main Card component', () => {
    const data = null;
    const {getAllByTestId, getByTestId } = render(<CurrentQualityView data = {data}/>);
    const date = getByTestId('air-quality-content')
    const spinnerInDate = within(date).getAllByTestId('Spinner')
    expect(spinnerInDate.length).toBe(1);
});

/**
 * This test ensures that if the people data is null than a spinner is rendered instead of the entire
 * boostrap form component.
 */
test('Spinner is rendered instead of the Form component', () => {
    const data = null;
    const {getAllByTestId, getByTestId } = render(<CurrentQualityView data = {data}/>);
    const form = getByTestId('form-component')
    const spinnerInDate = within(form).getAllByTestId('Spinner')
    expect(spinnerInDate.length).toBe(1);
});






