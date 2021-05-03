import  React from 'react';
import  ReactDOM from 'react-dom';
import {CurrentQualityView} from '../currentQualityView';

import "@testing-library/jest-dom";
import {render, screen, cleanup} from '@testing-library/react';

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
describe("Testing the data header in each table", () => {
    //This test ensures that the table header date1 is correctly rendered
    it("renders date1 header correctly", () => {
        const {getByTestId} = render(<CurrentQualityView />);
        expect(getByTestId("date1")).toHaveTextContent("Date");
    })
    //This test ensures that the table header date2 is correctly rendered
    it("renders date2 header correctly", () => {
        const {getByTestId} = render(<CurrentQualityView />);
        expect(getByTestId("date2")).toHaveTextContent("Date");
    })
    //This test ensures that the table header date3 is correctly rendered
    it("renders date3 header correctly", () => {
        const {getByTestId} = render(<CurrentQualityView />);
        expect(getByTestId("date3")).toHaveTextContent("Date");
    })
    //This test ensures that the table header date4 is correctly rendered
    it("renders date4 header correctly", () => {
        const {getByTestId} = render(<CurrentQualityView />);
        expect(getByTestId("date4")).toHaveTextContent("Date");
    })
})
//This test ensures that the table header people is correctly rendered
describe("Testing the people header in each table", () => {
    //This test ensures that the poeple header in each table is correctly rendered
    it("renders people1 header correctly", () => {
        const {getByTestId} = render(<CurrentQualityView />);
        expect(getByTestId("people1")).toHaveTextContent("#people in room");
    })
    //This test ensures that the poeple header in each table is correctly rendered
    it("renders people2 header correctly", () => {
        const {getByTestId} = render(<CurrentQualityView />);
        expect(getByTestId("people2")).toHaveTextContent("#people in room");
    })
    //This test ensures that the poeple header in each table is correctly rendered
    it("renders people3 header correctly", () => {
        const {getByTestId} = render(<CurrentQualityView />);
        expect(getByTestId("people3")).toHaveTextContent("#people in room");
    })
    //This test ensures that the poeple header in each table is correctly rendered
    it("renders people4 header correctly", () => {
        const {getByTestId} = render(<CurrentQualityView />);
        expect(getByTestId("people4")).toHaveTextContent("#people in room");
    })
})

//This test ensures that temperature, humidity, carbon and the sound level headers are correctly displayed in each table
describe("Testing, temp, humidity, carbon and sound header, ensuring the correct text is displayed for each header", () => {
    //This test ensures that the table header carbon is correctly rendered
    it("renders carbon header correctly", () => {
        const {getByTestId} = render(<CurrentQualityView />);
        expect(getByTestId("carbon-header")).toHaveTextContent("Carbon dioxide");
    })

    //This test ensures that the sound level header is correctly rendered
    it("renders sound level header correctly", () => {
        const {getByTestId} = render(<CurrentQualityView />);
        expect(getByTestId("sound-lvl")).toHaveTextContent("Sound level (dBa)");
    })
    //This test ensures that the temperature header is correctly rendered
    it("renders temperature header correctly", () => {
        const {getByTestId} = render(<CurrentQualityView />);
        expect(getByTestId("temp")).toHaveTextContent("temperature");
    })
    //This test ensures that the humidity header is correctly rendered
    it("renders humidity header correctly", () => {
        const {getByTestId} = render(<CurrentQualityView />);
        expect(getByTestId("humidity")).toHaveTextContent("Humidity");
    })
})


//This test ensures that all date columns in each table displays the value they have been given.
describe("Testing the date prop and that it renders correctly on all places", () => {
    const data = {
        date: "2021-04-28"
    }

    it("Renders the given date correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("actual-date1")).toHaveTextContent("2021-04-28");
    })
    it("Renders the given date correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("actual-date2")).toHaveTextContent("2021-04-28");
    })
    it("Renders the given date correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("actual-date3")).toHaveTextContent("2021-04-28");
    })
    it("Renders the given date correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("actual-date4")).toHaveTextContent("2021-04-28");
    })

})

//This test ensures that the carbon property dispays the value it is given
describe("Testing the carbon prop, ensuring it displays the value its given", () => {
    const data = {
        data: "10"
    }

    it("Renders the given carbon correctly", () => {
        const {getByTestId} = render(<CurrentQualityView data = {data}/>);
        expect(getByTestId("actual-carbon")).toHaveTextContent("10");
    })

})

//This test ensures that the spinner (a loading indicator) is rendered when waiting for actual data 
test('Data columns renders Spinner when awaiting', () => {
    const data = null;
    const {getAllByTestId, getByTestId } = render(<CurrentQualityView data = {data}/>);
    const date = getByTestId('actual-date1')
    const spinnerInDate = within(date).getAllByTestId('Spinner')
    expect(spinnerInDate.length).toBe(1);
  });



