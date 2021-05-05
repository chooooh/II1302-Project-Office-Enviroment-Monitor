import  React from 'react';
import  ReactDOM from 'react-dom';
import {CurrentQualityView} from '../currentQualityView';

import "@testing-library/jest-dom";
import {render, cleanup} from '@testing-library/react';

import renderer from "react-test-renderer";

import {within} from "@testing-library/dom";

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

//This test ensures that the table header date is correctly rendered
describe("Testing the date prop in each card", () => {
    const data = {
        date: "2021-04-28"
    }
    //This test ensures that the table header date1 is correctly rendered
    it("renders Humidity date  correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("date-humidity")).toHaveTextContent("Measured: 2021-04-28");
    })
    //This test ensures that the table header date2 is correctly rendered
    it("renders Temperature Date  correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("date-temperature")).toHaveTextContent("Measured: 2021-04-28");
    })
    //This test ensures that the table header date3 is correctly rendered
    it("renders Air-quality date correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("date-air-quality")).toHaveTextContent("Measured: 2021-04-28");
    })
})


//This test ensures that all date columns in each table displays the value they have been given.
describe("Testing the date prop and that it renders correctly on all places", () => {
    //Object to be passed as prop when rendering the entire CurrentQualityViewComponent
    //the data.date is used to display the date of the most recent reading
    const data = {
        date: "2021-04-28"
    }

    it("Renders the air quality date correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("date-air-quality")).toHaveTextContent("2021-04-28");
    })
    it("Renders the humidity date correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("date-humidity")).toHaveTextContent("2021-04-28");
    })
    it("Renders the temperature date correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("date-temperature")).toHaveTextContent("2021-04-28");
    })
})

//This test ensures that all the values which resides in the data object which is sent from the presenter to the view
//are correctly handled and presented in the view.
describe("Testing the carbon, people, volatile gases, humidity and temperature props are correctly displayed", () => {
    const data = {
        carbon: "10",
        volatileGases: 12,
        people: 15,
        humidity: 30,
        temperature: 24
    }

    it("Renders the given carbon correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("actual-carbon")).toHaveTextContent("Carbon: 10 ppm");
    })
    it("Renders the given volatile gases correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("actual-volatile-gases")).toHaveTextContent("Volatile gases: 12 unit");
    })
    it("Renders the given temperature correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("actual-temperature")).toHaveTextContent("24 C");
    })
    it("Renders the given humidity correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("actual-humidity")).toHaveTextContent("30 %");
    })
    it("Renders the given people correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("people")).toHaveTextContent("Present people: 15");
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





