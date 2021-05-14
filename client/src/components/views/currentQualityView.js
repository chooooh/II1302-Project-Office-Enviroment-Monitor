import React from "react";                      //import react framework
import { 
        Button, 
        Navbar,
        Nav, 
        Row, 
        Col, 
        Form, 
        Spinner,
        Jumbotron,
        Card,
        ListGroup,
        Container
    } from 'react-bootstrap';                   // import bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'   // import bootstrap css
import {currentDateTime} from '../../utils/utils.js'  //import function which returns current date and time from utils

//Objects defining css styling for the Bootstrap components
const formStyle = {
    padding: '10px'
};
const cardTextStyle = {
    color: 'black',
};
const jumbotronStyle = {
    marginTop: '70px',
    
    color: 'black',
};
const rowStyle = {
    margin: '15px'
};
const fontSize = {
    fontSize: '17px',
    fontWeight: 'bold',
};

/**
 * This Component is the View component. It dictates the layout of UI and presents
 * all data it receives from its corresponding presenter, currentQuality.js.
 * This component also reacts to user actions such as button clicks and user input. 
 * 
 * @param {Object} data, Object containing all Air Quality related data,
 * @param {String} data.airQualityDate, the date and time which states when carbon and volatile was measured.
 * @param {String} data.carbon,  the current carbon value measured in ppm
 * @param {String} data.volatile, the current amount of volatile gases in the room measured in ppb.
 * @param {String} data.temperatureDate, the date and time which states when temperature was measured.
 * @param {String} data.temperature, the current temperature in the room measured in celcius.
 * @param {String} data.humidityDate, the date and time of when the humidity was measured.
 * @param {String} data.humidity, the current humidity in the room measured in %.
 * @param {Integer} numberOfPeople,  the number of people present in the room.
 * @param {callback} onSubmit,  submits the user input (number of people in the room).  
 * @returns jsx
 */
export const CurrentQualityView = ({data, fetchTime, numberOfPeople, onSubmit}) => {  
  
    let lastFetch = null;
    if (data != null) lastFetch = currentDateTime(); 

    const textInput = React.createRef(); 
    const [peeps, setPeople] = React.useState(null);


    console.log("in the view component")
    return (
        <Container fluid>
            <Navbar bg="dark" variant="dark" fixed = "top">
                <Navbar.Brand href="#home">Home</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#history">History</Nav.Link>
                <Nav.Link href="#currentQuality">Current Quality</Nav.Link>
                </Nav>
            </Navbar>
            <Jumbotron style = {jumbotronStyle}>
                <h1>Office Environment Monitor!</h1>
                    <p>
                    On this page you can find all of the current statistics being monitored.<br/>
                        If the number of people displayed on this page is incorrect you can change it to the proper amount below.<br/>
                    </p>
            </Jumbotron>
            <Container fluid data-testid = "air-quality-content">
            {data == null ? <Spinner data-testid = "Spinner" animation="border" role="status"></Spinner>
            :<Card className="text-center">
            <Card.Header style = {cardTextStyle}>Current Air Quality</Card.Header>
            <Card.Body>
                <Card.Title style = {cardTextStyle}>The current measurements are displayed here</Card.Title>
                <Row style = {rowStyle}>
                <Col>
                <Card border = "success">
                    <Card.Body>
                    <Card.Title style = {cardTextStyle}>Humidity</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted" data-testid = "date-humidity">{"Measured: " + data.humidityDate}</Card.Subtitle>
                        <Card.Text style = {cardTextStyle}>
                            <ListGroup variant="flush">
                                <ListGroup.Item data-testid = "actual-humidity" style = {fontSize}>{Number.parseFloat(data.humidity).toFixed(2) + " %" } </ListGroup.Item>
                            </ListGroup>
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card border = "success">
                    <Card.Body>
                        <Card.Title style = {cardTextStyle}>Gases</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted" data-testid = "date-air-quality">{"Measured: " + data.gasesDate }</Card.Subtitle>
                        <Card.Text style = {cardTextStyle}>
                            <ListGroup variant="flush">
                                <ListGroup.Item data-testid = "actual-carbon" style = {fontSize}>{"Carbon: " + Number.parseFloat(data.carbon).toFixed(0) + " ppm"}  </ListGroup.Item>
                                <ListGroup.Item data-testid = "actual-volatile-gases" style = {fontSize}>{"Volatile gases: " + Number.parseFloat(data.volatile).toFixed(0) + " ppb"}  </ListGroup.Item>
                            </ListGroup>
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card border = "success" >
                    <Card.Body>
                    <Card.Title style = {cardTextStyle}>Temperature</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted" data-testid = "date-temperature">{"Measured: " + data.temperatureDate}</Card.Subtitle>
                        <Card.Text style = {cardTextStyle}>
                            <ListGroup variant="flush">
                                <ListGroup.Item data-testid = "actual-temperature" style = {fontSize}>{Number.parseFloat(data.temperature).toFixed(2) + " C"}</ListGroup.Item>
                            </ListGroup>
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
                <Button data-testid = "history-button" variant="primary">History</Button>
            </Card.Body>
            {fetchTime ? <Card.Footer className="text-muted">{"Last fetch: " + fetchTime}</Card.Footer> : <Spinner data-testid = "Spinner" animation="border" role="status"></Spinner>}
            </Card>}
            </Container>
            <Row style = {rowStyle} className = "justify-content-center">
                <Form style = {formStyle} data-testid = "form-component">
                {data == null? <Spinner data-testid = "Spinner" animation="border" role="status"></Spinner> :<Form.Label data-testid = "people">{"Present people: " +  numberOfPeople }</Form.Label>}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Here you can insert the current number of people in the room</Form.Label>
                        <Form.Control placeholder="Enter number of people" ref = {textInput}  onChange = {() => { setPeople(textInput.current.value); console.log(textInput.current.value) }} type = "text"/>
                        <Form.Text className="text-muted">
                        Ensure that the number is correct.
                        </Form.Text>
                    </Form.Group>
                    <Button data-testid = "submit-button" variant="primary" type="submit" onClick = {(event) => {onSubmit(peeps); event.preventDefault()}}>
                        Submit
                    </Button>
                </Form>
            </Row>  
        </Container>
  );
};